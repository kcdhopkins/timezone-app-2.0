FROM node:14.16.0-alpine3.13
WORKDIR /app
COPY package*.json .
#RUN npm ci --only=production
RUN npm install
COPY . .
# ENV API_URL=http://api.myapp.com/
# RUN chmod +x server.tsx
EXPOSE 8080
CMD ["node", "server.tsx"]
