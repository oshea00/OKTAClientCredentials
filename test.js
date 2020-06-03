require('dotenv').config()
const request = require('request-promise')
const btoa = require('btoa')
const { ISSUER_URL, CLIENT_ID, CLIENT_SECRET, DEFAULT_SCOPE, PORT } = process.env

const test = async () => {
  const token = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
  try {
    const { token_type, access_token } = await request({
      uri: `${ISSUER_URL}/v1/token`,
      json: true,
      method: 'POST',
      headers: {
        authorization: `Basic ${token}`,
      },
      form: {
        grant_type: 'client_credentials',
        scope: DEFAULT_SCOPE,
      },
    })

    const response = await request({
      uri: `http://localhost:${PORT}`,
      json: true,
      headers: {
        authorization: [token_type, access_token].join(' '),
      },
    })

    console.log(response)
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

test()
