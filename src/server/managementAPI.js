import 'dotenv/config'
import fetch from 'node-fetch'
import querystring from 'querystring'

export const updateAuth0UserMetadata = async (req, res, next) => {
  try {
    // Step 1: Obtain Management API Token
    const tokenPayload = querystring.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: process.env.AUTH0_AUDIENCE
    })

    const tokenOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: tokenPayload
    }

    const tokenResponse = await fetch('https://dev-wn87thdr6glngf33.uk.auth0.com/oauth/token', tokenOptions)
    const parsedData = await tokenResponse.json()

    if (tokenResponse.ok) {
      req.managementApiToken = parsedData.access_token
      next()
    } else {
      console.error('Error:', parsedData)
      next(new Error(parsedData.error_description || 'Unknown error'))
    }
  } catch (error) {
    console.error('Error:', error)
    next(error)
  }
}
