const express = require('express');
const cohere = require('cohere-ai');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3001;

dotenv.config();
cohere.init(process.env.API_KEY);

// Adds a period to a user-inputted sentence if it doesn't already end in one
function makeSentence(str) {
  if (str.endsWith(".")) {
    return str;
  } else {
    return `${str}.`;
  }
}

// Returns a string reframing the input belief.
// Returns null if something went wrong.
async function reframe(belief) {
  const config = {
    model: "xlarge",
    prompt: `This is a negative belief followed by a reframing into a more realistic and positive perspective.
Original thought: I'm sad that I don't have many friends. People must not like me.
Replacement thought: I have some friends, so I know I can make more. It might just take some time.
Original thought: I should get married before I'm 30. If I don't, I'll probably end up alone.
Replacement thought: There's no guarantee that I'll meet the right person by the time I'm 30. If I don't get married by then, I still have time to find a good relationship.
Original thought: ${makeSentence(belief)}
Replacement thought:`,
    max_tokens: 100,
    temperature: 0.9,
    stop_sequences: ["\n"],
  };

  try {
    const response = await cohere.generate(config);
    if (response.statusCode === 200) {
      return response.body.generations[0].text.trim();
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.post("/reframe", async (req, res) => {
  const result = await reframe(req.body.data);
  res.send({ result });
});

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNum = process.env.TWILIO_NUM;
const client = require('twilio')(accountSid, authToken, twilioNum);


// console.log('accountSid', accountSid);
// console.log('authToken', authToken);
// console.log('twilioNum', twilioNum);

app.post('/', function (req, res) {

  // console.log('req', req)

  client.messages
  .create({
     body: 'Are you feeling stressed? Visit ZenZone!',
     from: twilioNum,
     to: req.body.phone,
   })
  .then(message => {
    // console.log(message.sid)
    res.send('POST request successful')
  })
  .catch(err => {
    console.log(err);
  });


})
