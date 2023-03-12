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

async function getThemes(belief) {
  const config = {
    model: "xlarge",
    prompt: `These are some worries from a therapy client, followed by the main themes expressed by each worry.
Worry: i don't know what i'm doing with my life
Themes: Self-Doubt, Future
Worry: none of my friends like me
Themes: Friends, Self-Doubt, Relationships
Worry: all my friends are doing better than me at this age
Themes: Friends, Comparison, Success
Worry: i'm scared i'm going to be a failure
Themes: Future, Failure
Worry: if i don't get married before I'm 30, i'll probably be alone forever
Themes: Loneliness, Marriage, Relationships, Future
Worry: i think my boss hates me and i don't know what to do about it
Themes: Work, Relationships, Helplessness
Worry: i'm not smart enough for the job i'm doing and i'm never going to make it
Themes: Intelligence, Work, Future
Worry: ${belief}
Themes:`,
    max_tokens: 16,
    temperature: 0.9,
    stop_sequences: ["\n"],
  };

  try {
    const response = await cohere.generate(config);
    if (response.statusCode === 200) {
      const themes = response.body.generations[0].text.trim();
      return themes.split(",").map((str) => str.trim());
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}

async function getAllThemes(beliefs) {
  try {
    const input = beliefs.map((belief) => getThemes(belief));
    const result = await Promise.all(input);
    const themes = {};

    for (let beliefThemes of result) {
      for (let theme of beliefThemes) {
        if (!(theme in themes)) {
          themes[theme] = 1;
        } else {
          themes[theme] += 1;
        }
      }
    }

    return themes;
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

app.post("/themes", async (req, res) => {
  console.log(req.body.data);
  const result = await getAllThemes(req.body.data);
  res.send({ result });
})

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
