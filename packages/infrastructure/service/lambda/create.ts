import cdk = require('@aws-cdk/core')
import lambda = require('@aws-cdk/aws-lambda')

interface Lamdba {
  self: cdk.Construct
  functionName: string
  handler: string
}

export class LambdaFunction {
  static CreateLambdaFunction({ self, functionName, handler }: Lamdba) {
    return new lambda.Function(self, functionName, {
      functionName,
      runtime: lambda.Runtime.NodeJS810,
      code: lambda.Code.directory('src/lambda'),
      handler,
    })
  }
}
