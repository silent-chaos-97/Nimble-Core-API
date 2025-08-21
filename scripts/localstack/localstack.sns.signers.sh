#!/bin/bash
echo "aws sns create-topic --endpoint-url=http://${LOCALSTACK_HOST:-localhost}:4566 --name signers --region ${REGION:-'us-east-2'}"
aws sns create-topic --endpoint-url=http://${LOCALSTACK_HOST:-localhost}:4566 --name signers --region ${REGION:-'us-east-2'}

for subscriber in signers-compliance signers-identity signers-credit-report event-ingress
do
  echo "aws sns subscribe --endpoint-url=http://${LOCALSTACK_HOST:-localhost}:4566 --topic-arn arn:aws:sns:us-east-2:000000000000:signers --protocol sqs --notification-endpoint arn:aws:sqs:us-east-2:000000000000:${subscriber} --attributes RawMessageDelivery=true --region ${REGION:-'us-east-2'}"
