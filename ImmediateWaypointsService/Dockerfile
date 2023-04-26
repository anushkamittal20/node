FROM node:18-alpine
WORKDIR /usr/node/immediatewaypoints
COPY ./ ./
RUN npm install
CMD ["node", "immediateWaypoints.controller.js"]
EXPOSE 3000