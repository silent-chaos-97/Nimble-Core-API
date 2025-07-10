#!/bin/bash

# docker run --name localstack -p 4566:4566 -p 8055:8080 localstack/localstack:1.4


for script in s3 ses sqs sns.signers sns.account-requests sns.events swf
do
