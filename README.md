<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. clonar el repositorio
2. ejecutar

```
npm install
```

3. Tener el Nest CLI instalado

```
npm i -g @nestjs/cli
```

4. Levantar la base de datos

```
docker-compose up -d
```

5. clonar el archivo .env.example renombrar la copia a .env

6. Llenar las variables de entorno definidias en el .env

7. Ejecutar la app

```
npm run start:dev
```

8. Reconstruir la base de datos con Seed

```
localhost:3000/api/v3/seed
```

## Stack Usado

- MongoDB
- NestJs

# Production build

1. Crear archivo `env.prod`
2. llenar variables de entorno de produccion
3. Crear la nueva imagen

```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```


4. Otros comandos de docker que puedes usar

```
 docker-compose -f docker-compose.prod.yaml --env-file .env.prod up -d 
```