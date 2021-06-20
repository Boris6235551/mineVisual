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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SURFACEPUMP = exports.UNDEGROUNDPUMP = void 0;
var mine_drawing_1 = require("./mine_drawing");
var pumpAccessories_1 = require("./pumpAccessories");
var tube_1 = require("./tube");
var dxIndex = 0;
var dyIndex = 1;
var dispIndex = 2;
var BASEPUMP = /** @class */ (function (_super) {
    __extends(BASEPUMP, _super);
    function BASEPUMP(container, width, height, basePoint) {
        var _this = _super.call(this, container, width, height) || this;
        _this.basePoint = basePoint;
        _this.items = [];
        return _this;
    }
    BASEPUMP.prototype.addItem = function (item, name, recieveMessage) {
        if (recieveMessage === void 0) { recieveMessage = true; }
        item.name = name;
        if (recieveMessage)
            this.items.push(item);
        this.addWidget(item);
    };
    BASEPUMP.prototype.findByName = function (name) {
        for (var _i = 0, _a = this.widgets; _i < _a.length; _i++) {
            var w = _a[_i];
            if (w.name == name)
                return w;
        }
        return null;
    };
    BASEPUMP.prototype.createConnections = function (datas) {
        for (var _i = 0, datas_1 = datas; _i < datas_1.length; _i++) {
            var obj = datas_1[_i];
            this.connect(obj.begin, obj.end);
        }
    };
    BASEPUMP.prototype.connect = function (upName, downName) {
        var upWidget = this.findByName(upName);
        var downWidget = this.findByName(downName);
        if (upWidget == null || downWidget == null)
            return;
        var line = new tube_1.Connection(new mine_drawing_1.Point(0, 0), 5, mine_drawing_1.Disposition.Vertical);
        line.connectVertical(upWidget, downWidget);
        this.addWidget(line);
        if (upWidget.name == 'Y16' && downWidget.name == 'Y13')
            console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Y16 rect=" + upWidget.printRect() + "; \n                Y13 rect=" + downWidget.printRect() + "; line rect =" + line.printRect());
    };
    BASEPUMP.prototype.send = function (mes) {
        console.log("received message UNDEGROUNDPUMP name=" + this.name);
        var mesProps = Object.getOwnPropertyNames(mes);
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var widget = _a[_i];
            var wMes = {};
            var sendToWidget = false;
            var delIndexes = [];
            for (var i = 0; i < mesProps.length; i++) {
                if (mesProps[i].startsWith(widget.name)) {
                    var beginCount = widget.name.length;
                    var newPropName = mesProps[i].substring(beginCount);
                    wMes[newPropName] = mes[mesProps[i]];
                    sendToWidget = true;
                    //wMes[mesProps[i]] = mes[mesProps[i]];
                    delIndexes.push(i);
                }
            }
            console.log("sended to " + widget.name + "\n message  =" + JSON.stringify(wMes));
            if (sendToWidget)
                widget.setBaseProperty(wMes);
            for (var i = delIndexes.length - 1; i >= 0; i--)
                mesProps.splice(delIndexes[i], 1);
            // console.log(`del properies of ${widget.name}; mesProps length=${mesProps.length}`);
            if (mesProps.length == 0)
                return;
        }
        console.log("message properies=" + mesProps);
        this.update();
    };
    return BASEPUMP;
}(mine_drawing_1.Scheme));
/**********************************************************************************
 ****************                 UNDEGRAUND PUMPS                 ****************
 **********************************************************************************/
var vPoints = [
    /*  dxIndex    dyIndex   dispIndex  dispositionIndex*/
    [0, 0, mine_drawing_1.Disposition.Horizontal],
    [92, 0, mine_drawing_1.Disposition.Horizontal],
    [40, 180, mine_drawing_1.Disposition.Vertical],
    [135, 90, mine_drawing_1.Disposition.Vertical],
    [85, 220, mine_drawing_1.Disposition.Horizontal],
    [40, 90, null],
    [40, 380, null] // Yx7  back closed valve
];
var mineConnections = [
    { begin: 'Y16', end: 'Y13', dir: true, disp: mine_drawing_1.Disposition.Vertical },
];
var LINES_COUNT1 = 3;
var LINES_COUNT2 = 2;
var DELTA_X = 184;
var UNDEGROUNDPUMP = /** @class */ (function (_super) {
    __extends(UNDEGROUNDPUMP, _super);
    function UNDEGROUNDPUMP(container, width, height, basePoint, number) {
        var _this = _super.call(this, container, width, height, basePoint) || this;
        if (number == 1) {
            _this.name = 'drainageA';
            for (var i = 0; i < LINES_COUNT1; i++)
                _this.createWidgets(basePoint.newPointMoved(DELTA_X * i, 0), i + 1);
            _this.createConnections(mineConnections);
        }
        else {
            _this.name = 'drainageB';
            var pool = new pumpAccessories_1.MinePool(basePoint.newPointMoved(0, 450), 950); // new Point(400, 550)
            _this.addWidget(pool);
            _this.items.push(pool);
            for (var i = LINES_COUNT1; i < LINES_COUNT1 + LINES_COUNT2; i++)
                _this.createWidgets(basePoint.newPointMoved(DELTA_X * i, 0), i + 1);
        }
        return _this;
    }
    UNDEGROUNDPUMP.prototype.createWidgets = function (p, number) {
        var _a, _b;
        this.addItem(new pumpAccessories_1.Pump(p.newPointMoved(30, 250), 100, 0), 'Pump' + number.toString());
        for (var i = 0; i < vPoints.length; i++) {
            var name_1 = 'Y' + number.toString() + (i + 1).toString();
            var v = void 0;
            var received = void 0;
            if (vPoints[i][dispIndex] == null)
                _a = [new pumpAccessories_1.ValveCheck(p.newPointMoved(vPoints[i][dxIndex], vPoints[i][dyIndex]), 30), false], v = _a[0], received = _a[1];
            else
                _b = [new pumpAccessories_1.Valve(p.newPointMoved(vPoints[i][dxIndex], vPoints[i][dyIndex]), 30, vPoints[i][dispIndex], 50), true], v = _b[0], received = _b[1];
            this.addItem(v, name_1, received);
        }
    };
    return UNDEGROUNDPUMP;
}(BASEPUMP));
exports.UNDEGROUNDPUMP = UNDEGROUNDPUMP;
/**********************************************************************************
 ****************           TECH AND CLEAR SURFACE PUMPS           ****************
 **********************************************************************************/
var surfaceValvesData = [
    /***************     TECH PUMPS    ***************/
    { dXY: [182, 261], disp: null, name: 'XS1' },
    /*-------------     TECH LINE 2    --------------*/
    { dXY: [140, 329], disp: mine_drawing_1.Disposition.Vertical, name: 'Y222' },
    { dXY: [100, 515], disp: mine_drawing_1.Disposition.Vertical, name: 'Y220' },
    { dXY: [140, 505], disp: mine_drawing_1.Disposition.Vertical, name: 'Y221' },
    { dXY: [140, 592], disp: null, name: 'XS2' },
    /*-------------     TECH LINE 1    --------------*/
    { dXY: [224, 329], disp: mine_drawing_1.Disposition.Vertical, name: 'Y212' },
    { dXY: [278, 515], disp: mine_drawing_1.Disposition.Vertical, name: 'Y210' },
    { dXY: [224, 505], disp: mine_drawing_1.Disposition.Vertical, name: 'Y211' },
    { dXY: [224, 592], disp: null, name: 'XS3' },
    /*-----------------------------------------------*/
    { dXY: [182, 734], disp: mine_drawing_1.Disposition.Vertical, name: 'Y2_' },
    /****     CLEAR PUMPS    ****/
    { dXY: [418, 261], disp: null, name: 'XS4' },
    /*-------------     CLEAR LINE 2    --------------*/
    { dXY: [377, 329], disp: mine_drawing_1.Disposition.Vertical, name: 'Y122' },
    { dXY: [338, 515], disp: mine_drawing_1.Disposition.Vertical, name: 'Y120' },
    { dXY: [377, 505], disp: mine_drawing_1.Disposition.Vertical, name: 'Y121' },
    /*-------------     CLEAR LINE 1    --------------*/
    { dXY: [461, 329], disp: mine_drawing_1.Disposition.Vertical, name: 'Y112' },
    { dXY: [515, 515], disp: mine_drawing_1.Disposition.Vertical, name: 'Y110' },
    { dXY: [461, 505], disp: mine_drawing_1.Disposition.Vertical, name: 'Y111' },
    /*-----------------------------------------------*/
    { dXY: [419, 604], disp: null, name: 'XS5' },
    { dXY: [419, 734], disp: mine_drawing_1.Disposition.Vertical, name: 'Y1_' },
];
var surfacePumpsData = [
    { dXY: [1, 606], name: 'M0' },
    { dXY: [68, 767 + 25], name: 'DP4' },
    { dXY: [130, 383], name: 'M4' },
    { dXY: [214, 383], name: 'M3' },
    { dXY: [530, 767 + 25], name: 'DP3' },
    { dXY: [367, 383], name: 'M2' },
    { dXY: [451, 383], name: 'M1' },
];
var surfaceConnections = [
    { begin: 'Y222', end: 'M4', dir: true, disp: mine_drawing_1.Disposition.Vertical },
    { begin: 'M4', end: 'Y221', dir: true, disp: mine_drawing_1.Disposition.Vertical },
    { begin: 'Y221', end: 'XS2', dir: true, disp: mine_drawing_1.Disposition.Vertical },
    { begin: 'Y212', end: 'M3', dir: true, disp: mine_drawing_1.Disposition.Vertical },
    { begin: 'M3', end: 'Y211', dir: true, disp: mine_drawing_1.Disposition.Vertical },
    { begin: 'Y211', end: 'XS3', dir: true, disp: mine_drawing_1.Disposition.Vertical },
    { begin: 'Y122', end: 'M2', dir: true, disp: mine_drawing_1.Disposition.Vertical },
    { begin: 'M2', end: 'Y121', dir: true, disp: mine_drawing_1.Disposition.Vertical },
    // {begin: 'Y121', end: 'XS2', dir: true, disp: Disposition.Vertical},
    { begin: 'Y112', end: 'M1', dir: true, disp: mine_drawing_1.Disposition.Vertical },
    { begin: 'M1', end: 'Y111', dir: true, disp: mine_drawing_1.Disposition.Vertical },
];
var dYYY = -210;
var kX = 1;
var SURFACEPUMP = /** @class */ (function (_super) {
    __extends(SURFACEPUMP, _super);
    function SURFACEPUMP(container, width, height, basePoint) {
        var _this = _super.call(this, container, width, height, basePoint) || this;
        _this.name = 'clearPump';
        _this.secondName = 'techPump';
        _this.createWidgets(basePoint);
        _this.createConnections(surfaceConnections);
        return _this;
    }
    SURFACEPUMP.prototype.getPoint = function (dXY) {
        return this.basePoint.newPointMoved(dXY[dxIndex] * kX, dXY[dyIndex] + dYYY);
    };
    SURFACEPUMP.prototype.createWidgets = function (p) {
        this.addItem(new pumpAccessories_1.Pool(this.getPoint([118, 642]), 150, pumpAccessories_1.IndustrialWater), 'Tech');
        this.addItem(new pumpAccessories_1.Pool(this.getPoint([355, 642]), 150, pumpAccessories_1.PureWater), 'Clear');
        this.addItem(new pumpAccessories_1.WaterTower(this.getPoint([/*530*/ 600 / kX, /*100*/ 0 - dYYY]), 200), 'Tower');
        //this.items[this.items.length - 1].printRect();
        for (var i = 0; i < surfacePumpsData.length; i++)
            this.addItem(new pumpAccessories_1.Pump(this.getPoint(surfacePumpsData[i].dXY), 100, 0), surfacePumpsData[i].name);
        for (var i = 0; i < surfaceValvesData.length; i++) {
            var obj = surfaceValvesData[i];
            var v = void 0;
            if (obj.disp == null)
                this.addItem(new pumpAccessories_1.ValveCheck(this.getPoint(obj.dXY), 30), obj.name, false);
            else
                this.addItem(new pumpAccessories_1.Valve(this.getPoint(obj.dXY), 30, obj.disp, 50), obj.name);
        }
    };
    return SURFACEPUMP;
}(BASEPUMP));
exports.SURFACEPUMP = SURFACEPUMP;
//# sourceMappingURL=_undegroundPump.js.map