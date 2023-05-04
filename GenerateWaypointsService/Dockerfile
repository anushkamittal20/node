FROM node:18-alpine
WORKDIR /usr/node/generatewaypoints
COPY ./ ./
RUN npm install
CMD ["node", "generate_waypoints.controller.js"]
EXPOSE 3000