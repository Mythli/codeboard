module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		handlebars: {
			compile: {
				options: {
					namespace: "App"
				},
				files: {
					"build/template.js": "template/**/*.hbs"
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'build/css.css': [
						'css/lib/animate.css',
						'css/screen.css'
					]
				}
			}
		},
		uglify: {
			build: {
				files: {
					'build/js.js': [
						'js/lib/handlebars.runtime-v1.3.0.js',
						'js/lib/moment.js',
						'build/template.js',
						'js/data.js',
						'js/githubFormatter.js',
						'js/application.js'
					],
					'build/compatibility.js': [
						'js/lib/html5shiv.js',
						'js/lib/Respond.js'
					]
				}
			}
		},

		watch: {
			all: {
				files: [
					"template/**/*.hbs"
				],
				tasks: [
					'handlebars'
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-contrib-watch');

	
	grunt.registerTask('default', [
		'handlebars',
		'cssmin',
		'uglify',
	]);

	grunt.registerTask('debug', [
		'handlebars',
		'watch'
	]);
};