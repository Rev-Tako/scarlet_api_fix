const express = require('express')
const app = express()

app.get('/', function (req, res) {
  const into = {user_input: '', SCARLET_output: '', msg: 'no output to display'}
  const fun = function () {};
  const outof = { ...into, msg: 'no message to display' }
  res.json(outof)
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000')
})
