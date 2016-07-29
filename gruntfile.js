module.exports = function(grunt) {
 	// Project configuration
 	grunt.initConfig({
 		pkg: grunt.file.readJSON('package.json'),

 		// Run server
		connect: {
			server: {
				options: {
					port: 9001,
					base: 'public/',
					open: true,
					livereload: true
				}
			}
		},

		// watch code and run again automatically
		watch: {
            files: ['public/*', 'public/js/*.js'],
            options: {
                livereload: true
            }
		}
 	});

 	// Load Npm Tasks
 	grunt.loadNpmTasks('grunt-contrib-connect');
 	grunt.loadNpmTasks('grunt-contrib-watch');

 	// Register Tasks
 	grunt.registerTask('default', ['connect', 'watch']);
 };
