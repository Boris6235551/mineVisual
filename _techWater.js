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
exports.TechWater = void 0;
var mine_drawing_1 = require("./mine_drawing");
// import {Valve, ValveState} from './valve';
var tube_1 = require("./tube");
var Pump_1 = require("./Pump");
var TechWater = /** @class */ (function (_super) {
    __extends(TechWater, _super);
    function TechWater(container, width, height) {
        var _this = _super.call(this, container, width, height) || this;
        _this.name = "TechWater";
        _this.addValve();
        return _this;
    }
    TechWater.prototype.addValve = function () {
        // let pumpM1_1 = new Pump(10, 10, Disposition.Horizontal);
        // let valveY1 = new Valve(new Point(100, 30), 90, Disposition.Vertical, 90);
        //valveY1.setPercentage(100);
        // valveY1.setState(ValveState.opening);
        // this.addWidget(valveY1);
        // let valveY2 = new Valve(new Point(100, 801), 90, Disposition.Vertical, 80);
        // valveY2.setState(ValveState.opened);
        // this.addWidget(valveY2);
        var corn = new tube_1.Corner(new mine_drawing_1.Point(200, 200), 1, mine_drawing_1.Disposition.Vertical, tube_1.CornerOrientation.LeftUp, true);
        this.addWidget(corn);
        var Pump1 = new Pump_1.Pump(new mine_drawing_1.Point(200, 50), 250, mine_drawing_1.Disposition.Horizontal);
        this.addWidget(Pump1);
        Pump1.setState(Pump_1.PumpState.run);
        var Pump2 = new Pump_1.Pump(new mine_drawing_1.Point(500, 100), 250, mine_drawing_1.Disposition.Vertical);
        this.addWidget(Pump2);
        Pump2.setState(Pump_1.PumpState.revers);
        var Pump3 = new Pump_1.Undegraund(new mine_drawing_1.Point(200, 400), 100, mine_drawing_1.Disposition.Vertical);
        this.addWidget(Pump3);
        Pump3.setState(Pump_1.PumpState.revers);
        // let pool1 = new Pool(new Point(400, 50), 250, 100);
        // valveY2.setState(ValveState.opened)
        // surfaceScheme.addWidget(pumpM1_1);
        //  valveY2.setState(ValveState.opened);
        //  surfaceScheme.addWidget(valveY2);
        //  valveY3.setState(ValveState.opened);
        // surfaceScheme.addWidget(pool1);
        var line1 = new tube_1.Connection(new mine_drawing_1.Point(0, 0), 100, mine_drawing_1.Disposition.Vertical);
        // line1.connectVertical(valveY1, valveY2);
        this.addWidget(line1);
    };
    return TechWater;
}(mine_drawing_1.Scheme));
exports.TechWater = TechWater;
//# sourceMappingURL=_techWater.js.map