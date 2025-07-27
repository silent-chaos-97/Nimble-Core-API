#!/bin/bash

# docker run --name localstack -p 4566:4566 -p 8055:8080 localstack/localstack:1.4

echo "[START] configuring localstack..."

do
  echo "configuring localstack.${script}..."
  . "${SCRIPTS_DIR:-..}/localstack/localstack.${script}.sh"
