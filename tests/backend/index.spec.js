const assert = require('assert');
const request = require('supertest');

describe('index.js', function () {

    let server;

    beforeEach(function () {
        server = require('../../index.js');
    });

    afterEach(function () {
        server.close();
    });

    it('should give index.html on /', function (done) {
        request(server)
            .get('/')
            .expect(200)
            .then(response => {
                assert(/Daniel Kuck's Amazing Weather App/.test(response.text));
            })
            .then(done, done);
    });
});
