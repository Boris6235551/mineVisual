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
exports.ShiftInfo = exports.RightInfo = exports.LeftInfo = exports.LabelInfo = void 0;
var konva_1 = __importDefault(require("konva"));
var mine_drawing_1 = require("./mine_drawing");
var moment = require('moment');
var LabelInfo = /** @class */ (function (_super) {
    __extends(LabelInfo, _super);
    function LabelInfo(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'Labelinfo';
        return _this;
    }
    LabelInfo.prototype.createText = function (x, y, text, fontSize) {
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
    LabelInfo.prototype.createRectangle = function (x, y, height, width, fill, stroke, strokeWidth, cornerRadius) {
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
    LabelInfo.prototype.setText = function (obj, text) {
        obj.text(text);
    };
    return LabelInfo;
}(mine_drawing_1.BaseMineDraw));
exports.LabelInfo = LabelInfo;
var LeftInfo = /** @class */ (function (_super) {
    __extends(LeftInfo, _super);
    function LeftInfo(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'Leftinfo';
        _this.numberA = 0;
        _this.weightA = '';
        _this.dateA = '';
        _this.monthA = 0;
        _this.primitives.push(_this.createRectangle(p0.x, p0.y + length * 0.1, length, length * 1.8, 'white', '#FE982A', length * 0.1, length * 0.1));
        _this.primitives.push(_this.createText(p0.x + length * 0.2, p0.y + length * 0.2, 'L Skip No.', length * 0.2));
        _this.primitives.push(_this.createText(p0.x + length * 0.2, p0.y + length * 0.5, '', length * 0.2));
        _this.primitives.push(_this.createText(p0.x + length * 0.2, p0.y + length * 0.8, '', length * 0.2));
        return _this;
    }
    LeftInfo.prototype.setBaseProperty = function (mes) {
        this.monthA = mes.monthA;
        this.endMonth = mes.endMonth;
        this.numberA = mes.numberA;
        this.weightA = mes.grossA + '-' + mes.tareA + '=' + (mes.grossA - mes.tareA);
        this.dateA = moment(mes.monthA + ' ' + mes.dateA + ' ' + mes.year + ' ' + mes.hoursA + ' ' + mes.minutesA + ' ' + mes.secondsA, "MM DD YY HH mm ss").format("MM-DD-YY HH:mm:ss");
    };
    LeftInfo.prototype.nextFrame = function () {
        if (this.monthA != 12) {
            this.setText(this.primitives[1], 'L Skip No.' + this.numberA);
            this.setText(this.primitives[2], this.weightA);
            this.setText(this.primitives[3], this.dateA);
            this.primitives[0].visible(true);
        }
        else if (this.monthA == 12) {
            this.setText(this.primitives[1], '');
            this.setText(this.primitives[2], '');
            this.setText(this.primitives[3], '');
            this.primitives[0].visible(false);
        }
        else if (this.endMonth != 12) {
            this.setText(this.primitives[1], '');
            this.setText(this.primitives[2], '');
            this.setText(this.primitives[3], '');
            this.primitives[0].visible(false);
        }
    };
    return LeftInfo;
}(LabelInfo));
exports.LeftInfo = LeftInfo;
var RightInfo = /** @class */ (function (_super) {
    __extends(RightInfo, _super);
    function RightInfo(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'Rightinfo';
        _this.numberB = 0;
        _this.weightB = '';
        _this.dateB = '';
        _this.monthB = 0;
        _this.primitives.push(_this.createRectangle(p0.x, p0.y + length * 0.1, length, length * 1.8, 'white', '#FE982A', length * 0.1, length * 0.1));
        _this.primitives.push(_this.createText(p0.x + length * 0.2, p0.y + length * 0.2, 'R Skip No.', length * 0.2));
        _this.primitives.push(_this.createText(p0.x + length * 0.2, p0.y + length * 0.5, '', length * 0.2));
        _this.primitives.push(_this.createText(p0.x + length * 0.2, p0.y + length * 0.8, '', length * 0.2));
        return _this;
    }
    RightInfo.prototype.setBaseProperty = function (mes) {
        this.numberB = mes.numberB;
        this.weightB = mes.grossB + '-' + mes.tareB + '=' + (mes.grossB - mes.tareB);
        this.dateB = moment(mes.monthB + ' ' + mes.dateB + ' ' + mes.year + ' ' + mes.hoursB + ' ' + mes.minutesB + ' ' + mes.secondsB, "MM DD YY HH mm ss").format("MM-DD-YY HH:mm:ss");
    };
    RightInfo.prototype.nextFrame = function () {
        if (this.monthB != 12) {
            this.setText(this.primitives[1], 'R Skip No.' + this.numberB);
            this.setText(this.primitives[2], this.weightB);
            this.setText(this.primitives[3], this.dateB);
            this.primitives[0].visible(true);
        }
        else if (this.monthB == 12) {
            this.setText(this.primitives[1], '');
            this.setText(this.primitives[2], '');
            this.setText(this.primitives[3], '');
            this.primitives[0].visible(false);
        }
        else if (this.endMonth != 12) {
            this.setText(this.primitives[1], '');
            this.setText(this.primitives[2], '');
            this.setText(this.primitives[3], '');
            this.primitives[0].visible(false);
        }
    };
    return RightInfo;
}(LabelInfo));
exports.RightInfo = RightInfo;
var ShiftInfo = /** @class */ (function (_super) {
    __extends(ShiftInfo, _super);
    function ShiftInfo(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'Shiftinfo';
        _this.beginMonth = 0;
        _this.endMonth = 0;
        _this.skipCount = 0;
        _this.net = 0;
        _this.beginDate = '';
        _this.endDate = '';
        _this.primitives.push(_this.createRectangle(p0.x, p0.y + length * 0.1, length * 1.4, length * 2.3, 'white', '#FE982A', length * 0.1, length * 0.1));
        _this.primitives.push(_this.createText(p0.x + length * 0.2, p0.y + length * 0.2, '', length * 0.2));
        _this.primitives.push(_this.createText(p0.x + length * 0.2, p0.y + length * 0.5, '', length * 0.2));
        _this.primitives.push(_this.createText(p0.x + length * 0.2, p0.y + length * 0.8, '', length * 0.2));
        _this.primitives.push(_this.createText(p0.x + length * 0.2, p0.y + length * 1.1, '', length * 0.2));
        return _this;
    }
    ShiftInfo.prototype.setBaseProperty = function (mes) {
        this.beginMonth = mes.beginMonth;
        this.endMonth = mes.endMonth;
        this.beginDate = moment(mes.beginMonth + ' ' + mes.beginDate + ' ' + mes.year + ' ' + mes.beginHours + ' ' + mes.beginMinutes + ' ' + mes.beginSeconds, "MM DD YY HH mm ss").format("MM-DD-YY HH:mm:ss");
        this.endDate = moment(mes.endMonth + ' ' + mes.endDate + ' ' + mes.year + ' ' + mes.endHours + ' ' + mes.endMinutes + ' ' + mes.endSeconds, "MM DD YY HH mm ss").format("MM-DD-YY HH:mm:ss");
        this.skipCount = mes.skipCount;
        this.net = mes.net;
    };
    ShiftInfo.prototype.nextFrame = function () {
        this.setText(this.primitives[1], 'Shift start:  ' + this.beginDate);
        this.setText(this.primitives[2], 'Shift end:    ' + this.endDate);
        this.setText(this.primitives[3], 'Total skips:   ' + this.skipCount + 'pcs');
        this.setText(this.primitives[4], 'Total weight: ' + this.net + 'kg');
    };
    return ShiftInfo;
}(LabelInfo));
exports.ShiftInfo = ShiftInfo;
//# sourceMappingURL=batcherlable.js.map