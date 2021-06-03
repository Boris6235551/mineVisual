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
exports.CAGE = void 0;
var mine_drawing_1 = require("./mine_drawing");
var cage_1 = require("./cage");
var CAGE = /** @class */ (function (_super) {
    __extends(CAGE, _super);
    function CAGE(container, width, height) {
        var _this = _super.call(this, container, width, height) || this;
        _this.name = 'Cage';
        _this.Cage1 = new cage_1.Cage(new mine_drawing_1.Point(200, 70), 500);
        _this.addWidget(_this.Cage1);
        return _this;
    }
    return CAGE;
}(mine_drawing_1.Scheme));
exports.CAGE = CAGE;
//# sourceMappingURL=_cage.js.map