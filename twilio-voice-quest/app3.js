// Moderated Conference Phone call
// 'These aren't the droids you're looking for: Twilio Quest
const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const urlencoded = require('body-parser').urlencoded;

// Update with your own phone number in E.164 format
const MODERATOR = '+1xxxxxxxxxx';
const OTHER = '+1xxxxxxxxxx';
const app = express();

// Parse incoming POST params with Express middleware
app.use(urlencoded({ extended: false }));

app.get('/', (req, res) => {
 res.send('Hi!');
})
// Create a route that will handle Twilio webhook requests, sent as an
// HTTP POST to /voice in our application
app.post('/voice', (req, res) => {
 // Use the Twilio Node.js SDK to build an XML response
 const twiml = new VoiceResponse();
 const MODERATOR = '+1xxxxxxxxx';
 // Start with a <Dial> verb
  const dial = twiml.dial();
  if (req.body.From == MODERATOR) {
    twiml.play('https://www.twilio.com/quest/MS1O2SXK6NISPKY.mp3');

    dial.conference('My conference', {
      startConferenceOnEnter: true,
      endConferenceOnExit: true,
    });

  }
  else {
    dial.conference('My conference', {
      startConferenceOnEnter: false,
    });
  }

 // Render the response as XML in reply to the webhook request
 res.type('text/xml');
 res.send(twiml.toString());
});

// Create an HTTP server and listen for requests on port 3000
console.log('Twilio Client app HTTP server running at http://127.0.0.1:3000');
app.listen(3000);
