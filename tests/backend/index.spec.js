const assert = require('assert');
const request = require('supertest');
const mockRequire = require('mock-require');
const expect = require('expect');

describe('index.js', function () {

    let server, app;
    const requestMock = {};
    const configMock = {};

    before(function () {
        mockRequire('request', requestMock);
        mockRequire('../../config.json', configMock);
    });

    beforeEach(function () {
        ({server, app} = require('../../index.js'));
    });

    afterEach(function () {
        server.close();
    });

    after(function () {
        mockRequire.stopAll();
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

    /**
     * @LWR 3.a. The backend must have an endpoint `/api/weather-search`.
     *
     * @LWR 3.c. The weather-search endpoint MUST search the openweathermap.com 
     * API for the location given.
     * 
     * @LWR 3.d. The weather-search endpoint SHOULD return the exact data 
     * returned from the openweathermap.com API.
     */
    it('should have /api/weather-search', function (done) {
        let caughtUrl;
        requestMock.get = function (url, callback) {
            caughtUrl = url;
            callback(null, {}, JSON.stringify({find: "me"}));
        };
        configMock.openweathermap = {
            api_key: 'mykey',
        };
        request(server)
            .get('/api/weather-search?location=nowhere')
            .expect(200)
            .then(response => {
                expect(response.body.find).toEqual('me');
                assert(/https/.test(caughtUrl));
                assert(/openweathermap/.test(caughtUrl));
                assert(/mode=json/.test(caughtUrl));
                assert(/q=nowhere/.test(caughtUrl));
                assert(/APPID=mykey/.test(caughtUrl));
            })
            .then(done, done);
    });

    /**
     * @LWR 3.b.a. If the `location` parameter is not present, the endpoint 
     * MUST return an HTTP error status code.
     */
    it('should cause trouble when location is absent', function (done) {
        request(server)
            .get('/api/weather-search')
            .expect(400)
            .then(response => {
                assert(/`location` parameter is required/.test(response.body.error));
            })
            .then(done, done);
    });

    /**
     * @LWR 3.c.a. If the openweathermap.com API returns an error, this 
     * endpoint MUST return that error.
     */
    it('should cause trouble if the remote endpoint results in an error', function (done) {
        let caughtUrl;
        requestMock.get = function (url, callback) {
            caughtUrl = url;
            callback(500, {}, "API not currently available");
        };
        configMock.openweathermap = {
            api_key: 'mykey',
        };
        request(server)
            .get('/api/weather-search?location=nowhere')
            .expect(500)
            .then(response => {
                assert(/API not currently available/.test(response.body.error));
            })
            .then(done, done);
    });

    /**
     * @LWR 3.c.b. If the api_key is not setup in the config, this endpoint 
     * MUST return an error.
     */
    it('should cause trouble if there is no api key', function (done) {
        delete requestMock.get;
        delete configMock.openweathermap;
        request(server)
            .get('/api/weather-search?location=nowhere')
            .expect(400)
            .then(response => {
                assert(/No API key is setup in config.json/.test(response.body.error));
            })
            .then(done, done);
    });
});
