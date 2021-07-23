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
    BASEPUMP.prototype.addItem = function (item, name, recieveMessage, flowControllNames) {
        if (recieveMessage === void 0) { recieveMessage = true; }
        if (flowControllNames === void 0) { flowControllNames = ''; }
        item.name = name;
        if (recieveMessage)
            this.items.push(item);
        this.addWidget(item);
        if (flowControllNames == '')
            return;
        this.addFlowDriver(item, flowControllNames);
    };
    BASEPUMP.prototype.addFlowDriver = function (item, flowControllNames) {
        if (flowControllNames == undefined)
            return;
        var driverNames = flowControllNames.split(' ');
        // if(item.name == 'lY11')
        //     console.log(`addFlowDriver for item=${item.name} driverNames=${driverNames}`)
        var driver = this.findByName(driverNames[0]);
        if (driver == null)
            return;
        driver.addToFlowElements(item);
        if (driverNames.length == 1)
            return;
        driver = this.findByName(driverNames[1]);
        if (driver == null)
            return;
        driver.addToSetElements(item);
    };
    // itemByName(name: string): (Valve | Pump ){
    //     for (let item of this.items) {
    //         if(item.name == name) return item;
    //     }
    //     return null;
    // }
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
    /*********      'B or E'   line begin or end side point   *********/
    BASEPUMP.prototype.getLineBeginEnd = function (name, begin) {
        if (begin === void 0) { begin = true; }
        var l = this.findLineByName(name);
        if (l == null)
            return null;
        return begin ? l.getBegin() : l.getEnd();
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
        // let mhp = w.rect.getMiddlePoint();
        // let mvp = first ? w.rect.getMiddleDownPoint() : w.rect.getMiddleUpPoint();
        // return disp==Disposition.Vertical ? new Point( bP.x, mvp.y) : new Point( mhp.x, bP.y);
        var mp = w.rect.getMiddlePoint();
        return disp == mine_drawing_1.Disposition.Vertical ? new mine_drawing_1.Point(bP.x, mp.y) : new mine_drawing_1.Point(mp.x, bP.y);
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
            //console.log(obj)
            this.connect(obj.begin, obj.end, obj.disp, obj.type, obj.dir, obj.hasOwnProperty('name') ? obj.name : '', obj.flowControll);
        }
    };
    BASEPUMP.prototype.connect = function (firstName, secondName, disp, type, dir, name, flowControllNames) {
        var p0;
        var p1;
        if (type[0] == 'M' || type[0] == 'B' || type[0] == 'E') {
            p0 = type[0] == 'M' ? this.getMiddle(firstName, disp) : this.getLineBeginEnd(firstName, type[0] == 'B');
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
        else if (type[1] == 'M' || type[1] == 'B' || type[1] == 'E') {
            p1 = type[1] == 'M' ? this.getMiddle(secondName, disp, false) : this.getLineBeginEnd(secondName, type[1] == 'B');
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
        var line = new tube_1.Connection(new mine_drawing_1.Point(0, 0), 5, disp, dir);
        line.connectPointPoint(p0, 0, p1, 0);
        line.name = name;
        this.lines.push(line);
        this.addWidget(line);
        this.addFlowDriver(line, flowControllNames); // *****  FlowControll
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
            //    console.log(`sended to ${widget.name}\n message  =${JSON.stringify(wMes)}`);
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
    // {begin: 'Y11', end: 'Y16', dir: true, disp: Disposition.Vertical, type: 'mM', name: 'Y16u'},
    // {begin: 'Y11', end: 'Y16u', dir: true, disp: Disposition.Horizontal, type: 'Ml', name: 'Y11r'},
    // {begin: 'Y16u', end: 'Y12', dir: false, disp: Disposition.Horizontal, type: 'lM', name: 'Y12l'},
    // {begin: 'Y16', end: 'Y13', dir: true, disp: Disposition.Vertical, type: 'Ms', name: 'Y16d'},
    // {begin: 'Y13', end: 'Pump1', dir: true, disp: Disposition.Vertical, type: 'Ms', name: 'Y13d'},  //Y13down
    // {begin: 'Pump1', end: 'Y17', dir: true, disp: Disposition.Vertical, type: 'sM'},
    // {begin: 'Y17', end: 'minePool', dir: true, disp: Disposition.Vertical, type: 'Ms'},
    // /*-----------------------------------------------*/
    // {begin: '20', end: 'Y14', dir: false, disp: Disposition.Vertical, type: 'dM', name: 'Y14u'},
    // {begin: 'Y16u', end: 'Y14u', dir: false, disp: Disposition.Horizontal, type: 'lB'},
    // {begin: 'Y14', end: 'minePool', dir: false, disp: Disposition.Vertical, type: 'Ms', name: 'Y14d'},
    // /*-----------------------------------------------*/
    // {begin: 'Y13d', end: 'Y15', dir: false, disp: Disposition.Horizontal, type: 'lM', name: 'Y15l'},
    // {begin: 'Y15', end: 'Y14d', dir: false, disp: Disposition.Horizontal, type: 'Ml', name: 'Y15r'},
    { begin: '40', end: 'lY51', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dB', name: 'ulY51', flowControll: 'Y51' },
    //{begin: '30', end: 'lY51', dir: true, disp: Disposition.Vertical, type: 'dB', name: ''},
    { begin: '760', end: 'ulY51', dir: true, disp: mine_drawing_1.Disposition.Horizontal, type: 'dB', name: 'stav1', flowControll: 'Y51' },
    { begin: 'stav1', end: 'lY41', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'lB', name: 'ulY41', flowControll: 'Y41' },
    { begin: 'stav1', end: 'lY31', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'lB', name: 'ulY31', flowControll: 'Y31' },
    { begin: 'stav1', end: 'lY21', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'lB', name: 'ulY21', flowControll: 'Y21' },
    { begin: 'stav1', end: 'lY11', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'lB', name: 'ulY11', flowControll: 'Y11' },
    { begin: '60', end: 'rY52', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dE', name: 'urY52', flowControll: 'Y52' },
    { begin: '880', end: 'urY52', dir: true, disp: mine_drawing_1.Disposition.Horizontal, type: 'dB', name: 'stav2', flowControll: 'Y52' },
    { begin: 'stav2', end: 'rY42', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'lE', name: 'stav2', flowControll: 'Y42' },
    { begin: 'stav2', end: 'rY32', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'lE', name: 'stav2', flowControll: 'Y32' },
    { begin: 'stav2', end: 'rY22', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'lE', name: 'stav2', flowControll: 'Y22' },
    { begin: 'stav2', end: 'rY12', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'lE', name: 'stav2', flowControll: 'Y12' },
    { begin: '60', end: 'stav1', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dB', name: 'ustav1' },
    { begin: '40', end: 'stav2', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dB', name: 'ustav2' },
];
var mineConnectionsTemplates = [
    /*-------------       LINE @       --------------*/
    { begin: '10', end: 'Y@1', dir: true, disp: mine_drawing_1.Disposition.Horizontal, type: 'dM', name: 'lY@1', flowControll: 'Y@1' },
    { begin: 'Y@2', end: '20', dir: false, disp: mine_drawing_1.Disposition.Horizontal, type: 'Md', name: 'rY@2', flowControll: 'Y@2' },
    /*-----------------------------------------------*/
    { begin: 'Y@1', end: 'Y@6', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'mM', name: 'uY@6', flowControll: 'Y@3' },
    { begin: 'Y@1', end: 'uY@6', dir: true, disp: mine_drawing_1.Disposition.Horizontal, type: 'Ml', name: 'rY@1', flowControll: 'Y@3' },
    { begin: 'uY@6', end: 'Y@2', dir: false, disp: mine_drawing_1.Disposition.Horizontal, type: 'lM', name: 'lY@2', flowControll: 'Y@3' },
    { begin: 'Y@6', end: 'Y@3', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms', name: 'dY@6', flowControll: 'Y@3' },
    { begin: 'Y@3', end: 'Pump@', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms', name: 'dY@3', flowControll: 'Pump@' },
    { begin: 'Pump@', end: 'Y@7', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'sM', name: '', flowControll: 'Pump@' },
    { begin: 'Y@7', end: 'minePool', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms', name: '', flowControll: 'Pump@' },
    /*-----------------------------------------------*/
    { begin: '20', end: 'Y@4', dir: false, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'uY@4', flowControll: 'Y@4' },
    { begin: 'uY@6', end: 'uY@4', dir: false, disp: mine_drawing_1.Disposition.Horizontal, type: 'lB', name: '', flowControll: 'Y@4' },
    { begin: 'Y@4', end: 'minePool', dir: false, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms', name: 'dY@4', flowControll: 'Y@4' },
    /*-----------------------------------------------*/
    { begin: 'dY@3', end: 'Y@5', dir: false, disp: mine_drawing_1.Disposition.Horizontal, type: 'lM', name: 'lY@5', flowControll: 'Y@5' },
    { begin: 'Y@5', end: 'dY@4', dir: false, disp: mine_drawing_1.Disposition.Horizontal, type: 'Ml', name: 'rY@5', flowControll: 'Y@5' },
];
var LINES_COUNT1 = 3;
var LINES_COUNT2 = 2;
var LINES_COUNT = 5;
var DELTA_X = 184;
var UNDEGROUNDPUMP = /** @class */ (function (_super) {
    __extends(UNDEGROUNDPUMP, _super);
    function UNDEGROUNDPUMP(container, width, height, basePoint) {
        var _this = _super.call(this, container, width, height, basePoint) || this;
        _this.connectionsTable = [];
        _this.name = 'drainageA';
        _this.secondName = 'drainageB';
        _this.addItem(new pumpAccessories_1.MinePool(basePoint.newPointMoved(0, 450), 950), 'minePool');
        for (var i = 0; i < LINES_COUNT; i++) {
            _this.createWidgets(basePoint.newPointMoved(DELTA_X * i, 0), i + 1);
            _this.prepareConnectionsTable(i + 1);
        }
        _this.createConnections(_this.connectionsTable);
        _this.createConnections(mineConnections);
        return _this;
    }
    UNDEGROUNDPUMP.prototype.prepareConnectionsTable = function (number) {
        for (var _i = 0, mineConnectionsTemplates_1 = mineConnectionsTemplates; _i < mineConnectionsTemplates_1.length; _i++) {
            var obj = mineConnectionsTemplates_1[_i];
            var properies = Object.getOwnPropertyNames(obj);
            var newObj = {};
            for (var _a = 0, properies_1 = properies; _a < properies_1.length; _a++) {
                var prop = properies_1[_a];
                if (typeof obj[prop] == 'string')
                    newObj[prop] = obj[prop].replace('@', (number).toString());
                else
                    newObj[prop] = obj[prop];
            }
            this.connectionsTable.push(newObj);
            // mineConnections.push(newObj);
            // console.log(`prepareConnectionsTable for line=${number} => ${JSON.stringify(newObj)}`)
        }
    };
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
    { dXY: [182, 261], disp: null, name: 'XS1', flowControll: '' },
    /*-------------     TECH LINE 2    --------------*/
    { dXY: [140, 329], disp: mine_drawing_1.Disposition.Vertical, name: 'Y222', flowControll: 'M4' },
    { dXY: [100, 515], disp: mine_drawing_1.Disposition.Vertical, name: 'Y220', flowControll: 'M0' },
    { dXY: [140, 505], disp: mine_drawing_1.Disposition.Vertical, name: 'Y221', flowControll: 'M4' },
    { dXY: [140, 592], disp: null, name: 'XS2', flowControll: '' },
    /*-------------     TECH LINE 1    --------------*/
    { dXY: [224, 329], disp: mine_drawing_1.Disposition.Vertical, name: 'Y212', flowControll: 'M3' },
    { dXY: [278, 515], disp: mine_drawing_1.Disposition.Vertical, name: 'Y210', flowControll: 'M0' },
    { dXY: [224, 505], disp: mine_drawing_1.Disposition.Vertical, name: 'Y211', flowControll: 'M3' },
    { dXY: [224, 592], disp: null, name: 'XS3', flowControll: '' },
    /*-----------------------------------------------*/
    { dXY: [182, 734], disp: mine_drawing_1.Disposition.Vertical, name: 'Y2_', flowControll: 'DP4 DP3' },
    /****     CLEAR PUMPS    ****/
    { dXY: [418, 261], disp: null, name: 'XS4', flowControll: '' },
    /*-------------     CLEAR LINE 2    --------------*/
    { dXY: [377, 329], disp: mine_drawing_1.Disposition.Vertical, name: 'Y122', flowControll: 'M2' },
    { dXY: [338, 515], disp: mine_drawing_1.Disposition.Vertical, name: 'Y120', flowControll: 'M0' },
    { dXY: [377, 505], disp: mine_drawing_1.Disposition.Vertical, name: 'Y121', flowControll: 'M2' },
    /*-------------     CLEAR LINE 1    --------------*/
    { dXY: [461, 329], disp: mine_drawing_1.Disposition.Vertical, name: 'Y112', flowControll: 'M1' },
    { dXY: [515, 515], disp: mine_drawing_1.Disposition.Vertical, name: 'Y110', flowControll: 'M0' },
    { dXY: [461, 505], disp: mine_drawing_1.Disposition.Vertical, name: 'Y111', flowControll: 'M1' },
    /*-----------------------------------------------*/
    { dXY: [419, 604], disp: null, name: 'XS5', flowControll: '' },
    { dXY: [419, 734], disp: mine_drawing_1.Disposition.Vertical, name: 'Y1_', flowControll: 'DP4 DP3' },
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
    { begin: 'Y222', end: 'M4', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms', name: 'dY222', flowControll: 'M4' },
    { begin: 'M4', end: 'Y221', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms', name: 'uY221', flowControll: 'M4' },
    { begin: 'Y221', end: 'XS2', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms', name: '', flowControll: 'Y221' },
    { begin: 'XS2', end: 'Tech', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms', name: '', flowControll: 'Y221' },
    { begin: 'Y212', end: 'M3', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms', name: '', flowControll: 'M3' },
    { begin: 'M3', end: 'Y211', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms', name: '', flowControll: 'M3' },
    { begin: 'Y211', end: 'XS3', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms', name: '', flowControll: 'Y211' },
    { begin: 'XS3', end: 'Tech', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms', name: '', flowControll: 'Y211' },
    { begin: 'Tech', end: 'Y2_', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'sM', name: '', flowControll: 'Y2_' },
    { begin: '15', end: 'Y222', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'Y222line', flowControll: 'Y222' },
    { begin: 'Y222line', end: 'XS1', dir: false, disp: mine_drawing_1.Disposition.Horizontal, type: 'Bm', name: '', flowControll: 'Y222' },
    { begin: '15', end: 'Y212', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'Y212line', flowControll: 'Y212' },
    { begin: 'XS1', end: 'Y212line', dir: true, disp: mine_drawing_1.Disposition.Horizontal, type: 'mB', name: '', flowControll: 'Y212' },
    { begin: 'XS1', end: 'Y212line', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ml', name: '', flowControll: 'Y222 Y212' },
    { begin: '30', end: 'XS1', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: '', flowControll: 'Y222 Y212' },
    /*------------------  M0  -----------------------------*/
    { begin: '30', end: 'M0', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'M0line', flowControll: 'M0' },
    { begin: 'M0line', end: 'Y110', dir: false, disp: mine_drawing_1.Disposition.Horizontal, type: 'Bm', name: 'M0Yline', flowControll: 'M0' },
    { begin: 'Y220', end: 'M0Yline', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ml', name: 'dY220', flowControll: 'M0' },
    { begin: 'Y210', end: 'M0Yline', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ml', name: 'dY210', flowControll: 'M0' },
    { begin: 'Y120', end: 'M0Yline', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ml', name: 'dY120', flowControll: 'M0' },
    { begin: 'Y110', end: 'M0Yline', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ml', name: 'dY110', flowControll: 'M0' },
    { begin: '60', end: 'Y220', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'Y220Pumpline', flowControll: 'Y220' },
    { begin: 'Y220Pumpline', end: 'M4', dir: true, disp: mine_drawing_1.Disposition.Horizontal, type: 'Bs', name: '', flowControll: 'Y220' },
    { begin: '60', end: 'Y210', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'Y210Pumpline', flowControll: 'Y210' },
    { begin: 'M3', end: 'Y210Pumpline', dir: true, disp: mine_drawing_1.Disposition.Horizontal, type: 'sB', name: '', flowControll: 'Y210' },
    { begin: '60', end: 'Y120', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'Y120Pumpline', flowControll: 'Y120' },
    { begin: 'Y120Pumpline', end: 'M2', dir: true, disp: mine_drawing_1.Disposition.Horizontal, type: 'Bs', name: '', flowControll: 'Y120' },
    { begin: '60', end: 'Y110', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'Y110Pumpline', flowControll: 'Y110' },
    { begin: 'M1', end: 'Y110Pumpline', dir: true, disp: mine_drawing_1.Disposition.Horizontal, type: 'sB', name: '', flowControll: 'Y110' },
    /****************     CLEAR PUMPS    ****************/
    { begin: 'Y122', end: 'M2', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms', name: '', flowControll: 'M2' },
    { begin: 'M2', end: 'Y121', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms', name: '', flowControll: 'M2' },
    { begin: 'Y112', end: 'M1', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms', name: '', flowControll: 'M1' },
    { begin: 'M1', end: 'Y111', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms', name: '', flowControll: 'M1' },
    { begin: 'XS5', end: 'Clear', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ms', name: '', flowControll: 'Y121 Y111' },
    { begin: 'Clear', end: 'Y1_', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'sM', name: '', flowControll: 'Y1_' },
    { begin: '15', end: 'Y122', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'Y122line', flowControll: 'Y122' },
    { begin: 'Y122line', end: 'XS4', dir: false, disp: mine_drawing_1.Disposition.Horizontal, type: 'Bm', name: '', flowControll: 'Y122' },
    { begin: '15', end: 'Y112', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'Y112line', flowControll: 'Y112' },
    { begin: 'XS4', end: 'Y112line', dir: true, disp: mine_drawing_1.Disposition.Horizontal, type: 'mB', name: '', flowControll: 'Y112' },
    { begin: 'XS4', end: 'Y112line', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ml', name: '', flowControll: 'Y122 Y112' },
    { begin: '30', end: 'XS4', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'uXS4', flowControll: 'Y122 Y112' },
    { begin: 'uXS4', end: 'Tower', dir: false, disp: mine_drawing_1.Disposition.Horizontal, type: 'Bs', name: 'ruXS4', flowControll: 'Y122 Y112' },
    { begin: '50', end: 'XS5', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'XS5line', flowControll: 'Y121 Y111' },
    { begin: 'XS5line', end: 'Y111', dir: false, disp: mine_drawing_1.Disposition.Horizontal, type: 'Bm', name: 'XS5Rline', flowControll: 'Y111' },
    { begin: 'Y111', end: 'XS5Rline', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ml', name: '', flowControll: 'Y111' },
    { begin: 'Y121', end: 'XS5line', dir: true, disp: mine_drawing_1.Disposition.Horizontal, type: 'mB', name: 'XS5Lline', flowControll: 'Y121' },
    { begin: 'Y121', end: 'XS5Lline', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ml', name: '', flowControll: 'Y121' },
    { begin: '10', end: 'DP4', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'DP4line', flowControll: 'DP4' },
    { begin: '10', end: 'DP3', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'dM', name: 'DP3line', flowControll: 'DP3' },
    { begin: 'DP4line', end: 'DP3line', dir: true, disp: mine_drawing_1.Disposition.Horizontal, type: 'Bl', name: 'DP43line', flowControll: 'DP4 DP3' },
    { begin: 'Y2_', end: 'DP43line', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ml', name: '', flowControll: 'DP4 DP3' },
    { begin: 'Y1_', end: 'DP43line', dir: true, disp: mine_drawing_1.Disposition.Vertical, type: 'Ml', name: '', flowControll: 'DP4 DP3' },
];
var flowMatrix = [
    'M0:M0line M0Yline dY220 dY210 dY120 dY110:Y220 Y210 Y120 Y110',
    'M4:dY222:Y222',
    'M3:',
    'M2 ',
    'M1 ',
    'DP4 ',
    'DP3 ',
    'Y222:'
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
                this.addItem(new pumpAccessories_1.Valve(this.getPoint(obj.dXY), 30, obj.disp), obj.name, true, obj.flowControll);
        }
    };
    return SURFACEPUMP;
}(BASEPUMP));
exports.SURFACEPUMP = SURFACEPUMP;
// return;
// let number = 1;
//         if(number == 1){
//             this.name = 'drainageA';
//             for(let i = 0; i < LINES_COUNT1; i++) 
//                 this.createWidgets(basePoint.newPointMoved(DELTA_X * i, 0), i + 1);
//             this.createConnections(mineConnections);
//         }
//         else{
//             this.name = 'drainageB';
//             this.addItem(new MinePool( basePoint.newPointMoved(0, 450) , 950), 'minePool');
//             for(let i = LINES_COUNT1; i < LINES_COUNT1 + LINES_COUNT2; i++) 
//                 this.createWidgets(basePoint.newPointMoved(DELTA_X * i, 0), i + 1);
//         }
//# sourceMappingURL=_undegroundPump.js.map