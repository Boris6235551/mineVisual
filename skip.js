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
var Skip = /** @class */ (function (_super) {
    __extends(Skip, _super);
    function Skip(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'Skip';
        _this.length = length;
        _this.topSkip = _this.length * 0.34;
        _this.bottomSkip = _this.length * 1.04;
        _this.positionUp = false;
        _this.positionDown = false;
        _this.moveUp = false;
        _this.moveDown = false;
        _this.slowlyUp = false;
        _this.slowlyDown = false;
        _this.skipLoadA = false;
        _this.skipLoadB = false;
        _this.openA = false;
        _this.openB = false;
        // линия поверхности земли
        _this.primitives.push(_this.createLine(p0.x, p0.y + length * 0.31, p0.x + length * 0.57, p0.y + length * 0.31, length * 0.002));
        for (var i = 0; i < 28; i++) {
            _this.primitives.push(_this.createLine(p0.x + i * length * 0.02, p0.y + length * 0.31, p0.x + length * 0.02 + i * length * 0.02, p0.y + length * 0.33, length * 0.002));
        }
        _this.primitives.push(_this.createLine(p0.x, p0.y + length * 0.31, p0.x - length * 0.33, p0.y + length * 0.31, length * 0.002));
        for (var i = 0; i < 16; i++) {
            _this.primitives.push(_this.createLine(p0.x - i * length * 0.02, p0.y + length * 0.31, p0.x - length * 0.02 - i * length * 0.02, p0.y + length * 0.33, length * 0.002));
        }
        for (var i = 0; i < 44; i++) {
            _this.primitives.push(_this.createLine(p0.x, p0.y + length * 0.31 + i * length * 0.02, p0.x - length * 0.02, p0.y + length * 0.33 + i * length * 0.02, length * 0.002));
        }
        for (var i = 0; i < 44; i++) {
            _this.primitives.push(_this.createLine(p0.x + length * 0.2, p0.y + length * 0.31 + i * length * 0.02, p0.x + length * 0.22, p0.y + length * 0.33 + i * length * 0.02, length * 0.002));
        }
        //  вертикальный ствол шахты
        _this.primitives.push(_this.createRectangleTrunk(p0.x, p0.y, length * 1.2, length * 0.2, length * 0.003));
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
        // скип 1
        _this.primitives.push(_this.createLine(p0.x + length * 0.052, p0.y + length * 0.07, p0.x + length * 0.052, p0.y + length * 0.57, length * 0.006));
        _this.primitives.push(_this.createRectangle(p0.x + length * 0.02, p0.y + length * 0.57, length * 0.08, length * 0.061, '#331A38', '#FDC858', length * 0.006, 0));
        //  скип 2
        _this.primitives.push(_this.createLine(p0.x + length * 0.152, p0.y + length * 0.17, p0.x + length * 0.152, p0.y + length * 0.57, length * 0.006));
        _this.primitives.push(_this.createRectangle(p0.x + length * 0.12, p0.y + length * 0.57, length * 0.08, length * 0.061, '#331A38', '#FDC858', length * 0.006, 0));
        // крыша скипа
        _this.primitives.push(_this.createRectangle(p0.x - length * 0.02, p0.y - length * 0.05, length * 0.03, length * 0.3, '#005236', '', 0, 0));
        _this.primitives.push(_this.createLineHouseRoof(p0.x + length * 0.29, p0.y + length * 0.31, p0.x + length * 0.02, p0.y - length * 0.05, p0.x, p0.y - length * 0.05, p0.x + length * 0.27, p0.y + length * 0.31));
        //  две верхние крышки скипов 
        _this.primitives.push(_this.createRectangle(p0.x + length * 0.02 - length * 0.1, _this.topSkip, length * 0.01, length * 0.1, 'red', '', 0, 0));
        _this.primitives.push(_this.createRectangle(p0.x + length * 0.12 + length * 0.061, _this.topSkip, length * 0.01, length * 0.1, 'red', '', 0, 0));
        // скрытие верхних крышек скипов
        _this.hidingCover();
        return _this;
        // this.setBaseProperty(null)
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
    Skip.prototype.hidingCover = function () {
        this.primitives[149].visible(false);
        this.primitives[150].visible(false);
    };
    Skip.prototype.setBaseProperty = function (mes) {
        // mes = {
        //     "upPositionA": false,
        //     "downPositionA": true,
        //     "openA": false,
        //     "openB": false,
        //     "normalUp": false,
        //     "normalDown": false,
        //     "slowlyUp": false,
        //     "slowlyDown": true,
        //     "bunkHighUnload": false,
        //     "bunkLowUnload": false
        // }
        this.positionUp = mes.onPositionA;
        this.positionDown = mes.onPositionB;
        this.moveUp = mes.normalUp;
        this.moveDown = mes.normalDown;
        this.slowlyUp = mes.slowlyUp;
        this.slowlyDown = mes.slowlyDown;
        this.openA = mes.openA;
        this.openB = mes.openB;
    };
    Skip.prototype.moveSkip = function (speedA, speedB) {
        this.primitives[143].attrs.points[3] = this.primitives[143].attrs.points[3] + speedA;
        this.primitives[144].move({ x: 0, y: speedA });
        this.primitives[145].attrs.points[3] = this.primitives[145].attrs.points[3] + speedB;
        this.primitives[146].move({ x: 0, y: speedB });
    };
    Skip.prototype.nextFrame = function () {
        this.hidingCover();
        if (this.positionUp) { // положение скипа А вверху, а скипа В внизу
            this.primitives[143].attrs.points[3] = (this.topSkip);
            this.primitives[144].y(this.topSkip);
            this.primitives[145].attrs.points[3] = (this.bottomSkip);
            this.primitives[146].y(this.bottomSkip);
        }
        if (this.positionDown) { // положение скипа А внизу, а скипа В вверху
            this.primitives[143].attrs.points[3] = this.bottomSkip;
            this.primitives[144].y(this.bottomSkip);
            this.primitives[145].attrs.points[3] = this.topSkip;
            this.primitives[146].y(this.topSkip);
        }
        if (this.moveUp || this.slowlyUp) { // быстрое движение скипа А вверх, а скипа В вниз
            if (this.primitives[143].attrs.points[3] >= this.topSkip) {
                var speedA = void 0;
                var speedB = void 0;
                if (this.moveUp) {
                    speedA = -6;
                    speedB = 6;
                }
                else {
                    speedA = -3;
                    speedB = 3;
                }
                this.moveSkip(speedA, speedB);
            }
            else {
                this.primitives[143].attrs.points[3] = this.bottomSkip;
                this.primitives[144].y(this.bottomSkip);
                this.primitives[145].attrs.points[3] = this.topSkip;
                this.primitives[146].y(this.topSkip);
            }
        }
        if (this.moveDown || this.slowlyDown) { // быстрое движение скипа А вниз, а скипа В вверх
            if (this.primitives[143].attrs.points[3] <= this.bottomSkip) {
                var speedA = void 0;
                var speedB = void 0;
                if (this.moveDown) {
                    speedA = 6;
                    speedB = -6;
                }
                else {
                    speedA = 3;
                    speedB = -3;
                }
                this.moveSkip(speedA, speedB);
            }
            else {
                this.primitives[143].attrs.points[3] = this.topSkip;
                this.primitives[144].y(this.topSkip);
                this.primitives[145].attrs.points[3] = this.bottomSkip;
                this.primitives[146].y(this.bottomSkip);
            }
        }
        this.primitives[149].visible(this.openA);
        this.primitives[150].visible(this.openB);
        // if (this.openB) {
        //     // this.primitives[143].attrs.points[3] = this.bottomSkip;
        //     // this.primitives[144].y(this.bottomSkip);
        //     // this.primitives[145].attrs.points[3] = this.topSkip;
        //     // this.primitives[146].y(this.topSkip);
        //     this.primitives[150].visible(true);
        // }
    };
    return Skip;
}(mine_drawing_1.BaseMineDraw));
exports.Skip = Skip;
;
//# sourceMappingURL=skip.js.map