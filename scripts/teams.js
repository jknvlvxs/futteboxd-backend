const fs = require('node:fs');
const path = require('node:path');
// Replace 'your-api-endpoint' with the actual endpoint where you want to store the data
const apiEndpoint = 'http://localhost:3000/teams';

// Function to send a POST request for a league
const postTeamsData = async (team) => {
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(team),
    });
  } catch (error) {
    console.error(
      `Error storing data for team ${team.team_id}:`,
      error.message,
    );
  }
};

try {
  const folderPath = '../data/team/';

  // Read the contents of the folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      return;
    }

    // Iterate over the files
    files.forEach((file) => {
      const filePath = path.join(__dirname, folderPath, file);

      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }

        const teams = JSON.parse(data).api.teams;
        teams.forEach((team) => postTeamsData(team, file));
      });
    });
  });
} catch (err) {
  console.log('Não foi possível ler o arquivo: ', err);
}
