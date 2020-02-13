require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const session = require('express-session')
const socket = require('socket.io')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env
const spotifyAuthCtrl = require('./controllers/spotifyAuthController')
const slackAuthController = require('./controllers/slackAuthController')

app.use(express.json())
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
)
const server = app.listen(SERVER_PORT, () =>
  console.log(`listening on port ${SERVER_PORT}`)
)

const io = socket(server)

io.on('connection', socket => {
  console.log('Socket connected')
})

app.use(express.static(`${__dirname}/../build`))

//*SPOTIFY LOGIN ENDPOINTS
app.get('/login', spotifyAuthCtrl.login)
app.post('/callback', spotifyAuthCtrl.callback)
app.post('/refresh', spotifyAuthCtrl.refresh)
app.get('/session', spotifyAuthCtrl.sessionCheck)
app.post('/token', spotifyAuthCtrl.checkLocalToken)

//*SLACK ENDPOINTS
app.get('/slack/login', slackAuthController.login)

//! ALL ENDPOINTS ABOVE THIS LINE!!!!!
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})
