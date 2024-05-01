const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.redirect("/info")
})

app.get('/info', (req, res) => {
    res.send('info')
})

app.get('/watch', (req, res) => {
    if(req.query.v){
        return res.redirect(`/download/youtube/${req.query.v}`)
    }
})

app.listen(port, () => {
  console.log(`${port}`)
})