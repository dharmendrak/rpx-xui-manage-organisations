/**
 * Common to both server.ts and local.ts files
 */

import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as session from 'express-session'
import * as sessionFileStore from 'session-file-store'
import * as socketio from 'socket.io'
import * as auth from './auth'
import {appInsights} from './lib/appInsights'
import {config} from './lib/config'
import {errorStack} from './lib/errorStack'
import openRoutes from './openRoutes'
import routes from './routes'

/**
 * Only used Locally
 */
import * as http from 'http'
import * as log4js from 'log4js'
import * as tunnel from './lib/tunnel'

const FileStore = sessionFileStore(session)

const app = express()

app.use(
  session({
    cookie: {
      httpOnly: true,
      maxAge: 1800000,
      secure: config.secureCookie !== false,
    },
    name: 'jui-webapp',
    resave: true,
    saveUninitialized: true,
    secret: config.sessionSecret,
    store: new FileStore({
      path: process.env.NOW ? '/tmp/sessions' : '.sessions',
    }),
  })
)

const httServer = http.createServer(app)
const io = socketio(httServer)
io.on('connection', socket => {
  socket.emit('newMessage', { hello: 'world'});


  console.log('socket new connection1')
  io.emit('newMessage', { will: 'be received by everyone HNALDER'})
  console.log('socket new connection2')



})

io.on('sendMessage', data => {
  console.log('HELLOO', data);
});


/**
 * Used Client side
 */
if (config.proxy) {
  tunnel.init()
}

/**
 * Common to both server.ts and local.ts files
 */
app.use(errorStack)
app.use(appInsights)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

/**
 * Open Routes
 *
 * Any routes here do not have authentication attached and are therefore reachable.
 */
app.get('/oauth2/callback', auth.oauth)
app.get('/external/ping', (req, res) => {
  console.log('Pong')
  res.send('Pong')
})
app.use('/external', openRoutes)

console.log('WE ARE USING local.ts on the box.')
/**
 * We are attaching authentication to all subsequent routes.
 */
// app.use(auth.attach) // its called in routes.ts - no need to call it here

/**
 * Secure Routes
 *
 * Used both local.ts and server.ts
 */
app.use('/api', routes)
app.get('/api/logout', (req, res, next) => {
  auth.doLogout(req, res)
})

const port = process.env.PORT || 3001
httServer.listen(port)

if (process.env.APPINSIGHTS_INSTRUMENTATIONKEY) {
  config.appInsightsInstrumentationKey = process.env.APPINSIGHTS_INSTRUMENTATIONKEY
}

const logger = log4js.getLogger('server')
logger.level = config.logging ? config.logging : 'OFF'

logger.info(`Local server up at ${port}`)
