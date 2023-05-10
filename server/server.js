// // const express = require('express')

// // const app = express();
// // // const openai = require('openai');

// // app.use(express.json());

// // // app.use((req, res, next) => {
// // //     res.setHeader('Access-Control-Allow-Origin', '*');
// // //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
// // //     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// // //     next();
// // // });
// // // openai.api_key = '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';

// // // const prompt = 'Write a formal code using GPT API';
// // // const model = 'text-davinci-002';
// // // const temperature = 0.7;
// // // const maxTokens = 100;

// // // app.post('/generate', (req, res) => {
// // //     // const { prompt, model, temperature, maxTokens } = req.body;
  
// // //     openai.Completion.create({
// // //       engine: model,
// // //       prompt: prompt,
// // //       temperature: temperature,
// // //       max_tokens: maxTokens
// // //     })
// // //     .then(response => {
// // //       const generatedText = response.choices[0].text;
// // //       console.log(generatedText);
// // //     //   res.send(generatedText);
      
// // //     })
// // //     .catch(error => {
// // //       console.error(error);
// // //     //   res.status(500).send('Error generating text');
// // //     });
// // //   });
// // // console.log(openai);

// // //   app.get('/', (req,res)=>{
// // //     console.log(openai);
// // //     const prompt = 'Write a formal code using GPT API';
// // //     const model = 'text-davinci-002';
// // //     const temperature = 0.7;
// // //     const maxTokens = 100;
// // //     // OpenAiApiFp

// // //     openai.Completion.create({
// // //         engine: model,
// // //         prompt: prompt,
// // //         temperature: temperature,
// // //         max_tokens: maxTokens
// // //       })
// // //       .then(response => {
// // //         const generatedText = response.choices[0].text;
// // //         console.log(generatedText);
// // //         // res.send(generatedText);
        
// // //       })
// // //       .catch(error => {
// // //         console.error(error);
// // //         // res.status(500).send('Error generating text');
// // //       });
// // //   })
  
// // // app.listen(5000,()=>{
// // //     console.log('server is running ');
// // // })


// // // openai.Completion.create({
// // //   engine: model,
// // //   prompt: prompt,
// // //   temperature: temperature,
// // //   max_tokens: maxTokens
// // // })
// // // .then(response => {
// // //   const generatedText = response.choices[0].text;
// // //   console.log(generatedText);
// // // })
// // // .catch(error => {
// // //   console.error(error);
// // // });
// // const {Configuration,OpenAIApi} = require('openai');
// // const configuration = new Configuration({
// //     apiKey : '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',
// // });

// // const openai = new OpenAIApi(configuration);
// // app.get('/', (req, res) => {
// //     res.send('Hello, world!');
// //   });
// // // app.get('/', async (req,res) =>{
// // //     const prompt =  'write an email for student who want leave from college for 5 days' ;
// // //     const comletion = await openai.createCompletion({
// // //         model:"text-davinci-002",
// // //         prompt: prompt,
// // //         max_tokens: 500,
// // //     });
// // //     console.log(comletion.data.choices[0].text)
// // //     res.send({data:comletion.data})
// // // })

// // app.post('/', async (req,res) =>{
// //     console.log(req.body)
// //     const prompt =  'write an email for student who want leave from college for 5 days' ;
// //     const comletion = await openai.createCompletion({
// //         model:"text-davinci-002",
// //         prompt: prompt,
// //         max_tokens: 500,
// //     });

// //     // console.log(comletion.data.choices[0].text)
// //     res.send({data:comletion.data})

// // })

// // app.listen(5000,()=>{
// //     console.log('server is running ');
// // })

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));


const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
    organization:'org-XioIeiszGfPcYhHnvqp25m8z',
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/convert', async (req, res) => {
  console.log(req.body);

  const prompt = req.body //'write an email for student who want leave from college for 5 days';
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages:[
        {role:'user', content: `${prompt.prompt}` }
      ],
    //   prompt: prompt.prompt,
    //   max_tokens: 500,
    //   temperature:0.2,
    });
    console.log(completion.data.choices[0].message.content);
    res.send({ data: completion.data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(5000, () => {
  console.log('server is running');
});

