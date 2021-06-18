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
    BASEPUMP.prototype.send = function (mes) {
        console.log("received message UNDEGROUNDPUMP name=" + this.name);
        var mesProps = Object.getOwnPropertyNames(mes);
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var widget = _a[_i];
            var wMes = {};
            var delIndexes = [];
            for (var i = 0; i < mesProps.length; i++) {
                if (mesProps[i].startsWith(widget.name)) {
                    var beginCount = widget.name.length;
                    var newPropName = mesProps[i].substring(beginCount);
                    wMes[newPropName] = mes[mesProps[i]];
                    //wMes[mesProps[i]] = mes[mesProps[i]];
                    delIndexes.push(i);
                }
            }
            console.log("sended to " + widget.name + "\n message  =" + JSON.stringify(wMes));
            for (var i = delIndexes.length - 1; i >= 0; i--)
                mesProps.splice(delIndexes[i], 1);
            console.log("del properies of " + widget.name + "; mesProps length=" + mesProps.length);
            if (mesProps.length == 0)
                return;
        }
        console.log("message properies=" + mesProps);
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
    [40, 380, null]
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
        }
        else {
            _this.name = 'drainageB';
            var pool = new pumpAccessories_1.Pool(basePoint.newPointMoved(0, 450), 900, pumpAccessories_1.UndergroundWater, 4.5, 0.01); // new Point(400, 550)
            _this.addWidget(pool);
            _this.items.push(pool);
            for (var i = LINES_COUNT1; i < LINES_COUNT1 + LINES_COUNT2; i++)
                _this.createWidgets(basePoint.newPointMoved(DELTA_X * i, 0), i + 1);
        }
        return _this;
    }
    UNDEGROUNDPUMP.prototype.createWidgets = function (p, number) {
        var pump = new pumpAccessories_1.Pump(p.newPointMoved(30, 250), 100, 0); // new Point(430, 350)
        pump.name = 'Pump' + number.toString();
        //console.log(`class UNDEGROUNDPUMP pump name=${pump.name}`);
        this.items.push(pump);
        this.addWidget(pump);
        for (var i = 0; i < vPoints.length; i++) {
            var v = void 0;
            if (vPoints[i][dispIndex] == null)
                v = new pumpAccessories_1.ValveCheck(p.newPointMoved(vPoints[i][dxIndex], vPoints[i][dyIndex]), 30);
            else {
                v = new pumpAccessories_1.Valve(p.newPointMoved(vPoints[i][dxIndex], vPoints[i][dyIndex]), 30, vPoints[i][dispIndex], 50);
                this.items.push(v);
            }
            v.name = 'Y' + number.toString() + (i + 1).toString();
            this.addWidget(v);
            //console.log(`class UNDEGROUNDPUMP valve name=${v.name}`)
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
    { dXY: [167, 689], disp: mine_drawing_1.Disposition.Vertical, name: 'Y2' },
    { dXY: [166, 311], disp: null, name: 'XS1' },
    /*-------------     TECH LINE 2    --------------*/
    { dXY: [140, 567], disp: null, name: 'XS2' },
    { dXY: [100, 515], disp: mine_drawing_1.Disposition.Vertical, name: 'Y220' },
    { dXY: [140, 525], disp: mine_drawing_1.Disposition.Vertical, name: 'Y221' },
    { dXY: [140, 379], disp: mine_drawing_1.Disposition.Vertical, name: 'Y222' },
    /*-------------     TECH LINE 1    --------------*/
    { dXY: [194, 567], disp: null, name: 'XS3' },
    { dXY: [228, 515], disp: mine_drawing_1.Disposition.Vertical, name: 'Y210' },
    { dXY: [194, 379], disp: mine_drawing_1.Disposition.Vertical, name: 'Y211' },
    { dXY: [194, 525], disp: mine_drawing_1.Disposition.Vertical, name: 'Y212' },
    /****     CLEAR PUMPS    ****/
    { dXY: [334, 689], disp: mine_drawing_1.Disposition.Vertical, name: 'Y1' },
    { dXY: [333, 311], disp: null, name: 'XS4' },
    { dXY: [334, 579], disp: null, name: 'XS5' },
    /*-------------     CLEAR LINE 2    --------------*/
    { dXY: [273, 515], disp: mine_drawing_1.Disposition.Vertical, name: 'Y120' },
    { dXY: [307, 525], disp: mine_drawing_1.Disposition.Vertical, name: 'Y121' },
    { dXY: [307, 379], disp: mine_drawing_1.Disposition.Vertical, name: 'Y122' },
    /*-------------     CLEAR LINE 1    --------------*/
    { dXY: [395, 515], disp: mine_drawing_1.Disposition.Vertical, name: 'Y110' },
    { dXY: [361, 525], disp: mine_drawing_1.Disposition.Vertical, name: 'Y111' },
    { dXY: [361, 379], disp: mine_drawing_1.Disposition.Vertical, name: 'Y112' },
];
var surfacePumpsData = [
    { dXY: [1, 581], name: 'M0' },
    { dXY: [68, 742], name: 'DP4' },
    { dXY: [132, 423], name: 'M4' },
    { dXY: [186, 423], name: 'M3' },
    { dXY: [420, 742], name: 'DP3' },
    { dXY: [299, 423], name: 'M2' },
    { dXY: [353, 423], name: 'M1' },
];
var SURFACEPUMP = /** @class */ (function (_super) {
    __extends(SURFACEPUMP, _super);
    function SURFACEPUMP(container, width, height, basePoint) {
        var _this = _super.call(this, container, width, height, basePoint) || this;
        _this.createWidgets(basePoint);
        return _this;
    }
    SURFACEPUMP.prototype.getPoint = function (dXY) {
        return this.basePoint.newPointMoved(dXY[dxIndex], dXY[dyIndex]);
    };
    SURFACEPUMP.prototype.createWidgets = function (p) {
        var pool = new pumpAccessories_1.Pool(p.newPointMoved(270, 617), 150, pumpAccessories_1.PureWater);
        this.addWidget(pool);
        this.items.push(pool);
        var waterTower = new pumpAccessories_1.WaterTower(p.newPointMoved(530, 100), 200, pumpAccessories_1.PureWater, 1.5);
        this.addWidget(waterTower);
        this.items.push(waterTower);
        for (var i = 0; i < surfacePumpsData.length; i++) {
            var pump = new pumpAccessories_1.Pump(this.getPoint(surfacePumpsData[i].dXY), 100, 0);
            pump.name = surfacePumpsData[i].name;
            this.items.push(pump);
            this.addWidget(pump);
        }
        for (var i = 0; i < surfaceValvesData.length; i++) {
            var obj = surfaceValvesData[i];
            var v = void 0;
            if (obj.disp == null)
                v = new pumpAccessories_1.ValveCheck(this.getPoint(obj.dXY), 30);
            else {
                v = new pumpAccessories_1.Valve(this.getPoint(obj.dXY), 30, obj.disp, 50);
                v.name = obj.name;
                this.items.push(v);
            }
            this.addWidget(v);
            //console.log(`class UNDEGROUNDPUMP valve name=${v.name}`)
        }
    };
    return SURFACEPUMP;
}(BASEPUMP));
exports.SURFACEPUMP = SURFACEPUMP;
//# sourceMappingURL=_undegroundPump.js.map