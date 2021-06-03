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
exports.Skip = void 0;
var konva_1 = __importDefault(require("konva"));
var mine_drawing_1 = require("./mine_drawing");
// export enum SkipState {
//     stop = 0, run, leftUp, rightUp
// };
var Skip = /** @class */ (function (_super) {
    __extends(Skip, _super);
    function Skip(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'Skip';
        // линия поверхности земли
        _this.primitives.push(_this.createLine(p0.x, p0.y + length * 0.31, p0.x + length * 0.57, p0.y + length * 0.31, length * 0.002));
        for (var i = 0; i < 28; i++) {
            _this.primitives.push(_this.createLine(p0.x + i * length * 0.02, p0.y + length * 0.31, p0.x + length * 0.02 + i * length * 0.02, p0.y + length * 0.33, length * 0.002));
        }
        _this.primitives.push(_this.createLine(p0.x, p0.y + length * 0.31, p0.x - length * 0.57, p0.y + length * 0.31, length * 0.002));
        for (var i = 0; i < 28; i++) {
            _this.primitives.push(_this.createLine(p0.x - i * length * 0.02, p0.y + length * 0.31, p0.x - length * 0.02 - i * length * 0.02, p0.y + length * 0.33, length * 0.002));
        }
        for (var i = 0; i < 54; i++) {
            _this.primitives.push(_this.createLine(p0.x, p0.y + length * 0.31 + i * length * 0.02, p0.x - length * 0.02, p0.y + length * 0.33 + i * length * 0.02, length * 0.002));
        }
        for (var i = 0; i < 54; i++) {
            _this.primitives.push(_this.createLine(p0.x + length * 0.2, p0.y + length * 0.31 + i * length * 0.02, p0.x + length * 0.22, p0.y + length * 0.33 + i * length * 0.02, length * 0.002));
        }
        //  вертикальный ствол шахты
        _this.primitives.push(_this.createRectangleTrunk(p0.x, p0.y, length * 1.4, length * 0.2, length * 0.003));
        // домик
        _this.primitives.push(_this.createLineHouse(p0.x + length * 0.42, p0.y + length * 0.31, p0.x + length * 0.42, p0.y + length * 0.15, p0.x + length * 0.485, p0.y + length * 0.1, p0.x + length * 0.55, p0.y + length * 0.15, p0.x + length * 0.55, p0.y + length * 0.31));
        _this.primitives.push(_this.createRectangle(p0.x + length * 0.42, p0.y + length * 0.16, length * 0.13, length * 0.12, '#CBDEDE', '', 0, 0));
        // привод скипа
        _this.primitives.push(_this.createCircle(p0.x + length * 0.48, p0.y + length * 0.24, length * 0.035, '#055659', length * 0.006, '#331A38'));
        _this.primitives.push(_this.createCircle(p0.x + length * 0.48, p0.y + length * 0.24, length * 0.015, '#FDC858', 0, ''));
        _this.primitives.push(_this.createCircle(p0.x + length * 0.068, p0.y + length * 0.07, length * 0.016, '#FDC858', length * 0.005, '#331A38'));
        _this.primitives.push(_this.createCircle(p0.x + length * 0.168, p0.y + length * 0.17, length * 0.016, '#FDC858', length * 0.005, '#331A38'));
        _this.primitives.push(_this.createLine(p0.x + length * 0.5, p0.y + length * 0.211, p0.x + length * 0.07, p0.y + length * 0.054, length * 0.006));
        _this.primitives.push(_this.createLine(p0.x + length * 0.47, p0.y + length * 0.274, p0.x + length * 0.16, p0.y + length * 0.15, length * 0.006));
        //  подвижные скипы
        var level1 = p0.y + length * 0.57;
        var level2 = p0.y + length * 0.67;
        var level3 = p0.y + length * 0.8;
        // скип 1
        _this.primitives.push(_this.createLine(p0.x + length * 0.052, p0.y + length * 0.07, p0.x + length * 0.052, level1, length * 0.006));
        _this.primitives.push(_this.createRectangle(p0.x + length * 0.02, level1, length * 0.08, length * 0.061, '#331A38', '#FDC858', length * 0.006, 0));
        //  скип 2
        _this.primitives.push(_this.createLine(p0.x + length * 0.152, p0.y + length * 0.17, p0.x + length * 0.152, level1, length * 0.006));
        _this.primitives.push(_this.createRectangle(p0.x + length * 0.12, level1, length * 0.08, length * 0.061, '#331A38', '#FDC858', length * 0.006, 0));
        // крыша скипа
        _this.primitives.push(_this.createRectangle(p0.x - length * 0.02, p0.y - length * 0.05, length * 0.03, length * 0.3, '#005236', '', 0, 0));
        _this.primitives.push(_this.createLineHouseRoof(p0.x + length * 0.29, p0.y + length * 0.31, p0.x + length * 0.02, p0.y - length * 0.05, p0.x, p0.y - length * 0.05, p0.x + length * 0.27, p0.y + length * 0.31));
        return _this;
    }
    Skip.prototype.createRectangle = function (x, y, height, width, fill, stroke, strokeWidth, cornerRadius) {
        return new konva_1.default.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            cornerRadius: cornerRadius,
        });
    };
    Skip.prototype.createRectangleTrunk = function (x, y, height, width, strokeWidth) {
        return new konva_1.default.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            stroke: '#331A38',
            strokeWidth: strokeWidth,
            fillLinearGradientStartPoint: { x: x + width, y: y + height },
            fillLinearGradientColorStops: [0.5, '#835757', 1, '#FFFFFF'],
        });
    };
    Skip.prototype.createLine = function (x1, y1, x2, y2, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2],
            stroke: '#331A38',
            strokeWidth: strokeWidth,
        });
    };
    Skip.prototype.createLineHouse = function (x1, y1, x2, y2, x3, y3, x4, y4, x5, y5) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5],
            fill: '#331A38',
            closed: true,
        });
    };
    Skip.prototype.createLineHouseRoof = function (x1, y1, x2, y2, x3, y3, x4, y4) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4],
            fill: '#005236',
            closed: true,
        });
    };
    Skip.prototype.createCircle = function (x, y, radius, fill, strokeWidth, stroke) {
        return new konva_1.default.Circle({
            x: x,
            y: y,
            radius: radius,
            stroke: stroke,
            strokeWidth: strokeWidth,
            fill: fill,
        });
    };
    // public setState(newState: SkipState): void {
    //     this.state = newState;
    // }
    Skip.prototype.nextFrame = function () {
        switch (this.state) {
            case 0:
                this.primitives[16].attrs.points[3] = this.level0;
                this.primitives[17].y(this.level0);
                this.primitives[10].move({ x: 0, y: -5 });
                return;
            case 1:
                this.primitives[16].attrs.points[3] = this.level1;
                this.primitives[17].y(this.level1);
                return;
            case 2:
                this.primitives[16].attrs.points[3] = this.level2;
                this.primitives[17].y(this.level2);
            case 3:
                this.primitives[16].attrs.points[3] = this.level3;
                this.primitives[17].y(this.level3);
                return;
        }
    };
    return Skip;
}(mine_drawing_1.BaseMineDraw));
exports.Skip = Skip;
;
//# sourceMappingURL=skip.js.map