# Étape 1 : build l'app avec Node.js
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./
RUN npm install

# Copier le reste du code
COPY . .

# Compiler TypeScript (si nécessaire)
RUN npm run build

# Exposer le port (par défaut : 3333)
EXPOSE 3333

# Démarrer le serveur HTTP
CMD ["node", "build/server.js"]
