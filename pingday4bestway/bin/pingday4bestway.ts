#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Pingday4BestwayStack } from '../lib/pingday4bestway-stack';
import { Pingday4ec2all } from '../lib/pingday4ec2all';

const app = new cdk.App();
new Pingday4BestwayStack(app, 'Pingday4BestwayStack', {

   env: { account: '992382386705', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});

new Pingday4ec2all(app, 'Pingday4ec2all', {

   env: { account: '992382386705', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});