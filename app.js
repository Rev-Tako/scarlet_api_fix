const express = require('express')
const app = express()
// import * as serviceWorker from './serviceWorker';
//
// serviceWorker.unregister();
app.get('/', function (req, res) {
  const msg = 'big message'
  res.json({body : msg})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
