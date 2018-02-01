'use strict';

const warmup = require('warmup');

module.exports = function(grunt) {

    grunt.registerMultiTask('warmup', 'Warmup the server URLs', function() {
        const done = this.async();
        const options = this.options({
            timeout: 10000,
            warmupCallbackFn: function(err) {
                if (err) {
                    grunt.log.errorlns(`Warmup failed due to: ${err}`);
                    return;
                }
                grunt.log.write('Warmup Task is successfully completed...').ok();
            }
        });

        const warmupTasks = [];
        const targeturls = this.data.urls;
        const targettasks = this.data.tasks;

        this.requiresConfig(`warmup.${this.target}.app`);
        this.requiresConfig(`warmup.${this.target}.urls`);

        if (grunt.util.kindOf(targeturls) === 'string') {
            warmupTasks.push(targeturls);
        } else if (grunt.util.kindOf(targeturls) === 'array') {
            warmupTasks.push(...targeturls);
        } else if (grunt.util.kindOf(targeturls) === 'object') {
            if (grunt.util.kindOf(targeturls.path) === 'string') {
                warmupTasks.push(targeturls);
            }
        }
        if (grunt.util.kindOf(targettasks) === 'function') {
            warmupTasks.push(targettasks);
        } else if (grunt.util.kindOf(targettasks) === 'array') {
            warmupTasks.push(...targettasks);
        } else if (grunt.util.kindOf(targettasks) === 'object') {
            if (grunt.util.kindOf(targettasks.func) === 'function') {
                warmupTasks.push(targettasks);
            }
        }
        grunt.verbose.write('Finished retrieving all paths and tasks...').ok();
        const warmupoptions = { timeout: options.timeout};
        if (options.warmupPort) {
            warmupoptions.warmupPort = options.warmupPort;
        }
        warmup(this.data.app, warmupTasks, warmupoptions, function(err) {
            options.warmupCallbackFn(err);
            done();
        } );

    })
}