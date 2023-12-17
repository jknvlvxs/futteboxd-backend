const fs = require("node:fs");
const readline = require("readline");
// Replace 'your-api-endpoint' with the actual endpoint where you want to store the data
const apiEndpoint = "http://localhost:3000/fixtures";

// Function to send a POST request for a league
const postFixtureData = async (fixture) => {
  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fixture),
    });
    if (response.status !== 201)
      console.log(response.status, fixture.fixture_id);
  } catch (error) {
    console.error(
      `Error storing data for fixture ${fixture.fixture_id}:`,
      error.message
    );
  }
};

try {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("fixture file: ", (userInput) => {
    // Read data from the JSON file
    const filePath = `/home/julio/Área de Trabalho/Development/futteboxd/backend/data/fixtures${userInput}.json`; // Replace with the actual path to your JSON file
    const fixturesData = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Iterate over the leagues and send POST requests
    const fixtures = fixturesData.api.fixtures;

    for (const fixtureId in fixtures) {
      if (fixtures.hasOwnProperty(fixtureId)) {
        const fixtureData = fixtures[fixtureId];
        // Call the function to send a POST request for each league
        postFixtureData(fixtureData);
      }
    }

    console.log(`You entered: ${userInput}`);
    rl.close();
  });
} catch (err) {
  console.log("Não foi possível ler o arquivo: ", err);
}
