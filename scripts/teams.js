const fs = require("node:fs");
const readline = require("readline");
// Replace 'your-api-endpoint' with the actual endpoint where you want to store the data
const apiEndpoint = "http://localhost:3000/teams";

// Function to send a POST request for a league
const postTeamsData = async (team) => {
  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(team),
    });

    if (response.status !== 201) console.log(response.status, team.team_id);
  } catch (error) {
    console.error(
      `Error storing data for team ${team.team_id}:`,
      error.message
    );
  }
};

try {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("League id: ", (userInput) => {
    // Read data from the JSON file
    const filePath = `/home/julio/Área de Trabalho/Development/futteboxd/backend/data/teamByLeagueId${userInput}.json`; // Replace with the actual path to your JSON file
    const teamsData = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Iterate over the leagues and send POST requests
    const teams = teamsData.api.teams;

    teams.forEach((team) => postTeamsData(team));
    console.log(`You entered: ${userInput}`);
    rl.close();
  });
} catch (err) {
  console.log("Não foi possível ler o arquivo: ", err);
}
