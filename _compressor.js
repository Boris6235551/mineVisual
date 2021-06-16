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
exports.COMPRESSOR = void 0;
var mine_drawing_1 = require("./mine_drawing");
var pumpAccessories_1 = require("./pumpAccessories");
var COMPRESSOR = /** @class */ (function (_super) {
    __extends(COMPRESSOR, _super);
    function COMPRESSOR(container, width, height) {
        var _this = _super.call(this, container, width, height) || this;
        _this.name = 'Compressor';
        _this.addBatcher();
        return _this;
    }
    COMPRESSOR.prototype.addBatcher = function () {
        this.Compressor1 = new pumpAccessories_1.Compressor(new mine_drawing_1.Point(1500, 100), 330);
        this.addWidget(this.Compressor1);
    };
    return COMPRESSOR;
}(mine_drawing_1.Scheme));
exports.COMPRESSOR = COMPRESSOR;
//# sourceMappingURL=_compressor.js.map