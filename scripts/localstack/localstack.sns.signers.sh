#!/bin/bash

echo "aws sns create-topic --endpoint-url=http://${LOCALSTACK_HOST:-localhost}:4566 --name signers --region ${REGION:-'us-east-2'}"
