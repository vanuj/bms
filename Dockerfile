FROM node:14-alpine

# Adding these to install yarn. This is for yarn support if needed
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
ENV LOCAL_MOCK=true
ENV BMS_GET_SEATS_URL=https://jsonplaceholder.typicode.com/posts/1
ENV NODE_ENV=development

USER node

# Creating directories
RUN mkdir -p /home/node/ms-seat
WORKDIR /home/node/ms-seat

# Copying application files
COPY --chown=node:node . .

# Installing package dependencies
RUN yarn install

EXPOSE 3000
CMD [ "yarn", "run", "start" ]
