# SchoolPalServer

#### Execution:
1) Execute command 'npm install' to install dependencies
2) Execute command 'node app.js' to launch the application

SchoolPal API Resources:
#### Authentication:
1. Login api auth
POST - http://localhost:3000/api/v1/signin

2. Signup api auth
POST - http://localhost:3000/api/v1/signup 

#### Post:
1. create a new post
POST - http://localhost:3000/api/v1/post/new 

2. Get a specific post base on post id
GET - http://localhost:3000/api/v1/post/{postId}

3. Get all post with pagination 
POST - http://localhost:3000/api/v1/post/ 
body: {
    school: get all post pertaining to school optional
    limit: the amount of post returned as a time
    offset: where to start
}

#### Comment:
1. Create a new comment for post base on post id
POST - http://localhost:3000/api/v1/post/{postKey}/comment/new

2. Get a specific comment 
GET - http://localhost:3000/api/v1/comment/{commentId}

3. Get all comments for a post
POST - http://localhost:3000/api/v1/comment
body: {
    postId: post id relating to the comment
    limit: the amount of post returned as a time
    offset: where to start
}

#### Schools:
1. Get basic information about a school 
GET - http://localhost:3000/api/v1/school/{schoolId}
