import * as cdk from 'aws-cdk-lib';
import { SecurityGroup } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';


// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class Pingday4ec2all extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create a new ec2
      // The code that defines your stack goes here

      const vpc = ec2.Vpc.fromLookup(this, 'ExistingVPC', {
        isDefault: true
      });

      const mysecuritygroup = new ec2.SecurityGroup(this, 'pingday4securitygroup', {
        vpc,
        securityGroupName: 'pingday4securitygroup',
        description: 'Allow ssh access',
        allowAllOutbound: true,
        });
  
        mysecuritygroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), 'Allow SSH access');
        mysecuritygroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.HTTPS, 'Allow HTTPS access');
        mysecuritygroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.HTTP, 'Allow HTTP access');
      
        
     //ec2
      const pinginstance = new ec2.Instance(this, 'pingday3vm', {
        vpc,
        instanceType: new ec2.InstanceType('t2.micro'),
        machineImage: new ec2.AmazonLinuxImage(),
        keyPair: ec2.KeyPair.fromKeyPairName(this, 'pingkeypair', 'splunk-key'),
        instanceName: "pingday4LinuxVM", 
        securityGroup: mysecuritygroup,
  
      });
  
    
  
      new cdk.CfnOutput(this, 'printoutip', {
        description: 'print instance ip :',
        value: pinginstance.instancePublicIp,
      })
  }
}