const express = require('express')
const app = express()
// import * as serviceWorker from './serviceWorker';
//
// serviceWorker.unregister();
app.get('/', function (req, res) {
  let msg = 'message 0'
  console.log(msg)
  res.json({body : msg})
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000')
})
