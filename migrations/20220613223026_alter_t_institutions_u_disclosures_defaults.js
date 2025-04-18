exports.up = knex => knex.schema.raw(`UPDATE institutions SET disclosures = '{
    "revised": "",
    "count": 19,
    "data": [
      {
        "name": "Terms of use",
        "text": "<p> NimbleFi is owned and operated by SwitchTech LLC (“SwitchTech,“ “we,“ “our,“ or “us“). NimbleFi is a checking account onboarding platform. </p> <p> THESE TERMS OF USE (“TERMS“) CONSTITUTE A BINDING AGREEMENT BETWEEN YOU AND US. PLEASE READ CAREFULLY THROUGH ALL SECTIONS OF THESE TERMS. YOUR ACCESS TO AND USE OF NIMBLEFI IS SUBJECT TO THESE TERMS AND ALL APPLICABLE LAWS AND WE RESERVE THE RIGHT TO TERMINATE YOUR ACCESS TO NIMBLEFI IF YOU VIOLATE THESE TERMS. IF YOU DO NOT AGREE WITH THESE TERMS, DO NOT ACCESS OR OTHERWISE USE NIMBLEFI. </p> <p> We may make changes to the content available on NimbleFi at any time. We can change, update, add, or remove provisions of these Terms at any time by posting the updated Terms on NimbleFi. By using NimbleFi after we have updated the Terms, you are agreeing to the then-current Terms. However, we will not amend the arbitration provision without giving you notice and an opportunity to opt out of such provision. In addition to these Terms, your use of NimbleFi may be governed by additional agreements. </p>"
