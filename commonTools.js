/**
 * Created by Zaur_Ismailov on 2/9/2016.
 */

var commonTools = {
    isArray: function(arr) {
        return Object.prototype.toString.call(arr) === '[object Array]';
    },

    isObject: function(obj) {
        return typeof(obj) === "object";
    },

    /**
     * Format object to dicplay in dialog box.
     * @param obj {Object} - Input object
     * @returns {{}} - Result object.
     */
    objReportFormat: function(obj) {
        var targetData = {}, item, key, val, index;

        for(var i in obj) {
            index = i;

            if(obj.hasOwnProperty(i)) {
                item = obj[i];

                if(commonTools.isArray(item)) {
                    index = i + ": " + item.length;
                    val = commonTools.arrReportFormat(item);
                } else {
                    if(!item || !commonTools.isObject(item)) {
                        key = String(item);
                        key !== i && (index = i + ": " + key);
                        val = key;
                    } else {
                        val = commonTools.objReportFormat(item);
                    }
                }

                targetData[index] = val;
            }
        }

        return targetData;
    },

    /**
     * Format array to display in dialog box. (Warning: Never use "object" or "array" as item of array)
     * @param arr {Array} - Input array.
     * @returns {{}} - Result object.
     */
    arrReportFormat: function(arr) {
        var targetData = {},
            key = 0,
            i = 1, item;

        arr = arr.map(function(v) {
            return String(v);
        });

        var data = arr.reduce(function(res, v) {
            res[v] || (res[v] = 0);
            res[v] += 1;

            return res;
        }, {});

        for(key in data) {
            item = data[key];

            if(item === 1) {
                targetData[key] = key;
            } else {
                for(; i <= item; i++) {
                    targetData[key + "[" + i + "]"] = key;
                }
            }
        }

        return targetData;
    }
};

/* istanbul ignore next */
if (typeof require === "function") {
    module.exports = commonTools;
}