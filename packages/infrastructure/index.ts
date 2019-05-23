#!/usr/bin/env node
import cdk = require('@aws-cdk/cdk')
import s3 = require('@aws-cdk/aws-s3')
import iam = require('@aws-cdk/aws-iam')

class myStaticWebsiteStack extends cdk.Stack {
  constructor(parent: cdk.App, name: string, props: cdk.StackProps) {
    super(parent, name, props)

    const bucket = new s3.Bucket(this, 'myFirstBucket')
    bucket.addToResourcePolicy(
      new iam.PolicyStatement()
        .addActions('s3:GetObject')
        .addResources(bucket.arnForObjects('file.txt'))
        .addAccountRootPrincipal(),
    )
  }
}

const app = new cdk.App()

new myStaticWebsiteStack(app, 'MyStaticSite', { env: { region: 'us-west-2' } })

app.run()
