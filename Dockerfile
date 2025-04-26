# Usa uma imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Expõe a porta 3000
EXPOSE 3000

# Comando para rodar o servidor
CMD ["node", "server.js"]
