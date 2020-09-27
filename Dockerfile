FROM node:12.10.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY . .

# RUN ls
RUN yarn install
# RUN yarn global add pm2

RUN yarn build

RUN rm client server/src -rvf

# RUN yarn global add pm2
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source

ENV PORT 3000

EXPOSE 80
# CMD [ "pm2-runtime", "bin/www" ]
# CMD ["node", "bin/www"]
CMD ["yarn", "start"]