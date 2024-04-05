// vercel.js
const functions = require("@google-cloud/functions-framework");
// Importing fetch from node-fetch (make sure to install it using npm or yarn)
const fetch = require('node-fetch');

/**
 * Responds to an HTTP request using data from the request body parsed according
 * to the "content-type" header.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
functions.http("chatGemini", async (req, res) => {
  // Check if the request method is POST
  if (req.method !== "POST") {
    return res.status(405).send({ error: "Only POST requests are allowed" });
  }

  const { prompt, model } = req.body;

  // Retrieve the API key from the Vercel environment variables.
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta2/models/${model}:generateText?key=${apiKey}`;
  const body = {
    prompt: {
      text: prompt,
    },
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      // If the API response is not ok, throw an error
      throw new Error(`API responded with status code ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    // Sending back a more generic error message to the client
    res.status(500).send({ error: "An error occurred while processing your request." });
  }
});
