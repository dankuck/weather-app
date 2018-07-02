const app = require('express')();
const serve = require('./app/static-handler-builder.js');
 
app.get('/', serve('./index.html'));
app.get('/app.js', serve('./app.js'));
 
let running = app.listen(3000)

module.exports = running;
