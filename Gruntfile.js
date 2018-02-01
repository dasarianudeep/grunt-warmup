'use strict';

const taskConfig = require('./tests/fixtures/task-config');

module.exports = function(grunt) {

    grunt.loadTasks('./tasks');

    grunt.initConfig({
        warmup: taskConfig
    });

    grunt.registerTask('test', ['warmup']);
}