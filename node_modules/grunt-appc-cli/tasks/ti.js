/*
 * grunt-appc-cli
 * https://github.com/paulryanwork/grunt-appc-cli
 *
 * Copyright (c) 2015 Paul Ryan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    var _ = require("lodash");
    var tiObject = {};

    var appcSettings = grunt.config.get("appc-cli");

    grunt.registerTask('ti', 'titanium commands', function(command, job) {
        // Merge task-specific and/or target-specific options with these defaults.

        var options = this.options({}),
            spawn = require('child_process').spawn,
            task,
            done = this.async(),
            cwd = process.cwd(),
            params = ['ti', command],
            settings = appcSettings[job];

        switch(command) {
            case 'build':
                var buildArgs = [];
                _.each(settings.options, function(obj, val) {
                    params.push("--"+val + "=" + obj);
                });
                _.extend(buildArgs, params);
                settings.args.forEach(function(item){
                    buildArgs.push(item);
                });

                task = spawn('appc', buildArgs, {
                    'cwd' : cwd
                });

                task.stdout.on('data', function(data) {
                    grunt.log.ok(data);
                });

                task.stderr.on('error', function(data) {
                    grunt.log.error(data);
                });

                task.stdout.on('close', function(code) {
                    done(true);
                });

                break;
            default:
                grunt.log.ok(this.target + " not implemented.  Fork git@github.com:sharpred/grunt-appc-cli.git and submit a pull request!");
        }

    });
};
