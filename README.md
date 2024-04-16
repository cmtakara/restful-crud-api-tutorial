# restful-crud-api-tutorial
This application was made following the tutorial below:\
[Build Restful CRUD API with Node.js, Express and MongoDB in 45 minutes for Beginners from Scratch](https://www.youtube.com/watch?v=9OfL9H6AmhQ)

There are differences from what was covered in class.

1. The use of a hardcoded port number, rather than a PORT const in .env [^1]
2. The use of connection string in the server, rather than in .env [^1]
3. Nesting the app.listen in the mongoose connection callback, rather than having it sequentially after.
4. not using /api/ routes. [^2]
5. using Insomnia rather than Postman

[^1]: I have updated my own code to use the .env, so that my connection string is not pushed to github.
[^2]: I have updated my own routes to use /api when I want to interact with my database.  This means that the responses are json objects, rather than a user view.
