const express = require('express')
const bodyParser = require('body-parser')

const cookieParser = require('cookie-parser')
const cors = require('cors')

const {PORT, FORTEND_URL}= require('./config/server.config')
const appRoutes = require('./Routes/index')

const {errorMw} = require("./middlewares/index")

const serverSetupAndStart = async () => {
    const app = express()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(cookieParser());

    app.use(
  cors({
    origin: function (origin, callback) {
      // console.log("Incoming Origin:", origin);
      const allowedOrigins = [FORTEND_URL];
     
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PATCH', ], 
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
    optionsSuccessStatus: 200 
  })
);
    
    app.use("/api", appRoutes)

    app.use(errorMw);

    app.listen(PORT, async () => {
        console.log(` Backend Server started at ${PORT}`)
    })

}

serverSetupAndStart()