#!/usr/bin/env node
import apigateway = require('@aws-cdk/aws-apigateway')
import cdk = require('@aws-cdk/cdk')
import lambda = require('@aws-cdk/aws-lambda')

const { addCorsOptions } = require('./add-cors')
const { cognito } = require('./cognito/cognito_arn')

export class LambdaFunctionStack extends cdk.Stack {
  constructor(app: cdk.App, id: string) {
    super(app, id)

    const helloLambda = new lambda.Function(this, 'HelloHandler', {
      code: new lambda.AssetCode('lambda'),
      handler: 'hello.handler',
      runtime: lambda.Runtime.NodeJS810,
    })

    const alias = new lambda.Alias(this, 'alias', {
      aliasName: 'hello-world',
      version: new lambda.Version(this, 'version', {
        lambda: helloLambda,
      }),
    })

    //create the api Service
    const apiService = new apigateway.RestApi(this, 'helloworld-api', {
      restApiName: 'HelloWorld Service',
      description: 'This service calls HelloLambda.',
    })

    //create a root api gateway resource
    const hello = apiService.root.addResource('hello')

    //apigateway with lambda integration
    const helloApiGatewayLambdaIntegration = new apigateway.LambdaIntegration(
      alias,
    )

    const authorizer = new apigateway.CfnAuthorizer(this, 'HelloAuthorizer', {
      authType: apigateway.AuthorizationType.Cognito,
      providerArns: [cognito.default.arn],
      name: 'HelloAuthorizer',
      restApiId: apiService.restApiId,
      identitySource: 'method.request.header.Authorization',
      type: apigateway.AuthorizationType.Cognito,
    })

    //add a post with the lambda integration
    hello.addMethod('post', helloApiGatewayLambdaIntegration, {
      authorizationType: apigateway.AuthorizationType.Cognito,
      authorizerId: authorizer.authorizerId,
    })
    addCorsOptions(hello)
  }
}

const app = new cdk.App()
new LambdaFunctionStack(app, 'HelloWorld')
app.synth()
