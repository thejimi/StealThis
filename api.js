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

router.get('/discord_user/:id', async (req, res) => {
    const {discord_bot_token} = require('./config.json')
    const { REST } = require('@discordjs/rest')
    const { Routes } = require('discord-api-types/v10')
    const rest = new REST({version:'10', authPrefix:'Bot'}).setToken(discord_bot_token)

    const info = await rest.get(Routes.user(req.params.id))
    res.json(info)
})

module.exports = router