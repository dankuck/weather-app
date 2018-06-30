const app = require('express')();
const serve = require('./app/static-handler-builder.js');
 
app.get('/', serve('./index.html'))
 
app.listen(3000)
