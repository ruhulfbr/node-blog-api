# Use an official Node.js runtime as a parent image
FROM node:20.16

# Update the package list to ensure you have the latest information about available packages
RUN apt-get update

# Set the working directory inside the container to /app
WORKDIR /app

# Change ownership of the working directory
RUN chown -R node:node /app

# Switch to the node user
USER node

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .