#Comment

FROM node

RUN npm install

CMD ["babel-node", "./src/server"]

CMD ["npm", "start"]