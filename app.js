const express = require('express')
const app = express()

app.get('/', function (req, res) {
  let msg = 'look, a message'
  res.send(<header>{msg}</header>)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
