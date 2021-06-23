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
        _this.lines = [];
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
    BASEPUMP.prototype.findLineByName = function (name) {
        if (name == '')
            return null;
        for (var _i = 0, _a = this.lines; _i < _a.length; _i++) {
            var l = _a[_i];
            if (l.name == name)
                return l;
        }
        return null;
    };
    /*********      'M'   widget middle side point   *********/
    BASEPUMP.prototype.getMiddle = function (name, disp, first) {
        if (first === void 0) { first = true; }
        var w = this.findByName(name);
        if (w == null)
            return null;
        return disp == mine_drawing_1.Disposition.Vertical ? (first ? w.rect.getMiddleDownPoint() : w.rect.getMiddleUpPoint()) :
            (first ? w.rect.getMiddleRightPoint() : w.rect.getMiddleLeftPoint());
    };
    /*********      'B'   line begin side point   *********/
    BASEPUMP.prototype.getLineBegin = function (name) {
        var l = this.findLineByName(name);
        if (l == null)
            return null;
        return l.getBegin();
    };
    /*********      's'      *********/
    BASEPUMP.prototype.getSurface = function (name, disp, p, first) {
        if (first === void 0) { first = true; }
        var w = this.findByName(name);
        if (w == null)
            return null;
        return disp == mine_drawing_1.Disposition.Vertical ? (first ? new mine_drawing_1.Point(p.x, w.rect.p1.y) : new mine_drawing_1.Point(p.x, w.rect.p0.y)) :
            (first ? new mine_drawing_1.Point(w.rect.p1.x, p.y) : new mine_drawing_1.Point(w.rect.p0.x, p.y));
    };
    /*********      'm'      *********/
    BASEPUMP.prototype.getMiddleCross = function (name, disp, bP, first) {
        if (first === void 0) { first = true; }
        var w = this.findByName(name);
        if (w == null)
            return null;
        var mhp = w.rect.getMiddlePoint();
        var mvp = first ? w.rect.getMiddleDownPoint() : w.rect.getMiddleUpPoint();
        return disp == mine_drawing_1.Disposition.Vertical ? new mine_drawing_1.Point(bP.x, mvp.y) : new mine_drawing_1.Point(mhp.x, bP.y);
    };
    /*********      'd'      *********/
    BASEPUMP.prototype.getDelta = function (delta, disp, p, first) {
        if (first === void 0) { first = true; }
        if (isNaN(delta))
            return null;
        return disp == mine_drawing_1.Disposition.Vertical ? (first ? new mine_drawing_1.Point(p.x, p.y - delta) : new mine_drawing_1.Point(p.x, p.y + delta)) :
            (first ? new mine_drawing_1.Point(p.x - delta, p.y) : new mine_drawing_1.Point(p.x + delta, p.y));
    };
    /*********      'l'      *********/
    BASEPUMP.prototype.getLineCross = function (name, disp, p, first) {
        if (first === void 0) { first = true; }
        if (name == '')
            return null;
        var l = this.findLineByName(name);
        if (l == null)
            return null;
        return disp == mine_drawing_1.Disposition.Vertical ? (first ? new mine_drawing_1.Point(p.x, l.rect.p1.y) : new mine_drawing_1.Point(p.x, l.rect.p0.y)) :
            (first ? new mine_drawing_1.Point(l.rect.p1.x, p.y) : new mine_drawing_1.Point(l.rect.p0.x, p.y));
    };
    BASEPUMP.prototype.createConnections = function (datas) {
        for (var _i = 0, datas_1 = datas; _i < datas_1.length; _i++) {
            var obj = datas_1[_i];
            this.connect(obj.begin, obj.end, obj.disp, obj.type, obj.hasOwnProperty('name') ? obj.name : '');
        }
    };
    BASEPUMP.prototype.connect = function (firstName, secondName, disp, type, name) {
        var p0;
        var p1;
        if (type[0] == 'M' || type[0] == 'B') {
            p0 = type[0] == 'M' ? this.getMiddle(firstName, disp) : this.getLineBegin(firstName);
            if (p0 == null)
                return;
            if (type[1] == 's')
                p1 = this.getSurface(secondName, disp, p0, false);
            else if (type[1] == 'm')
                p1 = this.getMiddleCross(secondName, disp, p0, false);
            else if (type[1] == 'd')
                p1 = this.getDelta(parseInt(secondName), disp, p0, false);
            else if (type[1] == 'l')
                p1 = this.getLineCross(secondName, disp, p0, false);
            if (p1 == null)
                return;
        }
        else if (type[1] == 'M' || type[1] == 'B') {
            p1 = type[1] == 'M' ? this.getMiddle(secondName, disp, false) : this.getLineBegin(secondName);
            if (p1 == null)
                return;
            if (type[0] == 's')
                p0 = this.getSurface(firstName, disp, p1);
            else if (type[0] == 'm')
                p0 = this.getMiddleCross(firstName, disp, p1);
            else if (type[0] == 'd')
                p0 = this.getDelta(parseInt(firstName), disp, p1);
            else if (type[0] == 'l')
                p0 = this.getLineCross(firstName, disp, p1);
            if (p0 == null)
                return;
        }
        var line = new tube_1.Connection(new mine_drawing_1.Point(0, 0), 5, disp);
        line.connectPointPoint(p0, 0, p1, 0);
        line.name = name;
        this.lines.push(line);
        this.addWidget(line);
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
// /*-------------       LINE 1       --------------*/
// {begin: 'Y16', end: 'Y13', dir: true, disp: Disposition.Vertical, type: 'HV'},
// {begin: 'Y13', end: 'Pump1', dir: true, disp: Disposition.Vertical, type: 'HV'},
// {begin: 'Pump1', end: 'Y17', dir: true, disp: Disposition.Vertical, type: 'HV'},
// {begin: 'Y11', end: 'Y12', dir: true, disp: Disposition.Horizontal, type: 'HV'},
// /*-----------------------------------------------*/
// {begin: 'Y26', end: 'Y23', dir: true, disp: Disposition.Vertical, type: 'HV'},
// {begin: 'Y23', end: 'Pump2', dir: true, disp: Disposition.Vertical, type: 'HV'},
// {begin: 'Pump2', end: 'Y27', dir: true, disp: Disposition.Vertical, type: 'HV'},
// {begin: 'Y36', end: 'Y33', dir: true, disp: Disposition.Vertical, type: 'HV'},
// {begin: 'Y33', end: 'Pump3', dir: true, disp: Disposition.Vertical, type: 'HV'},
// {begin: 'Pump3', end: 'Y37', dir: true, disp: Disposition.Vertical, type: 'HV'},
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
            // this.createConnections(mineConnections);
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
                _b = [new pumpAccessories_1.Valve(p.newPointMoved(vPoints[i][dxIndex], vPoints[i][dyIndex]), 30, vPoints[i][dispIndex]), true], v = _b[0], received = _b[1];
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
    /***************     TECH PUMPS    ***************/
    { begin: 'Y222', end: 'M4', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms' },
    { begin: 'M4', end: 'Y221', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms' },
    { begin: 'Y221', end: 'XS2', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms' },
    { begin: 'XS2', end: 'Tech', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms' },
    { begin: 'Y212', end: 'M3', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms' },
    { begin: 'M3', end: 'Y211', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms' },
    { begin: 'Y211', end: 'XS3', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms' },
    { begin: 'XS3', end: 'Tech', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms' },
    { begin: 'Tech', end: 'Y2_', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'sM' },
    { begin: '15', end: 'Y222', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'Y222line' },
    { begin: 'Y222line', end: 'XS1', dir: true, disp: mine_drawing_1.Disposition.Horizontal, type: 'Bm' },
    { begin: '15', end: 'Y212', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'Y212line' },
    { begin: 'XS1', end: 'Y212line', dir: true, disp: mine_drawing_1.Disposition.Horizontal, type: 'mB' },
    { begin: 'XS1', end: 'Y212line', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ml' },
    { begin: '30', end: 'XS1', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM' },
    /*------------------  M0  -----------------------------*/
    { begin: '30', end: 'M0', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'M0line' },
    { begin: 'M0line', end: 'Y110', dir: false, disp: mine_drawing_1.Disposition.Horizontal, type: 'Bm', name: 'M0Yline' },
    { begin: 'Y220', end: 'M0Yline', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ml' },
    { begin: 'Y210', end: 'M0Yline', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ml' },
    { begin: 'Y120', end: 'M0Yline', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ml' },
    { begin: 'Y110', end: 'M0Yline', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ml' },
    { begin: '60', end: 'Y220', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'Y220Pumpline' },
    { begin: 'Y220Pumpline', end: 'M4', dir: true, disp: mine_drawing_1.Disposition.Horizontal, type: 'Bs' },
    { begin: '60', end: 'Y210', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'Y210Pumpline' },
    { begin: 'M3', end: 'Y210Pumpline', dir: true, disp: mine_drawing_1.Disposition.Horizontal, type: 'sB' },
    { begin: '60', end: 'Y120', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'Y120Pumpline' },
    { begin: 'Y120Pumpline', end: 'M2', dir: true, disp: mine_drawing_1.Disposition.Horizontal, type: 'Bs' },
    { begin: '60', end: 'Y110', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'Y110Pumpline' },
    { begin: 'M1', end: 'Y110Pumpline', dir: true, disp: mine_drawing_1.Disposition.Horizontal, type: 'sB' },
    /****************     CLEAR PUMPS    ****************/
    { begin: 'Y122', end: 'M2', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms' },
    { begin: 'M2', end: 'Y121', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms' },
    { begin: 'Y112', end: 'M1', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms' },
    { begin: 'M1', end: 'Y111', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms' },
    { begin: 'XS5', end: 'Clear', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms' },
    { begin: 'Clear', end: 'Y1_', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'sM' },
    { begin: '15', end: 'Y122', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'Y122line' },
    { begin: 'Y122line', end: 'XS4', dir: true, disp: mine_drawing_1.Disposition.Horizontal, type: 'Bm' },
    { begin: '15', end: 'Y112', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'Y112line' },
    { begin: 'XS4', end: 'Y112line', dir: true, disp: mine_drawing_1.Disposition.Horizontal, type: 'mB' },
    { begin: 'XS4', end: 'Y112line', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ml' },
    { begin: '30', end: 'XS4', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM' },
    { begin: '50', end: 'XS5', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'XS5line' },
    { begin: 'XS5line', end: 'Y111', dir: true, disp: mine_drawing_1.Disposition.Horizontal, type: 'Bm', name: 'XS5Rline' },
    { begin: 'Y111', end: 'XS5Rline', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ml' },
    { begin: 'Y121', end: 'XS5line', dir: true, disp: mine_drawing_1.Disposition.Horizontal, type: 'mB', name: 'XS5Lline' },
    { begin: 'Y121', end: 'XS5Lline', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'mB' },
    { begin: '10', end: 'DP4', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'DP4line' },
    { begin: '10', end: 'DP3', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'DP3line' },
    { begin: 'DP4line', end: 'DP3line', dir: true, disp: mine_drawing_1.Disposition.Horizontal, type: 'Bl', name: 'DP43line' },
    { begin: 'Y2_', end: 'DP43line', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ml' },
    { begin: 'Y1_', end: 'DP43line', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ml' },
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
                this.addItem(new pumpAccessories_1.Valve(this.getPoint(obj.dXY), 30, obj.disp), obj.name);
        }
    };
    return SURFACEPUMP;
}(BASEPUMP));
exports.SURFACEPUMP = SURFACEPUMP;
//# sourceMappingURL=_undegroundPump.js.map