/*jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, bitwise: true, regexp: true, newcap: true, immed: true */
/*global Raphael */

/**
 * Raphael helper function for drawing a horizontal line.
 *
 * x: Value of the x-coordinate
 * y: Value of the y-coordinate
 * width: Length of the line
 */
Raphael.fn.hLine = function (x, y, width) {
    return this.path(["M", x, y, "h", width]);
};

/**
 * Raphael helper function for drawing a vertical line.
 *
 * x: Value of the x-coordinate
 * y: Value of the y-coordinate
 * height: Length of the line
 */
Raphael.fn.vLine = function (x, y, height) {
    return this.path(["M", x, y, "v", height]);
};

/**
 * Raphael helper function for drawing a line between two points.
 *
 * x1, y1: Coords for 'from' point
 * x2, y2: Coords for 'to' point
 */
Raphael.fn.line = function (x1, y1, x2, y2) {
    return this.path(["M", x1, y1, "L", x2, y2]);
};

var Leonardo = {};

/**
 * Namespace for the Leonardo graphing library.
 */
Leonardo = (function () {
    var paper,
        plotArea = {},
        scaleValues = [],
        maxValue,
        VERTICAL = 0,
        HORIZONTAL = 1,
        opts = {
            'width'        : 300,
            'height'       : 200,
            'padding'      : 10,
            'barWidth'     : 5,
            'tickSize'     : 5,
            'drawBorder'   : true,
            'plotAreaPercentage' : 0.9,
            'scaleSize'    : 5
        };

    /**
     * Extends target object with properties of obj. Performs a deep copy.
     * Similiar to jQuery.extend(). Taken from the book "Javascript Patterns".
     */
    function extend(target, obj) {
        var i,
            toStr = Object.prototype.toString,
            aStr  = "[object Array]";

        target = target || {};

        for (i in obj) {
            if (obj.hasOwnProperty(i)) {
                if (typeof obj[i] === "object") {
                    target[i] = (toStr.call(obj[i]) === aStr) ? [] : {};
                    extend(obj[i], target[i]);
                } else {
                    target[i] = obj[i];
                }
            }
        }

        return target;
    }

    /**
     * Retrieves the maximum value from a data series.
     */
    function getMaxValue(series) {
        var data = [];

        series.forEach(function (element) {
            data = data.concat(element.values);
        });

        return Math.max.apply(Math, data);
    }

    /**
     * Initializes graph by calculating the plot area and scale values.
     */
    function init(domID, max, options) {
        opts = extend(opts, options || {});
        maxValue = max;

        var paddedWidth  = opts.width  - (opts.padding * 2),
            paddedHeight = opts.height - (opts.padding * 2),
            axisAreaPercentage = 1 - opts.plotAreaPercentage,
            ratio              = maxValue / opts.scaleSize,
            i = opts.scaleSize;

        // Calculate size of plot area
        plotArea.x      = axisAreaPercentage * paddedWidth + opts.padding;
        plotArea.y      = opts.padding;
        plotArea.width  = opts.plotAreaPercentage * paddedWidth;
        plotArea.height = paddedHeight - (axisAreaPercentage / 2 * opts.height);

        // Calculate scale values
        scaleValues[0] = 0;
        while (i--) {
            scaleValues.push((i + 1) * ratio);
        }

        // Create drawing surface
        paper = new Raphael(domID, opts.width, opts.height);
    }

    /**
     * Plots an array of items on the graph.
     */
    function plot(values, drawingCallback) {
        var xStep = plotArea.width / (values.length - 1) - opts.padding,
            adjustedHeight = plotArea.height + opts.padding,
            xOffset = plotArea.x,
            yOffset;

        values.forEach(function (value, index) {
            xOffset += (0 === index) ? opts.padding : xStep;
            yOffset = adjustedHeight - (value / maxValue * plotArea.height);
            drawingCallback(xOffset, yOffset, value);
        });
    }

    /**
     * Draw a rectangular border around the chart.
     */
    function drawBorder(width, height) {
        paper.rect(0, 0, width, height);
    }

    /**
     * Draw the x-axis for the chart.
     */
    function drawXAxis(labels) {
        paper.hLine(plotArea.x, plotArea.y + plotArea.height, plotArea.width);

        var labelY = plotArea.y + plotArea.height,
            labelTextY = labelY + (2 * opts.tickSize);

        plot(labels, function (x, y, label) {
            paper.vLine(x, labelY, opts.tickSize);
            paper.text(x, labelTextY, label);
        });
    }

    /**
     * Draw the y-axis for the chart.
     */
    function drawYAxis() {
        paper.vLine(plotArea.x, plotArea.y, plotArea.height);

        var valueX = plotArea.x - opts.tickSize,
            valueTextX = plotArea.x - (3 * opts.tickSize);

        plot(scaleValues, function (x, y, value) {
            paper.hLine(valueX, y, opts.tickSize);
            paper.text(valueTextX, y, value);
        });
    }

    /**
     * Public API
     */
    return {
        /**
         * Draws a column based chart.
         */
        columnChart: function (domID, series, labels, options) {
            init(domID, getMaxValue(series), options || {});

            if (opts.drawBorder) {
                drawBorder(opts.width, opts.height);
            }

            drawXAxis(labels);
            drawYAxis();

            // Draw series bars
            var adjustedHeight = plotArea.height + opts.padding,
                seriesOffset = 0;

            series.forEach(function (element) {
                plot(element.values, function (x, y, value) {
                    paper.rect(x + seriesOffset, y, opts.barWidth, adjustedHeight - y);
                });

                seriesOffset += opts.barWidth;
            });
        },

        /**
         * Draws a line chart.
         */
        lineChart: function (domID, series, labels, options) {
            init(domID, getMaxValue(series), options || {});

            if (opts.drawBorder) {
                drawBorder(opts.width, opts.height);
            }

            drawXAxis(labels);
            drawYAxis();

            // Draw series lines
            series.forEach(function (element) {
                var lastX = 0,
                    lastY = 0,
                    first_point = true;

                plot(element.values, function (x, y, value) {
                    if (first_point) {
                        lastX = x;
                        lastY = y;
                        first_point = false;
                    } else {
                        paper.line(lastX, lastY, x, y);
                        lastX = x;
                        lastY = y;
                    }
                });
            });
        }
    };
}());
