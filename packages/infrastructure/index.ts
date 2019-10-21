#!/usr/bin/env node
import cdk = require('@aws-cdk/core')

const { LambdaFunctionStack } = require('./stack/lambda-function')

const app = new cdk.App()
new LambdaFunctionStack(app, 'HelloWorld')
app.synth()
