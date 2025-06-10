import express from 'express'
import cors from 'cors'
import errorHandler from '../middlewares/errorHandler.mjs'

import {port, host, } from '../config/index.mjs'
import logger from '../helpers/logger/logger.mjs'
const app = express()

import routers from './router.mjs'

app.set('etag', false)
app.set
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/', routers)

app.use(errorHandler.routeErrorHandler)
app.listen(port, host, () => {
  logger.info('App Server', `Server running at http://${host}:${port}`, 'Start Web Server')
})