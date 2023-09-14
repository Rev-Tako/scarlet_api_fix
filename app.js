const express = require('express')
const app = express()
const fetcher = require('./fetcher')
const React = require('react')
const axios = require("axios")
const cors = require('cors')
const fs = require('fs');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

app.use(express.json())

app.use(cors({
    origin: 'https://scarletwebdevtest.netlify.app',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204,
    'access-control-allow-credentials': true,
    'access-control-allow-methods': 'GET, POST',
    'access-control-allow-origin': '*',
}))

app.get(
    '/',
    cors(),
    async function (req, res) {
        var loop = true
        while (loop) {
        try {
            const fetched = fetcher.Doget()
            let returned = await fetched;
            loop = true
            res.json({
                updated: 14092023_1406,
                API: 'ONLINE',
                SCARLET: returned.body.scarlet,
                USER: 'This domain only accepts posts from netlify front end',
                ERRORS: returned.body.ermsg,
            })
        } catch (err){
            loop = false
            res.json({
                updated: 14092023_1406,
                API: 'ONLINE',
                SCARLET: 'CHECK FAILED',
                USER: 'This domain only accepts posts from netlify front end',
                ERRORS: err.message,
            })
        }
        try {
            await sendPing()
        }
        catch(e){
            console.log(e.message)
            loop = false
        }
    }
    }
    )

app.post(
    '/',
    cors(),
    async function (req,res){
        localStorage.setItem('user_id_current', req.body.user_id + ' and ' + req.body.reinit)
        if (req.body.body.toLowerCase() === 'tp' || req.body.body === 'fp' || req.body.body === 'fn') {
            addFeedback(req.body, req.body.user_id)
            res.json({
                headers: {
                    'Access-Control-Allow-Origin': 'https://scarletwebdevtest.netlify.app',
                },
                body: {
                    user_input: req.body,
                    SCARLET_output: [{recipient_id: req.user_id, text: 'Feedback saved'}],//returned.body.scarlet,//returned.body.scarlet,
                    msg: '',
                    ermsg: ''
                }
            })
        } else if (req.body.body.toLowerCase().includes('rating:')) {
            addFeedback(req.body, req.body.user_id)
            res.json({
                headers: {
                    'Access-Control-Allow-Origin': 'https://scarletwebdevtest.netlify.app',
                },
                body: {
                    user_input: req.body,
                    SCARLET_output: [{recipient_id: req.user_id, text: 'Rating saved'}],//returned.body.scarlet,//returned.body.scarlet,
                    msg: '',
                    ermsg: ''
                }
            })
        } else {
        try {
            if (req.body.body.toLowerCase().includes('/restart') || req.body.body.toLowerCase().includes('/retasrt') || req.body.body.toLowerCase().includes('/retsart') || req.body.body.toLowerCase().includes('/retart') || req.body.body.toLowerCase().includes('restart'))
                {req.body.body = '/restart'} // talk about a patch, this feels hacky
          const fetched = fetcher.Handler(req.body, req.body.user_id);
          let returned = await fetched;
          processForSaving(req.body, returned.body.scarlet, req.body.user_id, req.body.reinit)
          res.json({
                headers: {
                    'Access-Control-Allow-Origin': 'https://scarletwebdevtest.netlify.app',
                },
                body: {
                    user_input: req.body,
                    SCARLET_output: returned.body.scarlet,
                    msg: '',
                    ermsg: returned.ermsg
                }
            })
      } catch (err){
          res.json({
              headers: {
                  'Access-Control-Allow-Origin': 'https://scarletwebdevtest.netlify.app',
              },
              body: {
                  user_input: req.body,
                  SCARLET_output: [{recipient_id: req.user_id, text: 'An error occurred accessing SCARLET, this normally means the server has crashed. Please refer to the following error message and contact Graye or Dimitar: ' + err.message}],
                  msg: '',
                  ermsg: err.message//'Error: disconnect between API and fetcher'
              },
          })
      }
        }
})
// app.get(
//     '/save',
//     cors(),
//     function (req, res) {
//         const content = localStorage.getItem('Conversation')
//         const fileDate = Date.now()
//     try {
//         var writeStream = fs.createWriteStream('outputs/conversation' + fileDate + '.txt');
//         writeStream.write(content)
//         writeStream.end();
//         localStorage.clear()
//         res.json({
//             headers: {
//                 'Access-Control-Allow-Origin': 'https://scarletwebdevtest.netlify.app',
//             },
//             body: {
//                 SCARLET_output: [{recipient_id: "user", text: 'Conversation saved'}],
//             }
//         });
//     } catch (err) {
//         res.json({
//             headers: {
//                 'Access-Control-Allow-Origin': 'https://scarletwebdevtest.netlify.app',
//             },
//             body: {
//                 SCARLET_output: [{recipient_id: "user", text: err.message,}]
//             }
//         });
//         }
//     }
// )
// app.post(
//     '/rating',
//     cors(),
//     function (req, res) {
//
//     }
// )

// app.get(
//     '/uplink',
//     cors(),
//     function (req, res) {
//          = Date.now()
//     }
// )


app.listen(3000, function () {
  console.log('SCARLET API listening on port 3000')
})

function appendToStorage(name, data){
    var old = localStorage.getItem(name);
    if(old === null) old = "";
    localStorage.setItem(name, old + data);
}

function checkIterant(user_id, reinit){
    var iterant = 0
    var checkIterant = localStorage.getItem(user_id+'_iterant')
    if(checkIterant === null) {
        localStorage.setItem(user_id+'_iterant', iterant)
    } else {
        iterant = parseInt(checkIterant);
    }
    if (reinit === true) {
        iterant = iterant + 1
        localStorage.setItem(user_id+'_iterant', iterant)
    }
    return iterant
}


function processForSaving(user_input, scarlet_outputs, user_id, reinit) {
    let scarlet_array = []
    let user_utterance = user_input.body
    for (const inner of scarlet_outputs)
    {
        scarlet_array.push(inner.text);
    }
    var iterant = checkIterant(user_id, reinit)

    appendToStorage(user_id + '_' + 'Conversation_' + iterant, '$' + user_utterance + ': ' + scarlet_array + '$')
}

function addFeedback(user_input, user_id) {
    let user_utterance = user_input.body
    var iterant = checkIterant(user_id, false)

    appendToStorage(user_id + '_' + 'Conversation_' + iterant, '$ FEEDBACK: ' + user_utterance + ' $')
}

async function sendPing() {
    setTimeout(subHandle, 86400000)
}
async function subHandle() {
    const message = {body: 'ping',
                                                user_id: 101}
    const fetched = await fetcher.Handler(message.body, message.user_id)
}
/*




fetch("http://tehr10.cis.strath.ac.uk:5055/")
            .then(function(response){
                console.log(response.status);
                if (!response.ok) {
                    throw new Error("HTTP status " + response.status);
                }
                return response.json();
            })
            .then((response) => {
                return {
                    statusCode: response.status,
                    body: {
                        scarlet: 'OFFLINE',
                        ermsg: 'http request failed'
                    }
                }
                //setOutput(response);
            })
            .catch(err => {
                console.log(err.message)
                return {
                    statusCode: 200,
                    body: {
                        scarlet: 'OFFLINE',
                        ermsg: 'http request failed'
                    }
                }
            });


*/


// http://<pqb20197@tehr10>:<5002>/webhooks/rest/webhook       const [output, setOutput] = React.useState({})     React.useEffect(() => {  }, []);