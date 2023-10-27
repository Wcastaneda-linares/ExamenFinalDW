# Elegir una imagen base
FROM node:18-alpine3.17

# Instalar dependencias
RUN mkdir -p /home/app

# Copiar el resto del código fuente del frontend
COPY . /home/app

WORKDIR /home/app

COPY package*.json /home/app/


RUN npm cache clean --force

RUN npm install vite --save-dev


# Exponer el puerto que utiliza Vite (cámbialo si no es 3000)
EXPOSE 5173

# Comando para ejecutar el frontend
CMD ["npm", "run", "dev"]
