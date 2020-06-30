FROM node:12-alpine

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build


# Running the app
CMD [ "yarn", "start" ]
