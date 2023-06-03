const express = require('express')
const app = express()
// import * as serviceWorker from './serviceWorker';
//
// serviceWorker.unregister();
app.get('/', function (req, res) {
  const msg = function () {
    let today = new Date()
    let time = today.getTime()
    let ar = ['message1', 'message2']
    if (time%2===0) {
      return(ar[1])
    }else{
      return(ar[0])
    }
  }
  res.json({body : msg})
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000')
})
