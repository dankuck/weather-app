let fs = require('fs');

function buildErrorPage(filename, err) {
    return `<!DOCTYPE html>
            <html>
                <head>
                    <title>Error</title>
                </head>
                <body>Could not load ${filename}: ${err}</body>
            </html>
            `;
};

module.exports = function (filename) {
    return function (req, res) {
        fs.readFile(`public\\${filename}`, 'utf8', function (err, data) {
            if (err) {
                res.status(404)
                    .send(buildErrorPage(filename, err));
            }
            res.send(data);
        });
    }
};
