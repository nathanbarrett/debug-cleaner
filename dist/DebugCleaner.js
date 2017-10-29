"use strict";
var lodash_isarray_1 = require("lodash.isarray");
var lodash_isregexp_1 = require("lodash.isregexp");
var DebugCleaner = (function () {
    function DebugCleaner(options) {
        this.defaultCheckers = {
            js: {
                extentions: ['.js'],
                checkFor: [new RegExp(/console\.log/g), new RegExp(/debugger/)]
            },
            php: {
                extentions: ['.php'],
                checkFor: [new RegExp(/(^dd\(.*\)|[^\S]dd\(.*\))/g), new RegExp(/var_dump\(.*\)/g)]
            }
        };
        if (!options) {
            throw new Error('Debug cleaner must be instantiated with options');
        }
        if (lodash_isarray_1["default"](options)) {
            if (options.length === 0) {
                throw new Error('Debug cleaner options array is empty');
            }
            var first = options[0];
            if (typeof first === 'string') {
                this.checkers = this.generateCheckersWithDefaults(options);
                return this;
            }
            if (typeof first === 'object' && first.extentions) {
                this.checkers = this.cleanAndPopulateCheckers(options);
                return this;
            }
            throw new Error('Invalid array given for options');
        }
        if (typeof options === 'object' && options.extentions) {
            this.checkers = this.cleanAndPopulateCheckers([options]);
            return this;
        }
        if (typeof options === 'string') {
            this.checkers = this.generateCheckersWithDefaults([options]);
            return this;
        }
        throw new Error('Invalid options given');
    }
    DebugCleaner.prototype.check = function () {
        if (!this.checkers) {
            throw new Error('Debug Cleaner must be instantiated with options first');
        }
        return 'checked!';
    };
    DebugCleaner.prototype.generateCheckersWithDefaults = function (extentions) {
        var _this = this;
        return extentions.map(function (extention) {
            if (!_this.defaultCheckers[extention]) {
                throw new Error('Undefined default found');
            }
            return _this.defaultCheckers[extention];
        });
    };
    DebugCleaner.prototype.cleanAndPopulateCheckers = function (checkers) {
        var _this = this;
        return checkers.map(function (checker) {
            checker.extentions = _this.arrayChecker(checker.extentions);
            checker.paths = _this.arrayChecker(checker.paths);
            if (!lodash_isarray_1["default"](checker.checkFor)) {
                checker.checkFor = [checker.checkFor];
            }
            checker.checkFor.forEach(function (matcher) {
                if (typeof matcher !== 'string' && !lodash_isregexp_1["default"](matcher)) {
                    throw new Error('All values inside of checkFor should either be a string or regular expression');
                }
            });
            return checker;
        });
    };
    DebugCleaner.prototype.arrayChecker = function (value) {
        if (!value) {
            return [];
        }
        if (typeof value === 'string') {
            return [value];
        }
        return value;
    };
    return DebugCleaner;
}());
module.exports = DebugCleaner;
