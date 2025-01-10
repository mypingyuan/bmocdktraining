import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as iam from 'aws-cdk-lib/aws-iam';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class Pingproject1Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pingTable = new cdk.aws_dynamodb.Table(this, 'pingtable', {
      partitionKey: { name: 'BucketName', type: cdk.aws_dynamodb.AttributeType.STRING },
      tableName: 'pingtable',
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT recommended for production code
    });


    // The code that defines your stack goes here
    const pingLambdaFunc = new lambda.Function(this, 'pinglambdafunc', {
      runtime: lambda.Runtime.PYTHON_3_10,
      functionName: 'pinglambdafunc',
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
import time
import boto3
def handler(event, context):
    s3 = boto3.client('s3')
    response = s3.list_buckets()
    buckets = [bucket['Name'] for bucket in response['Buckets']]
    print("S3 Buckets:", buckets)
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('pingtable')
    for bucket in buckets:
      table.put_item(Item={'BucketName': bucket})
    return {
      'statusCode': 200,
      'body': 'S3 Buckets: ' + ', '.join(buckets)
    }`
  ),
    });

    pingLambdaFunc.addToRolePolicy(new iam.PolicyStatement({
      actions: ['dynamodb:PutItem'],
      resources: [pingTable.tableArn],
    }));

    pingLambdaFunc.addToRolePolicy(new cdk.aws_iam.PolicyStatement({
      actions: ['s3:ListAllMyBuckets'],
      resources: ['arn:aws:s3:::*'],
    }));

    const rule = new events.Rule(this, 'Rule', {
      schedule: events.Schedule.rate(cdk.Duration.minutes(3)),
    });

    rule.addTarget(new targets.LambdaFunction(pingLambdaFunc));
 
   
  }
}
