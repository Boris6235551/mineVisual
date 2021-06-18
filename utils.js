"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCircle = exports.createRectangle = exports.createText = exports.CreateLabel = void 0;
var konva_1 = __importDefault(require("konva"));
function CreateLabel(p, position, text, height, width) {
    if (height === void 0) { height = 20; }
    if (width === void 0) { width = 20; }
    if (position == 0)
        p.y = p.y - 10;
    else if (position == 1)
        p.x = p.x - 10;
    var r = new konva_1.default.Rect({
        x: p.x,
        y: p.y,
        height: height,
        width: width,
        fill: '#FEFFBC',
        stroke: '',
        strokeWidth: 0,
        cornerRadius: 5,
    });
    var t = new konva_1.default.Text({
        x: p.x + 5,
        y: p.y + 4,
        text: text,
        fontSize: 15,
        fontStyle: 'bold',
        fontFamily: 'Roboto',
        fill: '',
    });
    return [r, t];
}
exports.CreateLabel = CreateLabel;
function createText(x, y, text, fontSize) {
    return new konva_1.default.Text({
        x: x,
        y: y,
        text: text,
        fontSize: fontSize,
        fontStyle: 'bold',
        fontFamily: 'Roboto',
    });
}
exports.createText = createText;
function createRectangle(x, y, height, width, fill, stroke, strokeWidth, cornerRadius) {
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
}
exports.createRectangle = createRectangle;
function createCircle(x, y, radius, strokeWidth, fill, stroke) {
    return new konva_1.default.Circle({
        x: x,
        y: y,
        radius: radius,
        fill: fill,
        stroke: stroke,
        strokeWidth: strokeWidth,
    });
}
exports.createCircle = createCircle;
//# sourceMappingURL=utils.js.map