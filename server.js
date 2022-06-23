const express = require('express')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const PORT = 8000

const app = express()

let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'sample-nflix',
    collection

MongoClient.connect(dbConnectionString)
    .then(client => {
        db = client.db(dbName)
        collection = db.collection('movies')
        console.log(`Connected to database`)
    })
    .catch(error => console.log(error))

app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || PORT, () => console.log(`Server listening in port ${process.env.PORT || PORT}`))