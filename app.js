const express = require('express')
const app = express()
const fetcher = require('./fetcher')
app.get(
    '/',
    function (req, res) {

        try {
            const fetched = fetcher.get()
            res.json({
                API: 'ONLINE',
                SCARLET: fetched.scarlet,
                USER: 'This domain only accepts posts form netlify front end'
            })
        } catch (err){
        res.json({
            API: 'ONLINE',
            SCARLET: 'CHECK FAILED',
            ERROR: err.message,
            USER: 'This domain only accepts posts form netlify front end'
        })
        }
})

app.post(
    '/',
    function (req,res){
      try {
          const fetched = fetcher.get(req.body)
          if (fetched.scarlet && !(fetched.scarlet.length === 0)) {
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
          console.log(err.message)
          res.json(out)
      }
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000')
})


// http://<pqb20197@tehr10>:<5002>/webhooks/rest/webhook