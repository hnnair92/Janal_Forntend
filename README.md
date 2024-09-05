# Janal E-Commerce Platform Frontend

Janal e-commerce solution designed for selling custom blinds and shades. This platform allows users to browse, customize, and purchase a wide range of window treatments, with features including product filtering, custom measurements, and an integrated checkout process.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Installation](#installation)
4. [Development](#development)
5. [Build and Deployment](#build-and-deployment)
6. [Environment Variables](#environment-variables)
7. [Features](#features)

## Getting Started

These instructions will help you set up and run the Blinds & Shades e-commerce platform locally for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v20 or later)
- [Yarn](https://yarnpkg.com/) (recommended) or [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/<project-repo>
    ```

2. Navigate to the project directory:

    ```bash
    cd blinds-app
    ```

3. Install dependencies:

    ```bash
    yarn install
    ```

    or if you prefer npm:

    ```bash
    npm install
    ```

## Project Structure

An overview of the most important directories and files in the project.


## Development

To run the project locally:

```bash
yarn dev

#If you prefer NPM
npm run dev
```

## Environment Variables
The following environment variables needs to be set to run the project.
```env
#For local dev set up only
API_BASE_URL=http://localhost:8000/blinds/api/v1
PRODUCTION=false
NUXT_TURNSTILE_SECRET_KEY=
NUXT_TURNSTILE_SITE_KEY=
```
## Build and Deployment
You can check the application build by running:
```bash
yarn build
```
if the above command completes without any error, it will create an optimized production build in the ".output" directory.

The application is set to deploy in a dokku environment.
### Dokku
Dokku is a platform-as-a-service (PaaS) that allows you to deploy applications to your own server. Below are the steps to deploy this Nuxt 3 project to a Dokku-managed server.

#### Prerequisites
Ensure that you have:

- A Dokku server set up and running.
- The Dokku client installed on your local machine.
- A Git repository for your project.

#### Step 1: Create a Dokku App
On your Dokku server, create a new app:
```bash
dokku apps:create blinds-app
```
#### Step 2: Set Up Environment Variables
You need to set up the required environment variables on the Dokku server. You can do this with the following command:
```bash
dokku config:set blinds-app NUXT_TURNSTILE_SECRET_KEY=<KEY> NUXT_TURNSTILE_SITE_KEY=<KEY> API_BASE_URL=https://janal.ca/blinds/api/v1 NITRO_PRESET=heroku YARN2_SKIP_PRUNING=true PRODUCTION=true NPM_CONFIG_PRODUCTION=true
```

#### Step 3: Add Dokku as a Remote Repository
On your local machine, add your Dokku server as a remote Git repository:
```bash
git remote add dokku dokku@your-server-ip:blinds-app
```

In the above command "dokku@" is important because the user on the remote server is dokku.

#### Step 4: Deploy the Application
Push the code to your Dokku server to deploy the application:
```bash
git push dokku main
```
Dokku will automatically detect that this is a Node.js application, install dependencies, and run the build process. After deployment, your app will be accessible at http://your-server-ip or a configured domain.

### Post-Deployment
After deployment, you can manage your Dokku app using various commands, such as:

- Restarting the app: dokku ps:restart blinds-app
- Rebuilding the app: dokku ps:rebuild blinds-app
- Viewing logs: dokku logs blinds-app
- Scaling the app: dokku ps:scale blinds-app web=2


For further dokku configuration, please visit official dokku website [Dokku Documentation](https://dokku.com/docs/getting-started/installation/)

## Features

This e-commerce platform includes the following key features:

- Product Catalog: Browse a wide selection of blinds and shades with detailed product descriptions and images.
- Product Customization: Customize products by selecting size, color, material, and other attributes.
- Dynamic Pricing: Pricing updates based on selected customizations.
- Shopping Cart: Add products to the cart, update quantities, and proceed to checkout.
- Secure Checkout: Integrated with a payment gateway for secure transactions.
- Order Management: Track orders and manage customer information.
- User Management: Track users and manage user profiles.
- Authentication: Registration, Login, Forgot password flows.
- Responsive Design: Fully responsive, ensuring a seamless experience on all devices.






