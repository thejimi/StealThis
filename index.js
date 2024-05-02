const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('pages/landing')
})

app.get('/watch', (req, res) => {
    if(req.query.v){
        return res.redirect(`/download/youtube/${req.query.v}`)
    }
})

app.get('/:username/video/:id', (req, res) => {
    if(req.params.username.startsWith("@")){
      return res.redirect(`/download/tiktok/${req.params.username}/${req.params.id}`)
    }
})

app.get('/reel/:id', (req, res) => {
    return res.redirect(`/download/reel/${req.params.id}`)
})

app.get('/r/:subredditname/comments/:id/:title', (req, res) => {
    return res.redirect(`/download/reddit/?url=https://www.reddit.com/r/${req.params.subredditname}/comments/${req.params.id}/${req.params.title}`)
})

app.get('/favicon', (req, res) => {
  res.sendFile(__dirname + "/favicon.png")
})

const download = require('./download')
app.use('/download', download)

app.listen(port, () => {
  console.log(`${port}`)
})