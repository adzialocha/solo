module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    bower: grunt.file.readJSON('.bowerrc'),

    connect: {
      server: {
        options: {
          port: 8000,
          base: [ 'app', 'bower.directory' ],
          keepalive: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.registerTask('serve', 'connect:server');
  grunt.registerTask('default', 'serve');

};
