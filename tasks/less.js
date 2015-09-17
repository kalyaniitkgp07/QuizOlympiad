'use strict';


module.exports = function less(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-contrib-less');

    // Options
    return {
        build: {
            options: {
                cleancss: false
            },
            files: [{
                expand: true,
                cwd: 'public/less',
                src: ['**/*.less'],
                dest: '.build/css/',
                ext: '.css'
            }]
        }
    };
};
