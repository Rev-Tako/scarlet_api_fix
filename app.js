const express = require('express')
const app = express()
import axios from "axios"

app.get(
    '/',
    function (req, res) {
  const outof = {msg: 'get requests to this page do nothing, use post from an api' }
  res.json(outof)
})

app.post(
    '/',
    function (req,res){
      const send_to_scarlet = async function (request) {
          let rasa_format = {
              "sender": "user",  // sender ID of the user sending the message
              "message": request
          }
          const response = await axios({
              method: 'POST',
              url: "http://<pqb20197@tehr10>:<5002>/webhooks/rest/webhook",
              body: rasa_format,
          });
        return(response)
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


// http://<pqb20197@tehr10>:<5002>/webhooks/rest/webhook