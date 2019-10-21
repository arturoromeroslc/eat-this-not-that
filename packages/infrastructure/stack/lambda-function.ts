import apigateway = require('@aws-cdk/aws-apigateway')
import cdk = require('@aws-cdk/core')
import lambda = require('@aws-cdk/aws-lambda')

const { LambdaFunction } = require('../service/lambda/create')
const { addCorsOptions } = require('../service/lambda/add-cors')
const { cognito } = require('../service/cognito/cognito_arn')

console.log(LambdaFunction)

export class LambdaFunctionStack extends cdk.Stack {
  constructor(app: cdk.App, id: string) {
    super(app, id)

    const helloLambda = LambdaFunction.CreateLambdaFunction({
      self: this,
      functionName: 'HelloHandler',
      handler: 'hello.handler',
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

    //This will create a COGNITO_USER_POOLS authorizer which uses the user pool added in providerArns
    // how can we test this?
    const authorizer = new apigateway.CfnAuthorizer(this, 'HelloTest1', {
      authType: apigateway.AuthorizationType.Cognito,
      providerArns: [cognito.default.arn],
      name: 'HelloTest1',
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
