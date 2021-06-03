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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroundVerticalLine = exports.GroundHorizontalLine = void 0;
var konva_1 = __importDefault(require("konva"));
var mine_drawing_1 = require("./mine_drawing");
var GroundHorizontalLine = /** @class */ (function (_super) {
    __extends(GroundHorizontalLine, _super);
    function GroundHorizontalLine(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        // линия поверхности земли
        _this.primitives.push(_this.createLine(p0.x, p0.y, p0.x + length, p0.y, length * 0.002));
        var n = Math.floor(length / 15);
        for (var i = 0; i < n; i++) {
            _this.primitives.push(_this.createLine(p0.x + i * 15, p0.y + 10, p0.x + 10 + i * 15, p0.y, length * 0.0005));
        }
        return _this;
    }
    GroundHorizontalLine.prototype.createLine = function (x1, y1, x2, y2, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2],
            stroke: '#331A38',
            strokeWidth: strokeWidth,
        });
    };
    return GroundHorizontalLine;
}(mine_drawing_1.BaseMineDraw));
exports.GroundHorizontalLine = GroundHorizontalLine;
var GroundVerticalLine = /** @class */ (function (_super) {
    __extends(GroundVerticalLine, _super);
    function GroundVerticalLine(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        // линия поверхности земли
        _this.primitives.push(_this.createLine(p0.x, p0.y, p0.x, p0.y + length, length * 0.002));
        var n = Math.floor(length / 15);
        for (var i = 0; i < n; i++) {
            _this.primitives.push(_this.createLine(p0.x - 10, p0.y + 20 + i * 15, p0.x, p0.y + 10 + i * 15, length * 0.0005));
        }
        return _this;
    }
    GroundVerticalLine.prototype.createLine = function (x1, y1, x2, y2, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2],
            stroke: '#331A38',
            strokeWidth: strokeWidth,
        });
    };
    return GroundVerticalLine;
}(mine_drawing_1.BaseMineDraw));
exports.GroundVerticalLine = GroundVerticalLine;
//# sourceMappingURL=groundLines.js.map