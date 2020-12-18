# blog-backend-image

## Installation

1. git clone
2. cd blog-backend-image
3. open terminal and run " npm install"
4. rename sample-config.env to config.env
5. Add your mongodb url and port number
6. run "npm run start" on your terminal

## Server End points

" /blogs/blog " 

It takes POST and a GET request

" /blogs/blog/:blogId " --> replace ":blogId" with actual blog Id

It takes a GET, PUT and DELETE request

" /blogs/image/:blogId " --> replace ":blogId" with actual blog Id

It takes a PUT request to update Banner Image


## Blog structure
### Create
<p>/blogs/blog</p>
can be used to create a blog one needs to provide it with:
<ul>
  <li>blogTitle</li>
  <li>blogAuthor</li>
  <li>blogImage</li>
  <li>blogContent</li>
</ul>
<p>User can also provide single or multiple relatedLinks. (Multiple relatedLinks should be seperated by comma)</p>

### Update by Id 
#### Update blog Data
<p>/blogs/blog/:blogId</p>
Can be used to update blog data:
<ul>
  <li>blogTitle</li>
  <li>blogAuthor</li>
  <li>blogImage</li>
  <li>blogContent</li>
  <li>Single or Multiple relatedLinks. (Multiple relatedLinks should be seperated by comma)</li>
</ul>
User cannot update blogId and imageUrl

#### Update Blog Image
<p>/blogs/image/:blogId</p>
Can be used to update blogImage
