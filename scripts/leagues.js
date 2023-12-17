const fs = require("node:fs");
// Replace 'your-api-endpoint' with the actual endpoint where you want to store the data
const apiEndpoint = "http://localhost:3000/leagues";

// Function to send a POST request for a league
const postLeagueData = async (leagueData) => {
  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leagueData),
    });

    console.log(response.status, leagueData.league_id);
  } catch (error) {
    console.error(
      `Error storing data for league ${leagueData.league_id}:`,
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

  for (const leagueId in leagues) {
    if (leagues.hasOwnProperty(leagueId)) {
      const leagueData = leagues[leagueId];
      // Call the function to send a POST request for each league
      postLeagueData(leagueData);
    }
  }
} catch (err) {
  console.log("Não foi possível ler o arquivo: ", err);
}
