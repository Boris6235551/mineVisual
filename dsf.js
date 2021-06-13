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
exports.Pile = exports.InformationTable = exports.ArrowPointer = exports.ReceivingHopper = exports.BatcherRight = exports.BatcherLeft = exports.Stone = exports.Crush = exports.ConeCrusher = exports.SeparatorLeft = exports.SeparatorRight = exports.Conveyor = void 0;
var konva_1 = __importDefault(require("konva"));
var mine_drawing_1 = require("./mine_drawing");
var Conveyor = /** @class */ (function (_super) {
    __extends(Conveyor, _super);
    function Conveyor(p0, length, heightConveyor) {
        var _this = _super.call(this, p0, length, heightConveyor) || this;
        _this.name = 'Conveyor';
        _this.primitives.push(_this.createLine(p0.x, p0.y, length)); // primitive 0
        _this.primitives.push(_this.createLine(p0.x, p0.y + heightConveyor, length)); // primitive 1
        _this.primitives.push(_this.createCircle(p0.x, p0.y + heightConveyor / 2, heightConveyor / 2 + 1.5, 'white', 3, '#331A38')); // primitive 2
        _this.primitives.push(_this.createCircle(p0.x + length, p0.y + heightConveyor / 2, heightConveyor / 2 + 1.5, 'white', 3, '#331A38')); // primitive 3
        _this.primitives.push(_this.createRectangle(p0.x, p0.y, heightConveyor, length)); // primitive 4
        _this.primitives.push(_this.createCircle(p0.x, p0.y + heightConveyor / 2, heightConveyor / 2, '#481D88', length * 0.01, '#FDC858')); // primitive 5
        _this.primitives.push(_this.createCircle(p0.x + length, p0.y + heightConveyor / 2, heightConveyor / 2, '#481D88', length * 0.01, '#FDC858')); // primitive 6
        _this.primitives.push(_this.createCircle(p0.x, p0.y + heightConveyor / 2, heightConveyor / 4.57, '#8AC171', length * 0.01, '#FDC858')); // primitive 7
        _this.primitives.push(_this.createCircle(p0.x + length, p0.y + heightConveyor / 2, heightConveyor / 4.57, '#8AC171', length * 0.01, '#FDC858')); // primitive 8
        return _this;
    }
    ;
    Conveyor.prototype.createRectangle = function (x, y, height, width) {
        return new konva_1.default.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: '#6BC4A6',
        });
    };
    Conveyor.prototype.createLine = function (x, y, length) {
        return new konva_1.default.Line({
            points: [x, y, length + x, y],
            stroke: '#331A38',
            strokeWidth: 6,
        });
    };
    Conveyor.prototype.createCircle = function (x, y, radius, fill, strokeWidth, stroke) {
        return new konva_1.default.Circle({
            x: x,
            y: y,
            radius: radius,
            stroke: stroke,
            strokeWidth: strokeWidth,
            fill: fill,
        });
    };
    Conveyor.prototype.setBaseProperty = function (mes) {
        // mes = {
        //     "upPositionA": false,
        // }
        this.positionUp = mes.upPositionA;
    };
    Conveyor.prototype.nextFrame = function () {
        if (this.propBit)
            this.primitives[4].fill('#6BC4A6');
        else
            this.primitives[4].fill('red');
    };
    return Conveyor;
}(mine_drawing_1.BaseMineDraw));
exports.Conveyor = Conveyor;
;
var SeparatorRight = /** @class */ (function (_super) {
    __extends(SeparatorRight, _super);
    function SeparatorRight(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        // let i: number;
        _this.primitives.push(_this.createLineTriple(p0.x + length * 0.04, p0.y + length * 0.12, p0.x + length * 0.96, p0.y + length * 0.58, length * 0.1, '#FB6AA3'));
        _this.primitives.push(_this.createLineTriple(p0.x + length * 0.06, p0.y + length * 0.22, p0.x + length * 0.9, p0.y + length * 0.64, length * 0.08, '#055659'));
        _this.primitives.push(_this.createLine(p0.x + length * 0.2, p0.y + length, p0.x, p0.y, p0.x + length, p0.y + length * 0.5, p0.x + length * 0.6, p0.y + length, length * 0.08, '#055659'));
        for (var i = 2; i <= 10; i++) {
            _this.primitives.push(_this.createRectangle(p0.x + length * 0.1 + length * 0.08 * i, p0.y - length * 0.001 + length * 0.04 * i, length * 0.08, length * 0.26));
        }
        return _this;
    }
    ;
    SeparatorRight.prototype.createRectangle = function (x, y, height, width) {
        return new konva_1.default.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: '',
            rotation: 118
        });
    };
    SeparatorRight.prototype.createLine = function (x1, y1, x2, y2, x3, y3, x4, y4, strokeWidth, stroke) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    ;
    SeparatorRight.prototype.createLineTriple = function (x1, y1, x2, y2, strokeWidth, stroke) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    ;
    SeparatorRight.prototype.showFrame = function (fill3, fill4, fill5, fill6, fill7, fill8, fill9, fill10, fill11) {
        this.primitives[3].fill(fill3);
        this.primitives[4].fill(fill4);
        this.primitives[5].fill(fill5);
        this.primitives[6].fill(fill6);
        this.primitives[7].fill(fill7);
        this.primitives[8].fill(fill8);
        this.primitives[9].fill(fill9);
        this.primitives[10].fill(fill10);
        this.primitives[11].fill(fill11);
    };
    ;
    SeparatorRight.prototype.nextFrame = function () {
        if (this.propBit) {
            switch (this.animationFrame) {
                case 1:
                    this.showFrame('', '', 'white', '', 'white', '', 'white', '', 'white');
                    this.animationFrame = 0;
                    break;
                case 0:
                    this.showFrame('', 'white', '', 'white', '', 'white', '', 'white', '');
                    this.animationFrame = 1;
                    break;
            }
        }
    };
    return SeparatorRight;
}(mine_drawing_1.BaseMineDraw));
exports.SeparatorRight = SeparatorRight;
var SeparatorLeft = /** @class */ (function (_super) {
    __extends(SeparatorLeft, _super);
    function SeparatorLeft(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.primitives.push(_this.createLineTriple(p0.x - length * 0.04, p0.y + length * 0.12, p0.x - length * 0.96, p0.y + length * 0.58, length * 0.1, '#FB6AA3'));
        _this.primitives.push(_this.createLineTriple(p0.x - length * 0.06, p0.y + length * 0.22, p0.x - length * 0.9, p0.y + length * 0.64, length * 0.08, '#055659'));
        _this.primitives.push(_this.createLine(p0.x - length * 0.2, p0.y + length, p0.x, p0.y, p0.x - length, p0.y + length * 0.5, p0.x - length * 0.6, p0.y + length, length * 0.08, '#055659'));
        for (var i = 2; i <= 10; i++) {
            _this.primitives.push(_this.createRectangle(p0.x - length * 0.043 - length * 0.08 * i, p0.y - length * 0.028 + length * 0.04 * i, length * 0.08, length * 0.26));
        }
        return _this;
    }
    ;
    SeparatorLeft.prototype.createRectangle = function (x, y, height, width) {
        return new konva_1.default.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: '',
            rotation: 63
        });
    };
    SeparatorLeft.prototype.createLine = function (x1, y1, x2, y2, x3, y3, x4, y4, strokeWidth, stroke) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    ;
    SeparatorLeft.prototype.createLineTriple = function (x1, y1, x2, y2, strokeWidth, stroke) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    ;
    SeparatorLeft.prototype.showFrame = function (fill3, fill4, fill5, fill6, fill7, fill8, fill9, fill10, fill11) {
        this.primitives[3].fill(fill3);
        this.primitives[4].fill(fill4);
        this.primitives[5].fill(fill5);
        this.primitives[6].fill(fill6);
        this.primitives[7].fill(fill7);
        this.primitives[8].fill(fill8);
        this.primitives[9].fill(fill9);
        this.primitives[10].fill(fill10);
        this.primitives[11].fill(fill11);
    };
    ;
    SeparatorLeft.prototype.nextFrame = function () {
        if (this.propBit) {
            switch (this.animationFrame) {
                case 1:
                    this.showFrame('', '', 'white', '', 'white', '', 'white', '', 'white');
                    this.animationFrame = 0;
                    break;
                case 0:
                    this.showFrame('', 'white', '', 'white', '', 'white', '', 'white', '');
                    this.animationFrame = 1;
                    break;
            }
        }
    };
    return SeparatorLeft;
}(mine_drawing_1.BaseMineDraw));
exports.SeparatorLeft = SeparatorLeft;
var ConeCrusher = /** @class */ (function (_super) {
    __extends(ConeCrusher, _super);
    function ConeCrusher(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        var rotation = -10; // угол наклона во время движения
        // большой треугольник
        _this.primitives.push(_this.createTriangle(p0.x, p0.y, length, length, '#44B5A1', rotation, '481D88', length * 0.02));
        // вложенный треугольник
        _this.primitives.push(_this.createTriangle(p0.x, p0.y, length * 0.5, length, '#FA458C', rotation, '', 0));
        _this.primitives.push(_this.createCircle(p0.x, p0.y - length, length * 0.1));
        _this.primitives.push(_this.createRectangle(p0.x + length * 0.35, p0.y - length * 1.2, length * 0.1, length * 2, 60));
        _this.primitives.push(_this.createRectangle(p0.x - length * 0.28, p0.y - length * 1.16, length * 0.1, length * 2, 120));
        return _this;
    }
    ;
    ConeCrusher.prototype.createTriangle = function (x, y, radius, length, fill, rotation, stroke, strokeWidth) {
        return new konva_1.default.RegularPolygon({
            x: x,
            y: y - length,
            sides: 3,
            radius: radius,
            fill: fill,
            rotation: rotation,
            offset: { x: 0, y: -length },
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    ConeCrusher.prototype.createCircle = function (x, y, radius) {
        return new konva_1.default.Circle({
            x: x,
            y: y,
            radius: radius,
            fill: '#481D88'
        });
    };
    ConeCrusher.prototype.createRectangle = function (x, y, height, width, rotationRectangle) {
        return new konva_1.default.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: '#005236',
            rotation: rotationRectangle
        });
    };
    ConeCrusher.prototype.nextFrame = function () {
        if (this.propBit) {
            switch (this.animationFrame) {
                case 0:
                    this.primitives[0].rotation(-10);
                    this.primitives[1].rotation(-10);
                    this.animationFrame = 1;
                    break;
                case 1:
                    this.primitives[0].rotation(0);
                    this.primitives[1].rotation(0);
                    this.animationFrame = 2;
                    break;
                case 2:
                    this.primitives[0].rotation(10);
                    this.primitives[1].rotation(10);
                    this.animationFrame = 0;
                    break;
            }
        }
    };
    ;
    return ConeCrusher;
}(mine_drawing_1.BaseMineDraw));
exports.ConeCrusher = ConeCrusher;
var Crush = /** @class */ (function (_super) {
    __extends(Crush, _super);
    function Crush(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'Crush';
        // трапеция грохота
        _this.primitives.push(_this.createLine(p0.x, p0.y, p0.x + length * 0.3, p0.y, p0.x + length * 0.7, p0.y + length, p0.x, p0.y + length, '#005236', '', 0));
        // два белых круга двигателя грохота
        _this.primitives.push(_this.createCircle(p0.x + length * 1.05, p0.y - length * 0.1, length * 0.265, 'white', length * 0.03, 'black'));
        _this.primitives.push(_this.createCircle(p0.x + length * 1.6, p0.y + length * 0.95, length * 0.115, 'white', length * 0.03, 'black'));
        // белая трапеция двигателя грохота
        _this.primitives.push(_this.createLine(p0.x + length * 0.8, p0.y, p0.x + length * 1.5, p0.y + length, p0.x + length * 1.7, p0.y + length * 0.9, p0.x + length * 1.3, p0.y - length * 0.2, 'white', '', length * 0.03));
        // двигатель грохота
        _this.primitives.push(_this.createLine(// backgroud
        p0.x + length * 1.3, p0.y - length * 0.2, p0.x + length * 0.8, p0.y, p0.x + length * 1.5, p0.y + length, p0.x + length * 1.7, p0.y + length * 0.9, '#8AC171', '', 0));
        _this.primitives.push(_this.createLine(p0.x + length * 0.8, p0.y, p0.x + length * 1.5, p0.y + length, p0.x + length * 1.5, p0.y + length, p0.x + length * 1.5, p0.y + length, '', '#000000', length * 0.03));
        _this.primitives.push(_this.createLine(p0.x + length * 1.3, p0.y - length * 0.2, p0.x + length * 1.7, p0.y + length * 0.9, p0.x + length * 1.7, p0.y + length * 0.9, p0.x + length * 1.7, p0.y + length * 0.9, '', '#000000', length * 0.03));
        _this.primitives.push(_this.createCircle(p0.x + length * 1.05, p0.y - length * 0.1, length * 0.24, '#6BC4A6', length * 0.02, '#FDC858'));
        _this.primitives.push(_this.createCircle(p0.x + length * 1.05, p0.y - length * 0.1, length * 0.1, '#481D88', length * 0.04, '#FA458C'));
        _this.primitives.push(_this.createCircle(p0.x + length * 1.6, p0.y + length * 0.95, length * 0.098, '#6BC4A6', length * 0.02, '#FDC858'));
        _this.primitives.push(_this.createCircle(p0.x + length * 1.6, p0.y + length * 0.95, length * 0.05, '#481D88', length * 0.02, '#FA458C'));
        // правая подвижная часть грохота
        _this.primitives.push(_this.createLineMove([p0.x + length * 1.1, p0.y, p0.x + length * 0.9, p0.y + length,
            p0.x + length * 0.9, p0.y + length, p0.x + length * 0.9, p0.y + length], '', '#005236', length * 0.07));
        return _this;
    }
    ;
    Crush.prototype.createLineMove = function (points, fill, stroke, strokeWidth) {
        return new konva_1.default.Line({
            points: points,
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            closed: true,
        });
    };
    Crush.prototype.createLine = function (x1, y1, x2, y2, x3, y3, x4, y4, fill, stroke, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4],
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            closed: true,
        });
    };
    Crush.prototype.createCircle = function (x, y, radius, fill, strokeWidth, stroke) {
        return new konva_1.default.Circle({
            x: x,
            y: y,
            radius: radius,
            stroke: stroke,
            strokeWidth: strokeWidth,
            fill: fill,
        });
    };
    Crush.prototype.nextFrame = function () {
        if (this.propBit) {
            switch (this.animationFrame) {
                case 0:
                    this.primitives[11].attrs.points[0] = this.primitives[11].attrs.points[0] - 15;
                    this.animationFrame = 1;
                    break;
                case 1:
                    this.primitives[11].attrs.points[0] = this.primitives[11].attrs.points[0] + 15;
                    this.animationFrame = 0;
                    break;
            }
        }
    };
    ;
    return Crush;
}(mine_drawing_1.BaseMineDraw));
exports.Crush = Crush;
;
var Stone = /** @class */ (function (_super) {
    __extends(Stone, _super);
    function Stone(p0, radius) {
        var _this = _super.call(this, p0, radius) || this;
        _this.name = 'Stone';
        // degrees to radians
        function toRad(degrees) {
            var pi = Math.PI;
            return degrees * (pi / 180);
        }
        ;
        /* quadrant */
        var xy = 0;
        var _xy = 1;
        var _x_y = 2;
        var x_y = 3;
        function getPoint(radius, degrees, quadrant) {
            var x;
            var y;
            switch (quadrant) {
                case xy:
                    x = radius * Math.cos(toRad(degrees));
                    y = radius * Math.cos(toRad(90 - degrees));
                    break;
                case _xy:
                    x = -radius * Math.cos(toRad(90 - degrees));
                    y = radius * Math.cos(toRad(degrees));
                    break;
                case _x_y:
                    x = -radius * Math.cos(toRad(degrees));
                    y = -radius * Math.cos(toRad(90 - degrees));
                    break;
                case x_y:
                    x = radius * Math.cos(toRad(90 - degrees));
                    y = -radius * Math.cos(toRad(degrees));
                    break;
            }
            return { x: x, y: y };
        }
        var stone1 = [
            40, xy,
            50, _xy,
            60, _x_y,
            15, x_y,
            50, x_y
        ];
        var p = [];
        for (var i = 0; i < stone1.length; i = i + 2) {
            p[i] = getPoint(radius, stone1[i], stone1[i + 1]);
            // console.log(p);
        }
        console.log(p);
        _this.primitives.push(_this.createLine(p0.x + p[0].x, p0.y + p[0].y, p0.x + p[2].x, p0.y + p[2].y, p0.x + p[4].x, p0.y + p[4].y, p0.x + p[6].x, p0.y + p[6].y, p0.x + p[8].x, p0.y + p[8].y));
        return _this;
    }
    Stone.prototype.createLine = function (x1, y1, x2, y2, x3, y3, x4, y4, x5, y5) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5],
            fill: '#FE982A',
            closed: true,
        });
    };
    return Stone;
}(mine_drawing_1.BaseMineDraw));
exports.Stone = Stone;
;
var BatcherLeft = /** @class */ (function (_super) {
    __extends(BatcherLeft, _super);
    function BatcherLeft(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        var colorState = '';
        _this.primitives.push(_this.createLine(p0.x, p0.y, p0.x, p0.y + length, p0.x - length * 2, p0.y + length * 1.4, p0.x - length * 2, p0.y + length * 1.1, '#46802B', '', 0));
        return _this;
    }
    ;
    BatcherLeft.prototype.createLine = function (x1, y1, x2, y2, x3, y3, x4, y4, fill, stroke, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4],
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            closed: true,
        });
    };
    return BatcherLeft;
}(mine_drawing_1.BaseMineDraw));
exports.BatcherLeft = BatcherLeft;
var BatcherRight = /** @class */ (function (_super) {
    __extends(BatcherRight, _super);
    function BatcherRight(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.primitives.push(_this.createLine(p0.x, p0.y, p0.x, p0.y + length, p0.x + length * 2, p0.y + length * 1.4, p0.x + length * 2, p0.y + length * 1.1, '#46802B', '', 0));
        return _this;
    }
    ;
    BatcherRight.prototype.createLine = function (x1, y1, x2, y2, x3, y3, x4, y4, fill, stroke, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4],
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            closed: true,
        });
    };
    return BatcherRight;
}(mine_drawing_1.BaseMineDraw));
exports.BatcherRight = BatcherRight;
var ReceivingHopper = /** @class */ (function (_super) {
    __extends(ReceivingHopper, _super);
    function ReceivingHopper(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.bunkHighUnload = false;
        _this.bunkLowUnload = false;
        // p0 верхняя левая точка
        _this.primitives.push(_this.createLine(p0.x, p0.y, p0.x + length, p0.y, p0.x + length * 0.71, p0.y + length * 0.49, p0.x + length * 0.79, p0.y + length * 0.67, p0.x + length * 0.21, p0.y + length * 0.67, p0.x + length * 0.29, p0.y + length * 0.49, '#21686C', '', 0));
        _this.primitives.push(_this.createLineReceivingHopper(p0.x + length * 0.057, p0.y + length * 0.1, p0.x + length * 0.94, p0.y + length * 0.1, length * 0.02));
        _this.primitives.push(_this.createLineReceivingHopper(p0.x + length * 0.12, p0.y + length * 0.21, p0.x + length * 0.88, p0.y + length * 0.21, length * 0.02));
        _this.primitives.push(_this.createLineReceivingHopper(p0.x + length * 0.19, p0.y + length * 0.32, p0.x + length * 0.81, p0.y + length * 0.32, length * 0.02));
        _this.primitives.push(_this.createLineReceivingHopper(p0.x + length * 0.25, p0.y + length * 0.43, p0.x + length * 0.75, p0.y + length * 0.43, length * 0.02));
        _this.primitives.push(_this.createLineReceivingHopper(p0.x + length * 0.27, p0.y + length * 0.54, p0.x + length * 0.73, p0.y + length * 0.54, length * 0.02));
        // mode bunkLowUnload
        _this.primitives.push(_this.createLine(p0.x + length * 0.26, p0.y + length * 0.43, p0.x + length * 0.75, p0.y + length * 0.43, p0.x + length * 0.79, p0.y + length * 0.67, p0.x + length * 0.21, p0.y + length * 0.67, p0.x + length * 0.26, p0.y + length * 0.43, p0.x + length * 0.26, p0.y + length * 0.43, '', '', 0));
        // mode bunkHighUnload
        _this.primitives.push(_this.createLine(p0.x, p0.y, p0.x + length, p0.y, p0.x + length * 0.88, p0.y + length * 0.21, p0.x + length * 0.12, p0.y + length * 0.21, p0.x, p0.y, p0.x, p0.y, '', '', 0));
        _this.primitives.push(_this.createLine(p0.x + length * 0.355, p0.y + length * 0.69, p0.x + length * 0.5, p0.y + length * 0.45, p0.x + length * 0.645, p0.y + length * 0.69, p0.x + length * 0.355, p0.y + length * 0.69, p0.x + length * 0.355, p0.y + length * 0.69, p0.x + length * 0.355, p0.y + length * 0.69, 'white', '', 0));
        return _this;
        // this.setBaseProperty(null);
    }
    ReceivingHopper.prototype.createLine = function (x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, fill, stroke, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6],
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            closed: true,
        });
    };
    ReceivingHopper.prototype.createLineReceivingHopper = function (x1, y1, x2, y2, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2],
            stroke: '#FDC858',
            strokeWidth: strokeWidth,
        });
    };
    ReceivingHopper.prototype.setBaseProperty = function (mes) {
        // mes = {
        //     "bunkHighUnload": true,
        //     "bunkLowUnload": true,
        // }
        this.bunkHighUnload = mes.bunkHighUnload;
        this.bunkLowUnload = mes.bunkLowUnload;
    };
    ReceivingHopper.prototype.nextFrame = function () {
        if (this.bunkHighUnload) {
            this.primitives[6].fill('red');
        }
        if (this.bunkLowUnload) {
            this.primitives[7].fill('red');
        }
    };
    return ReceivingHopper;
}(mine_drawing_1.BaseMineDraw));
exports.ReceivingHopper = ReceivingHopper;
var ArrowPointer = /** @class */ (function (_super) {
    __extends(ArrowPointer, _super);
    function ArrowPointer(p0, lengthWidth, lengthHeight, color) {
        var _this = _super.call(this, p0, lengthWidth) || this;
        _this.primitives.push(_this.createLine(p0.x, p0.y, p0.x - lengthWidth, p0.y, color, 2));
        _this.primitives.push(_this.createLine(p0.x, p0.y, p0.x, p0.y + lengthHeight, color, 2));
        _this.primitives.push(_this.createTriangle(p0.x, p0.y + lengthHeight, color, 7));
        return _this;
    }
    ArrowPointer.prototype.createLine = function (x1, y1, x2, y2, stroke, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    ;
    ArrowPointer.prototype.createTriangle = function (x, y, fill, radius) {
        return new konva_1.default.RegularPolygon({
            x: x,
            y: y,
            sides: 3,
            radius: radius,
            fill: fill,
            rotation: 180,
        });
    };
    return ArrowPointer;
}(mine_drawing_1.BaseMineDraw));
exports.ArrowPointer = ArrowPointer;
var InformationTable = /** @class */ (function (_super) {
    __extends(InformationTable, _super);
    function InformationTable(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.primitives.push(_this.createRectangle(p0.x, p0.y, length * 0.6, length, length * 0.05));
        return _this;
    }
    InformationTable.prototype.createRectangle = function (x, y, height, width, strokeWidth) {
        return new konva_1.default.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            stroke: 'black',
            strokeWidth: strokeWidth,
            cornerRadius: 10,
        });
    };
    return InformationTable;
}(mine_drawing_1.BaseMineDraw));
exports.InformationTable = InformationTable;
var Pile = /** @class */ (function (_super) {
    __extends(Pile, _super);
    function Pile(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.primitives.push(_this.createTriangle(p0.x, p0.y, length * 0.5, '', 'black', length * 0.03));
        return _this;
    }
    Pile.prototype.createTriangle = function (x, y, radius, fill, stroke, strokeWidth) {
        return new konva_1.default.RegularPolygon({
            x: x,
            y: y,
            sides: 3,
            radius: radius,
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    return Pile;
}(mine_drawing_1.BaseMineDraw));
exports.Pile = Pile;
//# sourceMappingURL=dsf.js.map