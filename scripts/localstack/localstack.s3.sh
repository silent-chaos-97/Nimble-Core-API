#!/bin/bash
for bucket in uploads assets ftp
do
  echo "aws --endpoint-url=http://${LOCALSTACK_HOST:-localhost}:4566 s3api create-bucket --bucket ${bucket} --region ${REGION:-'us-east-1'}"
