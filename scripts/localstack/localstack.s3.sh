#!/bin/bash

do
  echo "aws --endpoint-url=http://${LOCALSTACK_HOST:-localhost}:4566 s3api create-bucket --bucket ${bucket} --region ${REGION:-'us-east-1'}"
  aws --endpoint-url=http://${LOCALSTACK_HOST:-localhost}:4566 s3api create-bucket --bucket ${bucket} --region ${REGION:-'us-east-1'}
  echo "aws --endpoint-url=http://${LOCALSTACK_HOST:-localhost}:4566 s3api put-bucket-acl --bucket ${bucket} --acl public-read --region ${REGION:-'us-east-1'}"
  aws --endpoint-url=http://${LOCALSTACK_HOST:-localhost}:4566 s3api put-bucket-acl --bucket ${bucket} --acl public-read --region ${REGION:-'us-east-1'}
