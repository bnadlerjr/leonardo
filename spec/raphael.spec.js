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
