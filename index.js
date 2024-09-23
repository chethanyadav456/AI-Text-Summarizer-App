const express = require("express");
require("dotenv").config();

const app = express();

const port = 3000;

const summarizeText = require("./summarize.js");
const imageGen = require("./texttoimage.js");

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(express.static("public")); // Serve static files from the 'public' directory

// Handle POST requests to the '/summarize' endpoint
app.post("/summarize", (req, res) => {
  // get the text_to_summarize property from the request body
  const text = req.body.text_to_summarize;

  // call your summarizeText function, passing in the text from the request
  summarizeText(text)
    .then((response) => {
      res.send(response); // Send the summary text as a response
    })
    .catch((error) => {
      console.log(error.message);
    });
});

app.post("/texttoimage", (req, res) => {
  //it will get the text parameter
  const text = req.body.text_to_imagegen;

  // here we are calling the imageGen function
  imageGen(text)
  .then((response) => {
    res.send(response);
  })
  .catch((error) => {
    console.log(error);
  })
})

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
