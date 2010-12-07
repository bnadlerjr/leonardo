/**
 * Raphael helper function specs.
 */
describe("Raphael.leonardo.getPaletteColor", function () {
    it("should return next color in sequence", function () {
        var expectedColors = [
                "rgb(229, 39, 54)",  "rgb(32, 141, 70)",  "rgb(43, 87, 169)",
                "rgb(236, 125, 43)", "rgb(102, 38, 145)", "rgb(156, 25, 37)",
                "rgb(175, 50, 148)"
            ],
            actualColors = [];

        expectedColors.forEach(function (value) {
            expect(value).toEqual(Raphael.leonardo.getPaletteColor());
        });
    });
});
