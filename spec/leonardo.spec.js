/**
 * Leonardo Specs
 */
describe("Leonardo", function () {
    /**
     * Searches array-like obj for predicate.
     */
    function find(obj, predicate) {
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

    var graph;

    beforeEach(function() {
        this.addMatchers({
            toHaveSVGPath: function(expected) {
                var paths = this.actual.getElementsByTagName("path");

                return find(paths, function (value) {
                    if (value.attributes) {
                        if (value.attributes.d.value === expected) {
                            return true;
                        }
                    }
                });
            },

            toHaveSVGText: function(expected) {
                var textNodes = this.actual.getElementsByTagName("text");

                return find(textNodes, function (value) {
                    if (value.firstChild) {
                        if (value.firstChild.textContent === expected) {
                            return true;
                        }
                    }
                });
            },

            toHaveSVGRectangle: function(expected) {
                var rects = this.actual.getElementsByTagName("rect");

                return find(rects, function(rect) {
                    if (rect.x.baseVal.value === expected.x &&
                        rect.y.baseVal.value === expected.y &&
                        rect.width.baseVal.value === expected.w &&
                        rect.height.baseVal.value === expected.h) {
                        return true;
                    }
                });
            }
        });
    });

    describe("lineChart", function () {
        var singleSeries = { "Type 1": [3, 8, 5, 6, 7, 4, 9, 2] },
            multipleSeries = {
                "Type 1": [3, 8, 5, 6, 7, 4, 9, 2],
                "Type 2": [2, 9, 4, 7, 6, 5, 8, 3]
            },
            labels = ['Foo', 'Bar', 'Baz', "Qux", "Quux", "Corge", "Grault", "Garply"];

        describe("single series with default options", function () {
            beforeEach(function () {
                setFixtures(sandbox());
                Leonardo.lineChart("sandbox", singleSeries, labels);
                graph = document.getElementById("sandbox").firstChild;
            });

            it("should draw the graph in the specified DOM ID", function () {
                expect(document.getElementById("sandbox")).toContain("svg");
            });

            it("should draw a graph with a path for each data point", function () {
                expect(graph).toHaveSVGPath("M46.74999999999999,123.33333333333334L78.25,28.888888888888886");
                expect(graph).toHaveSVGPath("M78.25,28.888888888888886L109.75,85.55555555555556");
                expect(graph).toHaveSVGPath("M109.75,85.55555555555556L141.25,66.66666666666667");
                expect(graph).toHaveSVGPath("M141.25,66.66666666666667L172.75,47.77777777777777");
                expect(graph).toHaveSVGPath("M172.75,47.77777777777777L204.25,104.44444444444444");
                expect(graph).toHaveSVGPath("M204.25,104.44444444444444L235.75,10");
                expect(graph).toHaveSVGPath("M235.75,10L267.25,142.22222222222223");
            });

            it("should draw the x-axis", function () {
                expect(graph).toHaveSVGPath("M37.99999999999999,180H290");
            });

            it("should draw the x-axis labels", function () {
                labels.forEach(function (value) {
                    expect(graph).toHaveSVGText(value);
                });
            });

            it("should draw the y-axis", function () {
                expect(graph).toHaveSVGPath("M37.99999999999999,10V180");
            });

            it("should draw the y-axis scale values", function () {
                ['0', '2', '4', '5', '7', '9'].forEach(function (value) {
                    expect(graph).toHaveSVGText(value);
                });
            });

            it("should draw the graph with the default size", function () {
                expect(graph).toHaveAttr("width", 300);
                expect(graph).toHaveAttr("height", 200);
            });
        });

        describe("single series with user defined options", function () {
            beforeEach(function () {
                setFixtures(sandbox());
                Leonardo.lineChart("sandbox", singleSeries, labels, {
                    width: 100,
                    height: 50,
                    drawBorder: true
                });
                graph = document.getElementById("sandbox").firstChild;
            });

            it("should draw the graph with the specified size", function () {
                expect(graph).toHaveAttr("width", 100);
                expect(graph).toHaveAttr("height", 50);
            });

            it("should draw the graph with a border", function () {
                expect(graph).toHaveSVGRectangle({x:0, y:0, w:100, h:50});
            });
        });
    });

    describe("sparkline", function () {
        var data = [3, 12, 7, 9];

        describe("with default options", function () {
            beforeEach(function () {
                setFixtures(sandbox());
                Leonardo.sparkline("sandbox", data);
                graph = document.getElementById("sandbox").firstChild;
            });

            it("should draw the graph in the specified DOM ID", function () {
                expect(document.getElementById("sandbox")).toContain("svg");
            });

            it("should draw a graph with a path for each data point", function () {
                var paths = graph.getElementsByTagName('path');
                expect(paths.length).toEqual(3);
            });

            it("should draw the graph with the default size", function () {
                expect(graph).toHaveAttr("width", 300);
                expect(graph).toHaveAttr("height", 200);
            });
        });

        describe("with user defined options", function () {
            it("should draw the graph with the specified size", function () {
                setFixtures(sandbox());
                Leonardo.sparkline("sandbox", data, {width:100, height:50});
                graph = document.getElementById("sandbox").firstChild;

                expect(graph).toHaveAttr("width", 100);
                expect(graph).toHaveAttr("height", 50);
            });
        });
    });

    describe("oneBar", function () {
        var bar;

        describe("with default options", function () {
            beforeEach(function () {
                setFixtures(sandbox());
                Leonardo.oneBar("sandbox", 0.3);
                graph = document.getElementById("sandbox").firstChild;
                bar = graph.getElementsByTagName('rect')[0];
            });

            it("should draw the graph in the specified DOM ID", function () {
                expect(document.getElementById("sandbox")).toContain("svg");
            });

            it("should draw a rectangle that represents the data point", function () {
                expect(bar).toHaveAttr("x", 0);
                expect(bar).toHaveAttr("y", 1);
                expect(bar).toHaveAttr("width", 90);
                expect(bar).toHaveAttr("height", 198);
            });

            it("should draw the graph with the default size", function () {
                expect(graph).toHaveAttr("width", 300);
                expect(graph).toHaveAttr("height", 200);
            });

            it("should draw the graph with the first palette color", function () {
                expect(bar).toHaveAttr("fill", "#e52736");
            });
        });

        describe("with user defined options", function () {
            beforeEach(function () {
                setFixtures(sandbox());
                Leonardo.oneBar("sandbox", 0.25, {
                    width:          100,
                    height:         30,
                    fillColor:      "#333333",
                    showPercentage: true
                });
                graph = document.getElementById("sandbox").firstChild;
                bar = graph.getElementsByTagName('rect')[0];
            });

            it("should draw the graph with the specified size", function () {
                expect(graph).toHaveAttr("width", 100);
                expect(graph).toHaveAttr("height", 30);
            });

            it("should draw the graph with the specified palette color", function () {
                expect(bar).toHaveAttr("fill", "#333333");
            });

            it("should show the percentage", function () {
                var text = graph.getElementsByTagName("text")[0];
                expect(text).toHaveAttr("text-anchor", "start");
                expect(text.firstChild).toHaveText("25%");
            });
        });
    });
});
