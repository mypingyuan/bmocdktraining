import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class PingEc2VpcDay3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const vpc = ec2.Vpc.fromLookup(this, 'ExistingVPC', {
      isDefault: true
    });
   //ec2
    const pinginstance = new ec2.Instance(this, 'pingday3vm', {
      vpc,
      instanceType: new ec2.InstanceType('t2.micro'),
      machineImage: new ec2.AmazonLinuxImage(),
      keyPair: ec2.KeyPair.fromKeyPairName(this, 'pingkeypair', 'splunk-key'),
      instanceName: "pingday3LinuxVM"

    });

  

    new cdk.CfnOutput(this, 'printoutid', {
      description: 'print instance id :',
      value: pinginstance.instanceId,
    })

    new cdk.CfnOutput(this, 'printoutip', {
      description: 'print instance ip :',
      value: pinginstance.instancePublicIp,
    })

  }
}
