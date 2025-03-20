FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 5173

CMD ["sh", "-c", "trap 'exit 0' SIGTERM; npm run dev"]
