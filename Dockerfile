# Utilise une image officielle Node.js comme base
FROM node:20

# Crée et définit le répertoire de travail dans le container
WORKDIR /usr/src/app

# Copie package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste du code de l'application
COPY index.js ./  
COPY src ./src  
COPY public ./public

# Expose le port sur lequel l'application écoute
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
