/**
 * Leonardo Specs
 */
describe("Leonardo", function () {
    var graph,
        singleSeries = { "Type 1": [3, 8, 5, 6, 7, 4, 9, 2] },
        labels = ['Foo', 'Bar', 'Baz', "Qux", "Quux", "Corge", "Grault", "Garply"];

    describe("columnChart", function () {
        describe("single series with default options", function () {
            beforeEach(function () {
                setFixtures(sandbox());
                Leonardo.columnChart("sandbox", singleSeries, labels);
                graph = document.getElementById("sandbox").firstChild;
            });

            it("should draw the graph in the specified DOM ID", function () {
                expect(document.getElementById("sandbox")).toContain("svg");
            });

            it("should draw a graph with a rectangle for each data point", function () {
                expect(graph).toHaveSVGRectangle({x:43.74999999999999, y:123.33333333333334, w:6, h:56.66666666666666});
                expect(graph).toHaveSVGRectangle({x:75.25, y:28.888888888888886, w:6, h:151.11111111111111});
                expect(graph).toHaveSVGRectangle({x:106.75, y:85.55555555555556, w:6, h:94.44444444444444});
                expect(graph).toHaveSVGRectangle({x:138.25, y:66.66666666666667, w:6, h:113.33333333333333});
                expect(graph).toHaveSVGRectangle({x:169.75, y:47.77777777777777, w:6, h:132.22222222222223});
                expect(graph).toHaveSVGRectangle({x:201.25, y:104.44444444444444, w:6, h:75.55555555555556});
                expect(graph).toHaveSVGRectangle({x:232.75, y:10, w:6, h:170});
                expect(graph).toHaveSVGRectangle({x:264.25, y:142.22222222222223, w:6, h:37.77777777777777});
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
    });

    describe("lineChart", function () {
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
