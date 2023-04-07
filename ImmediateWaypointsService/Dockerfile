FROM node:18-alpine
WORKDIR /usr/node/immediatewaypoints
COPY ./ ./
RUN npm install
CMD ["node", "immediatewaypoints.controller.js"]
EXPOSE 3000