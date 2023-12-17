const fs = require('node:fs');
const path = require('node:path');

// Replace 'your-api-endpoint' with the actual endpoint where you want to store the data
const apiEndpoint = 'http://localhost:3000/countries';

// Function to send a POST request for a league
const postCountriesData = async (country) => {
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(country),
    });
  } catch (error) {
    console.error(
      `Error storing data for league ${country.name}:`,
      error.message,
    );
  }
};

try {
  // Read data from the JSON file
  const filePath = path.join(__dirname, '../data/leagues/leagues.json');

  // Read the contents of the file
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    // // Iterate over the leagues and send POST requests
    const leagues = JSON.parse(data).api.leagues;

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
  });
} catch (err) {
  console.log(err);
}
