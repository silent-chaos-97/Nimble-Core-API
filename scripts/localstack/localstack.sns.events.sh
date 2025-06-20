#!/bin/bash

aws sns create-topic --endpoint-url=http://${LOCALSTACK_HOST:-localhost}:4566 --name events --region ${REGION:-'us-east-2'}

