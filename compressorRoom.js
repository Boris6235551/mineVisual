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
exports.CompressorRoom = void 0;
var konva_1 = __importDefault(require("konva"));
var mine_drawing_1 = require("./mine_drawing");
var CompressorRoom = /** @class */ (function (_super) {
    __extends(CompressorRoom, _super);
    function CompressorRoom(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'CompressorRoom';
        // общая магистраль 
        _this.primitives.push(_this.createLine(p0.x, p0.y, p0.x + length, p0.y, '#84AFB1', length * 0.03));
        _this.primitives.push(_this.createLine(p0.x - length * 0.016, p0.y, p0.x, p0.y, '#055659', length * 0.046));
        //  насосы
        for (var n = 0; n <= 3; n++) {
            var l = 0;
            while (l <= length * 0.3153) {
                _this.primitives.push(_this.createLine(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.015 + l, p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.025 + l, '#055659', length * 0.034));
                _this.primitives.push(_this.createLine(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.025 + l, p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.067 + l, '#84AFB1', length * 0.023));
                _this.primitives.push(_this.createLine(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.067 + l, p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.077 + l, '#055659', length * 0.034));
                _this.primitives.push(_this.createTriangle(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.0842 + l, length * 0.014, 180, length * 0.001));
                _this.primitives.push(_this.createTriangle(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.112 + l, length * 0.014, 0, length * 0.001));
                _this.primitives.push(_this.createLine(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.1194 + l, p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.1294 + l, '#055659', length * 0.034));
                _this.primitives.push(_this.createLine(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.1294 + l, p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.1715 + l, '#84AFB1', length * 0.023));
                _this.primitives.push(_this.createLine(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.1715 + l, p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.1815 + l, '#055659', length * 0.034));
                l = l + length * 0.3153;
            }
            _this.primitives.push(_this.createCircle(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.2558, length * 0.074, length * 0.0015));
            _this.primitives.push(_this.createRectangle(p0.x - length * 0.0116 + n * length * 0.29, p0.y + length * 0.4968, length * 0.2874, length * 0.1833));
            for (var lv = 1; lv < 9; lv++) {
                _this.primitives.push(_this.createLine(p0.x - length * 0.0116 + length * 0.0202 * lv + n * length * 0.29, p0.y + length * 0.4968, p0.x - length * 0.0116 + length * 0.0202 * lv + n * length * 0.29, p0.y + length * 0.7842, '#055659', length * 0.0037));
            }
            for (var lh = 1; lh < 14; lh++) {
                _this.primitives.push(_this.createLine(p0.x - length * 0.0116 + n * length * 0.29, p0.y + length * 0.4968 + length * 0.0206 * lh, p0.x - length * 0.0116 + length * 0.1833 + n * length * 0.29, p0.y + length * 0.4968 + length * 0.0206 * lh, '#055659', length * 0.0037));
            }
        }
        return _this;
    }
    ;
    CompressorRoom.prototype.createRectangle = function (x, y, height, width) {
        return new konva_1.default.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: '#44B5A1',
        });
    };
    CompressorRoom.prototype.createLine = function (x1, y1, x2, y2, stroke, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    CompressorRoom.prototype.createTriangle = function (x, y, radius, rotation, strokeWidth) {
        return new konva_1.default.RegularPolygon({
            x: x,
            y: y,
            sides: 3,
            radius: radius,
            fill: '#481D88',
            rotation: rotation,
            stroke: '#000000',
            strokeWidth: strokeWidth,
        });
    };
    CompressorRoom.prototype.createCircle = function (x, y, radius, strokeWidth) {
        return new konva_1.default.Circle({
            x: x,
            y: y,
            radius: radius,
            fill: '#FDC858',
            stroke: '#000000',
            strokeWidth: strokeWidth,
        });
    };
    return CompressorRoom;
}(mine_drawing_1.BaseMineDraw));
exports.CompressorRoom = CompressorRoom;
;
//# sourceMappingURL=compressorRoom.js.map