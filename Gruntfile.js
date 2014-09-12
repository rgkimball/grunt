/*
 * Gruntfile.js
 * Grunt tasks for e3 workflow
 */

module.exports = function(grunt) {
  var gvars = [];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    theme: '<%= pkg.repository.htdocs_path %>/<%= pkg.theme.path %>/<%= pkg.theme.name %>',
    gvars: gvars,

    concat: {
      dist: {
        src: ['<%= theme %>/<%= pkg.theme.js %>/**/*.js'],  // This groups all the theme's js files into one - probably needs a better solution
        dest: '<%= theme %>/<%= pkg.theme.js %>/<%= pkg.theme.name %>.js'
      }
    },
    compass: {
      dist: {
        options: {
          basePath: '<%= theme %>',
          config: '<%= theme %>/config.rb',
          sassDir: '<%= pkg.theme.sass %>',
          cssDir: '<%= pkg.theme.css %>',
          javascriptsDir: '<%= pkg.theme.js %>'
        }
      }
    },
    log: {
      project_info: '<%= pkg.name %> <%= pkg.version %>, <%= pkg.author %>',
      project_repo: '<%= pkg.repository.type %>, <%= pkg.repository.url %>',
      project_htdocs: '<%= pkg.repository.htdocs_path %>',
      theme_path: '<%= theme %>',
      git_branch: '<%= gvars.branch %>'
    },
    prompt: {
      env: {
        options: {
          questions: [
            {
              config: 'env.options.picker',
              type: 'list',
              message: 'Which environment?',
              default: 'dev',
              choices: ['dev','stage','prod'],
              tasks: ['shell:ls']
            }
          ]
        }
      },
      cimsg: {
        options: {
          questions: [
            {
              config: 'cimsg.options.set',
              type: '',
              message: 'Type a message for your commit:',
              default: 'Grunt launch',
              tasks: ['shell.git_push']

            }
          ]
        }
      }
    },
    shell: {
      git_br: {
        command: 'git branch',
        options: {
          callback: gitbrcheck
        }
      },
      git_ff: {
        command: ['git checkout develop','git pull','git add -A','git flow feature finish <%= gvars.branch %>'].join('&&'),
        tasks: ['log.safe']
      },
      git_hf: {
        command: ['git pull','git flow hotfix finish <%= gvars.branch %>'].join('&&'),
        tasks: ['log.safe']
      },
      git_rf: {
        command: ['git pull','git flow release finish <%= gvars.branch %>'].join('&&'),
        tasks: ['log.safe']
      },
      git_dev: {
        command: ['git pull','git add -A'].join('&&'),
        tasks: ['prompt.cimsg']
      }

    },
    watch: {
      css: {
        files: '<%= theme %>/<%= pkg.theme.sass %>/**/*.scss',
        tasks: ['compass'],
        options: {
          livereload: 35729
        }
      },
      scripts: {
        files: 'site/sites/all/**/*.js',
        tasks: ['concat'],
        options: {
          livereload: 35729,
          spawn: false
        }
      },
      images: {
        files: [
          '<% theme %>/<%= pkg.theme.images %>/**/*.jpg',
          '<% theme %>/<%= pkg.theme.images %>/**/*.png',
          '<% theme %>/<%= pkg.theme.images %>/**/*.gif'
        ],
        tasks: ['imagemin'],
        options: {
          livereload: 35729
        }
      }
    }

  }); // initConfig

  // Load dependencies
  grunt.loadNpmTasks('grunt-contrib-watch'); // Watch files & livereload
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
/*   grunt.loadNpmTasks('grunt-contrib-imagemin'); */
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-prompt'); // Configuration & confirmation
  grunt.loadNpmTasks('grunt-shell');

  // Define tasks
  grunt.registerTask('default', 'For use during development; compass, jshint, concat, imagemin', ['watch']);
  grunt.registerTask('launch', 'Use for initiating a site deployment', ['prompt:env','shell:git_br']);
  grunt.registerMultiTask('log', 'Display project info', function() {
    grunt.log.writeln(this.target + ': ' + this.data);
  });


  // Utils
  function gitbrcheck(err, stdout, stderr, cb) {
    if (err == null) {
      var branches = stdout.split(/\r\n|\r|\n/g); //separate branch names by line break
      for (var i= 0; i < branches.length; i++) {
        if (/^([*][ ]).+/.test(branches[i])) var curr = branches[i].replace(/^([*][ ])/,''); // current branch name starts with '* '
      }
      console.log("On branch: "+curr);

      // Figure out what type of branch we're on
      if (/^(['feature']).+/.test(curr)) {
        grunt.task.run(['shell:git_ff']);
        gvars.branch = curr.replace('feature/','');
        gvars.brtype = 'feature';

      } else if (/^(['hotfix']).+/.test(curr)) {
        grunt.task.run(['shell:git_hf']);
        gvars.branch = curr.replace('hotfix/','');
        gvars.brtype = 'hotfix';

      } else if (/^(['release']).+/.test(curr)) {
        grunt.task.run(['shell:git_rf']);
        gvars.branch = curr.replace('release/','');
        gvars.brtype = 'release';

      } else if (curr == 'develop') {
        grunt.task.run(['shell:git_ci']);
        gvars.branch = curr;
        gvars.brtype = 'develop';

      }

    }

    cb(); // resume launch task
  }

}
