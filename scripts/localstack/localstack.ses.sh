#!/bin/bash

for email in no-reply@test.nimblefi.com no-reply@nimblefi.com test@localhost
do
  echo "aws ses verify-email-identity --email-address ${email} --region ${SES_REGION:-'us-east-2'} --endpoint-url=http://${LOCALSTACK_HOST:-localhost}:4566"
  aws ses verify-email-identity --email-address ${email} --region ${SES_REGION:-'us-east-2'} --endpoint-url=http://${LOCALSTACK_HOST:-localhost}:4566
done

TMPLS="template passwordResetEmail AccountRequestApproved AccountRequestDeclined inviteeSignupEmail inviteeSignupReminderEmail magicLinkEmail prospectPendingSignersEmail signerEmailVerificationEmail userLockedEmail welcomeEmail notification"
ASSETS_HOST=${ASSETS_HOST:-"https://${ASSETS_CDN:-cdn.nimblefi.com}"}

