/**
 * @author paulryan
 */
var _ = require("underscore");

/*
 * pass an object and an array of key names and determine if all keys named are present in the object.
 * this is a shallow test, no nested keys
 */
var hasKeys = function(obj, keys) {
    var objectKeys,
        diff;
    if (_.isObject(obj) && _.isArray(keys)) {
        objectKeys = _.keys(obj);
        diff = _.difference(objectKeys, keys);
        if (_.isEmpty(diff)) {
            return true;
        }
        return false;
    }
    return false;

};
_.mixin({
    hasKeys : hasKeys
});
module.exports = _;