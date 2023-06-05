const express = require('express')
const app = express()

app.get(
    '/',
    function (req, res) {

        try {
            fetch('/fetcher.js', {
                method: 'GET',
            })
                .then(response => response.json())
                .then(json =>
                    res.json({API: 'ONLINE', SCARLET: 'OFFLINE'}))
        } catch {
        res.json({API: 'ONLINE', SCARLET: 'OFFLINE'})
        }
})

app.post(
    '/',
    function (req,res){
      try {
          fetch('/fetcher.js', {
              method: 'POST',
              body: JSON.stringify(req.body)
          })
              .then(response => response.json())
              .then(json => {
                  if (json.body.scarlet && !(json.body.scarlet.length === 0)) {
                      const out = {
                          user_input: req.body,
                          SCARLET_output: json.body.scarlet,
                          msg: ''
                      }
                      res.json(out)
                  } else {
                      const out = {
                          user_input: req.body,
                          msg: '',
                          ermsg: json.body.ermsg
                      }
                      res.json(out)
                  }
              })
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