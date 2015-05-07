MongoGridFS-Express-Node (MEN)


## Before You Begin 
Before you begin we recommend you read about the basic building blocks that assemble a MEAN.JS application: 
* MongoDB - Go through [MongoDB Official Website](http://mongodb.org/) and proceed to their [Official Manual](http://docs.mongodb.org/manual/), which should help you understand NoSQL and MongoDB better. Read more about GridFS feature of Mongo on their [Official documentation](http://docs.mongodb.org/manual/core/gridfs/)
* Express - The best way to understand express is through its [Official Website](http://expressjs.com/), particularly [The Express Guide](http://expressjs.com/guide.html); you can also go through this [StackOverflow Thread](http://stackoverflow.com/questions/8144214/learning-express-for-node-js) for more resources.
* Node.js - Start by going through [Node.js Official Website](http://nodejs.org/) and this [StackOverflow Thread](http://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js), which should get you going with the Node.js platform in no time.


## Prerequisites
Make sure you have installed all these prerequisites on your development machine.
* Node.js - [Download & Install Node.js](http://www.nodejs.org/download/) and the npm package manager, if you encounter any problems, you can also use this [Github Gist](https://gist.github.com/isaacs/579814) to install Node.js.
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).


* Gulp - You're going to use the [Gulp Task Runner](http://gulpjs.com/) to automate your development process, in order to install it make sure you've installed Node.js and npm, then install gulp globally using npm:

```
$ sudo npm install -g gulp
```

## Quick Install

The first thing you should do is install the Node.js dependencies. The boilerplate comes pre-bundled with a package.json file that contains the list of modules you need to start your application, to learn more about the modules installed visit the NPM & Package.json section.

To install Node.js dependencies you're going to use npm again, in the application folder run this in the command-line:

```
$ npm install
```

This command does a few things:
* First it will install the dependencies needed for the application to run.
* If you're running in a development environment, it will then also install development dependencies needed for testing and running your application.
* Alas, Rahul has been so chatty these days that he hasn't written any tests. Bad Rahul, Bad. No beer for Rahul.

## Running Your Application
After the install process is over, you'll be able to run your application using Gulp, just run gulp default task:

(Make sure mongoDB is running [```$ mongod```])

```
$ gulp
``` 

Your application should run on the 3000 port so in your browser just go to [http://localhost:3000](http://localhost:3000)
                            
That's it! your application should be running by now, to proceed with your development check the other sections in this documentation. 
If you encounter any problem try the Troubleshooting section.

## Getting Started With Files-API
* Now now, this is not a website. It's a middle-tier hosted server to provide a RESTfull API to upload and download files.
* Check out Swagger.Json to see what endpoints this middle tier offers - Swagger.Json is work in progress - D'oh!.
* Any requests for change, buy Rahul a beer and he'd do it for you!


## License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
