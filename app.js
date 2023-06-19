const express = require('express')
const app = express()
const fetcher = require('./fetcher')
app.get(
    '/',
    function (req, res) {
        try {
            const fetched = fetcher.Doget()
            res.json({
                API: 'ONLINE',
                SCARLET: fetched.body.scarlet,
                USER: 'This domain only accepts posts from netlify front end',
                ERRORS: fetched.body.ermsg,
            })
        } catch (err){
            res.json({
                API: 'ONLINE',
                SCARLET: 'CHECK FAILED',
                USER: 'This domain only accepts posts from netlify front end',
                ERRORS: err.message,
            })
        }
    }
    )

app.post(
    '/',
    function (req,res){
      try {
          const fetched = fetcher.Doget(req.body)
          if (fetched.scarlet && !(fetched.scarlet.length === 0)) {
              const out = {
                  user_input: req.body,
                  SCARLET_output: fetched.body.scarlet,
                  msg: '',
                  ermsg: fetched.ermsg
              }
              res.json(out)
          } else {
              const out = {
                  user_input: req.body,
                  msg: '',
                  ermsg: fetched.ermsg
              }
              res.json(out)
          }
      } catch (err){
          const out = {
              user_input: req.body,
              msg: '',
              ermsg: err.message//'Error: disconnect between API and fetcher'
          }
          res.json(out)
      }
})


app.listen(3000, function () {
  console.log('SCARLET API listening on port 3000')
})


// http://<pqb20197@tehr10>:<5002>/webhooks/rest/webhook