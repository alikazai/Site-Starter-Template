module.exports = function(grunt){
    //Configure Grunt
    grunt.initConfig({
        // Get the configuration info from package.json
        pkg: grunt.file.readJSON('package.json'),
        
        // Configure jshint to validate js files
        jshint: {
            options: {
                // Use jshint-stylish to make our errors look and read good
                reporter: require('jshint-stylish') 
            },
            // When this task is run, lint the Gruntfile and all js files in src
            build: ['gruntfile.js', 'src/**/*.js']
        },
        // Configure uglify to minify js files
        uglify: {
            options: {
                // This will add a nice comment to the top of our minified file
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> \n*/\n'
            },
            build: {
                files: {
                    // This will select all js files in src and minify them.
                    'build/js/sample.min.js' : 'src/***/*.js'
                }
            }
        },

        // Compile sass stylesheets to css
        sass: {
            options: {
                implementation: require('node-sass'),
                sourceMap: true
            },
            build: {
                files: {
                    'build/css/main.css' : 'src/scss/main.scss'
                }
            }
        },

        // Configure cssmin to minify css files
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> \n*/\n'
            },
            build: {
                files: {
                    'build/css/main.min.css' : 'build/css/main.css'
                }
            }
        },

        // Configure watch to auto update
        watch: {
            // For stylesheets, watch css and sass files
            // Only run sass and cssmin 
            stylesheets: {
                files: ['src/**/*.css', 'src/**/*.scss'],
                tasks: ['sass', 'cssmin']
            },

            // For scripts, run jshint and uglify
            scripts: {
                files: 'src/**/*.js', tasks: ['jshint', 'uglify']
            }
        }
    });


    // Load Grunt packages.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    

    // Register Task
    grunt.registerTask('minify', ['sass', 'cssmin']);
    grunt.registerTask('devjs', ['jshint', 'uglify']);
    grunt.registerTask('default', ['jshint', 'uglify', 'sass', 'cssmin']);    
};