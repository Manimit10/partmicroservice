FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma/

COPY . .

RUN npx prisma generate

# EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]

# CMD ["npm", "run", "dev"]
