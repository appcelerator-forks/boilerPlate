module.exports = function(grunt) {
    // Project configuration.  See individual tasks for config objects
    grunt.initConfig({});
    //load tasks from the tasks folder
    grunt.loadTasks('tasks');
    //loads and registers all the dependency tasks
    grunt.task.run('init');
    grunt.registerTask('default', ['tiapp', 'bowercopy']);
};