# Docusign

## Docusign requirements

The app uses a third-party SAAS called Docusign to send and allow prospects to sign contracts.
To use this api, you need to fill several variables in the env:

- DOCUSIGN_BASE_OAUTH_PATH - this is the oath server url. It's going to be different depending if it's sandbox or live.

- DOCUSIGN_BASE_PATH - this is the api base url. It's going to be different depending if we're using sandbox or live.

- DOCUSIGN_USER_ID - this is the user id for the sender. You can get this in docusign -> admin -> users -> detail.

- DOCUSIGN_ACCOUNT_ID - This is the account id. You can find this in docusign -> admin -> top left corner.

- DOCUSIGN_CLIENT_ID - This is the integration key. You can find it in docusign -> api and keys -> the name of the app/environment.

- DOCUSIGN_TEMPLATE_ID - This is the id for the template we are using it to build the contracts.
  Note: this will be deprecated when we introduce Products table.

- DOCUSIGN_KEY - This is the private key for the environment used. We have local, dev, qa & production.

Important note: DO NOT TRUST THE DEFAULT values. They may be outdated.

### How to create a new sandbox key

Follow these steps if you need to create a new key.
Go to docusign -> sandbox -> api and keys.

1. Press button to add new app.
2. Give it a name
3. Copy the integration key, that's your DOCUSIGN_CLIENT_ID
4. Choose Authorization Code Grant
5. Generate a private RSA Key. Place it in the source code.

Source:

- https://github.com/docusign/eg-01-node-jwt

