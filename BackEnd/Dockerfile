FROM node:18

# Install build tools for native dependencies
RUN apt-get update && apt-get install -y \
    sqlite3 \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

ENV APP_PROFILE=docker
ENV DATABASE_URL=/app/data/database.sqlite

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci && \
    npm rebuild better-sqlite3 --build-from-source

COPY . .

RUN mkdir -p /app/data

RUN chmod -R 777 /app/data

RUN npm run build

EXPOSE 3000

CMD ["npm", "run","start:docker"]