FROM node:18-alpine
WORKDIR /usr/node/dynamicradiusgeneration
COPY ./ ./
RUN npm install
CMD ["node", "dynamic_radius_generation.controller.js"]
EXPOSE 3000


# todo