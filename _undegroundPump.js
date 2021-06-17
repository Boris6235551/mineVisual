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
var vPoints = [
    /*  dxIndex    dyIndex dispositionIndex*/
    [0, 0, mine_drawing_1.Disposition.Horizontal],
    [92, 0, mine_drawing_1.Disposition.Horizontal],
    [40, 180, mine_drawing_1.Disposition.Vertical],
    [135, 90, mine_drawing_1.Disposition.Vertical],
    [85, 220, mine_drawing_1.Disposition.Horizontal],
    [40, 90, null],
    [40, 380, null]
];
var vsPoints = [
    /***************     TECH PUMPS    ***************/
    [167, 689, mine_drawing_1.Disposition.Vertical],
    [166, 311, null],
    /*-------------     TECH LINE 2    --------------*/
    [140, 567, null],
    [100, 515, mine_drawing_1.Disposition.Vertical],
    [140, 525, mine_drawing_1.Disposition.Vertical],
    [140, 379, mine_drawing_1.Disposition.Vertical],
    /*-------------     TECH LINE 2    --------------*/
    [194, 567, null],
    [228, 515, mine_drawing_1.Disposition.Vertical],
    [194, 379, mine_drawing_1.Disposition.Vertical],
    [194, 525, mine_drawing_1.Disposition.Vertical],
    /****     CLEAR PUMPS    ****/
    [334, 689, mine_drawing_1.Disposition.Vertical],
    [333, 311, null],
    [334, 579, null],
    /*-------------     CLEAR LINE 2    --------------*/
    [273, 515, mine_drawing_1.Disposition.Vertical],
    [307, 525, mine_drawing_1.Disposition.Vertical],
    [307, 379, mine_drawing_1.Disposition.Vertical],
    /*-------------     CLEAR LINE 1    --------------*/
    [395, 515, mine_drawing_1.Disposition.Vertical],
    [361, 525, mine_drawing_1.Disposition.Vertical],
    [361, 379, mine_drawing_1.Disposition.Vertical] // Y1.1.2	361	379
];
var psPoints = [
    [1, 581],
    [68, 742],
    [132, 423],
    [186, 423],
    [420, 742],
    [299, 423],
    [353, 423],
];
var dxIndex = 0;
var dyIndex = 1;
var dispIndex = 2;
var LINES_COUNT1 = 3;
var LINES_COUNT2 = 2;
var DELTA_X = 184;
var UNDEGROUNDPUMP = /** @class */ (function (_super) {
    __extends(UNDEGROUNDPUMP, _super);
    function UNDEGROUNDPUMP(container, width, height, basePoint, number) {
        var _this = _super.call(this, container, width, height) || this;
        _this.items = [];
        if (number == 1) {
            _this.name = 'drainageA';
            for (var i = 0; i < LINES_COUNT1; i++)
                _this.createWidgets(basePoint.newPointMoved(DELTA_X * i, 0), i + 1);
        }
        else {
            _this.name = 'drainageB';
            var pool = new pumpAccessories_1.Pool(basePoint.newPointMoved(0, 450), 900); // new Point(400, 550)
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
    UNDEGROUNDPUMP.prototype.send = function (mes) {
        //        console.log(`received message UNDEGROUNDPUMP name=${this.name}`);
        var mesProps = Object.getOwnPropertyNames(mes);
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var widget = _a[_i];
            var wMes = {};
            var delIndexes = [];
            for (var i = 0; i < mesProps.length; i++) {
                if (mesProps[i].startsWith(widget.name)) {
                    wMes[mesProps[i]] = mes[mesProps[i]];
                    delIndexes.push(i);
                }
            }
            //            console.log(`sended to ${widget.name}\n message  =${JSON.stringify(wMes)}`);    
            for (var i = delIndexes.length - 1; i >= 0; i--)
                mesProps.splice(delIndexes[i], 1);
            //            console.log(`del properies of ${widget.name}; mesProps length=${mesProps.length}`);
            if (mesProps.length == 0)
                return;
        }
        //console.log(`message properies=${mesProps}`);
    };
    return UNDEGROUNDPUMP;
}(mine_drawing_1.Scheme));
exports.UNDEGROUNDPUMP = UNDEGROUNDPUMP;
var SURFACEPUMP = /** @class */ (function (_super) {
    __extends(SURFACEPUMP, _super);
    function SURFACEPUMP(container, width, height, basePoint, number) {
        var _this = _super.call(this, container, width, height) || this;
        _this.basePoint = basePoint;
        _this.items = [];
        if (number == 1) {
        }
        _this.createWidgets(basePoint, number);
        return _this;
    }
    SURFACEPUMP.prototype.getP0 = function (i, ar) {
        return this.basePoint.newPointMoved(ar[i][dxIndex], ar[i][dyIndex]);
    };
    SURFACEPUMP.prototype.createWidgets = function (p, number) {
        var pool = new pumpAccessories_1.Pool(p.newPointMoved(270, 617), 150);
        this.addWidget(pool);
        this.items.push(pool);
        for (var i = 0; i < psPoints.length; i++) {
            var pump = new pumpAccessories_1.Pump(this.getP0(i, psPoints), 100, 0);
            this.items.push(pump);
            this.addWidget(pump);
        }
        for (var i = 0; i < vsPoints.length; i++) {
            var v = void 0;
            if (vsPoints[i][dispIndex] == null)
                v = new pumpAccessories_1.ValveCheck(this.getP0(i, vsPoints), 30);
            else {
                v = new pumpAccessories_1.Valve(this.getP0(i, vsPoints), 30, vsPoints[i][dispIndex], 50);
                this.items.push(v);
            }
            v.name = 'Y' + number.toString() + (i + 1).toString();
            this.addWidget(v);
            //console.log(`class UNDEGROUNDPUMP valve name=${v.name}`)
        }
    };
    return SURFACEPUMP;
}(mine_drawing_1.Scheme));
exports.SURFACEPUMP = SURFACEPUMP;
// this.Valve1 = new Valve( p, 30, 1, 50)            // basePoint new Point(400, 100) => [0, 0]
// this.addWidget(this.Valve1);
// this.Valve1.name = 'Y11'
// this.Valve2 = new Valve(p.newPointMoved(92, 0), 30, 1, 50); // new Point(492, 100) => [92, 0]
// this.addWidget(this.Valve2);
// this.Valve2.name = 'Y12'
// this.Valve11 = new Valve(new Point(443, 280), 30, 0, 50);   // new Point(443, 280) => [43, 180]
// this.addWidget(this.Valve11);
// this.Valve11.name = 'Y13'
// this.Valve12 = new Valve(new Point(535, 190), 30, 0, 50);   // new Point(535, 190) => [135, 90]
// this.addWidget(this.Valve12);
// this.Valve12.name = 'Y14'
// this.Valve21 = new Valve(new Point(485, 320), 30, 1, 50)    // new Point(485, 320) => [85, 220]
// this.addWidget(this.Valve21);
// this.Valve21.name = 'Y15'
// this.ValveCheck1 = new ValveCheck(new Point(443, 190), 30)  // new Point(443, 190) => [43, 90]
// this.addWidget(this.ValveCheck1);
// this.ValveCheck6 = new ValveCheck(new Point(440, 480), 30)  // new Point(440, 480) => [40, 380]
// this.addWidget(this.ValveCheck6);
// return;
//         this.Pump2 = new Pump(new Point(612.5, 350), 100, 0)
//         this.addWidget(this.Pump2);
//         this.Pump2.name = 'Pump2'
//         this.Pump3 = new Pump(new Point(795, 350), 100, 0)
//         this.addWidget(this.Pump3);
//         this.Pump3.name = 'Pump3'
//         this.Pump4 = new Pump(new Point(977.5, 350), 100, 0)
//         this.addWidget(this.Pump4);
//         this.Pump4.name = 'Pump4'
//         this.Pump5 = new Pump(new Point(1160, 350), 100, 0)
//         this.addWidget(this.Pump5);
//         this.Pump5.name = 'Pump5'
//         this.Valve3 = new Valve(new Point(584, 100), 30, 1, 50)
//         this.addWidget(this.Valve3);
//         this.Valve3.name = 'Y21'
//         this.Valve4 = new Valve(new Point(676, 100), 30, 1, 50)
//         this.addWidget(this.Valve4);
//         this.Valve4.name = 'Y22'
//         this.Valve5 = new Valve(new Point(768, 100), 30, 1, 50)
//         this.addWidget(this.Valve5);
//         this.Valve5.name = 'Y31'
//         this.Valve6 = new Valve(new Point(860, 100), 30, 1, 50)
//         this.addWidget(this.Valve6);
//         this.Valve6.name = 'Y32'
//         this.Valve7 = new Valve(new Point(952, 100), 30, 1, 50)
//         this.addWidget(this.Valve7);
//         this.Valve7.name = 'Y41'
//         this.Valve8 = new Valve(new Point(1044, 100), 30, 1, 50)
//         this.addWidget(this.Valve8);
//         this.Valve8.name = 'Y42'
//         this.Valve9 = new Valve(new Point(1136, 100), 30, 1, 50)
//         this.addWidget(this.Valve9);
//         this.Valve9.name = 'Y51'
//         this.Valve10 = new Valve(new Point(1230, 100), 30, 1, 50)
//         this.addWidget(this.Valve10);
//         this.Valve10.name = 'Y52'
//         this.Valve13 = new Valve(new Point(627, 280), 30, 0, 50)
//         this.addWidget(this.Valve13);
//         this.Valve13.name = 'Y23'
//         this.Valve14 = new Valve(new Point(719, 190), 30, 0, 50)
//         this.addWidget(this.Valve14);
//         this.Valve14.name = 'Y24'
//         this.Valve15 = new Valve(new Point(811, 280), 30, 0, 50)
//         this.addWidget(this.Valve15);
//         this.Valve15.name = 'Y33'
//         this.Valve16 = new Valve(new Point(900, 190), 30, 0, 50)
//         this.addWidget(this.Valve16);
//         this.Valve16.name = 'Y34'
//         this.Valve17 = new Valve(new Point(991, 280), 30, 0, 50)
//         this.addWidget(this.Valve17);
//         this.Valve17.name = 'Y43'
//         this.Valve18 = new Valve(new Point(1084, 190), 30, 0, 50)
//         this.addWidget(this.Valve18);
//         this.Valve18.name = 'Y44'
//         this.Valve19 = new Valve(new Point(1173, 280), 30, 0, 50)
//         this.addWidget(this.Valve19);
//         this.Valve19.name = 'Y53'
//         this.Valve20 = new Valve(new Point(1268, 190), 30, 0, 50)
//         this.addWidget(this.Valve20);
//         this.Valve20.name = 'Y54'
//         this.Valve22 = new Valve(new Point(667, 320), 30, 1, 50)
//         this.addWidget(this.Valve22);
//         this.Valve22.name = 'Y25'
//         this.Valve23 = new Valve(new Point(850, 320), 30, 1, 50)
//         this.addWidget(this.Valve23);
//         this.Valve23.name = 'Y35'
//         this.Valve24 = new Valve(new Point(1032, 320), 30, 1, 50)
//         this.addWidget(this.Valve24);
//         this.Valve24.name = 'Y45'
//         this.Valve25 = new Valve(new Point(1215, 320), 30, 1, 50)
//         this.addWidget(this.Valve25);
//         this.Valve25.name = 'Y55'
//         this.ValveCheck2 = new ValveCheck(new Point(627, 190), 30)
//         this.addWidget(this.ValveCheck2);
//         this.ValveCheck3 = new ValveCheck(new Point(811, 190), 30)
//         this.addWidget(this.ValveCheck3);
//         this.ValveCheck4 = new ValveCheck(new Point(991, 190), 30)
//         this.addWidget(this.ValveCheck4);
//         this.ValveCheck5 = new ValveCheck(new Point(1173, 190), 30)
//         this.addWidget(this.ValveCheck5);
//         this.ValveCheck7 = new ValveCheck(new Point(623, 480), 30)
//         this.addWidget(this.ValveCheck7);
//         this.ValveCheck8 = new ValveCheck(new Point(806, 480), 30)
//         this.addWidget(this.ValveCheck8);
//         this.ValveCheck9 = new ValveCheck(new Point(987, 480), 30)
//         this.addWidget(this.ValveCheck9);
//         this.ValveCheck10 = new ValveCheck(new Point(1169, 480), 30)
//         this.addWidget(this.ValveCheck10);
// this.UndegraundPump1 = new UndegraundPump(new Point(800, 300), 100, 0)
// this.addWidget(this.UndegraundPump1);
//# sourceMappingURL=_undegroundPump.js.map