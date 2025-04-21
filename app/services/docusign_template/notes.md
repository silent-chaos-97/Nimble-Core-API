# Docusign

## Docusign requirements

The app uses a third-party SAAS called Docusign to send and allow prospects to sign contracts.
To use this api, you need to fill several variables in the env:

- DOCUSIGN_BASE_OAUTH_PATH - this is the oath server url. It's going to be different depending if it's sandbox or live.

- DOCUSIGN_BASE_PATH - this is the api base url. It's going to be different depending if we're using sandbox or live.

- DOCUSIGN_USER_ID - this is the user id for the sender. You can get this in docusign -> admin -> users -> detail.

- DOCUSIGN_ACCOUNT_ID - This is the account id. You can find this in docusign -> admin -> top left corner.


- DOCUSIGN_TEMPLATE_ID - This is the id for the template we are using it to build the contracts.
