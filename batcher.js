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
exports.TongueRight = exports.TongueLeft = exports.GateRight = exports.GateLeft = exports.GateBase = exports.BatcherRight = exports.BatcherLeft = exports.BatcherBase = exports.ChuteRight = exports.ChuteLeft = exports.ChuteBase = exports.FeederRight = exports.FeederLeft = exports.FeederBase = exports.Bunker = void 0;
var konva_1 = __importDefault(require("konva"));
var mine_drawing_1 = require("./mine_drawing");
/************************************************************************
*                               EXPORTS:
*************************************************************************
*   Bunker                  (propBit - active/passive)
*   FeederLeft, FeederRight (enable - active/passive, propBit - on/off)
*   ChuteLeft, ChuteRight   (propBit - active/passive)
*   BatcherLeft, BatcherRight ()
*   GateLeft, GateRight (opened, closed)
*   TangueLeft, TangueRight (opened, closed)
*************************************************************************/
var Bunker = /** @class */ (function (_super) {
    __extends(Bunker, _super);
    function Bunker(p0, length, left) {
        if (left === void 0) { left = true; }
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'Bunker';
        _this.isLeft = left;
        // приёмный бункер
        _this.primitives.push(_this.createLineReceivingHopper(p0.x + length * 62, p0.y + length * 32, p0.x + length * 113, p0.y + length * 32, p0.x + length * 99, p0.y + length * 58, p0.x + length * 99, p0.y + length * 64, p0.x + length * 77, p0.y + length * 64, p0.x + length * 77, p0.y + length * 58, '#21686C', '#000000', length * 0.3));
        _this.primitives.push(_this.createRectangle(p0.x + length * 73, p0.y + length * 35, length * 12.2, length * 14.3, '#F9F9F9', '#FE982A', length * 1.1, length * 4.7));
        var t1 = '10';
        _this.primitives.push(_this.createText(p0.x + length * 75.5, p0.y + length * 38.5, t1 + ' t', length * 6));
        return _this;
    }
    Bunker.prototype.createLineReceivingHopper = function (x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, fill, stroke, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6],
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            closed: true,
        });
    };
    Bunker.prototype.createRectangle = function (x, y, height, width, fill, stroke, strokeWidth, cornerRadius) {
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
    Bunker.prototype.createText = function (x, y, text, fontSize) {
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
    Bunker.prototype.nextFrame = function () {
        switch (this.propBit) {
            case true:
                this.primitives[0].fill('#045658');
                break;
            case false:
                this.primitives[0].fill('#A6C3C4');
                break;
        }
    };
    Bunker.prototype.setBaseProperty = function (mes) {
        if (this.isLeft) {
            console.log("Bunker left active =" + mes.chuteLoadA);
            this.propBit = mes.chuteLoadA;
        }
        else {
            console.log("Bunker right active =" + mes.chuteLoadB);
            this.propBit = mes.chuteLoadB;
        }
    };
    return Bunker;
}(mine_drawing_1.BaseMineDraw));
exports.Bunker = Bunker;
var FeederBase = /** @class */ (function (_super) {
    __extends(FeederBase, _super);
    function FeederBase(p0, length) {
        return _super.call(this, p0, length) || this;
    }
    FeederBase.prototype.createLineReceivingHopper = function (x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, fill, stroke, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5],
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            closed: true,
        });
    };
    FeederBase.prototype.nextFrame = function () {
        if (this.enable) {
            switch (this.propBit) {
                case true:
                    this.primitives[0].fill('#045658');
                    break;
                case false:
                    this.primitives[0].fill('#835757');
                    break;
            }
        }
        else
            this.primitives[0].fill('#99BAAF');
    };
    return FeederBase;
}(mine_drawing_1.BaseMineDraw));
exports.FeederBase = FeederBase;
var FeederLeft = /** @class */ (function (_super) {
    __extends(FeederLeft, _super);
    function FeederLeft(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.enable = false;
        _this.name = 'FeederLeft';
        _this.primitives.push(_this.createLineReceivingHopper(p0.x + length * 77, p0.y + length * 68, p0.x + length * 98, p0.y + length * 68, p0.x + length * 114, p0.y + length * 86, p0.x + length * 114, p0.y + length * 99, p0.x + length * 77, p0.y + length * 86, '#005236', '#000000', length * 0.6));
        return _this;
    }
    FeederLeft.prototype.setBaseProperty = function (mes) {
        console.log("FeederRight active =" + mes.chuteLoadA + "; on/off " + mes.feederOn);
        this.enable = mes.chuteLoadA;
        this.propBit = mes.feederOn;
    };
    return FeederLeft;
}(FeederBase));
exports.FeederLeft = FeederLeft;
var FeederRight = /** @class */ (function (_super) {
    __extends(FeederRight, _super);
    function FeederRight(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'FeederRight';
        _this.primitives.push(_this.createLineReceivingHopper(p0.x + length * 77, p0.y + length * 68, p0.x + length * 77, p0.y + length * 86, p0.x + length * 40, p0.y + length * 99, p0.x + length * 40, p0.y + length * 86, p0.x + length * 56, p0.y + length * 68, '#005236', '#000000', length * 0.6));
        return _this;
    }
    FeederRight.prototype.setBaseProperty = function (mes) {
        console.log("FeederRight active =" + mes.chuteLoadB + "; on/off " + mes.feederOn);
        this.enable = mes.chuteLoadB;
        this.propBit = mes.feederOn;
    };
    return FeederRight;
}(FeederBase));
exports.FeederRight = FeederRight;
var ChuteBase = /** @class */ (function (_super) {
    __extends(ChuteBase, _super);
    function ChuteBase(p0, length) {
        return _super.call(this, p0, length) || this;
    }
    ChuteBase.prototype.createLineReceivingHopper = function (x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, fill, stroke, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6],
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            closed: true,
        });
    };
    ChuteBase.prototype.createLine = function (x1, y1, x2, y2, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2],
            stroke: '#331A38',
            strokeWidth: strokeWidth,
        });
    };
    ChuteBase.prototype.nextFrame = function () {
        switch (this.propBit) {
            case true:
                this.primitives[0].fill('#045658');
                break;
            case false:
                this.primitives[0].fill('#D0E6C6');
                break;
        }
    };
    return ChuteBase;
}(mine_drawing_1.BaseMineDraw));
exports.ChuteBase = ChuteBase;
var ChuteLeft = /** @class */ (function (_super) {
    __extends(ChuteLeft, _super);
    function ChuteLeft(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'ChuteLeft';
        _this.primitives.push(_this.createLineReceivingHopper(p0.x + length * 78, p0.y + length * 48, p0.x + length * 118, p0.y + length * 48, p0.x + length * 118, p0.y + length * 51, p0.x + length * 103, p0.y + length * 51, p0.x + length * 103, p0.y + length * 69, p0.x + length * 78, p0.y + length * 69, '#8AC171', '#000000', length * 0.6));
        _this.primitives.push(_this.createLine(p0.x + length * 90, p0.y + length * 48, p0.x + length * 90, p0.y + length * 69, length * 0.6));
        return _this;
    }
    ChuteLeft.prototype.setBaseProperty = function (mes) {
        console.log("chuteA=" + mes.chuteLoadA);
        this.propBit = mes.chuteLoadA;
    };
    return ChuteLeft;
}(ChuteBase));
exports.ChuteLeft = ChuteLeft;
var ChuteRight = /** @class */ (function (_super) {
    __extends(ChuteRight, _super);
    function ChuteRight(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'ChuteRight';
        _this.primitives.push(_this.createLineReceivingHopper(p0.x + length * 78, p0.y + length * 48, p0.x + length * 78, p0.y + length * 69, p0.x + length * 53, p0.y + length * 69, p0.x + length * 53, p0.y + length * 51, p0.x + length * 38, p0.y + length * 51, p0.x + length * 38, p0.y + length * 48, '#8AC171', '#000000', length * 0.6));
        _this.primitives.push(_this.createLine(p0.x + length * 66, p0.y + length * 48, p0.x + length * 66, p0.y + length * 69, length * 0.6));
        return _this;
    }
    ChuteRight.prototype.setBaseProperty = function (mes) {
        console.log("chuteB=" + mes.chuteLoadB);
        this.propBit = mes.chuteLoadB;
    };
    return ChuteRight;
}(ChuteBase));
exports.ChuteRight = ChuteRight;
var BatcherBase = /** @class */ (function (_super) {
    __extends(BatcherBase, _super);
    function BatcherBase(p0, length) {
        return _super.call(this, p0, length) || this;
    }
    BatcherBase.prototype.createLineReceivingHopper = function (x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, fill, stroke, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6],
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            closed: true,
        });
    };
    BatcherBase.prototype.createRectangle = function (x, y, height, width, fill, stroke, strokeWidth, cornerRadius) {
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
    BatcherBase.prototype.createText = function (x, y, text, fontSize) {
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
    return BatcherBase;
}(mine_drawing_1.BaseMineDraw));
exports.BatcherBase = BatcherBase;
var BatcherLeft = /** @class */ (function (_super) {
    __extends(BatcherLeft, _super);
    function BatcherLeft(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'BatcherLeft';
        _this.primitives.push(_this.createLineReceivingHopper(p0.x + length * 84, p0.y + length * 43, p0.x + length * 109, p0.y + length * 43, p0.x + length * 109, p0.y + length * 53, p0.x + length * 127, p0.y + length * 65, p0.x + length * 127, p0.y + length * 87, p0.x + length * 84, p0.y + length * 68, '#8AC171', '#000000', length * 0.4));
        _this.primitives.push(_this.createRectangle(p0.x + length * 88, p0.y + length * 55, length * 12.2, length * 14.3, '#F9F9F9', '#FE982A', length * 1.1, length * 4.7));
        var text = 'A';
        _this.primitives.push(_this.createText(p0.x + length * 93, p0.y + length * 59, text, length * 6));
        return _this;
    }
    return BatcherLeft;
}(BatcherBase));
exports.BatcherLeft = BatcherLeft;
var BatcherRight = /** @class */ (function (_super) {
    __extends(BatcherRight, _super);
    function BatcherRight(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'BatcherRight';
        _this.primitives.push(_this.createLineReceivingHopper(p0.x + length * 59, p0.y + length * 43, p0.x + length * 84, p0.y + length * 43, p0.x + length * 84, p0.y + length * 68, p0.x + length * 41, p0.y + length * 87, p0.x + length * 41, p0.y + length * 65, p0.x + length * 59, p0.y + length * 53, '#8AC171', '#000000', length * 0.4));
        _this.primitives.push(_this.createRectangle(p0.x + length * 66, p0.y + length * 55, length * 12.2, length * 14.3, '#F9F9F9', '#FE982A', length * 1.1, length * 4.7));
        var text = 'B';
        _this.primitives.push(_this.createText(p0.x + length * 71, p0.y + length * 59, text, length * 6));
        return _this;
    }
    return BatcherRight;
}(BatcherBase));
exports.BatcherRight = BatcherRight;
var GateBase = /** @class */ (function (_super) {
    __extends(GateBase, _super);
    function GateBase(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.opened = false;
        _this.closed = true;
        _this.name = 'GateLeft';
        _this.hight = length * 21.5;
        _this.baseY = p0.y + length * 65;
        _this.posAlarm = _this.baseY - _this.hight / 2;
        _this.posOpen = _this.baseY - _this.hight;
        return _this;
    }
    GateBase.prototype.createRectangle = function (x, y, height, width, fill, stroke, strokeWidth) {
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
    GateBase.prototype.nextFrame = function () {
        if (this.opened) {
            this.primitives[0].y(this.posOpen);
            this.primitives[0].fill('#FDC858');
        }
        else if (this.closed) {
            this.primitives[0].y(this.baseY);
            this.primitives[0].fill('#FDC858');
        }
        else {
            this.primitives[0].fill('red');
            this.primitives[0].y(this.posAlarm);
        }
    };
    return GateBase;
}(mine_drawing_1.BaseMineDraw));
exports.GateBase = GateBase;
var GateLeft = /** @class */ (function (_super) {
    __extends(GateLeft, _super);
    function GateLeft(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'GateLeft';
        _this.primitives.push(_this.createRectangle(p0.x + length * 127, _this.baseY, _this.hight, length * 4.8, '#FDC858', '#000000', length * 0.4));
        return _this;
    }
    GateLeft.prototype.setBaseProperty = function (mes) {
        console.log("trayOpenedA=" + mes.gateOpenedA + "; mes.trayClosedA=" + mes.gateClosedA);
        this.opened = mes.gateOpenedA;
        this.closed = mes.gateClosedA;
    };
    return GateLeft;
}(GateBase));
exports.GateLeft = GateLeft;
var GateRight = /** @class */ (function (_super) {
    __extends(GateRight, _super);
    function GateRight(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'GateRight';
        _this.primitives.push(_this.createRectangle(p0.x + length * 36.2, _this.baseY, _this.hight, length * 4.8, '#FDC858', '#000000', length * 0.4));
        return _this;
    }
    GateRight.prototype.setBaseProperty = function (mes) {
        console.log("trayOpenedB=" + mes.gateOpenedB + "; mes.trayClosedA=" + mes.gateClosedB);
        this.opened = mes.gateOpenedB;
        this.closed = mes.gateClosedB;
    };
    return GateRight;
}(GateBase));
exports.GateRight = GateRight;
var tongueOpen = 0;
var tongueClose = 1;
var tongueErr = 2;
var TongueBase = /** @class */ (function (_super) {
    __extends(TongueBase, _super);
    function TongueBase(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.dx = (127 - 84) * length * 0.6;
        _this.dy = (87 - 68) * length * 0.6;
        _this.prevState = tongueClose;
        _this.opened = false;
        _this.closed = true;
        return _this;
    }
    TongueBase.prototype.createLineReceivingHopper = function (x1, y1, x2, y2, x3, y3, x4, y4, fill, stroke, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4],
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            closed: true,
        });
    };
    return TongueBase;
}(mine_drawing_1.BaseMineDraw));
var TongueLeft = /** @class */ (function (_super) {
    __extends(TongueLeft, _super);
    function TongueLeft(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'TongueLeft';
        _this.primitives.push(_this.createLineReceivingHopper(p0.x + length * 84, p0.y + length * 68, p0.x + length * 127, p0.y + length * 87, p0.x + length * 127, p0.y + length * 94, p0.x + length * 84, p0.y + length * 75, '#21686C', '#000000', length * 0.4));
        return _this;
    }
    TongueLeft.prototype.setBaseProperty = function (mes) {
        console.log("tongue left opened =" + mes.trayOpenedA + "; tongue left closed=" + mes.trayClosedA);
        this.opened = mes.trayOpenedA;
        this.closed = mes.trayClosedA;
    };
    TongueLeft.prototype.nextFrame = function () {
        if (this.opened) { // open
            if (this.prevState == tongueOpen)
                return;
            else if (this.prevState == tongueClose)
                this.move({ x: this.dx, y: this.dy });
            else
                this.move({ x: 0.5 * this.dx, y: 0.5 * this.dy });
            this.prevState = tongueOpen;
            this.primitives[0].fill('#21686C');
        }
        else if (this.closed) { //close
            if (this.prevState == tongueClose)
                return;
            else if (this.prevState == tongueOpen)
                this.move({ x: -this.dx, y: -this.dy });
            else
                this.move({ x: -0.5 * this.dx, y: -0.5 * this.dy });
            this.prevState = tongueClose;
            this.primitives[0].fill('#21686C');
        }
        else { // error
            if (this.prevState == tongueErr)
                return;
            else if (this.prevState == tongueOpen)
                this.move({ x: -0.5 * this.dx, y: -0.5 * this.dy });
            else
                this.move({ x: 0.5 * this.dx, y: 0.5 * this.dy });
            this.prevState = tongueErr;
            this.primitives[0].fill('red');
        }
    };
    return TongueLeft;
}(TongueBase));
exports.TongueLeft = TongueLeft;
var TongueRight = /** @class */ (function (_super) {
    __extends(TongueRight, _super);
    function TongueRight(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'TongueRight';
        _this.primitives.push(_this.createLineReceivingHopper(p0.x + length * 41, p0.y + length * 87, p0.x + length * 84, p0.y + length * 68, p0.x + length * 84, p0.y + length * 75, p0.x + length * 41, p0.y + length * 94, '#21686C', '#000000', length * 0.4));
        return _this;
    }
    TongueRight.prototype.setBaseProperty = function (mes) {
        console.log("tongue right opened =" + mes.trayOpenedB + "; tongue left closed=" + mes.trayClosedB);
        this.opened = mes.trayOpenedB;
        this.closed = mes.trayClosedB;
    };
    TongueRight.prototype.nextFrame = function () {
        if (this.opened) { // open
            if (this.prevState == tongueOpen)
                return;
            else if (this.prevState == tongueClose)
                this.move({ x: this.dx, y: this.dy });
            else
                this.move({ x: -0.5 * this.dx, y: 0.5 * this.dy });
            this.prevState = tongueOpen;
            this.primitives[0].fill('#21686C');
        }
        else if (this.closed) { //close
            if (this.prevState == tongueClose)
                return;
            else if (this.prevState == tongueOpen)
                this.move({ x: -this.dx, y: -this.dy });
            else
                this.move({ x: 0.5 * this.dx, y: -0.5 * this.dy });
            this.prevState = tongueClose;
            this.primitives[0].fill('#21686C');
        }
        else { // error
            if (this.prevState == tongueErr)
                return;
            else if (this.prevState == tongueOpen)
                this.move({ x: 0.5 * this.dx, y: -0.5 * this.dy });
            else
                this.move({ x: -0.5 * this.dx, y: 0.5 * this.dy });
            this.prevState = tongueErr;
            this.primitives[0].fill('red');
        }
    };
    return TongueRight;
}(TongueBase));
exports.TongueRight = TongueRight;
//# sourceMappingURL=batcher.js.map