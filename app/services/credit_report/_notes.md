# iSoftPull Credit Bureau

## Other information

See: https://gitlab.com/wearesingular/clients/nimble/nimble-lab/-/issues/3

## Error Codes for api response

List of error codes for API from https://secure.isoftpull.com/index.php?m=prequal&a=api:

- 1000	1	Request was received successfully, but we could not find the user's credit file. It is recommended to reattempt while including the user's DOB or SSN.
- 1015	1	Request was received successfully, but we could not find the user's credit file. It is recommended to reattempt while including the user's SSN.
- 1016	1	Request was received successfully, but we could not find the user's credit file. It is recommended to reattempt while including the user's DOB.
- 1017	1	Request was received successfully, but we could not find the user's credit file. The user likely does not have a credit file.
- 1014	1	We found the credit file but we are unable to open it due to it being either frozen or locked.
- 1020	1	Request was received successfully, but we could not find the user's credit file due to an issue with the submitted address.
- 1021	1	Request was received successfully, but we could not find the user's credit file due to an issue with the submitted name.
- 1022	2	A lenderid must be included in all requests.
- 1008	2	Lender ID not found or this account is currently disabled.
- 1011	2	email and email-confirm must be identical.
