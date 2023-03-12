const dotenv = require('dotenv');
dotenv.config();

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNum = process.env.TWILIO_NUM;
const userNum = process.env.USER_NUM;
const client = require('twilio')(accountSid, authToken, twilioNum, userNum);


console.log('accountSid', accountSid);
console.log('authToken', authToken);

console.log('twilioNum', twilioNum);
console.log('userNum', userNum);

client.messages
  .create({
     body: 'Are you feeling stressed? Visit ZenZone!',
     from: twilioNum,
     to: userNum,
   })
  .then(message => console.log(message.sid))
  .catch(err => {
    console.log(error);
  });
