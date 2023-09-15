import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigateway from '@aws-cdk/aws-apigateway';

export class AkamaiServerlessTestAppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the Lambda function
    const helloWorldLambda = new lambda.Function(this, 'HelloWorldFunction', {
      runtime: lambda.Runtime.PYTHON_3_8,
      handler: 'handler.lambda_handler',
      code: lambda.Code.fromInline(`
        def lambda_handler(event, context):
            return {
                'statusCode': 200,
                'body': 'Hello, World!'
            }
      `),
    });

    // Define the API Gateway linked to the Lambda function
    const api = new apigateway.LambdaRestApi(this, 'HelloWorldApi', {
      handler: helloWorldLambda,
      proxy: false,
    });

    const helloResource = api.root.addResource('helloWorld');
    helloResource.addMethod('GET');  // Connects GET /helloWorld to the Lambda function
  }
}