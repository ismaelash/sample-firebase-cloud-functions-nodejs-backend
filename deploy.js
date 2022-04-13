require("dotenv").config();
const yargs = require('yargs/yargs')
const axios = require('axios')
const fs = require("fs");
const { hideBin } = require('yargs/helpers')
const ARGS_CLI = yargs(hideBin(process.argv)).argv

const CONSTANTS_SCRIPT_PATH = "./src/utils/constants.ts"
const SERVICE_ACCOUNT_KEY_PATH = "./src/serviceAccountKey.json"

const SECRET_KEY_JWT = ARGS_CLI.secretKeyJwt === undefined ? process.env.SECRET_KEY_JWT : ARGS_CLI.secretKeyJwt
const BIGQUERY_PROJECT_NAME = ARGS_CLI.bigqueryProjectName === undefined ? process.env.BIGQUERY_PROJECT_NAME : ARGS_CLI.bigqueryProjectName
const SERVICE_ACCOUNT_KEY_URL = ARGS_CLI.serviceAccountKeyUrl === undefined ? process.env.SERVICE_ACCOUNT_KEY_URL : ARGS_CLI.serviceAccountKeyUrl

let constantsScriptRaw = fs.readFileSync(CONSTANTS_SCRIPT_PATH, "utf8");
constantsScriptRaw = constantsScriptRaw.replace("{{github.secrets.SECRET_KEY_JWT}}", SECRET_KEY_JWT)
constantsScriptRaw = constantsScriptRaw.replace("{{github.secrets.BIGQUERY_PROJECT_NAME}}", BIGQUERY_PROJECT_NAME)

fs.writeFileSync(CONSTANTS_SCRIPT_PATH, constantsScriptRaw.toString())

async function getServiceAccountKeyFile(){
  const SERVICE_ACCOUNT_KEY_JSON = await (await axios.get(SERVICE_ACCOUNT_KEY_URL)).data
  fs.writeFileSync(SERVICE_ACCOUNT_KEY_PATH, JSON.stringify(SERVICE_ACCOUNT_KEY_JSON))
}

getServiceAccountKeyFile()