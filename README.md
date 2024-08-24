# Ravn-Challenge-V2-Benjamin.Ramirez

**STEP 1**: Execute `npm i`

**STEP 2**: Ceate your environment variables on a ".env" named file

Here are some examples:

```
PORT=3000
CTX=dev
SALT_ROUNDS=10
DATABASE_URL='postgresql://<yourdbusername>:<yourdbpassword>@localhost:5432/<yourdbname>?schema=public'
SENDER_EMAIL=senderemailaddress@gmail.com
SENDER_PWD=<yoursenderemailaddressfornodemailer>
ACCESS_TOKEN_SECRET=<secretstringforencryptingaccesstokens>
REFRESH_TOKEN_SECRET=<secretstringforencryptingrefreshtokens>
```

**STEP 3**: Excute command `npx prisma db push` for migrating all the models on prisma.schema

**STEP 4**: Execute a restore in pgAdmin from the file tiny_store_dump.sql for default records in the database

**STEP 5**: Execute `npm run dev` or `npm start` for running the server
