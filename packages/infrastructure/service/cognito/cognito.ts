'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const cognito = require('@aws-cdk/aws-cognito')
class CognitoCreator {
  /**
   * Create Cognito UserPool
   * @param {cdk.Construct} self
   * @param {String} id
   */
  static CreateUserPool(self: any, id: string) {
    return new cognito.CfnUserPool(self, id, {
      userPoolName: id,
      policies: {
        passwordPolicy: {
          minimumLength: 8,
          requireLowercase: true,
          requireNumbers: true,
          requireUppercase: true,
          requireSymbols: false,
        },
      },
      schema: [
        {
          name: 'email',
          attributeDataType: 'String',
          required: true,
        },
      ],
      autoVerifiedAttributes: ['email'],
      emailVerificationSubject: 'Your verification code',
      emailVerificationMessage: 'Your verification code is {####}',
    })
  }
  /**
   * Create Cognito UserPool Client
   * @param {cdk.Construct} self
   * @param {String} id
   * @param {cognito.CfnUserPool} userPool
   */
  static CreateUserPoolClient(id: string, userPool: any) {
    new cognito.CfnUserPoolClient(this, id, {
      clientName: id,
      userPoolId: userPool.userPoolId,
    })
  }
}
exports.CognitoCreator = CognitoCreator
