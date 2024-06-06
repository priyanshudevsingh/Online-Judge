FROM node:20-alpine
WORKDIR /app/server
COPY package*.json ./
RUN apk update && apk add --no-cache gcc g++ python3 python3-dev openjdk11
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "index.js"]
