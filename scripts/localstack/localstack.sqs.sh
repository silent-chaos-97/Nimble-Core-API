#!/bin/bash

for queue in signers-compliance signers-identity signers-credit-report account-requests event-ingress
do
  echo "aws sqs create-queue --endpoint-url=http://${LOCALSTACK_HOST:-localhost}:4566 --queue-name ${queue} --region ${REGION:-'us-east-2'}"
  aws sqs create-queue --endpoint-url=http://${LOCALSTACK_HOST:-localhost}:4566 --queue-name "${queue}" --region ${REGION:-'us-east-2'}
