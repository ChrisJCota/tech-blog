# tech-blog

## Description
This project was created to practice the MVC framework. It has authentication for users to log in, post their blogs, comment on blogs and create a user.

## Usage
This project can be used as a template for creating a project with MVC framework or if you find the need to use a tech blog site you can copy the repo git@github.com:ChrisJCota/tech-blog.git

## technologies
* `"bcrypt": "^5.1.0"`
* `"connect-session-sequelize": "^7.1.6"`
* `"cookie-parser": "^1.4.6"`
* `"dotenv": "^16.0.3"`
* `"express": "^4.18.2"`
* `"express-handlebars": "^7.0.7"`
* `"express-session": "^1.17.3"`
* `"mysql2": "^3.2.3"`
* `"sequelize": "^6.31.0"`
       
## Testing
`Insomnia` is used to test the REST API calls.

### User API Routes
* Creating new User: POST `/api/users`
* Getting all Users: GET `api/users`
* Getting a single User: GET `/api/users/:userId`
* Update User: PUT `api/users/:userId`
* Delete User: Delete `api/users/:userId`
### Blog API Routes
* create a blog: POST `/api/blogs/`
* Get all blogs: GET `/api/blogs/`
* Get a single blog: GET `/api/blogs/:blogId`
* Update a blog: PUT `/api/blogs/:blogId`
* Delete a blog: DELETE `/api/blogs/:blogId`
### Comment API Routes
* Create a comment: POST `/api/blogs/:blogId/comments`
* Delete a reaction: DELETE `/api/blogs/:blogId/comments/:commentId`

