
FROM node:12.18.3-alpine
WORKDIR /backend
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
RUN npm install nodemon -g && npm install --only=dev
CMD PORT=5000 nodemon -L