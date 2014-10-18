'use strict';

module.exports = function(grunt) {
  // Unified Watch Object
  var watchFiles = {
    html: ['demo/*.html'],
    js: ['src/js/*.js', 'demo/js/*.js'],
    css: ['src/css/*.css', 'demo/css/*.css']
  };

  // Project Configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      html: {
        files: watchFiles.html,
        tasks: ['jsbeautifier'],
        options: {
          livereload: true,
        }
      },
      js: {
        files: watchFiles.js,
        tasks: ['jshint', 'jsbeautifier'],
        options: {
          livereload: true
        }
      },
      css: {
        files: watchFiles.css,
        tasks: ['csslint', 'jsbeautifier'],
        options: {
          livereload: true
        }
      }
    },
    jshint: {
      all: {
        src: watchFiles.js,
        options: {
          jshintrc: true
        }
      }
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      all: {
        src: watchFiles.css
      }
    },
    uglify: {
      production: {
        options: {
          mangle: true
        },
        files: {
          'dist/legend.min.js': 'dist/legend.js'
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'dist/legend.min.css': [
            'src/css/main.css'
          ]
        }
      }
    },
    ngmin: {
      production: {
        files: {
          'dist/legend.js': [
            'src/js/elements.js',
            'src/js/init.js'
          ]
        }
      }
    },
    jsbeautifier: {
      files: ['*.js', 'src/js/*.js', 'src/css/*.css', 'demo/js/*.js', 'demo/css/*.css', 'demo/*.html'],
      options: {
        config: ".jsbeautifyrc",
        html: {
          braceStyle: "collapse",
          indentChar: " ",
          indentScripts: "keep",
          indentSize: 2,
          maxPreserveNewlines: 10,
          preserveNewlines: true,
          unformatted: ["a", "sub", "sup", "b", "i", "u"],
          wrapLineLength: 0
        },
        css: {
          indentChar: " ",
          indentSize: 2
        },
        js: {
          braceStyle: "collapse",
          breakChainedMethods: false,
          e4x: false,
          evalCode: false,
          indentChar: " ",
          indentLevel: 0,
          indentSize: 2,
          indentWithTabs: false,
          jslintHappy: false,
          keepArrayIndentation: false,
          keepFunctionIndentation: false,
          maxPreserveNewlines: 10,
          preserveNewlines: true,
          spaceBeforeConditional: true,
          spaceInParen: false,
          unescapeStrings: false,
          wrapLineLength: 0
        }
      }
    },
    concurrent: {
      default: ['watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  });

  // Load NPM tasks 
  require('load-grunt-tasks')(grunt);

  // Making grunt default to force in order not to break the project.
  grunt.option('force', true);

  // Default task(s).
  grunt.registerTask('default', ['lint', 'jsbeautifier', 'concurrent']);

  // Lint task(s).
  grunt.registerTask('lint', ['jshint', 'csslint']);

  // Build task(s).
  grunt.registerTask('build', ['lint', 'ngmin', 'uglify', 'cssmin']);

};
