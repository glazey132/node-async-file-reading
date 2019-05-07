const axios = require('axios');
const qs = require('qs');

function main() {
    console.log('initializing...')
    let count = 0;
    let typeMap = {};

    var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('./user-agents.txt');

    lr.on('error', function (err) {
        // 'err' contains error object
        console.log('there was an error -> ', err);
        console.log('errored out but here are results -> ', typeMap)
    });

    lr.on('line', function (line) {
        count++;
        // pause emitting of lines...
        lr.pause();
        console.log('on line => ', line)
        console.log('count -> ', count)

        // ...do your asynchronous line processing..
        let query = {
            access_key: process.env.API_KEY,
            ua: line
        };

        
    
        axios.get(`http://api.userstack.com/detect?${qs.stringify(query)}`)
        .then(function (response) {
            console.log('received response..', response.data.browser)
            if (!typeMap.hasOwnProperty(response.data.browser.name)) {
                typeMap[response.data.browser.name] = 1;
            } else {
                typeMap[response.data.browser.name] += 1;
            }
            lr.resume();
            
        })
        .catch(function (err) {
            console.log('there was an error calling api => ', err)
            if (!typeMap.hasOwnProperty(unknown)) {
                typeMap[unknown] = 1;
            } else {
                typeMap[unknown] += 1;
            }
            lr.resume();
        })
    });

    lr.on('end', function () {
        // All lines are read, file is closed now.
        console.log('done and file closed')
        console.log('the types -> ', typeMap)
    }); 
}
    
main();
