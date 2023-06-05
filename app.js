const express = require('express')
const app = express()
const fetcher = require('./fetcher')
app.get(
    '/',
    function (req, res) {

        try {
            const fetched = fetcher.get()
            res.json({API: 'ONLINE', SCARLET: fetched.body.scarlet})
        } catch {
        res.json({API: 'ONLINE', SCARLET: 'OFFLINE'})
        }
})

app.post(
    '/',
    function (req,res){
      try {
          const fetched = fetcher.get(req.body)
          if (fetched.body.scarlet && !(fetched.body.scarlet.length === 0)) {
              const out = {
                  user_input: req.body,
                  SCARLET_output: fetched.body.scarlet,
                  msg: ''
              }
              res.json(out)
          } else {
              const out = {
                  user_input: req.body,
                  msg: '',
                  ermsg: fetched.body.ermsg
              }
              res.json(out)
          }
      } catch {
          const out = {
              user_input: req.body,
              msg: '',
              ermsg: 'Error: disconnect between API and fetcher'
          }
          res.json(out)
      }
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000')
})


// http://<pqb20197@tehr10>:<5002>/webhooks/rest/webhook