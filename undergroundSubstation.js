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
exports.UndergroundSubstationCell = exports.UndergroundSubstation = void 0;
var konva_1 = __importDefault(require("konva"));
var mine_drawing_1 = require("./mine_drawing");
var UndergroundSubstation = /** @class */ (function (_super) {
    __extends(UndergroundSubstation, _super);
    function UndergroundSubstation(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'UndergroundSubstation';
        // общая шина ячеек
        var i;
        length = length * 0.647;
        _this.primitives.push(_this.createRectangle(p0.x, p0.y, length * 0.0183, length, '', '#FA458C', length * 0.001));
        for (i = 1; i <= 5; i++) {
            _this.primitives.push(_this.createLine(p0.x, p0.y + length * 0.003 * i, p0.x + length, p0.y + length * 0.003 * i, '#FA458C', length * 0.001));
        }
        for (i = 1; i <= 166; i++) {
            _this.primitives.push(_this.createLine(p0.x + length * 0.006 * i, p0.y, p0.x + length * 0.006 * i, p0.y + length * 0.0183, '#FA458C', length * 0.001));
        }
        _this.primitives.push(_this.createLine(p0.x, p0.y + length * 0.00915, p0.x + length, p0.y + length * 0.00915, '#055659', length * 0.003));
        return _this;
    }
    ;
    UndergroundSubstation.prototype.createRectangle = function (x, y, height, width, fill, stroke, strokeWidth) {
        return new konva_1.default.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    UndergroundSubstation.prototype.createLine = function (x1, y1, x2, y2, stroke, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    return UndergroundSubstation;
}(mine_drawing_1.BaseMineDraw));
exports.UndergroundSubstation = UndergroundSubstation;
var UndergroundSubstationCell = /** @class */ (function (_super) {
    __extends(UndergroundSubstationCell, _super);
    function UndergroundSubstationCell(p0, length, n) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'UndergroundSubstationCell';
        // ячейки
        _this.primitives.push(_this.createRectangle(p0.x + n * length * 0.0588, p0.y + length * 0.04, length * 0.07, length * 0.0588, '#FDC858', '#21686C', length * 0.001));
        _this.primitives.push(_this.createLine(p0.x + n * length * 0.0588, p0.y + length * 0.075, p0.x + length * 0.059 + n * length * 0.0588, p0.y + length * 0.075, '#055659', length * 0.001));
        var a = p0.x + length * 0.0282 + n * length * 0.0588;
        var b = p0.y + length * 0.0576;
        var c = p0.x + length * 0.0322 + n * length * 0.0588;
        var d = p0.y + length * 0.0676;
        // a = c, b = d; // анимация выключателя
        _this.primitives.push(_this.createLineSwitch(a, b, p0.x + length * 0.0202 + n * length * 0.0588, p0.y + length * 0.0676, p0.x + length * 0.0082 + n * length * 0.0588, p0.y + length * 0.0676, p0.x + length * 0.0082 + n * length * 0.0588, p0.y + length * 0.0476, p0.x + length * 0.0502 + n * length * 0.0588, p0.y + length * 0.0476, p0.x + length * 0.0502 + n * length * 0.0588, p0.y + length * 0.0676, c, d, '#055659', length * 0.003));
        _this.primitives.push(_this.createLine(p0.x + n * length * 0.0588 + length * 0.0294, p0.y + length * 0.006, p0.x + n * length * 0.0588 + length * 0.0294, p0.y + length * 0.0476, '#055659', length * 0.003));
        _this.primitives.push(_this.createText(p0.x + n * length * 0.0585 + length * 0.009, p0.y + length * 0.087, 'Cell # ' + (n + 1), length * 0.013));
        _this.primitives.push(_this.createCircle(p0.x + length * 0.0082 + n * length * 0.0588, p0.y + length * 0.0676, length * 0.0025, '#6BC4A6'));
        _this.primitives.push(_this.createCircle(p0.x + length * 0.0502 + n * length * 0.0588, p0.y + length * 0.0676, length * 0.0025, '#6BC4A6'));
        return _this;
    }
    UndergroundSubstationCell.prototype.createRectangle = function (x, y, height, width, fill, stroke, strokeWidth) {
        return new konva_1.default.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    UndergroundSubstationCell.prototype.createLine = function (x1, y1, x2, y2, stroke, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    UndergroundSubstationCell.prototype.createLineSwitch = function (x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, x7, y7, stroke, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, x7, y7],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    UndergroundSubstationCell.prototype.createText = function (x, y, text, fontSize) {
        return new konva_1.default.Text({
            x: x,
            y: y,
            text: text,
            fontSize: fontSize,
            fontStyle: 'bold',
            fontFamily: 'Roboto',
            fill: 'black'
        });
    };
    UndergroundSubstationCell.prototype.createCircle = function (x, y, radius, fill) {
        return new konva_1.default.Circle({
            x: x,
            y: y,
            radius: radius,
            fill: fill,
        });
    };
    UndergroundSubstationCell.prototype.nextFrame = function () {
        if (this.propBit) {
            switch (this.animationFrame) {
                case 0:
                    this.primitives[2].attrs.points[0] = this.primitives[2].attrs.points[12];
                    this.primitives[2].attrs.points[1] = this.primitives[2].attrs.points[13];
                    this.animationFrame = 1;
                    break;
                case 1:
                    this.primitives[2].attrs.points[0] = this.primitives[2].attrs.points[0];
                    this.primitives[2].attrs.points[1] = this.primitives[2].attrs.points[1];
                    this.animationFrame = 0;
                    break;
            }
        }
    };
    ;
    return UndergroundSubstationCell;
}(mine_drawing_1.BaseMineDraw));
exports.UndergroundSubstationCell = UndergroundSubstationCell;
//# sourceMappingURL=undergroundSubstation.js.map