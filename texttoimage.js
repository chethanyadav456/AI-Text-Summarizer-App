const axios = require("axios");

// make a function requesting the data from the hugging face interface api

async function imageGen(text) {
    let data = JSON.stringify({
        inputs: text,
        parameters: {
          max_length: 100,
          min_length: 10,
        },
      });
    
      // A config object that will contain the instructions for the API call
    
      let config = {
        method: "post",
        url: "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.ACCESS_TOKEN,
        },
        data: data,
      };
      // Capture the request in a try/catch to check for any errors that may occur
    
      try {
        const response = await axios.request(config);
        // Return the summary text from the response
        const result = await response.blob();
        console.log(result);
	    return result;
      } catch (err) {
        console.log(err);
      }
}

module.exports = imageGen;