const express = require('express')
const app = express()

app.get('/', function (req, res) {
  this.setState({user_input: '', SCARLET_output: '', msg: 'message 0'})
  let today = new Date()
  let time = today.getSeconds()
  let ar = ['message1', 'message2']
  const fun = function (time, ar) {
    if (time%2===0) {
      return(ar[1])
    }else{
      return(ar[0])
    }
  };
  this.setState({msg: fun(time, ar)});
  res.json(this.state)
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000')
})
