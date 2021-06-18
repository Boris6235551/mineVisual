"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNDERGROUNDSUBSTATION = void 0;
var mine_drawing_1 = require("./mine_drawing");
var substation_1 = require("./substation");
var UNDERGROUNDSUBSTATION = /** @class */ (function (_super) {
    __extends(UNDERGROUNDSUBSTATION, _super);
    // public SubstationCells: SubstationCell;
    function UNDERGROUNDSUBSTATION(container, width, height) {
        var _this = _super.call(this, container, width, height) || this;
        _this.name = 'UndegroundStation';
        _this.addItems();
        return _this;
    }
    UNDERGROUNDSUBSTATION.prototype.addItems = function () {
        // this.Generator1 = new Generator(new Point(200, 233), 100)
        // this.addWidget(this.Generator1);
        this.Trunk1 = new substation_1.Trunk(new mine_drawing_1.Point(250, 900), 670);
        this.addWidget(this.Trunk1);
        this.UndergroundSubstationCell1 = new substation_1.UndergroundSubstationCell(new mine_drawing_1.Point(250, 900), 1000);
        this.addWidget(this.UndergroundSubstationCell1);
    };
    return UNDERGROUNDSUBSTATION;
}(mine_drawing_1.Scheme));
exports.UNDERGROUNDSUBSTATION = UNDERGROUNDSUBSTATION;
//# sourceMappingURL=_undergroundsubstation.js.map