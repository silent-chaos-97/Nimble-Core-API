
# Nimble Core

the api behind the nimble project.

### System Requirements

- nodejs = 14
- postgres >= 11
- [localstack](https://github.com/localstack/localstack) or an AWS account

#### Related repos

- [nimble-crm](https://gitlab.com/nimblefi/nimble-crm) - CRM and backoffice
- [nimble-onboarding](https://gitlab.com/nimblefi/nimble-onboarding) - customer onboarding (product requests)

### Environments

This project configures using GitLab tools for CI/CD and the environment is hosted by AWS EKS Cluster.

All application runtime logs for the environments are available through Kibana, follow this [steps](https://gitlab.com/wearesingular/clients/nimble/nimble-ops/-/blob/master/terraform/modules/observability/README.md)

#### Development

endpoint: [https://api-dev.nimblefi.com/](https://api-dev.nimblefi.com/v1/health)


endpoint: [https://api-staging.nimblefi.com/](https://api-staging.nimblefi.com/v1/health)
