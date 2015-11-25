module.exports = function(grunt) {
    grunt.registerTask("init", function() {
        grunt.loadNpmTasks('grunt-titanium');
        grunt.loadNpmTasks('grunt-alloy');
        grunt.loadNpmTasks('grunt-appc-cli');
        grunt.loadNpmTasks('grunt-bowercopy');
    });
}