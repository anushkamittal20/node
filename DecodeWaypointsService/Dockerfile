FROM node:18-alpine
WORKDIR /usr/node/decodewaypoints
COPY ./ ./
RUN npm install
CMD ["node", "decode_waypoints.controller.js"]
EXPOSE 3000