const express = require('express')
const router = express.Router()

const ytdl = require('ytdl-core')

const timeLog = (req, res, next) => {
    console.log("Download requested")
    next()
}

router.use(timeLog)

router.get('/', (req, res) => {
    res.redirect('/?h=download')
})

router.get('/:some', (req, res) => {
    res.redirect(`/?h=download&p=${req.params.some}`)
})


router.get('/youtube/:id', async (req, res) => {
    if(!ytdl.validateID(req.params.id)) return res.render('pages/error', {title:`Invalid YouTube Video`, description:`Please make sure you've entered a real youtube link or if the video is still available`})

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

    var filename = await download(URL.data.video, 'mp4')

    res.render('tiktok', {data:URL.data, id:req.params.id, downloadLink:`http://localhost:3000/file/${filename}?format=mp4`, watchLink:`http://localhost:3000/watch/${filename}?format=mp4`})
})

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

async function download(link, format){
    const http = require('https'); // or 'https' for https:// URLs
    const fs = require('fs');

    const download = require('download');
    var id = makeid(32)

    await download(link, `cdn`, {filename:`stealthis_app_${id}.${format}`});
    return id
}


module.exports = router