const app = require('../init-server').create();

const testTaskConfig = {
    options: {
        timeout: 10000, // Timeout for each task
    },
    server_1: {
        app: app,
        urls: '/url1'
    },
    server_2: {
        app: app,
        urls: ['/url1']
    },
    server_3: {
        app: app,
        urls: ['/url1', '/url2']
    },
    server_4: {
        app: app,
        urls: { path: '/url2'}
    },
    server_5: {
        app: app,
        urls: '/url2',
        tasks: function(callback) {
            console.log('Task 1');
            callback();
        }

    },
    server_6: {
        app: app,
        urls: '/url2',
        tasks: [function(callback) {
            console.log('Task 1');
            callback();
        }]
    },
    server_7: {
        app: app,
        urls: '/url2',
        tasks: [function(callback) {
            console.log('Task 1');
            callback();
        }, function(callback) {
            console.log('Task 2');
            callback();
        }]
    },
    server_8: {
        app: app,
        urls: '/url1',
        tasks: {
            name: 'Test fn 1',
            func: function(callback) {
                console.log('Task 1');
                callback();
            },
            timeout: 1500
        }
    },
    server_9: {
        app: app,
        urls: ['/url1', '/url2'],
        tasks: {
            name: 'Test fn 1',
            func: function(callback) {
                console.log('Task 1');
                callback();
            },
            timeout: 2000
        },
        options: {
            timeout: 15000,
            warmupPort: 30000
        }
    },
    server_10: {
        app: app,
        urls: ['/url1', '/url2'],
        tasks: {
            name: 'Test fn 1',
            func: function(callback) {
                console.log('Task 1');
                callback();
            },
            timeout: 2000
        },
        options: {
            timeout: 15000,
            warmupPort: 30000,
            warmupCallbackFn: function(err) {
                if (err) {
                    console.log('err');
                    return;
                }
                console.log('warmup callback success');
            }
        }
    }
}

module.exports = testTaskConfig;