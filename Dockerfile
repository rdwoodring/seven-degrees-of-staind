FROM node:12.10.0-alpine

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./
COPY ["package.json", "yarn.lock", "./"]

RUN mkdir server && mkdir client

COPY server/package.json ./server
COPY client/package.json ./client
RUN yarn install

COPY . .

# RUN ls
# RUN yarn global add pm2

RUN yarn build && rm client server/src -rvf

# If you are building your code for production
# RUN npm ci --only=production

ENV PORT 3000

CMD ["yarn", "start"]