module.exports = function(grunt) {
    grunt.registerTask('configjson', 'update config.json file with details of widgets included in project', function() {
        var _ = require("underscore"),
            fs = require("fs");

        var getWidgetFiles = function(files) {
            //returns an array containing paths to all the widget.json files
            return files.filter(function(file) {
                var path = require("path"),
                    fileName;
                fileName = path.basename(file);
                if (fileName === "widget.json") {
                    return file;
                }
            });
        }

        var getWidgetDetails = function(widgetFiles) {
            //returns an array of objects of the form {widgetname: versionnumber};
            //in practice this will be an array containing a single item with one object for
            //all the widgets found
            return widgetFiles.map(function(file) {
                var obj = JSON.parse(fs.readFileSync('app/widgets/' + file, 'utf8')),
                    newObj = {};
                newObj[obj.id] = obj.version;
                return newObj;
            });
        }

        var updateConfigFile = function(widgetDetails) {
            //updates the dependencies object in config.json with all the widgets in app/widgets
            return widgetDetails.map(function(obj) {
                var configObj,
                    appConfigFile = 'app/config.json';
                configObj = JSON.parse(fs.readFileSync(appConfigFile, 'utf8'));
                _.extend(configObj.dependencies, obj);
                fs.writeFileSync(appConfigFile, JSON.stringify(configObj));
            })
        }

        var recurseWidgetFolders = function() {
            var wrench = require('wrench');
            //returns a list of folders in an array
            return wrench.readdirSyncRecursive('app/widgets');
        };

        //NB underscore compose works right to left!
        _.compose(updateConfigFile, getWidgetDetails, getWidgetFiles, recurseWidgetFolders)();
    })
}