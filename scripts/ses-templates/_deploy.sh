#!/bin/bash

TMPLS="AccountRequestApproved AccountRequestDeclined inviteeSignupEmail inviteeSignupReminderEmail magicLinkEmail prospectPendingSignersEmail signerEmailVerificationEmail userLockedEmail welcomeEmail notification"
AWS_PROFILE='erin2'
ASSETS_HOST='https://cdn.nimblefi.com'

for tmpl in ${TMPLS}; do
  TMP=$(mktemp)
  FILE=$(cat "${tmpl}.ses.json")
  echo "${FILE//\$ASSETS_HOST/${ASSETS_HOST}}" > ${TMP}
