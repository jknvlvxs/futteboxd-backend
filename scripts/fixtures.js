const fs = require('node:fs');
const path = require('node:path');
// Replace 'your-api-endpoint' with the actual endpoint where you want to store the data
const apiEndpoint = 'http://localhost:3000/fixtures';

// Function to send a POST request for a league
const postFixtureData = async (fixture) => {
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fixture),
    });
  } catch (error) {
    console.error(
      `Error storing data for fixture ${fixture.fixture_id}:`,
      error.message,
    );
  }
};

try {
  const folderPath = '../data/fixtures/';

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

        const fixtures = JSON.parse(data).api.fixtures;
        for (const fixtureId in fixtures) {
          if (fixtures.hasOwnProperty(fixtureId)) {
            const fixtureData = fixtures[fixtureId];
            // Call the function to send a POST request for each league
            postFixtureData(fixtureData);
          }
        }
      });
    });
  });
} catch (err) {
  console.log('Não foi possível ler o arquivo: ', err);
}
