const express = require('express')
const app = express()
// import * as serviceWorker from './serviceWorker';
//
// serviceWorker.unregister();
app.get('/', function (req, res) {
  let today = new Date()
  let time = today.getSeconds()
  let ar = ['message1', 'message2']
  let msg = 'message 0'
  console.log(msg)
  const fun = function (time, ar) {
    if (time%2===0) {
      console.log(ar[1])
      return(ar[1])
    }else{
      console.log(ar[0])
      return(ar[0])
    }
  }
  msg = fun(time, ar)
  console.log(msg)
  res.json({body : msg})
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000')
})
