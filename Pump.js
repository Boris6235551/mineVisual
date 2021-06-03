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
exports.Undegraund = exports.Pump = exports.PumpState = void 0;
var konva_1 = __importDefault(require("konva"));
var mine_drawing_1 = require("./mine_drawing");
var PumpState;
(function (PumpState) {
    PumpState[PumpState["run"] = 0] = "run";
    PumpState[PumpState["revers"] = 1] = "revers";
    PumpState[PumpState["stop"] = 2] = "stop";
    PumpState[PumpState["alarm"] = 3] = "alarm";
})(PumpState = exports.PumpState || (exports.PumpState = {}));
;
var Pump = /** @class */ (function (_super) {
    __extends(Pump, _super);
    function Pump(p0, length, disposition) {
        var _this = _super.call(this, p0, length, disposition) || this;
        _this.name = 'Pump';
        _this.state = PumpState;
        var p00 = _this.rect.p0;
        var p02 = _this.rect.getMiddlePoint();
        // верхний прямоугольник 0
        var x = p02.x - length * 0.05;
        var y = p00.y;
        var height = length * 0.035;
        var width = length * 0.1;
        var fill = '#C4C4C4';
        if (disposition == mine_drawing_1.Disposition.Vertical)
            _this.primitives.push(_this.createRectangle(x, y, height, width, fill));
        else
            _this.primitives.push(_this.createRectangle(p00.x, p02.y - length * 0.05, width, height, fill));
        // нижний прямоугольник 1
        y = p00.y + length * 0.954;
        if (disposition == mine_drawing_1.Disposition.Vertical)
            _this.primitives.push(_this.createRectangle(x, y, height, width, fill));
        else
            _this.primitives.push(_this.createRectangle(p00.x + length * 0.954, p02.y - length * 0.05, width, height, fill));
        // центральный прямоугольик 2
        x = p00.x, y = p02.y - length * 0.361, height = length * 0.71, width = _this.calcSize(length);
        fill = '#EFEFEF';
        var stroke = '#AEB4B4';
        var strokeWidth = length * 0.0135;
        var cornerRadius = 0.05 * length;
        if (disposition == mine_drawing_1.Disposition.Vertical)
            _this.primitives.push(_this.createRectangle(x, y, height, width, fill, stroke, strokeWidth, cornerRadius));
        else
            _this.primitives.push(_this.createRectangle(p02.x - length * 0.361, p00.y, width, height, fill, stroke, strokeWidth, cornerRadius));
        // верхняя пирамида верх 3
        x = p02.x - length * 0.035;
        y = p00.y + length * 0.035;
        height = length * 0.05;
        width = length * 0.07;
        fill = '#02A96D';
        if (disposition == mine_drawing_1.Disposition.Vertical)
            _this.primitives.push(_this.createRectangle(x, y, height, width, fill));
        else
            _this.primitives.push(_this.createRectangle(p00.x + length * 0.035, p02.y - length * 0.035, width, height, fill));
        // верхняя пирамида низ 4
        x = p02.x - length * 0.11;
        y = p00.y + length * 0.085;
        width = length * 0.22;
        if (disposition == mine_drawing_1.Disposition.Vertical)
            _this.primitives.push(_this.createRectangle(x, y, height, width, fill));
        else
            _this.primitives.push(_this.createRectangle(p00.x + length * 0.085, p02.y - length * 0.11, width, height, fill));
        // нижняя пирамида верх 5
        x = p02.x - length * 0.11;
        y = p00.y + length * 0.858;
        if (disposition == mine_drawing_1.Disposition.Vertical)
            _this.primitives.push(_this.createRectangle(x, y, height, width, fill));
        else
            _this.primitives.push(_this.createRectangle(p00.x + length * 0.858, p02.y - length * 0.11, width, height, fill));
        // нижняя пирамида низ 6
        x = p02.x - length * 0.035;
        y = p00.y + length * 0.907;
        width = length * 0.07;
        if (disposition == mine_drawing_1.Disposition.Vertical)
            _this.primitives.push(_this.createRectangle(x, y, height, width, fill));
        else
            _this.primitives.push(_this.createRectangle(p00.x + length * 0.907, p02.y - length * 0.035, width, height, fill));
        // центральный прямоугольник анимации 7
        x = p00.x + length * 0.00675, y = p02.y - length * 0.29, height = length * 0.58,
            width = _this.calcSize(length) - length * 0.0135;
        fill = '#1D8EEA';
        stroke = '';
        strokeWidth = 0;
        cornerRadius = 0;
        if (disposition == mine_drawing_1.Disposition.Vertical)
            _this.primitives.push(_this.createRectangle(x, y, height, width, fill, stroke, strokeWidth, cornerRadius));
        else
            _this.primitives.push(_this.createRectangle(p02.x - length * 0.29, p00.y + length * 0.00675, width, height, fill, stroke, strokeWidth, cornerRadius));
        // белый прямоугольник анимации1 8
        x = p00.x + length * 0.00675, y = p02.y - length * 0.29, height = length * 0.084, width = _this.calcSize(length) - length * 0.0135;
        fill = '#EDF6FC';
        stroke = '';
        strokeWidth = 0;
        cornerRadius = 0;
        if (disposition == mine_drawing_1.Disposition.Vertical)
            _this.primitives.push(_this.createRectangle(x, y, height, width, fill, stroke, strokeWidth, cornerRadius));
        else
            _this.primitives.push(_this.createRectangle(p02.x - length * 0.29, p00.y + length * 0.00675, width, height, fill, stroke, strokeWidth, cornerRadius));
        // белый прямоугольник анимации2 9
        y = p02.y - length * 0.042;
        if (disposition == mine_drawing_1.Disposition.Vertical)
            _this.primitives.push(_this.createRectangle(x, y, height, width, fill, stroke, strokeWidth, cornerRadius));
        else
            _this.primitives.push(_this.createRectangle(p02.x - length * 0.042, p00.y + length * 0.00675, width, height, fill, stroke, strokeWidth, cornerRadius));
        // белый прямоугольник анимации3 10
        y = p02.y + length * 0.206;
        if (disposition == mine_drawing_1.Disposition.Vertical)
            _this.primitives.push(_this.createRectangle(x, y, height, width, fill, stroke, strokeWidth, cornerRadius));
        else
            _this.primitives.push(_this.createRectangle(p02.x + length * 0.206, p00.y + length * 0.00675, width, height, fill, stroke, strokeWidth, cornerRadius));
        _this.step = length * 0.084;
        var R = length * 0.14;
        var r = length * 0.06;
        // окружность внешняя 11
        x = p02.x;
        y = p02.y;
        var radius = R;
        stroke = '#444343';
        strokeWidth = length * 0.01;
        fill = '';
        _this.primitives.push(_this.createCircle(x, y, radius, fill, stroke, strokeWidth));
        // окружность средняя 12
        radius = r;
        fill = '#A1DC77';
        _this.primitives.push(_this.createCircle(x, y, radius, fill, stroke, strokeWidth));
        // окружность внутренняя  13
        radius = length * 0.04;
        fill = '#00C734';
        _this.primitives.push(_this.createCircle(x, y, radius, fill, stroke, strokeWidth));
        // линия 1 14
        var p0lx = p02.x;
        var p0ly = p02.y - r;
        var p1lx = p02.x - R * Math.sin(45);
        var p1ly = p02.y - R * Math.cos(45);
        _this.primitives.push(_this.createLine(p0lx, p0ly, p1lx, p1ly, stroke, strokeWidth, p02));
        // линия 2 15
        p0lx = p02.x - r * Math.sin(120);
        p0ly = p02.y + r * Math.cos(120);
        p1lx = p02.x - R * Math.sin(75);
        p1ly = p02.y + R * Math.cos(75);
        _this.primitives.push(_this.createLine(p0lx, p0ly, p1lx, p1ly, stroke, strokeWidth, p02));
        // линия 3 16
        p0lx = p02.x + r * Math.sin(240);
        p0ly = p02.y + r * Math.cos(240);
        p1lx = p02.x + R * Math.sin(285);
        p1ly = p02.y + R * Math.cos(285);
        _this.primitives.push(_this.createLine(p0lx, p0ly, p1lx, p1ly, stroke, strokeWidth, p02));
        return _this;
    }
    Pump.prototype.calcSize = function (length, factor) {
        if (factor === void 0) { factor = 2.57; }
        return this.getOdd(length / factor);
    };
    ;
    Pump.prototype.setState = function (newState) {
        this.state = newState;
    };
    Pump.prototype.createRectangle = function (x, y, height, width, fill, stroke, strokeWidth, cornerRadius) {
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
    Pump.prototype.createCircle = function (x, y, radius, fill, stroke, strokeWidth) {
        return new konva_1.default.Circle({
            x: x,
            y: y,
            radius: radius,
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    Pump.prototype.createLine = function (p0lx, p0ly, p1lx, p1ly, stroke, strokeWidth, p02) {
        return new konva_1.default.Line({
            x: p02.x,
            y: p02.y,
            points: [p0lx, p0ly, p1lx, p1ly],
            stroke: stroke,
            strokeWidth: strokeWidth,
            offset: {
                x: p02.x,
                y: p02.y,
            },
        });
    };
    Pump.prototype.showFrame = function (fill2, fill3, fill4, fill5, fill6, fill7, fill8, fill9, fill10, fill12, fill13, stroke2, stroke7, stroke11, stroke12, stroke13, stroke14, stroke15, stroke16, strokeWidth7) {
        this.primitives[2].fill(fill2);
        this.primitives[3].fill(fill3);
        this.primitives[4].fill(fill4);
        this.primitives[5].fill(fill5);
        this.primitives[6].fill(fill6);
        this.primitives[7].fill(fill7);
        this.primitives[8].fill(fill8);
        this.primitives[9].fill(fill9);
        this.primitives[10].fill(fill10);
        this.primitives[12].fill(fill12);
        this.primitives[13].fill(fill13);
        this.primitives[2].stroke(stroke2);
        this.primitives[7].stroke(stroke7);
        this.primitives[11].stroke(stroke11);
        this.primitives[12].stroke(stroke12);
        this.primitives[13].stroke(stroke13);
        this.primitives[14].stroke(stroke14);
        this.primitives[15].stroke(stroke15);
        this.primitives[16].stroke(stroke16);
        this.primitives[7].strokeWidth(strokeWidth7);
    };
    Pump.prototype.nextFrame = function (angel) {
        if (angel === void 0) { angel = 30; }
        var dy = this.step;
        switch (this.state) {
            case PumpState.run:
                this.primitives[14].rotate(angel);
                this.primitives[15].rotate(angel);
                this.primitives[16].rotate(angel);
                if (this.animationFrame < 2) {
                    dy = this.step;
                    this.primitives[10].fill('');
                    this.animationFrame += 1;
                }
                else {
                    dy = -(2 * this.step);
                    this.primitives[10].fill('#EDF6FC');
                    this.animationFrame = 0;
                }
                if (this.disposition == mine_drawing_1.Disposition.Vertical) {
                    this.primitives[8].move({ x: 0, y: dy });
                    this.primitives[9].move({ x: 0, y: dy });
                    this.primitives[10].move({ x: 0, y: dy });
                }
                else {
                    this.primitives[8].move({ x: dy, y: 0 });
                    this.primitives[9].move({ x: dy, y: 0 });
                    this.primitives[10].move({ x: dy, y: 0 });
                }
                return;
            case PumpState.revers:
                this.primitives[14].rotate(angel);
                this.primitives[15].rotate(angel);
                this.primitives[16].rotate(angel);
                if (this.animationFrame < 2) {
                    dy = this.step;
                    this.primitives[8].fill('');
                    this.animationFrame += 1;
                }
                else {
                    dy = -(2 * this.step);
                    this.primitives[8].fill('#EDF6FC');
                    this.animationFrame = 0;
                }
                if (this.disposition == mine_drawing_1.Disposition.Vertical) {
                    this.primitives[8].move({ x: 0, y: -dy });
                    this.primitives[9].move({ x: 0, y: -dy });
                    this.primitives[10].move({ x: 0, y: -dy });
                }
                else {
                    this.primitives[8].move({ x: -dy, y: 0 });
                    this.primitives[9].move({ x: -dy, y: 0 });
                    this.primitives[10].move({ x: -dy, y: 0 });
                }
                return;
            case PumpState.stop:
                this.showFrame('#EFEFEF', '#FE668B', '#AEB4B4', '#AEB4B4', '#FE668B', '#EDF6FC', '', '', '', '#CFCDCD', '#7E7D7D', '#AEB4B4', '#D99CAB', '#AAA6A6', '#AAA6A6', '#AAA6A6', '#AAA6A6', '#AAA6A6', '#AAA6A6', 3);
                return;
            case PumpState.alarm:
                if (this.animationFrame == 0) {
                    this.showFrame('#000000', '#DB0000', '#DB0000', '#DB0000', '#DB0000', '#EDF6FC', '', '', '', '#000000', '#FF0000', '#000000', '#000000', '#444343', '#444343', '#444343', '#444343', '#444343', '#444343', 3);
                    this.animationFrame = 1;
                }
                else {
                    this.showFrame('#DB0000', '#000000', '#000000', '#000000', '#000000', '#EDF6FC', '', '', '', '#000000', '#FF0000', '#000000', '#DB0000', '#000000', '#444343', '#444343', '#444343', '#444343', '#444343', 3);
                    this.animationFrame = 0;
                }
                return;
        }
    };
    return Pump;
}(mine_drawing_1.BaseMineDraw));
exports.Pump = Pump;
var Undegraund = /** @class */ (function (_super) {
    __extends(Undegraund, _super);
    function Undegraund(p0, length, disposition) {
        var _this = _super.call(this, p0, length, mine_drawing_1.Disposition.Vertical) || this;
        var p1lx = p0.x + _this.calcSize(length) / 2;
        var p1ly = p0.y;
        var p2lx = p0.x + _this.calcSize(length) / 2;
        var p2ly = p0.y + length;
        var p3lx = p0.x + length;
        var p3ly = p0.y + length;
        var p4lx = p0.x + length;
        var p4ly = p0.y;
        var offsetX = length * 0.5 - _this.calcSize(length) * 0.25;
        _this.primitives.push(_this.createLineUndegraund(p1lx, p1ly, p2lx, p2ly, p3lx, p3ly, p4lx, p4ly, length * 0.0157, offsetX, 0));
        p1lx = p0.x + length, p1ly = p0.y,
            p2lx = p3lx = p4lx = p0.x + 1.1 * length,
            p2ly = p3ly = p4ly = p0.y + 0.1 * length;
        for (var i = 0; i < length; i = i + 0.1 * length)
            _this.primitives.push(_this.createLineUndegraund(p1lx, p1ly, p2lx, p2ly, p3lx, p3ly, p4lx, p4ly, length * 0.0157, offsetX, -i));
        p1lx = p0.x + length - offsetX, p1ly = p0.y + length,
            p2lx = p3lx = p4lx = p0.x + 0.9 * length - offsetX,
            p2ly = p3ly = p4ly = p0.y + 0.1 * length + length;
        for (var i = 0; i < 0.8 * length; i = i + 0.1 * length)
            _this.primitives.push(_this.createLineUndegraund(p1lx, p1ly, p2lx, p2ly, p3lx, p3ly, p4lx, p4ly, length * 0.0157, i, 0));
        p1lx = p0.x + _this.calcSize(length) / 2, p1ly = p0.y + length,
            p2lx = p3lx = p4lx = p0.x - 0.1 * length + _this.calcSize(length) / 2,
            p2ly = p3ly = p4ly = p0.y + 0.9 * length;
        for (var i = 0; i < length; i = i + 0.1 * length)
            _this.primitives.push(_this.createLineUndegraund(p1lx, p1ly, p2lx, p2ly, p3lx, p3ly, p4lx, p4ly, length * 0.0157, offsetX, i));
        _this.primitives[1].hide();
        _this.primitives[5].hide();
        _this.primitives[6].hide();
        console.log(_this.primitives);
        return _this;
    }
    Undegraund.prototype.setState = function (newState) {
        this.state = newState == PumpState.run ? PumpState.revers : newState;
    };
    Undegraund.prototype.createLineUndegraund = function (p1lx, p1ly, p2lx, p2ly, p3lx, p3ly, p4lx, p4ly, strokeWidth, offsetX, offsetY) {
        return new konva_1.default.Line({
            points: [p1lx, p1ly, p2lx, p2ly, p3lx, p3ly, p4lx, p4ly],
            stroke: '#980505',
            strokeWidth: strokeWidth,
            offset: {
                x: offsetX,
                y: offsetY,
            },
        });
    };
    return Undegraund;
}(Pump));
exports.Undegraund = Undegraund;
//# sourceMappingURL=Pump.js.map