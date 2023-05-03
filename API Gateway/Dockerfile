FROM node:18-alpine
WORKDIR /usr/node/main
COPY ./ ./
RUN npm install
CMD ["node", "app.js"]
EXPOSE 3000