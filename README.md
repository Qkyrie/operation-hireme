Project Hiremeplz
===

## Building the application

This application is built using npm. The build the application, run the following command:

    npm install

This will install all the dependencies and build the application.

## Running the application

First, create a .env file following the layout form the .env.example file. Then, run the following command:
To run the application, run the following command:

    npm run init-db
    npm start

This will start the application on port 3000.

## Running the tests

This is a POC application, so there are no tests.

## Creating a docker image

To create a docker image, run the following command:

    docker build -t hiremeplz .