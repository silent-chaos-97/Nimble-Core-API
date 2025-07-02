#!/usr/bin/env bash

for id in `aws swf list-open-workflow-executions --endpoint-url http://localhost:4566 --region ${REGION:-'us-east-2'} --domain wkfl-local --start-time-filter oldestDate=1,latestDate=$(date +%s) | jq -c '.executionInfos | map(.execution.workflowId)' | sed -e 's/\[//g' -e 's/\]//g' -e 's/\,/ /g' -e 's/"//g'`
