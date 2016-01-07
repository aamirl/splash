module.exports = function(grunt) {

    grunt.initConfig({
        uglify: {
            assets: { 
                src: ['**/*.js', 'controllers/**/*_p.js'],  // source files mask
                dest: 'public/dist/js/',    // destination folder,
                cwd : 'assets/js/',
                expand: true,    // allow dynamic building
                // flatten: true,   // remove all unnecessary nesting
                ext: '.min.js'   // replace .js to .min.js
                },
            frontend: { 
                src: '**/*.js',  // source files mask
                dest: 'public/dist/js/',    // destination folder,
                cwd : 'views/',
                expand: true,    // allow dynamic building
                // flatten: true,   // remove all unnecessary nesting
                ext: '.min.js'   // replace .js to .min.js
                },
            locales : {
                src : '**/*.js',
                dest : 'public/dist/locales',
                cwd : 'assets/locales/fe/',
                expand: true,
                ext : '.min.js'
                }
            },
        cssmin : {
            files: { 
                src: ['*.css'],  // source files mask
                dest: 'public/dist/css/',    // destination folder
                cwd : 'assets/css/',
                expand: true,    // allow dynamic building
                // flatten: true,   // remove all unnecessary nesting
                ext: '.min.css'   // replace .js to .min.js
                }
            },
        watch: {
            js: { 
                files: ['assets/js/**/*.js', 'views/**/*.js', 'assets/locales/fe/**/*.js'], 
                tasks: [ 'newer:uglify' ] 
                },
            css:{
                files: 'assets/css/*.css',
                tasks: ['newer:cssmin']
                }
            },
        sass : {
            options : {
                includePaths : [
                    'assets/sass/'
                    ]
                },
            dist : {
                files : {
                    'main.css' : 'main.scss'
                    }
                }
            }
        });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-newer');
    
    // grunt.registerTask('uglify', ['newer:uglify:files']);

    grunt.registerTask('default', [
        'newer:sass:dist',
        'newer:uglify',
        'newer:cssmin',
        'watch'
        ]);

    };