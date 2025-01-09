import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { version } from 'os';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class Pingday4BestwayStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    //define an array of bucket names
    const bucketNames = ["pingday4bucket1", "pingday4bucket2"];

    //using for loop to create multiple buckets
    for (let i = 0; i < bucketNames.length; i++) {
      new s3.Bucket(this, bucketNames[i], {
        bucketName: bucketNames[i],
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        versioned: true,
        autoDeleteObjects: true,
      })
    }


    // create a new s3 bucket
    const pingl2s2 = new s3.Bucket(this, 'pingl2s3', {
      bucketName: "pingday4bucket",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      versioned: true,
      autoDeleteObjects: true,
    })
  }
}
