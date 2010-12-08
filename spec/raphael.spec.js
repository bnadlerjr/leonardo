/**
 * Raphael helper function specs.
 */
describe("Raphael.leonardo.getPaletteColor", function () {
    function compareColors(expectedColors) {
        expectedColors.forEach(function (value) {
            expect(value).toEqual(Raphael.leonardo.getPaletteColor());
        });
    }

    beforeEach(function() {
        Raphael.leonardo.getPaletteColor({reset: true});
    });

    it("should return next color in sequence", function () {
        compareColors([
                "rgb(229, 39, 54)",  "rgb(32, 141, 70)",  "rgb(43, 87, 169)",
                "rgb(236, 125, 43)", "rgb(102, 38, 145)", "rgb(156, 25, 37)",
                "rgb(175, 50, 148)"
        ]);
    });

    it("should restart cycle of colors when it reaches the last color", function () {
        compareColors([
                "rgb(229, 39, 54)",  "rgb(32, 141, 70)",  "rgb(43, 87, 169)",
                "rgb(236, 125, 43)", "rgb(102, 38, 145)", "rgb(156, 25, 37)",
                "rgb(175, 50, 148)", "rgb(229, 39, 54)",  "rgb(32, 141, 70)"
        ]);
    });

    it("should not return a color if the reset option is given", function () {
        expect(true).toEqual(Raphael.leonardo.getPaletteColor({reset: true}));
    });

    it("should reset the color cycle if the reset option is given", function () {
        var expectedColors = [
                "rgb(229, 39, 54)",  "rgb(32, 141, 70)",  "rgb(43, 87, 169)"
            ];

        compareColors(expectedColors);
        Raphael.leonardo.getPaletteColor({reset: true});
        compareColors(expectedColors);
    });
});

/**
 * Raphael canvas helper specs.
 */
describe("Raphael.fn.leonardo", function () {
    var paper;

    beforeEach(function () {
        paper = new Raphael(0, 0, 10, 10);
    });

    describe("hLine", function () {
        it("should return a horizontal path", function () {
            paper.leonardo.hLine(2, 2, 5);

            var points = paper.top.attrs.path;
            expect(2).toEqual(points.length);
            expect(['M', 2, 2]).toEqual(points[0]);
            expect(['H', 7]).toEqual(points[1]);
        });
    });

    describe("vLine", function () {
        it("should return a vertical path", function () {
            paper.leonardo.vLine(1, 1, 6);

            var points = paper.top.attrs.path;
            expect(2).toEqual(points.length);
            expect(['M', 1, 1]).toEqual(points[0]);
            expect(['V', 7]).toEqual(points[1]);
        });
    });

    describe("line", function () {
        it("should return a line path", function () {
            paper.leonardo.line(1, 1, 5, 5);

            var points = paper.top.attrs.path;
            expect(2).toEqual(points.length);
            expect(['M', 1, 1]).toEqual(points[0]);
            expect(['L', 5, 5]).toEqual(points[1]);
        });
    });

    describe("lineTo", function () {
        it("should cache the first call", function () {
            paper.leonardo.lineTo(1, 1);

            expect(1).toEqual(paper.cache.lastX);
            expect(1).toEqual(paper.cache.lastY);
        });

        it("should return a line path based on previous points", function () {
            paper.leonardo.lineTo(1, 1);
            paper.leonardo.lineTo(5, 5);
            paper.leonardo.lineTo(8, 4);

            var line1Points = paper.top.attrs.path,
                line2Points = paper.top.prev.attrs.path;

            expect(['M', 5, 5]).toEqual(line1Points[0]);
            expect(['L', 8, 4]).toEqual(line1Points[1]);

            expect(['M', 1, 1]).toEqual(line2Points[0]);
            expect(['L', 5, 5]).toEqual(line2Points[1]);
        });
    });
});
