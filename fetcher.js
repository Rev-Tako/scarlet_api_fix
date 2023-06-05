import axios from "axios";

export async function fetcher(request) {
    let rasa_format = {
        "sender": "user",  // sender ID of the user sending the message
        "message": request
    }
    try {
        const response = await axios({
            method: 'POST',
            url: "http://<pqb20197@tehr10>:<5002>/webhooks/rest/webhook",
            body: rasa_format,
        });
        return {
            statusCode:200,
            body: response.text
        }
    } catch (err) {
            console.log(err) // output to netlify function log
            return {
                statusCode: 500,
                body: '',
            }
    }
}