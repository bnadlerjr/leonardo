/**
 * Leonardo Specs
 */
describe("Raphael.leonardo", function () {
    beforeEach(function() {
    });

    describe("sparkline", function () {
        it("should draw the graph in the specified DOM ID", function () {
            setFixtures(sandbox());
            Leonardo.sparkline("sandbox", [3, 12, 7, 9]);
            expect(document.getElementById('sandbox')).toContain("svg");
        });

        it("should draw a sparkline graph with default options", function () {
        });

        it("should draw the graph with user defined options", function () {
        });
    });
});
