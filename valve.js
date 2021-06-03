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
exports.Valve = exports.ValveState = void 0;
var konva_1 = __importDefault(require("konva"));
var mine_drawing_1 = require("./mine_drawing");
var ValveState;
(function (ValveState) {
    ValveState[ValveState["closed"] = 0] = "closed";
    ValveState[ValveState["opened"] = 1] = "opened";
    ValveState[ValveState["opening"] = 2] = "opening";
    ValveState[ValveState["closing"] = 3] = "closing";
    ValveState[ValveState["alarm"] = 4] = "alarm";
    ValveState[ValveState["stop"] = 5] = "stop";
})(ValveState = exports.ValveState || (exports.ValveState = {}));
;
var ValvePrimitive;
(function (ValvePrimitive) {
    ValvePrimitive[ValvePrimitive["triangle0"] = 0] = "triangle0";
    ValvePrimitive[ValvePrimitive["triangle1"] = 1] = "triangle1";
    ValvePrimitive[ValvePrimitive["rectangleCentr"] = 2] = "rectangleCentr";
    ValvePrimitive[ValvePrimitive["circle"] = 3] = "circle";
    ValvePrimitive[ValvePrimitive["opening"] = 4] = "opening";
})(ValvePrimitive || (ValvePrimitive = {}));
var Valve = /** @class */ (function (_super) {
    __extends(Valve, _super);
    function Valve(p0, length, disposition, percentage) {
        var _this = _super.call(this, p0, length, disposition) || this;
        _this.name = 'Valve';
        _this.state = ValveState.closed;
        var p00 = _this.rect.p0;
        var p01 = (disposition == mine_drawing_1.Disposition.Vertical) ? _this.rect.rightTop() : _this.rect.getMiddlePoint();
        var p02 = (disposition == mine_drawing_1.Disposition.Vertical) ? _this.rect.getMiddlePoint() : _this.rect.leftButtom();
        _this.primitives.push(_this.createTriangle(p00, p01, p02, length));
        var p10 = _this.rect.p1;
        var p11 = (disposition == mine_drawing_1.Disposition.Vertical) ? _this.rect.leftButtom() : _this.rect.getMiddlePoint();
        var p12 = (disposition == mine_drawing_1.Disposition.Vertical) ? _this.rect.getMiddlePoint() : _this.rect.rightTop();
        _this.primitives.push(_this.createTriangle(p10, p11, p12, length));
        _this.primitives.push(_this.createRectangle(length));
        _this.primitives.push(_this.createCircle(length));
        _this.primitives.push(_this.createText(length, percentage));
        _this.rect.p0.y -= 2;
        _this.rect.p1.y += 2;
        _this.nextFrame();
        return _this;
    }
    Valve.prototype.setState = function (newState) {
        this.state = newState;
    };
    Valve.prototype.setPercentage = function (percentage) {
        return percentage + '%';
    };
    Valve.prototype.createTriangle = function (p0, p1, p2, length) {
        return new konva_1.default.Line({
            points: [p0.x, p0.y, p1.x, p1.y, p2.x, p2.y],
            fill: '',
            stroke: '',
            strokeWidth: Math.trunc(length * 0.02),
            closed: true,
        });
    };
    Valve.prototype.createRectangle = function (length) {
        var dxC = (this.disposition == mine_drawing_1.Disposition.Horizontal) ? Math.trunc(length / 19.8) : Math.trunc(length / 5.4);
        var dyC = (this.disposition == mine_drawing_1.Disposition.Horizontal) ? Math.trunc(length / 5.4) : Math.trunc(length / 19.8);
        var height = (this.disposition == mine_drawing_1.Disposition.Horizontal) ? length / 2.7 : length / 9.9;
        var width = (this.disposition == mine_drawing_1.Disposition.Horizontal) ? length / 9.9 : length / 2.7;
        return new konva_1.default.Rect({
            x: this.rect.getMiddlePoint().x - dxC,
            y: this.rect.getMiddlePoint().y - dyC,
            height: height,
            width: width,
            fill: '',
        });
    };
    Valve.prototype.createCircle = function (length) {
        var dxC = (this.disposition == mine_drawing_1.Disposition.Horizontal) ? 0 : Math.trunc(0.39 * length);
        var dyC = (this.disposition == mine_drawing_1.Disposition.Horizontal) ? Math.trunc(0.39 * length) : 0;
        return new konva_1.default.Circle({
            x: this.rect.getMiddlePoint().x - dxC,
            y: this.rect.getMiddlePoint().y - dyC,
            radius: Math.trunc(length / 4.79),
            fill: '',
            stroke: '',
            strokeWidth: 1,
        });
    };
    Valve.prototype.createText = function (length, percentage) {
        var dxC = (this.disposition == mine_drawing_1.Disposition.Horizontal) ? Math.trunc(0.16 * length) : Math.trunc(0.54 * length);
        var dyC = (this.disposition == mine_drawing_1.Disposition.Horizontal) ? Math.trunc(0.45 * length) : Math.trunc(0.06 * length);
        return new konva_1.default.Text({
            x: this.rect.getMiddlePoint().x - dxC,
            y: this.rect.getMiddlePoint().y - dyC,
            text: this.setPercentage(percentage),
            fontSize: length / 6,
            fontStyle: 'bold',
            fontFamily: 'Roboto',
            fill: '',
        });
    };
    Valve.prototype.calcSize = function (length, factor) {
        if (factor === void 0) { factor = 1.59; }
        return this.getOdd(length / factor);
    };
    ;
    Valve.prototype.showFrame = function (fill0, fill1, stroke, rectFill, circleStroke) {
        this.primitives[ValvePrimitive.triangle0].stroke(stroke);
        this.primitives[ValvePrimitive.triangle0].fill(fill0);
        this.primitives[ValvePrimitive.triangle1].stroke(stroke);
        this.primitives[ValvePrimitive.triangle1].fill(fill1);
        this.primitives[ValvePrimitive.rectangleCentr].fill(rectFill);
        this.primitives[ValvePrimitive.circle].stroke(circleStroke);
    };
    Valve.prototype.nextFrame = function () {
        switch (this.state) {
            case ValveState.closed:
                this.showFrame('#FE668B', '#FE668B', '#E3093E', '#E3093E', '#E3093E');
                break;
            case ValveState.opened:
                if (this.animationFrame == 0) {
                    this.showFrame('#1D8EEA', '#E1F1FB', '#00C734', '#7AD03E', '#7AD03E');
                    this.animationFrame = 1;
                }
                else if (this.animationFrame == 1) {
                    this.showFrame('#1D8EEA', '#1D8EEA', '#00C734', '#7AD03E', '#7AD03E');
                    this.animationFrame = 2;
                }
                else {
                    this.showFrame('#E1F1FB', '#1D8EEA', '#00C734', '#7AD03E', '#7AD03E');
                    this.animationFrame = 0;
                }
                break;
            case ValveState.opening:
                if (this.animationFrame == 0) {
                    this.showFrame('#A1DC77', '#E1F1FB', '#F0FF41', '#7AD03E', '#7AD03E');
                    this.animationFrame = 1;
                }
                else {
                    this.showFrame('#E1F1FB', '#A1DC77', '#7AD03E', '#7AD03E', '#7AD03E');
                    this.animationFrame = 0;
                }
                break;
            case ValveState.closing:
                if (this.animationFrame == 0) {
                    this.showFrame('#FE668B', '#E1F1FB', '#F0FF41', '#E3093E', '#E3093E');
                    this.animationFrame = 1;
                }
                else {
                    this.showFrame('#E1F1FB', '#FE668B', '#E3093E', '#E3093E', '#E3093E');
                    this.animationFrame = 0;
                }
                break;
            case ValveState.alarm:
                if (this.animationFrame == 0) {
                    this.showFrame('#EF0000', '#EF0000', '#010101', '#EF0000', '#EF0000');
                    this.animationFrame = 1;
                }
                else {
                    this.showFrame('#010101', '#010101', '#FF0000', '#EF0000', '#EF0000');
                    this.animationFrame = 0;
                }
                break;
        }
    };
    return Valve;
}(mine_drawing_1.BaseMineDraw));
exports.Valve = Valve;
//# sourceMappingURL=valve.js.map