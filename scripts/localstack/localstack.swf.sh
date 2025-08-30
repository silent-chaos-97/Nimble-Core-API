#!/bin/bash

echo "aws swf --endpoint-url=http://${LOCALSTACK_HOST:-localhost}:4566 --region ${REGION:-'us-east-2'} register-domain --name wkfl-local --workflow-execution-retention-period-in-days 365"
aws swf --endpoint-url=http://${LOCALSTACK_HOST:-localhost}:4566 --region ${REGION:-'us-east-2'} register-domain --name wkfl-local --workflow-execution-retention-period-in-days 365
