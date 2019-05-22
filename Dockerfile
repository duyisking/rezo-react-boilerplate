FROM node:10

# Set the working directory
WORKDIR /app

# Copy the directory contents into the container at /app
COPY ./dist /app
COPY ./package.json /app

# Define environment variable
ENV NODE_ENV production

# Install any needed packages specified in package.json
# It shouldn't install any devDependencies
RUN npm install

# Run app.py when the container launches
CMD ["node", "run.js"]