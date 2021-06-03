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
exports.LabelDegree = exports.Label = void 0;
var konva_1 = __importDefault(require("konva"));
var mine_drawing_1 = require("./mine_drawing");
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label(connected, position, label) {
        var _this = this;
        var disposition = connected.disposition;
        var p0 = connected.rect.p0;
        length = (disposition == mine_drawing_1.Disposition.Vertical) ? connected.rect.p1.y - p0.y : connected.rect.p1.x - p0.x;
        var objWidth = (disposition == mine_drawing_1.Disposition.Vertical) ? connected.rect.p1.x - p0.x : connected.rect.p1.y - p0.y;
        _this = _super.call(this, p0, length, disposition) || this;
        _this.name = 'Label';
        _this.x = (disposition == mine_drawing_1.Disposition.Vertical) ? p0.x + objWidth : p0.x + length * 0.25;
        _this.y = (disposition == mine_drawing_1.Disposition.Vertical) ? p0.y + length * 0.25 : p0.y + objWidth;
        _this.height = length * 0.12;
        var width = _this.calcSize(_this.height);
        var strokeWidth = length * 0.003;
        if (position == false && disposition == mine_drawing_1.Disposition.Vertical)
            _this.x = _this.x - objWidth - width;
        else if (position == false && disposition == mine_drawing_1.Disposition.Horizontal)
            _this.y = _this.y - objWidth - _this.height;
        _this.primitives.push(_this.createRectangle(_this.x, _this.y, _this.height, width, strokeWidth));
        _this.primitives.push(_this.createText(_this.x, _this.y, width, _this.height, label));
        return _this;
    }
    Label.prototype.calcSize = function (length, factor) {
        if (factor === void 0) { factor = 0.8; }
        return this.getOdd(length / factor);
    };
    Label.prototype.createRectangle = function (x, y, height, width, strokeWidth) {
        return new konva_1.default.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: '#FEFFBC',
            stroke: 'red',
            strokeWidth: strokeWidth,
            cornerRadius: length * 0.03,
        });
    };
    Label.prototype.createText = function (x, y, width, height, text) {
        return new konva_1.default.Text({
            x: x,
            y: y,
            text: text,
            fontSize: width * 0.6,
            fontStyle: 'bold',
            fontFamily: 'Roboto',
            align: 'center',
            verticalAlign: 'middle',
            width: width,
            height: height,
        });
    };
    return Label;
}(mine_drawing_1.BaseMineDraw));
exports.Label = Label;
var LabelDegree = /** @class */ (function (_super) {
    __extends(LabelDegree, _super);
    function LabelDegree(connected, position, label) {
        var _this = _super.call(this, connected, position, label) || this;
        var heightDegree = length * 0.15;
        var widthDegree = _this.calcSize(length * 0.15);
        if (_this.disposition == mine_drawing_1.Disposition.Horizontal) {
            _this.x = _this.x + length * 0.2;
            _this.y = (position == false) ? _this.y - (heightDegree - _this.height) : _this.y;
        }
        else {
            _this.x = (position == false) ? _this.x - (heightDegree - _this.height) : _this.x;
            _this.y = _this.y + length * 0.15;
        }
        var strokeWidth = length * 0.01;
        _this.primitives.push(_this.createRectangle(_this.x, _this.y, heightDegree, widthDegree, strokeWidth));
        _this.primitives.push(_this.createText(_this.x, _this.y, widthDegree, heightDegree, label));
        // удаление первого и втрого элемента массива primitives
        _this.primitives.splice(0, 2);
        return _this;
    }
    return LabelDegree;
}(Label));
exports.LabelDegree = LabelDegree;
//# sourceMappingURL=label.js.map