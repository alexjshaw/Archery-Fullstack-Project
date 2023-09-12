/* eslint-disable no-multiple-empty-lines */
import express from 'express'
import ViteExpress from 'vite-express'
import helmet from 'helmet'
import crypto from 'node:crypto'
import { jwtCheck } from './auth.js'
import cors from 'cors'
import userRouter from './routes/user.js'
import equipmentRouter from './routes/equipment.js'
import archerProfileRouter from './routes/archerProfile.js'
import sightmarkRouter from './routes/sightmark.js'
import roundTypeRouter from './routes/roundType.js'
import scoreRouter from './routes/score.js'
import endRouter from './routes/end.js'
import './database/mongo.js'
import 'dotenv/config'

const app = express()

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
  req.cspNonce = crypto.randomBytes(16).toString('hex')
  next()
})

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'default-src': ["'self'", 'https://dev-wn87thdr6glngf33.uk.auth0.com'],
        'script-src': ["'self'", (req, res) => `'nonce-${req.cspNonce}'`],
        'connect-src': ["'self'", 'ws://localhost:24678', 'http://localhost:24678', 'https://dev-wn87thdr6glngf33.uk.auth0.com'],
        'img-src': ["'self'", 'data:', 'https://s.gravatar.com', 'https://*.wp.com']
      }
    }
  })
)

function transformIndexHtml (html, req, res) {
  const regex = /<script(.*?)/gi
  const replacement = `<script nonce="${req.cspNonce}"$1`
  return html.replace(regex, replacement)
}

app.use('/user', jwtCheck, userRouter)

app.use('/equipment', jwtCheck, equipmentRouter)

app.use('/archerprofile', jwtCheck, archerProfileRouter)

app.use('/sightmark', jwtCheck, sightmarkRouter)

app.use('/roundtype', jwtCheck, roundTypeRouter)

app.use('/score', jwtCheck, scoreRouter)

app.use('/end', jwtCheck, endRouter)

ViteExpress.config({ transformer: transformIndexHtml })

ViteExpress.listen(app, 3000, () =>
  console.log('Server is listening on port 3000...')
)
