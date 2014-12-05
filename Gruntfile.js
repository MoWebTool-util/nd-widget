module.exports = function(grunt) {

  'use strict';

  function parseAlias(prefix) {
    var fs = require('fs');
    var path = require('path');

    var root = 'spm_modules';

    var alias = [];

    if (prefix) {
      prefix += '/';
    } else {
      prefix = '';
    }

    fs.readdirSync(root).forEach(function(dest) {
      var version = fs.readdirSync(path.join(root, dest))[0];
      var spmmain = fs.readFileSync(path.join(root, dest, version, 'package.json'));

      // 移除多余的 `./`
      spmmain = JSON.parse(spmmain).spm.main.replace(/^\.\//, '');

      alias.push('\'' + dest + '\': \'' + prefix + root + '/' + dest + '/' + version + '/' + spmmain + '\'');
    });

    return alias.join(',\n      ');
  }

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({

    pkg: pkg,

    wrap: {
      server: {
        base: '.',
        port: 8080,
        wrap: function(url) {
          return /^\/(((app|mod|spm_modules).+)|index)\.js$/.test(url);
        }
      }
    },

    jshint: {
      files: ['index.js', 'src/**/*.js'],
      options: {
        jshintrc: true
      }
    },

    copy: {
      config: {
        options: {
          process: function(content /*, srcpath*/ ) {
            return content.replace(/@ALIAS/g, parseAlias());
          }
        },
        files: [{
          expand: true,
          cwd: 'examples/lib',
          src: ['config.js.tpl'],
          dest: 'examples/lib',
          ext: '.js'
        }]
      }
    },

    exec: {
      'spm-publish': 'spm publish',
      'spm-test': 'spm test'
    }

  });

  grunt.registerTask('test', ['jshint','exec:spm-test']);

  grunt.registerTask('publish', ['test', 'exec:spm-publish']);

  grunt.registerTask('server', ['copy', 'wrap']);

  grunt.registerTask('default', ['server']);

};
