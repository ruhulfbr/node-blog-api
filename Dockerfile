# Use the official Node.js 20.16 image as the base image
FROM node:20.16

# Update the package list to ensure you have the latest information about available packages
RUN apt update

# Install lsof, a utility to list open files, useful for debugging and monitoring within the container
RUN apt install lsof

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json (if present) to the working directory
COPY package*.json ./

# Install the Node.js dependencies specified in package.json
RUN npm install

# Copy the src directory from the host machine to the container
COPY src src

# Copy the .eslintignore file to the working directory (used for configuring files that ESLint should ignore)
COPY .eslintignore .

# Copy the ESLint configuration file to the working directory (used to define the rules for linting)
COPY .eslintrc.json .

# Copy the Sequelize configuration file to the working directory (used for configuring Sequelize, an ORM)
COPY .sequelizerc .

# Copy the Jest configuration file to the working directory (used for setting up Jest, a testing framework)
COPY jest.config.js .
