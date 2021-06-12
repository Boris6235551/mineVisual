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
exports.Generator = exports.UndergroundSubstationCell = exports.SubstationCell = exports.Trunk = void 0;
var konva_1 = __importDefault(require("konva"));
var mine_drawing_1 = require("./mine_drawing");
var Trunk = /** @class */ (function (_super) {
    __extends(Trunk, _super);
    function Trunk(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'Trunk';
        // общая шина ячеек
        var i;
        _this.primitives.push(_this.createRectangle(p0.x, p0.y, length * 0.0183, length * 1.41, '', '#FA458C', length * 0.001));
        for (i = 1; i <= 5; i++) {
            _this.primitives.push(_this.createLine(p0.x, p0.y + length * 0.003 * i, p0.x + length * 1.41, p0.y + length * 0.003 * i, '#FA458C', length * 0.001));
        }
        for (i = 1; i <= 235; i++) {
            _this.primitives.push(_this.createLine(p0.x + length * 0.006 * i, p0.y, p0.x + length * 0.006 * i, p0.y + length * 0.0183, '#FA458C', length * 0.001));
        }
        _this.primitives.push(_this.createLine(p0.x, p0.y + length * 0.00915, p0.x + length * 1.41, p0.y + length * 0.00915, '#055659', length * 0.003));
        return _this;
    }
    ;
    Trunk.prototype.createRectangle = function (x, y, height, width, fill, stroke, strokeWidth) {
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
    Trunk.prototype.createLine = function (x1, y1, x2, y2, stroke, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    return Trunk;
}(mine_drawing_1.BaseMineDraw));
exports.Trunk = Trunk;
var SubstationCell = /** @class */ (function (_super) {
    __extends(SubstationCell, _super);
    function SubstationCell(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'SubstationCell';
        return _this;
    }
    SubstationCell.prototype.createRectangle = function (x, y, height, width, fill, stroke, strokeWidth) {
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
    SubstationCell.prototype.createLine = function (x1, y1, x2, y2, stroke, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    SubstationCell.prototype.createLineSwitch = function (x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, x7, y7, stroke, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, x7, y7],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    SubstationCell.prototype.createText = function (x, y, text, fontSize) {
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
    SubstationCell.prototype.createCircle = function (x, y, radius, fill) {
        return new konva_1.default.Circle({
            x: x,
            y: y,
            radius: radius,
            fill: fill,
        });
    };
    return SubstationCell;
}(mine_drawing_1.BaseMineDraw));
exports.SubstationCell = SubstationCell;
var UndergroundSubstationCell = /** @class */ (function (_super) {
    __extends(UndergroundSubstationCell, _super);
    function UndergroundSubstationCell(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'UndegroundStation';
        _this.cell = new Array();
        var n;
        // let nameCell = ['Incomer No.3', 'Pump M5', 'Pump M4', 'Pump M3', 'Bus coopler No.2', 'Incomer No.2', 'Pump M2', 'Pump M1', '', 'Bus coopler No.1', 'Incomer No.1',
        //     'Transform main - 270m', 'Transform No.2 100kVA - 270m south', 'Rectifier No.2 - 270m south', 'Transform No.1 100kVA - 270m north', 'Rectifier No.1 - 270m',
        // 'Substation No.2 - 228m']
        for (n = 0; n < 16; n++) {
            _this.cell[n] = false;
            var numberCell = n;
            if (n >= 8)
                numberCell = numberCell + 1;
            // ячейки
            _this.primitives.push(_this.createRectangle(p0.x + n * length * 0.0588, p0.y + length * 0.04, length * 0.07, length * 0.0588, 'rgba(138, 193, 113, 0.41)', '#46802B', length * 0.001));
            _this.primitives.push(_this.createLine(p0.x + n * length * 0.0588, p0.y + length * 0.075, p0.x + length * 0.059 + n * length * 0.0588, p0.y + length * 0.075, '#46802B', length * 0.001));
            // вертикальная линия соединения ячейки с шиной
            _this.primitives.push(_this.createLine(p0.x + n * length * 0.0588 + length * 0.0294, p0.y + length * 0.007, p0.x + n * length * 0.0588 + length * 0.0294, p0.y + length * 0.0476, '#84AFB1', length * 0.003));
            _this.primitives.push(_this.createText(p0.x + n * length * 0.0585 + length * 0.009, p0.y + length * 0.087, 'Cell # ' + (numberCell + 1), length * 0.013));
            // ячейки прямоугольник анимации
            // a = c, b = d анимация выключателя
            var a = p0.x + length * 0.0282 + n * length * 0.0588;
            var b = p0.y + length * 0.0576;
            var c = p0.x + length * 0.0322 + n * length * 0.0588;
            var d = p0.y + length * 0.0676;
            _this.primitives.push(_this.createLineSwitch(a, b, p0.x + length * 0.0202 + n * length * 0.0588, p0.y + length * 0.0676, p0.x + length * 0.0082 + n * length * 0.0588, p0.y + length * 0.0676, p0.x + length * 0.0082 + n * length * 0.0588, p0.y + length * 0.0476, p0.x + length * 0.0502 + n * length * 0.0588, p0.y + length * 0.0476, p0.x + length * 0.0502 + n * length * 0.0588, p0.y + length * 0.0676, c, d, '#84AFB1', length * 0.003));
            _this.primitives.push(_this.createCircle(p0.x + length * 0.0082 + n * length * 0.0588, p0.y + length * 0.0676, length * 0.0025, '#C46B6B'));
            _this.primitives.push(_this.createCircle(p0.x + length * 0.0502 + n * length * 0.0588, p0.y + length * 0.0676, length * 0.0025, '#C46B6B'));
        }
        return _this;
        // this.setBaseProperty(null)
    }
    UndergroundSubstationCell.prototype.setBaseProperty = function (mes) {
        // mes = {
        //     "cell1": true,
        //     "cell2": false,
        //     "cell3": false,
        //     "cell4": true,
        //     "cell5": false,
        //     "cell6": false,
        //     "cell7": false,
        //     "cell8": false,
        //     "cell10": false,
        //     "cell11": false,
        //     "cell12": false,
        //     "cell13": false,
        //     "cell14": false,
        //     "cell15": false,
        //     "cell16": false,
        //     "cell17": true,
        // }
        for (var n = 0; n < 16; n++) {
            this.cell[n] = Object.values(mes)[n];
        }
    };
    UndergroundSubstationCell.prototype.nextFrame = function () {
        for (var n = 0; n < 16; n++) {
            if (this.cell[n]) {
                this.primitives[n * 7 + 4].attrs.points[0] = this.primitives[n * 7 + 4].attrs.points[12];
                this.primitives[n * 7 + 4].attrs.points[1] = this.primitives[n * 7 + 4].attrs.points[13];
                this.primitives[n * 7 + 4].stroke('#055659');
                this.primitives[n * 7 + 2].stroke('#055659');
                this.primitives[n * 7].fill('#8AC171');
                this.primitives[n * 7 + 5].fill('#FDC858');
                this.primitives[n * 7 + 6].fill('#FDC858');
            }
            else {
                this.primitives[n * 7 + 4].attrs.points[0] = this.primitives[n * 7 + 4].attrs.points[0];
                this.primitives[n * 7 + 4].attrs.points[1] = this.primitives[n * 7 + 4].attrs.points[1];
                this.primitives[n * 7 + 4].stroke('#84AFB1');
                this.primitives[n * 7 + 2].stroke('#84AFB1');
                this.primitives[n * 7].fill('rgba(138, 193, 113, 0.41)');
                this.primitives[n * 7 + 5].fill('#C46B6B');
                this.primitives[n * 7 + 6].fill('#C46B6B');
            }
        }
    };
    ;
    return UndergroundSubstationCell;
}(SubstationCell));
exports.UndergroundSubstationCell = UndergroundSubstationCell;
var Generator = /** @class */ (function (_super) {
    __extends(Generator, _super);
    function Generator(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'Generator';
        _this.primitives.push(_this.createLine(p0.x - length, p0.y, p0.x + length, p0.y, '#005236', length * 0.04));
        _this.primitives.push(_this.createRectangle(p0.x - length * 0.5, p0.y - length * 0.195, length * 0.39, length));
        _this.primitives.push(_this.createCircle(p0.x, p0.y, length * 0.4, '#F2A5A5', length * 0.015, '#331A38'));
        _this.primitives.push(_this.createCircle(p0.x, p0.y, length * 0.34, '#E4C0C0', length * 0.015, '#331A38'));
        _this.primitives.push(_this.createLine(p0.x, p0.y, p0.x - (length * 0.28) * Math.cos(0), p0.y + (length * 0.28) * Math.sin(0), '#DB1010', length * 0.02));
        _this.primitives.push(_this.createLine(p0.x, p0.y, p0.x + (length * 0.28) * Math.cos(45), p0.y + (length * 0.28) * Math.sin(45), '#DB1010', length * 0.02));
        _this.primitives.push(_this.createLine(p0.x, p0.y, p0.x + (length * 0.28) * Math.cos(45), p0.y - (length * 0.28) * Math.sin(45), '#DB1010', length * 0.02));
        _this.primitives.push(_this.createCircle(p0.x, p0.y, length * 0.05, '#331A38', 0, ''));
        _this.primitives.push(_this.createEllipse(p0.x - (length * 0.28) * Math.cos(0), p0.y + (length * 0.28) * Math.sin(0), length * 0.02, length * 0.07, '#DB1010', 0));
        _this.primitives.push(_this.createEllipse(p0.x + (length * 0.28) * Math.cos(45), p0.y + (length * 0.28) * Math.sin(45), length * 0.02, length * 0.07, '#DB1010', 60));
        _this.primitives.push(_this.createEllipse(p0.x + (length * 0.28) * Math.cos(45), p0.y - (length * 0.28) * Math.sin(45), length * 0.02, length * 0.07, '#DB1010', 120));
        return _this;
    }
    Generator.prototype.createLine = function (x1, y1, x2, y2, stroke, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    Generator.prototype.createRectangle = function (x, y, height, width) {
        return new konva_1.default.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: '#923434',
        });
    };
    Generator.prototype.createCircle = function (x, y, radius, fill, strokeWidth, stroke) {
        return new konva_1.default.Circle({
            x: x,
            y: y,
            radius: radius,
            stroke: stroke,
            strokeWidth: strokeWidth,
            fill: fill,
        });
    };
    Generator.prototype.createEllipse = function (x, y, radiusX, radiusY, fill, rotation) {
        return new konva_1.default.Ellipse({
            x: x,
            y: y,
            radiusX: radiusX,
            radiusY: radiusY,
            fill: fill,
            rotation: rotation
        });
    };
    return Generator;
}(mine_drawing_1.BaseMineDraw));
exports.Generator = Generator;
//# sourceMappingURL=substation.js.map