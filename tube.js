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
exports.ConnectHV = exports.Corner = exports.CornerOrientation = exports.Connection = exports.Tube = void 0;
var konva_1 = __importDefault(require("konva"));
var mine_drawing_1 = require("./mine_drawing");
var DeltaPoint = 20;
var StdQuantity = 4;
var Tube = /** @class */ (function (_super) {
    __extends(Tube, _super);
    function Tube(setup) {
        var _this = _super.call(this, setup.p0, setup.length, setup.disposition) || this;
        _this.quantity = 4;
        _this.atomSize = 13;
        _this.flow = true;
        _this.lastShort = false;
        _this.quantity = setup.quantity;
        _this.atomSize = setup.atomSize;
        _this.flow = setup.flow;
        _this.length = setup.length;
        _this.periodLength = _this.atomSize * _this.quantity;
        _this.calcPoints();
        _this.primitives.push(new konva_1.default.Rect({
            x: _this.rect.p0.x, y: _this.rect.p0.y, fill: '#1D8EEA',
            height: _this.disposition == mine_drawing_1.Disposition.Horizontal ? _this.atomSize : _this.length,
            width: _this.disposition == mine_drawing_1.Disposition.Horizontal ? _this.length : _this.atomSize
        }));
        _this.periodsConfig();
        _this.createPeriods();
        return _this;
    }
    Tube.prototype.calcPoints = function () {
        var halfAtomSize = Math.trunc(this.atomSize / 2);
        if (this.disposition == mine_drawing_1.Disposition.Horizontal) {
            this.rect.p0.y = this.rect.p0.y - halfAtomSize;
            this.rect.p1.y = this.rect.p0.y + this.atomSize;
        }
        else { /* Distopsition.Vertical */
            this.rect.p0.x = this.rect.p0.x - halfAtomSize;
            this.rect.p1.x = this.rect.p0.x + this.atomSize;
        }
    };
    Tube.prototype.getLastAtomsQuantity = function (length) {
        var count = length / this.atomSize;
        return count;
    };
    Tube.prototype.periodsConfig = function () {
        var periodsCount = this.length / this.periodLength;
        var fullPeriodsCount = Math.trunc(periodsCount);
        var remainPeriodLength = this.length - periodsCount * this.periodLength;
        this.periodsCount = fullPeriodsCount;
        if (remainPeriodLength > 0) {
            this.periodsCount = fullPeriodsCount + 1;
            this.lastShort = true;
            this.lastAtomsQuantity = this.getLastAtomsQuantity(remainPeriodLength);
        }
    };
    Tube.prototype.createPeriods = function () {
        var firstX = this.rect.p0.x;
        var firstY = this.rect.p0.y;
        var stepX = 0;
        var stepY = 0;
        var step = this.flow ? this.periodsCount : -this.periodsCount;
        if (this.disposition == mine_drawing_1.Disposition.Horizontal) {
            firstX = this.flow ? firstX : this.rect.rightTop().x - this.atomSize;
            stepX = step;
        }
        else { /*Disposition.Vertical*/
            firstY = this.flow ? this.rect.p0.y : this.rect.p1.y - this.atomSize;
            stepY = step;
        }
        for (var i = 0; i < this.fullPeriodsCount; i++) { /*create full periods*/
            this.primitives.push(new konva_1.default.Rect({
                x: firstX + i * stepX, y: firstY + i * stepY,
                height: this.atomSize, width: this.atomSize, fill: '#E1F1FB'
            }));
        }
        if (this.lastShort) {
            if (this.quantityInShort > 1) {
                this.primitives.push(new konva_1.default.Rect({
                    x: firstX + this.fullPeriodsCount * stepX,
                    y: firstY + this.fullPeriodsCount * stepY,
                    height: this.atomSize, width: this.atomSize, fill: '#E1F1FB'
                }));
            }
            this.primitives.push(new konva_1.default.Rect({
                x: this.rect.p0.x, y: this.rect.p0.y, fill: '#1D8EEA',
                height: this.disposition == mine_drawing_1.Disposition.Horizontal ? this.atomSize : this.length,
                width: this.disposition == mine_drawing_1.Disposition.Horizontal ? this.length : this.atomSize
            }));
        }
    };
    return Tube;
}(mine_drawing_1.BaseMineDraw));
exports.Tube = Tube;
var Connection = /** @class */ (function (_super) {
    __extends(Connection, _super);
    //whitePlaces: Point[] 
    function Connection(p0, length, disposition) {
        var _this = _super.call(this, p0, length, disposition) || this;
        if (disposition == mine_drawing_1.Disposition.Vertical) {
            _this.rect.p1.x = _this.rect.p0.x + 14;
            _this.rect.p1.y = _this.rect.p0.y + 100;
        }
        _this.period = 14 * 4;
        return _this;
    }
    Connection.prototype.connectVertical = function (upObj, downObj) {
        var up = upObj.rect.getMiddleDownPoint();
        var dn = downObj.rect.getMiddleUpPoint();
        if (Math.abs(up.x - dn.x) > DeltaPoint)
            return false;
        var distance = /*distance*/ (dn.y - up.y);
        var count = Math.trunc(distance / this.period);
        this.step = Math.trunc(distance / count / 4);
        console.log("connectVertical count = " + count + "; and step = " + this.step);
        var r = new konva_1.default.Rect({
            //x: up.x - 7, y: up.y, height: count * 14 * 4, width: 14, fill: '#1D8EEA'
            x: up.x - 7, y: up.y, height: distance, width: 14, fill: '#1D8EEA'
        });
        this.primitives.push(r);
        for (var i = 0; i < count; i++) {
            this.primitives.push(new konva_1.default.Rect({
                //x: r.x(), y: up.y + (this.period * i), height: 14, width: 14, fill: '#E1F1FB'
                x: r.x(), y: up.y + (this.step * 4 * i), height: 14, width: 14, fill: '#E1F1FB'
            }));
        }
        return true;
    };
    // draw(layer: Konva.Layer): void{
    //     super.draw(layer);
    // }
    Connection.prototype.moveWhite = function () {
        var dy;
        if (this.animationFrame < 3)
            dy = this.step;
        else
            dy = -(3 * this.step);
        for (var i = 1; i < this.primitives.length; i++)
            this.primitives[i].move({ x: 0, y: dy });
    };
    Connection.prototype.nextFrame = function () {
        this.moveWhite();
        if (this.animationFrame < 3)
            this.animationFrame += 1;
        else
            this.animationFrame = 0;
    };
    ;
    return Connection;
}(mine_drawing_1.BaseMineDraw));
exports.Connection = Connection;
var CornerCenterSize = 49;
var CornerOrientation;
(function (CornerOrientation) {
    CornerOrientation[CornerOrientation["DownLeft"] = 0] = "DownLeft";
    CornerOrientation[CornerOrientation["LeftUp"] = 1] = "LeftUp";
    CornerOrientation[CornerOrientation["UpRight"] = 2] = "UpRight";
    CornerOrientation[CornerOrientation["RightDown"] = 3] = "RightDown";
})(CornerOrientation = exports.CornerOrientation || (exports.CornerOrientation = {}));
var Corner = /** @class */ (function (_super) {
    __extends(Corner, _super);
    function Corner(p0, length, disposition, orientation, direction) {
        var _this = _super.call(this, p0, CornerCenterSize * 2, disposition) || this;
        // let DL_nRD = this.orientation==CornerOrientation.DownLeft && this.direction;
        //     DL_nRD = DL_nRD || this.orientation==CornerOrientation.RightDown && !this.direction;
        //private period: number = 14 * 4;
        _this.step = 14;
        _this.orientation = orientation;
        _this.direction = direction;
        _this.LU_nDL = _this.orientation == CornerOrientation.LeftUp && _this.direction ||
            _this.orientation == CornerOrientation.DownLeft && !_this.direction;
        _this.UR_nLU = _this.orientation == CornerOrientation.UpRight && _this.direction ||
            _this.orientation == CornerOrientation.LeftUp && !_this.direction;
        _this.RD_nUR = _this.orientation == CornerOrientation.RightDown && _this.direction ||
            _this.orientation == CornerOrientation.UpRight && !_this.direction;
        _this.DL_nRD = _this.orientation == CornerOrientation.DownLeft && _this.direction ||
            _this.orientation == CornerOrientation.RightDown && !_this.direction;
        for (var i = 0; i < 3; i++) {
            _this.primitives.push(new konva_1.default.Line({
                points: _this.getPoints(i),
                fill: i == 0 ? '#1D8EEA' : '#E1F1FB',
                closed: true,
            }));
        }
        return _this;
    }
    Corner.prototype.moveWhite = function () {
        var dy1 = 0;
        var dx1 = 0;
        var dy2 = 0;
        var dx2 = 0;
        var move = this.animationFrame != 3 ? this.step : -3 * this.step;
        if (this.LU_nDL) {
            dx1 = move;
            dy2 = this.direction ? /* LU */ -move : /* nDL */ move;
        }
        else if (this.UR_nLU) {
            dy1 = move;
            dx2 = this.direction ? /* UR */ move : /* nLU */ -move;
        }
        else if (this.RD_nUR) {
            dx1 = -move;
            dy2 = this.direction ? /* RD */ move : /* nUR */ -move;
        }
        else /* this.DL_nRD */ {
            dy1 = -move;
            dx2 = this.direction ? /* DL */ -move : /* nLU */ move;
        }
        this.primitives[1].move({ x: dx1, y: dy1 });
        this.primitives[2].move({ x: dx2, y: dy2 });
    };
    Corner.prototype.nextFrame = function () {
        this.moveWhite();
        if (this.animationFrame < 3)
            this.animationFrame += 1;
        else
            this.animationFrame = 0;
    };
    ;
    Corner.prototype.calcSize = function (length, factor) {
        if (factor === void 0) { factor = 1; }
        return length;
    };
    Corner.prototype.getPoints = function (num) {
        var cs = CornerCenterSize;
        var h = 7;
        //   1      2      3      4      5      6      7      8      9         10      11       12 
        //-cs,h,  -h,h,  -h,cs,  h,cs,  h,h,  cs,h,  cs,-h,  h,-h,  h,-cs,  -h,-cs,  -h,-h,  -cs,-h
        var ps; // = [-cs,h,  -h,h,  -h,cs,  h,cs,  h,h,  cs,h,  cs,-h,  h,-h,  h,-cs,  -h,-cs,  -h,-h,  -cs,-h ];
        if (num == 0) {
            if (this.orientation == CornerOrientation.LeftUp)
                ps = [h, -cs, -h, -cs, -h, -h, -cs, -h, -cs, h, h, h];
            else if (this.orientation == CornerOrientation.UpRight)
                ps = [cs, h, cs, -h, h, -h, h, -cs, -h, -cs, -h, h];
            else if (this.orientation == CornerOrientation.RightDown)
                ps = [-h, cs, h, cs, h, h, cs, h, cs, -h, -h, -h];
            else /* DownLeft */
                ps = [-cs, h, -h, h, -h, cs, h, cs, h, -h, -cs, -h];
        }
        else if (num == 1) {
            console.log("LU_nDL = " + this.LU_nDL + "; UR_nLU = " + this.UR_nLU + "; RD_nUR = " + this.RD_nUR + "; DL_nRD = " + this.DL_nRD + " ");
            if (this.LU_nDL)
                ps = [-cs, h, 2 * h - cs, h, 2 * h - cs, -h, -cs, -h];
            else if (this.UR_nLU)
                ps = [-h, 2 * h - cs, h, 2 * h - cs, h, -cs, -h, -cs];
            else if (this.RD_nUR)
                ps = [cs - 2 * h, h, cs, h, cs, -h, cs - 2 * h, -h];
            else /* this.DL_nRD */
                ps = [-h, cs, h, cs, h, cs - 2 * h, -h, cs - 2 * h];
        }
        else
            ps = [-h, h, h, h, h, -h, -h, -h]; // num==2 central point
        var res = [];
        for (var i = 0; i < ps.length; i += 2) {
            console.log("i = " + i);
            res.push(this.rect.getMiddlePoint().x + ps[i]);
            res.push(this.rect.getMiddlePoint().y + ps[i + 1]);
        }
        return res;
    };
    return Corner;
}(mine_drawing_1.BaseMineDraw));
exports.Corner = Corner;
function ConnectHV(upObj, downObj, sourceUp) {
    if (upObj.disposition == mine_drawing_1.Disposition.Vertical) {
        var upDown = upObj.rect.getMiddleDownPoint();
        var dnRight = downObj.rect.getMiddleRightPoint();
        var dnLeft = downObj.rect.getMiddleLeftPoint();
        if (dnRight.x + CornerCenterSize <= upDown.x) { //down left from up
            return new Corner(new mine_drawing_1.Point(upDown.x - CornerCenterSize, dnRight.y - CornerCenterSize), 1, mine_drawing_1.Disposition.Vertical, CornerOrientation.LeftUp, !sourceUp);
        }
        else if (upDown.x + CornerCenterSize <= dnLeft.x) { // down right from up
            return new Corner(new mine_drawing_1.Point(upDown.x - CornerCenterSize, dnLeft.y - CornerCenterSize), 1, mine_drawing_1.Disposition.Vertical, CornerOrientation.UpRight, sourceUp);
        }
    }
    else { // up object -- Horizontal
        var upLeft = upObj.rect.getMiddleLeftPoint();
        var upRight = upObj.rect.getMiddleRightPoint();
        var dnUp = downObj.rect.getMiddleUpPoint();
        if (dnUp.x + CornerCenterSize <= upLeft.x) { // down left from up
            return new Corner(new mine_drawing_1.Point(dnUp.x - CornerCenterSize, upLeft.y - CornerCenterSize), 1, mine_drawing_1.Disposition.Vertical, CornerOrientation.RightDown, sourceUp);
        }
        else if (upRight.x + CornerCenterSize <= dnUp.x) { // down right from up
            return new Corner(new mine_drawing_1.Point(dnUp.x - CornerCenterSize, upRight.y - CornerCenterSize), 1, mine_drawing_1.Disposition.Vertical, CornerOrientation.DownLeft, !sourceUp);
        }
    }
    return null;
}
exports.ConnectHV = ConnectHV;
// export function testArray(){
//     let arr:(string|number)[] = [];
//     arr.push(1);
//     arr.push(2)
//     arr.push('asdfasd');
//     console.log(arr);
// }
//# sourceMappingURL=tube.js.map