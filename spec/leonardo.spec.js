/**
 * Leonardo Specs
 */
describe("Leonardo", function () {
    describe("sparkline", function () {
        var data = [3, 12, 7, 9];

        describe("with default options", function () {
            var result;

            beforeEach(function () {
                setFixtures(sandbox());
                Leonardo.sparkline("sandbox", data);
                result = document.getElementById("sandbox").firstChild;
            });

            it("should draw the graph in the specified DOM ID", function () {
                expect(document.getElementById("sandbox")).toContain("svg");
            });

            it("should draw a graph with a path for each data point", function () {
                var paths = result.getElementsByTagName('path');
                expect(paths.length).toEqual(3);
            });

            it("should draw the graph with the default size", function () {
                expect(result).toHaveAttr("width", 300);
                expect(result).toHaveAttr("height", 200);
            });
        });

        describe("with user defined options", function () {
            it("should draw the graph with the specified size", function () {
                setFixtures(sandbox());
                Leonardo.sparkline("sandbox", data, {width:100, height:50});
                var result = document.getElementById("sandbox").firstChild;

                expect(result).toHaveAttr("width", 100);
                expect(result).toHaveAttr("height", 50);
            });
        });
    });
});
