# blog-backend-image

## Installation

1. git clone
2. cd blog-backend-image
3. open terminal and run " npm install"
4. rename sample-config.env to config.env
5. Add your mongodb url and port number
6. run "npm run start" on your terminal

## Server End points

<p> " /blogs/blog " </p>
It takes POST and a GET request

<p> " /blogs/blog/:blogId " --> replace ":blogId" with actual blog Id </p>
It tasks a GET, PUT and DELETE request

<p> " /blogs/image/:blogId " --> replace ":blogId" with actual blog Id  </p>
It takes a PUT request to update Banner Image
