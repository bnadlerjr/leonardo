/**
 * Leonardo Specs
 */
describe("Leonardo", function () {
    var graph;

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
