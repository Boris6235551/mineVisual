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
exports.animateScreen = exports.Screen = exports.Scheme = exports.FlowDriver = exports.BaseMineDraw = exports.PropParams = exports.Rectangle = exports.Point = exports.Disposition = void 0;
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
    Point.prototype.newPointMoved = function (dx, dy) {
        return new Point(this.x + dx, this.y + dy);
    };
    Point.prototype.movePoint = function (dx, dy) {
        this.x += dx;
        this.y += dy;
        return this;
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
        return new Point(this.p1.x, this.getMiddlePoint().y);
    };
    Rectangle.prototype.getMiddleLeftPoint = function () {
        return new Point(this.p0.x, this.getMiddlePoint().y);
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
        if (disposition === void 0) { disposition = Disposition.Horizontal; }
        this.propBit = true;
        //public state: any;
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
            dx = this.getOdd(length); // coordinate x of the csreen
            dy = this.calcSize(length); // coordinate y of the csreen
        }
        this.rect = new Rectangle(p0, new Point(p0.x + dx, p0.y + dy));
        this.label = null;
    }
    BaseMineDraw.prototype.setLabel = function (text) {
        if (this.label != null)
            this.label.text(text);
    };
    BaseMineDraw.prototype.getOdd = function (num) {
        return Math.trunc(num / 2) * 2 + 1;
    };
    BaseMineDraw.prototype.calcSize = function (length, factor) {
        if (factor === void 0) { factor = 1; }
        return this.getOdd(length / factor);
    };
    ;
    BaseMineDraw.prototype.printRect = function () {
        return JSON.stringify(this.rect);
        console.log("\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log("Widget name=" + this.name + ";  rect=" + JSON.stringify(this.rect));
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n");
    };
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
        // console.log(`this.primitives.length ${this.primitives.length}`)
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
var FlowDriver = /** @class */ (function (_super) {
    __extends(FlowDriver, _super);
    function FlowDriver(p0, length, disposition, percentage) {
        if (disposition === void 0) { disposition = Disposition.Horizontal; }
        var _this = _super.call(this, p0, length, disposition, percentage) || this;
        _this.flowElements = [];
        _this.toSetElements = [];
        _this.flow = false;
        return _this;
    }
    FlowDriver.prototype.setFlow = function (set, show) {
        //if(this.name == 'Y21') show = true;
        if (show === void 0) { show = false; }
        this.flow = set;
        var mes = 'setFlow function, my flowElement: ';
        if (show) {
            for (var _i = 0, _a = this.flowElements; _i < _a.length; _i++) {
                var fElement = _a[_i];
                mes += fElement.name + ", ";
            }
            console.log("Name=" + this.name + ", flow =" + this.flow + "; " + mes);
        }
        for (var _b = 0, _c = this.flowElements; _b < _c.length; _b++) {
            var fElement = _c[_b];
            if (fElement.name == 'ulY21')
                console.log("<<<<<<<<<<<<<<<<<<<<<< ulY21 set=" + set);
            fElement.setFlow(set, show);
            //mes += fElement.name + `->flow=${fElement.flow}; `;
        }
        for (var _d = 0, _e = this.toSetElements; _d < _e.length; _d++) {
            var setElement = _e[_d];
            if (set)
                setElement.flow = true;
        }
    };
    FlowDriver.prototype.addToFlowElements = function (element) {
        this.flowElements.push(element);
    };
    FlowDriver.prototype.addToSetElements = function (element) {
        if (element == null)
            return;
        this.toSetElements.push(element);
    };
    return FlowDriver;
}(BaseMineDraw));
exports.FlowDriver = FlowDriver;
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
        this.secondName = '';
        //if (this.widgets.length) this.interval = setInterval(this.update, 100);
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
        // console.log("Scheme . addWidget ", typeof this.widgets, this.widgets);
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
var Screen = /** @class */ (function () {
    function Screen() {
        this.schemes = [];
    }
    Screen.prototype.addScheme = function (scheme) {
        this.schemes.push(scheme);
    };
    Screen.prototype.resendMessage = function (/*scheme name*/ objName, mes) {
        // console.log(objName)
        this.schemes.forEach(function (scheme) {
            if (scheme.name == objName || scheme.secondName == objName) {
                //console.log(scheme.name, JSON.stringify(mes, null, 4))
                scheme.send(mes);
                return;
            }
        });
    };
    Screen.prototype.animate = function () {
        this.schemes.forEach(function (scheme) {
            scheme.update();
        });
    };
    return Screen;
}());
exports.Screen = Screen;
var interval;
function animateScreen(screen, timeOut) {
    interval = setInterval(function () { screen.animate(); }, timeOut);
}
exports.animateScreen = animateScreen;
//# sourceMappingURL=mine_drawing.js.map