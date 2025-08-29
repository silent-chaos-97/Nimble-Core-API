#!/usr/bin/env bash

do
  aws swf terminate-workflow-execution --endpoint-url http://localhost:4566 --region ${REGION:-'us-east-2'} --domain wkfl-local --workflow-id "${id}"
