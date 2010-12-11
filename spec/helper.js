Leonardo.SpecHelpers = (function () {
    return {
        /**
         * Searches array-like obj for predicate.
         */
        find: function (obj, predicate) {
            var i = 0,
                found = false,
                length = obj.length;

            while ((!(found)) && (i < length)) {
                if (obj.hasOwnProperty(i)) {
                    found = predicate(obj[i]);
                }

                i += 1;
            }

            return found;
        }
    }
}());

/**
 * Add custom matchers.
 */
beforeEach(function() {
    this.addMatchers({
        toHaveSVGPath: function(expected) {
            var paths = this.actual.getElementsByTagName("path");

            return Leonardo.SpecHelpers.find(paths, function (value) {
                if (value.attributes) {
                    if (value.attributes.d.value === expected) {
                        return true;
                    }
                }
            });
        },

        toHaveSVGText: function(expected) {
            var textNodes = this.actual.getElementsByTagName("text");

            return Leonardo.SpecHelpers.find(textNodes, function (value) {
                if (value.firstChild) {
                    if (value.firstChild.textContent === expected) {
                        return true;
                    }
                }
            });
        },

        toHaveSVGRectangle: function(expected) {
            var rects = this.actual.getElementsByTagName("rect");

            return Leonardo.SpecHelpers.find(rects, function(rect) {
                if (rect.x.baseVal.value.toFixed() === expected.x.toFixed() &&
                    rect.y.baseVal.value.toFixed() === expected.y.toFixed() &&
                    rect.width.baseVal.value.toFixed() === expected.w.toFixed() &&
                    rect.height.baseVal.value.toFixed() === expected.h.toFixed()) {
                    return true;
                }
            });
        }
    });
});
