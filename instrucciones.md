# Puesta en producción

1. Chequear que la versión de producción de la cual se hará deploy es el último commit de la **rama master** del repositorio.

2. En el archivo *constants/config.js* asegurarse de que **ENVIRONMENT = 'prod'**.

3. Asegurarse que en el archivo *constants/collectionNames.js* están las colecciones de firestore correctas.

4. Correr el comando `npm run build` para crear la versión de producción del proyecto.

5. Correr el comando `firebase deploy` para subir a Firebase Hosting.

6. Listo!