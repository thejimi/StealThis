const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('pages/landing')
})

app.get('/youtube', (req, res) => {
  res.render('downloaders/youtube')
})

app.get('/tiktok', (req, res) => {
  res.render('downloaders/tiktok')
})

app.get('/reel', (req, res) => {
  res.render('downloaders/reel')
})

app.get('/file/:filename', (req, res) => {
  if(!req.query.format){
    return res.render('error', {title:`No format provided`, description:`The ?format parameter is missing`})
  }

  res.download(__dirname + `/cdn/stealthis_app_${req.params.filename}.${req.query.format}`)
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

app.get('/:username/photo/:id', (req, res) => {
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

app.get('/img/:filename/:fileextension', (req, res) => {
  res.sendFile(__dirname +`/img/${req.params.filename}.${req.params.fileextension}`)
})

const download = require('./download')
app.use('/download', download)

app.get('*', function(req, res){
  res.status(404).render('pages/error', {title:'Page not found...', description:'We looked everywhere but couldn\'t find what you\'re looking for'})
});

app.listen(port, () => {
  console.log(`${port}`)
})