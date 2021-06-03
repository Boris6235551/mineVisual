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
exports.Pool = exports.Screen = exports.animateScheme = exports.Scheme = exports.BaseMineDraw = exports.PropParams = exports.Rectangle = exports.Point = exports.Disposition = void 0;
var konva_1 = __importDefault(require("konva"));
//const Konva = require('konva');
// https://www.typescriptlang.org/docs/handbook/classes.html
var Disposition;
(function (Disposition) {
    Disposition[Disposition["Vertical"] = 0] = "Vertical";
    Disposition[Disposition["Horizontal"] = 1] = "Horizontal";
})(Disposition = exports.Disposition || (exports.Disposition = {}));
;
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    ;
    Point.prototype.copyPoint = function (p) {
        this.x = p.x;
        this.y = p.y;
    };
    return Point;
}());
exports.Point = Point;
;
var Rectangle = /** @class */ (function () {
    function Rectangle(p0, p1) {
        this.p0 = new Point(0, 0);
        this.p1 = new Point(0, 0);
        this.p0.copyPoint(p0);
        this.p1.copyPoint(p1);
    }
    ;
    Rectangle.prototype.rightTop = function () {
        var Rx = this.p1.x;
        var Ry = this.p0.y;
        return new Point(Rx, Ry);
    };
    Rectangle.prototype.leftButtom = function () {
        var Ly = this.p1.y;
        var Lx = this.p0.x;
        return new Point(Lx, Ly);
    };
    Rectangle.prototype.getMiddlePoint = function () {
        var lx = this.p0.x + Math.trunc((this.p1.x - this.p0.x) / 2) + 1;
        var ly = this.p0.y + Math.trunc((this.p1.y - this.p0.y) / 2) + 1;
        return new Point(lx, ly);
    };
    Rectangle.prototype.getMiddleUpPoint = function () {
        return new Point(this.getMiddlePoint().x, this.p0.y);
    };
    Rectangle.prototype.getMiddleDownPoint = function () {
        return new Point(this.getMiddlePoint().x, this.p1.y);
    };
    Rectangle.prototype.getMiddleRightPoint = function () {
        return new Point(this.p0.x, this.getMiddlePoint().y);
    };
    Rectangle.prototype.getMiddleLeftPoint = function () {
        return new Point(this.p1.x, this.getMiddlePoint().y);
    };
    Rectangle.prototype.copyRect = function (source) {
        this.p0.copyPoint(source.p0);
        this.p1.copyPoint(source.p1);
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
;
var PropParams = /** @class */ (function () {
    function PropParams() {
    }
    return PropParams;
}());
exports.PropParams = PropParams;
var BaseMineDraw = /** @class */ (function () {
    function BaseMineDraw(p0, length, disposition, percentage) {
        this.propBit = true;
        this.animationFrame = 0;
        this.primitives = [];
        this.name = "Base";
        this.disposition = disposition;
        var dx;
        var dy;
        if (disposition == Disposition.Vertical) {
            dy = this.getOdd(length);
            dx = this.calcSize(length);
        }
        else {
            dx = this.getOdd(length);
            dy = this.calcSize(length);
        }
        this.rect = new Rectangle(p0, new Point(p0.x + dx, p0.y + dy));
    }
    BaseMineDraw.prototype.getOdd = function (num) {
        return Math.trunc(num / 2) * 2 + 1;
    };
    BaseMineDraw.prototype.calcSize = function (length, factor) {
        if (factor === void 0) { factor = 1; }
        return this.getOdd(length / factor);
    };
    ;
    BaseMineDraw.prototype.move = function (delta) {
        if (this.primitives.length == 0)
            return;
        for (var i = 0; i < this.primitives.length; i++)
            this.primitives[i].move(delta);
        //this.layer.draw();
    };
    // addToScheme(scheme: Scheme): void{
    // };
    BaseMineDraw.prototype.draw = function (layer) {
        this.layer = layer;
        console.log("this.primitives.length " + this.primitives.length);
        if (this.primitives.length) {
            for (var i = 0; i < this.primitives.length; i++)
                layer.add(this.primitives[i]);
        }
        this.layer.draw();
    };
    ;
    BaseMineDraw.prototype.nextFrame = function () { };
    ;
    // get rect(): Rectangle{
    //     return this.rect;
    // }
    BaseMineDraw.prototype.setBaseProperty = function (mes) {
        if (mes.hasOwnProperty(this.name))
            this.propBit = mes[this.name];
    };
    return BaseMineDraw;
}());
exports.BaseMineDraw = BaseMineDraw;
;
var Scheme = /** @class */ (function () {
    function Scheme(container, width, height) {
        this.stop = false;
        clearInterval(this.interval);
        this.widgets = [];
        this.stage = new konva_1.default.Stage({
            container: container,
            width: width,
            height: height
        });
        this.layer = new konva_1.default.Layer();
        this.stage.add(this.layer);
        if (this.widgets.length)
            this.interval = setInterval(this.update, 100);
    }
    Scheme.prototype.send = function (mes) {
        // let props = Object.getOwnPropertyNames(mes);
        // this.widgets.forEach( widget => {
        //     let prop = props.find( pr => pr == widget.name );
        //     if(prop != undefined) {
        //         //console.log(`@@@@@@@@@@@@@ widget.name=${widget.name}; prop=${prop}; mes[prop]=${mes[prop]}`) 
        //         widget.setBaseProperty(mes[prop]);
        //     }
        //     //else console.log(`widget.name ${widget.name} is not finded`)
        // });
        this.widgets.forEach(function (w) { w.setBaseProperty(mes); });
        this.update();
    };
    Scheme.prototype.addWidget = function (widget) {
        this.widgets.push(widget);
        console.log("Scheme . addWidget ", typeof this.widgets, this.widgets);
        //for(let i = 0; i < this.widgets.length; i++) this.widgets[i].draw(this.layer);
        this.widgets[this.widgets.length - 1].draw(this.layer);
        this.layer.draw();
        //if(this.interval == undefined) this.interval = setInterval(this.update, 1000 );
        //console.log('this.interval', typeof this.interval, this.interval);
    };
    Scheme.prototype.startStop = function () {
        if (this.stop)
            this.stop = false;
        else
            this.stop = true;
    };
    Scheme.prototype.update = function () {
        if (this.stop)
            return;
        //console.log('uppppppdaaaate', typeof this.widgets);
        //if(this.widgets.length == 0) return;
        for (var i = 0; i < this.widgets.length; i++)
            this.widgets[i].nextFrame();
        this.layer.draw();
    };
    return Scheme;
}());
exports.Scheme = Scheme;
var interval;
function animateScheme(scheme, timeOut) {
    interval = setInterval(function () { scheme.update(); }, timeOut);
}
exports.animateScheme = animateScheme;
var Screen = /** @class */ (function () {
    function Screen() {
        this.schemes = [];
    }
    Screen.prototype.addScheme = function (scheme) {
        this.schemes.push(scheme);
    };
    Screen.prototype.resendMessage = function (/*scheme name*/ objName, mes) {
        this.schemes.forEach(function (scheme) {
            if (scheme.name == objName) {
                scheme.send(mes);
            }
        });
    };
    return Screen;
}());
exports.Screen = Screen;
// this.primitives[ValvePrimitive.triangle0], 
var Pool = /** @class */ (function (_super) {
    __extends(Pool, _super);
    //private primitives: any[]; // triangle0, triangle1, rectangleCentr, круг, текст
    function Pool(p0, length, percentage) {
        var _this = _super.call(this, p0, length, percentage) || this;
        // private rectangle3: Konva.Rect;
        _this.rectangle3 = new Array();
        _this.name = 'Pool';
        _this.rectangle1 = _this.createRectangle1(p0, length);
        _this.rectangle2 = _this.createRectangle2(p0, length);
        var i;
        var waterLevel = [
            '#02498B', '#00519C', '#0061BA', '#0071D9', '#0085FF',
            '#1F94FF', '#359EFF', '#5BB1FF', '#8DC9FF', '', '#02498B'
        ];
        if (percentage == 0)
            _this.rectangle3[0] = _this.createRectangle3(p0, length, waterLevel[9]);
        else if (percentage == 100)
            _this.rectangle3[0] = _this.createRectangle3(p0, length, waterLevel[9]);
        else {
            p0.y = p0.y + _this.calcSize(length) * 0.93 - 5;
            for (i = 0; i < percentage.toString()[0]; i++) {
                p0.y = p0.y - _this.calcSize(length) * 0.093;
                _this.rectangle3[i] = _this.createRectangle3(p0, length, waterLevel[i]);
            }
        }
        _this.circle = _this.createCircle(length);
        return _this;
    }
    Pool.prototype.createRectangle1 = function (p0, length) {
        return new konva_1.default.Rect({
            x: p0.x,
            y: p0.y,
            height: this.calcSize(length),
            width: length,
            fill: '#FE896F',
            stroke: '#D28878',
            strokeWidth: 10,
            cornerRadius: 10
        });
    };
    Pool.prototype.createRectangle2 = function (p0, length) {
        return new konva_1.default.Rect({
            x: p0.x + this.calcSize(length) * 0.125,
            y: p0.y - 3,
            height: this.calcSize(length) * 0.93,
            width: length * 0.84,
            fill: '#E1F1FB',
            stroke: '#34E7E7',
            strokeWidth: 5,
            cornerRadius: 10
        });
    };
    Pool.prototype.createRectangle3 = function (p0, length, waterLevel) {
        return new konva_1.default.Rect({
            x: p0.x + this.calcSize(length) * 0.125 + 3,
            y: p0.y,
            height: this.calcSize(length) * 0.093,
            width: length * 0.84 - 6,
            fill: waterLevel,
            // stroke: '',
            // strokeWidth: 0,
            cornerRadius: [0, 0, 50, 0],
        });
    };
    Pool.prototype.createCircle = function (length) {
        var x;
        var y;
        if (this.disposition == Disposition.Horizontal) {
            x = this.rect.getMiddlePoint().x;
            y = this.rect.getMiddlePoint().y - Math.trunc(0.39 * length);
        }
        else {
            x = this.rect.getMiddlePoint().x - Math.trunc(0.39 * length);
            y = this.rect.getMiddlePoint().y;
        }
        ;
        return new konva_1.default.Circle({
            x: x,
            y: y,
            radius: Math.trunc(length / 4.79),
            fill: '',
            stroke: '',
            strokeWidth: 1,
        });
    };
    Pool.prototype.createText = function (length, disposition) {
        var x;
        var y;
        if (disposition == Disposition.Horizontal) {
            x = this.rect.getMiddlePoint().x - Math.trunc(0.1 * length);
            y = this.rect.getMiddlePoint().y - Math.trunc(0.43 * length);
        }
        else {
            x = this.rect.getMiddlePoint().x - Math.trunc(0.5 * length);
            y = this.rect.getMiddlePoint().y - Math.trunc(0.04 * length);
        }
        ;
        return new konva_1.default.Text({
            x: x,
            y: y,
            text: '100 %',
            fontSize: 18,
            fontFamily: 'Roboto',
            fill: '',
        });
    };
    Pool.prototype.calcSize = function (length, factor) {
        if (factor === void 0) { factor = 1.59; }
        return this.getOdd(length / factor);
    };
    ;
    Pool.prototype.draw = function (layer) {
        var i;
        for (i = 0; i < this.rectangle3.length; i++)
            layer.add(this.rectangle1, this.rectangle2, this.rectangle3[i]);
    };
    return Pool;
}(BaseMineDraw));
exports.Pool = Pool;
//# sourceMappingURL=mine_drawing.js.map