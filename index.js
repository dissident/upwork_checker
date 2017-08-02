var request = require('request');
var iconv = require('iconv-lite');
const vm = require('vm');
const _ = require('lodash');
require('dotenv').config()

var headers = {
    'cookie': process.env.COOKIES,
};

var options = {
    url: 'https://www.upwork.com/o/jobs/browse/t/1/?amount=0-99%2C100-499&q=ruby&sort=renew_time_int%2Bdesc',
    headers: headers
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        // var bodyWithCorrectEncoding = iconv.decode(body, 'utf-8');
        var r = body.match(/var phpVars = \{(.*?)\}\;/);
        const script = new vm.Script(r[0]);
        script.runInThisContext();
        _.each(phpVars.jobs, (job) => console.log(job.title))
    }
}

request(options, callback);
