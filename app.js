const express = require('express')
const app = express()

app.get(
    '/',
    function (req, res) {
  const outof = {msg: 'get requests to this page do nothing, use post from an api' }
  res.json(outof)
})

app.post(
    '/',
    function (req,res){
      const send_to_scarlet = function (request) {
        // send to SCARLET
        return('SCARLET not connected')
      }
      const out = {
        user_input: req.body,
        SCARLET_output: send_to_scarlet(req.body),
        msg:'no output to display'}
      res.json(out)
    }
)


app.listen(3000, function () {
  console.log('Example app listening on port 3000')
})
