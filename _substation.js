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
exports.SUBSTATION = void 0;
var mine_drawing_1 = require("./mine_drawing");
var substation_1 = require("./substation");
var SUBSTATION = /** @class */ (function (_super) {
    __extends(SUBSTATION, _super);
    // public SubstationCells: SubstationCell;
    function SUBSTATION(container, width, height) {
        var _this = _super.call(this, container, width, height) || this;
        _this.name = 'Substation';
        _this.addBatcher();
        return _this;
    }
    SUBSTATION.prototype.addBatcher = function () {
        // this.Generator1 = new Generator(new Point(200, 233), 100)
        // this.addWidget(this.Generator1);
        this.Trunk1 = new substation_1.Trunk(new mine_drawing_1.Point(700, 860), 295);
        this.addWidget(this.Trunk1);
        this.Trunk2 = new substation_1.Trunk(new mine_drawing_1.Point(1200, 860), 335);
        this.addWidget(this.Trunk2);
        this.SubstationCell1 = new substation_1.SubstationCell(new mine_drawing_1.Point(700, 857), 1000, 0, 7);
        this.addWidget(this.SubstationCell1);
        this.SubstationCell2 = new substation_1.SubstationCell(new mine_drawing_1.Point(790, 857), 1000, 7, 15);
        this.addWidget(this.SubstationCell2);
    };
    return SUBSTATION;
}(mine_drawing_1.Scheme));
exports.SUBSTATION = SUBSTATION;
//# sourceMappingURL=_substation.js.map