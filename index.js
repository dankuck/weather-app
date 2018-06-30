let app = require('express')();
let fs = require('fs');
 
app.get('/', function (req, res) {
    fs.readFile('./public/index.html', 'utf8', (err, data) => {
        if (err) {
            res.send("Could not load index.html: " + err);
        }
        res.send(data);
    });
})
 
app.listen(3000)
