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
exports.Cage = void 0;
var konva_1 = __importDefault(require("konva"));
var mine_drawing_1 = require("./mine_drawing");
var Cage = /** @class */ (function (_super) {
    __extends(Cage, _super);
    function Cage(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'Cage';
        _this.mainFastUp = false;
        _this.mainFastDown = false;
        _this.dynamicBreak = false;
        _this.level0 = false;
        _this.ventLevel = false;
        _this.subLevel = false;
        _this.productionLevel = false;
        _this.platformDown = false;
        _this.pointLevel0 = p0.y + length * 0.31 - length * 0.061;
        _this.pointLevel1 = p0.y + length * 0.57;
        _this.pointLevel2 = p0.y + length * 0.67;
        _this.pointLevel3 = p0.y + length * 0.8;
        // линия поверхности земли
        _this.primitives.push(_this.createLine(p0.x - length, p0.y + length * 0.31, p0.x + length * 0.3, p0.y + length * 0.31, length * 0.002));
        for (var i = 0; i < 37; i++) {
            _this.primitives.push(_this.createLine(p0.x - length * 0.6 + i * length * 0.025, p0.y + length * 0.31, p0.x - length * 0.626 + i * length * 0.025, p0.y + length * 0.335, length * 0.003));
        }
        // три уровня стволов шахт
        _this.primitives.push(_this.createRectangle(p0.x - length * 0.16, p0.y + length * 0.57, length * 0.06, length * 0.42, '#AC9595', '', 0, 0));
        _this.primitives.push(_this.createRectangle(p0.x - length * 0.16, p0.y + length * 0.67, length * 0.06, length * 0.42, '#977B7B', '', 0, 0));
        _this.primitives.push(_this.createRectangle(p0.x - length * 0.16, p0.y + length * 0.8, length * 0.06, length * 0.42, '#7D5A5A', '', 0, 0));
        // указатели уровней стволов шахт
        _this.primitives.push(_this.createRectangle(p0.x + length * 0.13, p0.y + length * 0.565, length * 0.02, length * 0.059, '#FFFFFF', '#84AFB1', length * 0.003, 5));
        _this.primitives.push(_this.createRectangle(p0.x + length * 0.13, p0.y + length * 0.665, length * 0.02, length * 0.059, '#FFFFFF', '#84AFB1', length * 0.003, 5));
        _this.primitives.push(_this.createRectangle(p0.x + length * 0.13, p0.y + length * 0.795, length * 0.02, length * 0.059, '#FFFFFF', '#84AFB1', length * 0.003, 5));
        _this.primitives.push(_this.createText(p0.x + length * 0.145, p0.y + length * 0.571, '228 m', length * 0.0096));
        _this.primitives.push(_this.createText(p0.x + length * 0.145, p0.y + length * 0.671, '246 m', length * 0.0096));
        _this.primitives.push(_this.createText(p0.x + length * 0.145, p0.y + length * 0.801, '270 m', length * 0.0096));
        // вертикальный ствол шахты
        _this.primitives.push(_this.createRectangleTrunk(p0.x, p0.y, length, length * 0.1, length * 0.003));
        // домик
        _this.primitives.push(_this.createLineHouse(p0.x - length * 0.35, p0.y + length * 0.31, p0.x - length * 0.35, p0.y + length * 0.15, p0.x - length * 0.265, p0.y + length * 0.1, p0.x - length * 0.18, p0.y + length * 0.15, p0.x - length * 0.18, p0.y + length * 0.31));
        _this.primitives.push(_this.createRectangle(p0.x - length * 0.33, p0.y + length * 0.16, length * 0.13, length * 0.15, '#CBDEDE', '', 0, 0));
        // привод клети
        _this.primitives.push(_this.createCircle(p0.x - length * 0.24, p0.y + length * 0.24, length * 0.035, '#055659', length * 0.006, '#331A38'));
        _this.primitives.push(_this.createCircle(p0.x - length * 0.24, p0.y + length * 0.24, length * 0.015, '#FDC858', 0, ''));
        _this.primitives.push(_this.createCircle(p0.x + length * 0.036, p0.y + length * 0.07, length * 0.016, '#FDC858', length * 0.005, '#331A38'));
        _this.primitives.push(_this.createLine(p0.x - length * 0.24, p0.y + length * 0.205, p0.x + length * 0.03, p0.y + length * 0.055, length * 0.006));
        //  подвижная клеть
        _this.primitives.push(_this.createLine(p0.x + length * 0.052, p0.y + length * 0.07, p0.x + length * 0.052, _this.pointLevel2, length * 0.006));
        _this.primitives.push(_this.createRectangle(p0.x + length * 0.02, _this.pointLevel2, length * 0.061, length * 0.061, '#FE982A', '#331A38', length * 0.006, 0));
        // крыша клети
        _this.primitives.push(_this.createRectangle(p0.x - length * 0.15, p0.y - length * 0.05, length * 0.03, length * 0.3, '#005236', '', 0, 0));
        _this.primitives.push(_this.createLineHouseRoof(p0.x - length * 0.1, p0.y + length * 0.31, p0.x + length * 0.11, p0.y - length * 0.05, p0.x + length * 0.13, p0.y - length * 0.05, p0.x - length * 0.08, p0.y + length * 0.31));
        console.log(_this.primitives[34]);
        return _this;
    }
    ;
    Cage.prototype.createRectangle = function (x, y, height, width, fill, stroke, strokeWidth, cornerRadius) {
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
    Cage.prototype.createRectangleTrunk = function (x, y, height, width, strokeWidth) {
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
    Cage.prototype.createLine = function (x1, y1, x2, y2, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2],
            stroke: '#331A38',
            strokeWidth: strokeWidth,
        });
    };
    Cage.prototype.createLineHouse = function (x1, y1, x2, y2, x3, y3, x4, y4, x5, y5) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5],
            fill: '#331A38',
            closed: true,
        });
    };
    Cage.prototype.createLineHouseRoof = function (x1, y1, x2, y2, x3, y3, x4, y4) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4],
            fill: '#005236',
            closed: true,
        });
    };
    Cage.prototype.createText = function (x, y, text, fontSize) {
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
    Cage.prototype.createCircle = function (x, y, radius, fill, strokeWidth, stroke) {
        return new konva_1.default.Circle({
            x: x,
            y: y,
            radius: radius,
            stroke: stroke,
            strokeWidth: strokeWidth,
            fill: fill,
        });
    };
    Cage.prototype.setBaseProperty = function (mes) {
        this.mainFastUp = mes.mainFastUp;
        this.mainFastDown = mes.mainFastDown;
        this.dynamicBreak = mes.dynamicBreak;
        this.level0 = mes.level0;
        this.ventLevel = mes.ventLevel;
        this.subLevel = mes.subLevel;
        this.productionLevel = mes.productionLevel;
        this.platformDown = mes.platformDown;
    };
    Cage.prototype.nextFrame = function () {
        if (this.mainFastUp) {
            if (this.primitives[54].attrs.points[3] > this.pointLevel0) {
                this.primitives[54].attrs.points[3] = this.primitives[54].attrs.points[3] - 5;
                this.primitives[55].move({ x: 0, y: -5 });
            }
            else {
                this.primitives[54].attrs.points[3] = this.pointLevel3;
                this.primitives[55].y(this.pointLevel3);
            }
        }
        if (this.mainFastDown) {
            if (this.primitives[54].attrs.points[3] < this.pointLevel3) {
                this.primitives[54].attrs.points[3] = this.primitives[54].attrs.points[3] + 5;
                this.primitives[55].move({ x: 0, y: 5 });
            }
            else {
                this.primitives[54].attrs.points[3] = this.pointLevel0;
                this.primitives[55].y(this.pointLevel0);
            }
        }
        if (this.level0) {
            this.primitives[54].attrs.points[3] = this.pointLevel0;
            this.primitives[55].y(this.pointLevel0);
        }
        if (this.ventLevel) {
            this.primitives[54].attrs.points[3] = this.pointLevel1;
            this.primitives[55].y(this.pointLevel1);
        }
        if (this.subLevel) {
            this.primitives[54].attrs.points[3] = this.pointLevel2;
            this.primitives[55].y(this.pointLevel2);
        }
        if (this.productionLevel) {
            this.primitives[54].attrs.points[3] = this.pointLevel3;
            this.primitives[55].y(this.pointLevel3);
        }
    };
    return Cage;
}(mine_drawing_1.BaseMineDraw));
exports.Cage = Cage;
;
//# sourceMappingURL=cage.js.map