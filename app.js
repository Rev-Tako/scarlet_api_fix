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
      fetch('./fetcher', {
          method: 'POST',
          body: JSON.stringify(req.body)
      })
    .then(response => response.json())
    .then(json => {
        const out = {
            user_input: req.body,
            SCARLET_output: json.body,
            msg: 'no output to display'
        }
        res.json(out)
    })
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000')
})


// http://<pqb20197@tehr10>:<5002>/webhooks/rest/webhook