const app = require('express')();
const serve = require('./app/static-handler-builder.js');
 
app.get('/', serve('./index.html'));
app.get('/app.js', serve('./app.js'));
 
app.listen(3000)
