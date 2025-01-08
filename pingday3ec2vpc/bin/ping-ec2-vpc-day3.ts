#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PingEc2VpcDay3Stack } from '../lib/ping-ec2-vpc-day3-stack';

const app = new cdk.App();
new PingEc2VpcDay3Stack(app, 'PingEc2VpcDay3Stack', {
 
   env: { account: '992382386705', region: 'us-east-1' },

  
});

