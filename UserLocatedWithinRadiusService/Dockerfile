# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /usr/node/userlocatedwithinradius
COPY ./ ./
RUN npm install
CMD ["node", "user_located_within_radius.controller.js"]
EXPOSE 3000