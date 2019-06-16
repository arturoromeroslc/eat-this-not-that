#!/usr/bin/env node
import cdk = require('@aws-cdk/cdk')

const { LambdaFunctionStack } = require('./service/lambda/lambda')

const app = new cdk.App()
new LambdaFunctionStack(app, 'HelloWorld')
app.synth()
