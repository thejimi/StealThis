const express = require('express')
const router = express.Router()

const ytdl = require('ytdl-core')

const timeLog = (req, res, next) => {
    console.log("Download requested")
    next()
}

router.use(timeLog)

router.get('/', (req, res) => {
    res.redirect('/info')
})

router.get('/youtube/:id', async (req, res) => {
    if(!ytdl.validateID(req.params.id)) return res.render('error', {text:`Invalid YouTube Video`})

    let info = await ytdl.getInfo(req.params.id);

    if(req.query.formatsJson === "true"){
        return res.json(info.formats)
    }

    const videoandsound = []
    info.formats.forEach(element => {
        if(element.hasAudio && element.hasVideo){
            videoandsound.push(element)
        }
    });

    const videonosound = []
    info.formats.forEach(element => {
        if(!element.hasAudio && element.hasVideo){
            videonosound.push(element)
        }
    });

    const justsound = []
    info.formats.forEach(element => {
        if(element.hasAudio && !element.hasVideo){
            justsound.push(element)
        }
    });

    res.render('youtube', {video:info, videoandsound:videoandsound, videonosound:videonosound, justsound:justsound})
})

router.get('/reel/:id',async(req, res) => {
    const { ndown } = require("nayan-media-downloader")
    let URL = await ndown(`https://instagram.com/reel/${req.params.id}`)
    console.log(URL)
    res.render('instagram', {data:URL.data[0]})
})

router.get('/tiktok/:author/:id',async(req, res) => {
    const { tikdown } = require("nayan-media-downloader")
    console.log(`https://tiktok.com/${req.params.author}/video/${req.params.id}`)
    let URL = await tikdown(`https://www.tiktok.com/${req.params.author}/video/${req.params.id}`)
    res.render('tiktok', {data:URL.data, id:req.params.id})
})

module.exports = router