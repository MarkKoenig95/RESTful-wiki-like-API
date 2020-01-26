# RESTful-wiki-like-API

1. Clone or download the repository

2. In the project directory run `npm install`

3. Run `node server.js` in the terminal

4. Using software such as Postman make GET, POST, PUT, PATCH, and DELETE requests to the appropriate API endpoints

# API Endpoints

 ## /articles
 **GET**: Get all articles that have been published to the database
 <br>
 **POST**: Post one new article to the database
 - Use the fields "title" and "content" in the body of the request
 <br>
 **DELETE**: Delete all articles in the database
 
 ## /articles/{Article Title}
 **GET**: Get the article from the database matching the Article Title parameter
 <br>
 **PUT**: Overwrite specified article matching the Article Title parameter with the content of the body of the request
 <br>
 **PATCH**: Overwrite either the "title", "content" or both fields of the article matching the Article Title parameter
 <br>
 **DELETE**: Delete the article matching the Article Title parameter
 <br>
