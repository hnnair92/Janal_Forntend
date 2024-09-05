const axios = require('axios');
const { execSync } = require('child_process');

async function generateOpenAPI() {
  try {
    // Fetch OpenAPI JSON from Django REST Swagger endpoint
    const { data: openAPIJSON } = await axios.get('http://127.0.0.1:8000/swagger.json');

    // Generate the client code using OpenAPI Generator from the fetched JSON
    execSync('npx openapi-generator generate -g typescript-axios -i - -o ./openapi/generated', {
      input: JSON.stringify(openAPIJSON),
      stdio: 'inherit',
    });
  } catch (error) {
    console.error('Error generating OpenAPI client:', error);
  }
}

generateOpenAPI();
