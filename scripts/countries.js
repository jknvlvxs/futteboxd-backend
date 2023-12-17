const fs = require("node:fs");
// Replace 'your-api-endpoint' with the actual endpoint where you want to store the data
const apiEndpoint = "http://localhost:3000/countries";

// Function to send a POST request for a league
const postCountriesData = async (country) => {
  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(country),
    });

    if (response.status !== 201) console.log(response.status, country.name);
  } catch (error) {
    console.error(
      `Error storing data for league ${country.name}:`,
      error.message
    );
  }
};

try {
  // Read data from the JSON file
  const filePath =
    "/home/julio/Área de Trabalho/Development/futteboxd/backend/data/leagues.json"; // Replace with the actual path to your JSON file
  const leaguesData = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // Iterate over the leagues and send POST requests
  const leagues = leaguesData.api.leagues;

  const countries = new Map();

  for (const leagueId in leagues) {
    if (leagues.hasOwnProperty(leagueId)) {
      const leagueData = leagues[leagueId];
      countries.set(leagueData.country, {
        name: leagueData.country,
        code: leagueData.country_code,
        flag: leagueData.flag,
      });
    }
  }

  countries.forEach((country) => postCountriesData(country));
} catch (err) {
  console.log(err);
}
