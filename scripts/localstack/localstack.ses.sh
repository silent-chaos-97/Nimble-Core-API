#!/bin/bash

for email in no-reply@test.nimblefi.com no-reply@nimblefi.com test@localhost
do
  echo "aws ses verify-email-identity --email-address ${email} --region ${SES_REGION:-'us-east-2'} --endpoint-url=http://${LOCALSTACK_HOST:-localhost}:4566"
  aws ses verify-email-identity --email-address ${email} --region ${SES_REGION:-'us-east-2'} --endpoint-url=http://${LOCALSTACK_HOST:-localhost}:4566
done
