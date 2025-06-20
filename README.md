
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

#### Acceptance / Demo

endpoint: [https://api-staging.nimblefi.com/](https://api-staging.nimblefi.com/v1/health)

#### Production

endpoint: [https://api.nimblefi.com/](https://api.nimblefi.com/v1/health)

## Local Development

### Option 1 – Local Node + Docker for Postgres and LocalStack

Make sure you have the LTS node/npm versions (14 and up) `$ node -v`.

1. Launch LocalStack and Posgres
   `yarn docker-start`

1. Seed LocalStack (dependent on aws-cli) - only required for out-of-band and worker components
   `yarn localstack`

1. Install dependencies
   `yarn install`

1. Run Migrations
   `yarn migrate`

1. Seed the DB
   `yarn seed`

1. Edit the user, in the database, that you will be using for login in the `users` table
   - edit the `roles` column to look like `["employee", "developer", "institution-admin"]`

1. and run the account number script (for testing onboarding e2e)

   ```sql
     do $$
     declare
       strt integer:= 1; -- start in this index, excluding this number
       num integer:= 99; -- loop until this number (including)
       counter integer := 0 ; -- loop index, do not touch
       institution_id uuid := '2552ab85-08da-4bb5-be00-9e94d282d311';
     begin
       counter:=strt;
         exit when counter >= num ; -- foreach check
         counter :=  counter + 1 ; -- increment counter
         INSERT INTO product_account_numbers (institution_id, account_number) VALUES (institution_id, CONCAT('DEMO',counter));
       end loop;
     end $$;
   ```

1. __IMPORTANT__: Start app in development mode
   `yarn watch`

1. Check API is running
   Send GET request to http://localhost:8080/v1/health

1. Run tests (requires `nimble-core-test` database)
   `yarn test`

## Localstack

[Localstack](https://github.com/localstack/localstack) is an AWS "emulator" for localhost that exposes a copy the AWS services on diferent ports on your local machine. For example, S3 will be located at http://localhost:4572
After launching localstack, use the following script to set it up:

```bash
$ yarn localstack
```

## Enable MFA
