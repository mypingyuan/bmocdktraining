import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class Ec2CodeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

   //vpc
    const vpc = ec2.Vpc.fromLookup(this, 'ExistingVPC', {
      isDefault: true
    });
   //ec2
    const pinginstance = new ec2.Instance(this, 'pingvm', {
      vpc,
      instanceType: new ec2.InstanceType('t2.micro'),
      machineImage: new ec2.AmazonLinuxImage(),
      keyName: 'splunk-key'

    });

  }
}
