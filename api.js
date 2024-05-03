const express = require('express')
const router = express.Router()

const ytdl = require('ytdl-core')

const timeLog = (req, res, next) => {
    console.log("API Request")
    next()
}

router.use(timeLog)

router.get('/', (req, res) => {
    res.redirect('/?h=api')
})

router.get('/discord_user/:id', (req, res) => {
    
})

module.exports = router