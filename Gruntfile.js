module.exports = function(grunt) {

  'use strict';

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({

    pkg: pkg,

    wrap: {
      server: {
        // use defaults
      }
    },

    jshint: {
      files: ['index.js', 'src/**/*.js'],
      options: {
        jshintrc: true
      }
    },

    exec: {
      'spm-publish': 'spm publish',
      'spm-test': 'spm test'
    }

  });

  grunt.registerTask('test', ['jshint','exec:spm-test']);

  grunt.registerTask('publish', ['test', 'exec:spm-publish']);

  grunt.registerTask('server', ['wrap']);

  grunt.registerTask('default', ['server']);

};
