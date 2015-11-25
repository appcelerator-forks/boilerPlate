module.exports = function(grunt) {
    grunt.registerMultiTask('tiapp', 'modify newly created tiapp.xml properties', function() {
        var releasePath = "" + process.cwd(),
            tiappPath = releasePath + '/tiapp.xml',
            tiapp,
            packagePath = "" + process.cwd() + '/package.json',
            packageData,
            version,
            options,
            _ = require("../lib/underscoremixin");
        options = this.options();
        grunt.config.set("app_id", options.id);
        tiapp = require('tiapp.xml').load(tiappPath);
        packageData = grunt.file.readJSON(packagePath);
        version = packageData.version.split(".");
        tiapp.android.versionName = packageData.version;
        tiapp.version = packageData.version;
        tiapp.android.versionCode = parseInt(version[2], 10);
        tiapp.android.minSdkVersion = "19";
        tiapp.android.targetSdkVersion = "22";
        tiapp.android.debuggable = options.debuggable;
        tiapp.id = options.id;
        tiapp.guid = options.guid;
        tiapp.android['package'] = options.id;
        tiapp.name = options.name;
        tiapp.sdkVersion = grunt.config.get('sdkVersion');
        options.properties.forEach(function(property) {
            var requiredKeys = ["name", "value", "type"];
            if (_.hasKeys(property, requiredKeys)) {
                tiapp.setProperty(property.name, property.value, property.type);
            }
        });
        tiapp.write();
    });
}