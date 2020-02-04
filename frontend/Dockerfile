FROM node:latest

COPY . /app

WORKDIR /app
RUN npm install

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:3000/health || exit 1 
ENTRYPOINT ["node"]
CMD ["index.js"]
