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
exports.Generator = exports.Incomers = exports.SubstationCell = exports.UndergroundSubstationCell = exports.Cell = exports.Trunk = void 0;
var konva_1 = __importDefault(require("konva"));
var mine_drawing_1 = require("./mine_drawing");
var utils_1 = require("./utils");
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
var Cell = /** @class */ (function (_super) {
    __extends(Cell, _super);
    function Cell(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'SubstationCell';
        return _this;
    }
    Cell.prototype.createRectangle = function (x, y, height, width, fill, stroke, strokeWidth) {
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
    Cell.prototype.createLine = function (x1, y1, x2, y2, stroke, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    Cell.prototype.createLineSwitch = function (x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, x7, y7, stroke, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, x7, y7],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    Cell.prototype.createText = function (x, y, text, fontSize) {
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
    Cell.prototype.createCircle = function (x, y, radius, fill) {
        return new konva_1.default.Circle({
            x: x,
            y: y,
            radius: radius,
            fill: fill,
        });
    };
    return Cell;
}(mine_drawing_1.BaseMineDraw));
exports.Cell = Cell;
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
}(Cell));
exports.UndergroundSubstationCell = UndergroundSubstationCell;
var SubstationCell = /** @class */ (function (_super) {
    __extends(SubstationCell, _super);
    function SubstationCell(p0, length, firstNumber, amount) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'Substation';
        _this.cell = new Array();
        _this.firstNumber = firstNumber;
        _this.amount = amount;
        var n;
        for (n = firstNumber; n < amount; n++) {
            _this.cell[n] = false;
            // ячейки
            _this.primitives.push(_this.createRectangle(p0.x + n * length * 0.0588, p0.y + length * 0.04, length * 0.07, length * 0.0588, 'rgba(253, 200, 88, 0.54)', '#46802B', length * 0.001));
            _this.primitives.push(_this.createLine(p0.x + n * length * 0.0588, p0.y + length * 0.075, p0.x + length * 0.059 + n * length * 0.0588, p0.y + length * 0.075, '#46802B', length * 0.001));
            // вертикальная линия соединения ячейки с шиной
            _this.primitives.push(_this.createLine(p0.x + n * length * 0.0588 + length * 0.0294, p0.y + length * 0.007, p0.x + n * length * 0.0588 + length * 0.0294, p0.y + length * 0.0476, '#84AFB1', length * 0.003));
            _this.primitives.push(_this.createText(p0.x + n * length * 0.0585 + length * 0.009, p0.y + length * 0.087, 'Cell # ' + (n + 1), length * 0.013));
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
    SubstationCell.prototype.setBaseProperty = function (mes) {
        // mes = {
        //     "C1": true,
        //     "C2": true,
        //     "C3": false,
        //     "C4": false,
        //     "C5": false,
        //     "C6": false,
        //     "C7": true,
        //     "D1": true,
        //     "D2": false,
        //     "D3": false,
        //     "D4": false,
        //     "D5": true,
        //     "D6": false,
        //     "D7": true,
        //     "D8": true,
        //     "B1": true,
        //     "B2": true,
        // }
        for (var n = 0; n < 15; n++) {
            this.cell[n] = Object.values(mes)[n];
        }
    };
    SubstationCell.prototype.nextFrame = function () {
        for (var n = 0; n < (this.amount - this.firstNumber); n++) {
            if (this.cell[this.firstNumber + n]) {
                this.primitives[n * 7 + 4].attrs.points[0] = this.primitives[n * 7 + 4].attrs.points[12];
                this.primitives[n * 7 + 4].attrs.points[1] = this.primitives[n * 7 + 4].attrs.points[13];
                this.primitives[n * 7 + 4].stroke('#055659');
                this.primitives[n * 7 + 2].stroke('#055659');
                this.primitives[n * 7].fill('#FDC858');
                this.primitives[n * 7 + 5].fill('#6BC4A6');
                this.primitives[n * 7 + 6].fill('#6BC4A6');
            }
            else {
                this.primitives[n * 7 + 4].attrs.points[0] = this.primitives[n * 7 + 4].attrs.points[0];
                this.primitives[n * 7 + 4].attrs.points[1] = this.primitives[n * 7 + 4].attrs.points[1];
                this.primitives[n * 7 + 4].stroke('#84AFB1');
                this.primitives[n * 7 + 2].stroke('#84AFB1');
                this.primitives[n * 7].fill('rgba(253, 200, 88, 0.54)');
                this.primitives[n * 7 + 5].fill('#C46B6B');
                this.primitives[n * 7 + 6].fill('#C46B6B');
            }
        }
    };
    ;
    return SubstationCell;
}(Cell));
exports.SubstationCell = SubstationCell;
var Incomers = /** @class */ (function (_super) {
    __extends(Incomers, _super);
    function Incomers(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'Substation';
        _this.incomer = new Array();
        _this.primitives.push(_this.createLine(// this.primitives[0].attrs.points[5]  switch A1
        p0.x - length * 2.41, p0.y - length, p0.x - length * 2.74, p0.y - length, p0.x - length * 3.07, p0.y - length, length * 0.02));
        _this.primitives.push(_this.createLine(// this.primitives[1].attrs.points[5]  switch A2
        p0.x - length * 1.75, p0.y - length, p0.x - length * 2.08, p0.y - length, p0.x - length * 2.41, p0.y - length, length * 0.02));
        _this.primitives.push(_this.createLine(// this.primitives[2].attrs.points[5]  switch A4
        p0.x + length * 2.7, p0.y - length, p0.x + length * 3.03, p0.y - length, p0.x + length * 3.36, p0.y - length, length * 0.02));
        _this.primitives.push(_this.createLine(// this.primitives[3].attrs.points[5]  switch A5
        p0.x + length * 3.36, p0.y - length, p0.x + length * 3.69, p0.y - length, p0.x + length * 4.02, p0.y - length, length * 0.02));
        _this.primitives.push(_this.createLine(// this.primitives[4].attrs.points[4]  switch B1
        p0.x + length * 0.8, p0.y, p0.x + length * 0.8, p0.y - length * 0.33, p0.x + length * 0.8, p0.y - length * 0.66, length * 0.02));
        _this.primitives.push(_this.createLine(// this.primitives[5].attrs.points[5]  switch B2
        p0.x, p0.y, p0.x + length * 0.33, p0.y, p0.x + length * 0.66, p0.y, length * 0.02));
        _this.primitives.push(_this.createLine(// this.primitives[6].attrs.points[4]  switch B3
        p0.x + length * 0.15, p0.y, p0.x + length * 0.15, p0.y - length * 0.33, p0.x + length * 0.15, p0.y - length * 0.66, length * 0.02));
        // ------------------------------------------------------------------------------------
        _this.primitives.push(_this.createLine(p0.x + length * 0.66, p0.y, p0.x + length, p0.y, p0.x + length, p0.y, length * 0.02));
        _this.primitives.push(_this.createLine(p0.x + length * 0.15, p0.y - length * 0.66, p0.x + length * 0.15, p0.y - length, p0.x + length * 0.15, p0.y - length, length * 0.02));
        _this.primitives.push(_this.createLine(p0.x + length * 0.8, p0.y - length * 0.66, p0.x + length * 0.8, p0.y - length, p0.x + length * 0.8, p0.y - length, length * 0.02));
        _this.primitives.push(_this.createLine(p0.x + length * 0.15, p0.y - length, p0.x - length * 0.85, p0.y - length, p0.x - length * 0.85, p0.y - length, length * 0.02));
        _this.primitives.push(_this.createLine(p0.x + length * 0.8, p0.y - length, p0.x + length * 1.8, p0.y - length, p0.x + length * 1.8, p0.y - length, length * 0.02));
        _this.primitives.push(_this.createCircle(p0.x - length * 1.1, p0.y - length, length * 0.25, length * 0.02));
        _this.primitives.push(_this.createCircle(p0.x - length * 1.5, p0.y - length, length * 0.25, length * 0.02));
        _this.primitives.push(_this.createCircle(p0.x + length * 2.05, p0.y - length, length * 0.25, length * 0.02));
        _this.primitives.push(_this.createCircle(p0.x + length * 2.45, p0.y - length, length * 0.25, length * 0.02));
        _this.primitives.push(_this.createLine(p0.x - length * 3.07, p0.y - length, p0.x - length * 4.07, p0.y - length, p0.x - length * 4.07, p0.y - length, length * 0.02));
        _this.primitives.push(_this.createLine(p0.x + length * 4.02, p0.y - length, p0.x + length * 5.02, p0.y - length, p0.x + length * 5.02, p0.y - length, length * 0.02));
        _this.primitives.push(_this.createCircle(p0.x + length * 0.15, p0.y, length * 0.01, length * 0.05));
        _this.primitives.push(_this.createCircle(p0.x + length * 0.8, p0.y, length * 0.01, length * 0.05));
        // label draw
        _this.primitives = _this.primitives.concat(utils_1.CreateLabel(p0.newPointMoved(-length * 3, -length * 0.8), null, 'A1', 20, 27));
        _this.primitives = _this.primitives.concat(utils_1.CreateLabel(p0.newPointMoved(-length * 2.3, -length * 0.8), null, 'A2', 20, 27));
        _this.primitives = _this.primitives.concat(utils_1.CreateLabel(p0.newPointMoved(-length * 0.4, -length * 0.8), null, 'B3', 20, 27));
        _this.primitives = _this.primitives.concat(utils_1.CreateLabel(p0.newPointMoved(length * 1, -length * 0.8), null, 'B1', 20, 27));
        _this.primitives = _this.primitives.concat(utils_1.CreateLabel(p0.newPointMoved(length * 3, -length * 0.8), null, 'A4', 20, 27));
        _this.primitives = _this.primitives.concat(utils_1.CreateLabel(p0.newPointMoved(length * 3.7, -length * 0.8), null, 'A5', 20, 27));
        _this.primitives = _this.primitives.concat(utils_1.CreateLabel(p0.newPointMoved(length * 0.3, length * 0.1), null, 'B2', 20, 27));
        _this.buttonOn = [
            _this.primitives[0].attrs.points[5],
            _this.primitives[1].attrs.points[5],
            _this.primitives[2].attrs.points[5],
            _this.primitives[3].attrs.points[5],
            _this.primitives[4].attrs.points[4],
            _this.primitives[5].attrs.points[5],
            _this.primitives[6].attrs.points[4]
        ];
        _this.buttonOff = [
            _this.primitives[0].attrs.points[5] - 20,
            _this.primitives[1].attrs.points[5] - 20,
            _this.primitives[2].attrs.points[5] - 20,
            _this.primitives[3].attrs.points[5] - 20,
            _this.primitives[4].attrs.points[4] - 20,
            _this.primitives[5].attrs.points[5] - 20,
            _this.primitives[6].attrs.points[4] - 20
        ];
        return _this;
        // this.setBaseProperty(null)
    }
    Incomers.prototype.createLine = function (x1, y1, x2, y2, x3, y3, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2, x3, y3],
            stroke: 'black',
            strokeWidth: strokeWidth,
        });
    };
    Incomers.prototype.createCircle = function (x, y, radius, strokeWidth) {
        return new konva_1.default.Circle({
            x: x,
            y: y,
            radius: radius,
            fill: '',
            stroke: 'black',
            strokeWidth: strokeWidth,
        });
    };
    Incomers.prototype.setBaseProperty = function (mes) {
        // mes = {
        //     "A1": false,
        //     "A2": false,
        //     "A4": false,
        //     "A5": false,
        //     "B1": false,
        //     "B2": false,
        //     "B3": false,
        // }
        for (var n = 0; n < 7; n++) {
            this.incomer[n] = Object.values(mes)[n];
        }
    };
    Incomers.prototype.nextFrame = function () {
        for (var n = 0; n < 7; n++) {
            if (this.incomer[n]) {
                if (n == 4 || n == 6)
                    this.primitives[n].attrs.points[4] = this.buttonOn[n];
                else
                    this.primitives[n].attrs.points[5] = this.buttonOn[n];
            }
            else {
                if (n == 4 || n == 6)
                    this.primitives[n].attrs.points[4] = this.buttonOff[n];
                else
                    this.primitives[n].attrs.points[5] = this.buttonOff[n];
            }
        }
    };
    ;
    return Incomers;
}(mine_drawing_1.BaseMineDraw));
exports.Incomers = Incomers;
var Generator = /** @class */ (function (_super) {
    __extends(Generator, _super);
    function Generator(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'Generator';
        _this.generators = new Array();
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
    Generator.prototype.nextFrame = function () {
        if (this.propBit) {
            this.primitives[1].fill('#42732B');
            this.primitives[2].fill('#CBDEDE');
            this.primitives[3].fill('#C6FFAC');
            this.primitives[4].stroke('#005236');
            this.primitives[5].stroke('#005236');
            this.primitives[6].stroke('#005236');
            this.primitives[8].fill('#005236');
            this.primitives[9].fill('#005236');
            this.primitives[10].fill('#005236');
        }
        else {
            this.primitives[1].fill('#923434');
            this.primitives[2].fill('#F2A5A5');
            this.primitives[3].fill('#E4C0C0');
            this.primitives[4].stroke('#DB1010');
            this.primitives[5].stroke('#DB1010');
            this.primitives[6].stroke('#DB1010');
            this.primitives[8].fill('#DB1010');
            this.primitives[9].fill('#DB1010');
            this.primitives[10].fill('#DB1010');
        }
    };
    return Generator;
}(mine_drawing_1.BaseMineDraw));
exports.Generator = Generator;
;
//# sourceMappingURL=substation.js.map