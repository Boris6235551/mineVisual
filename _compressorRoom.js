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
exports.COMPRESSORROOM = void 0;
var mine_drawing_1 = require("./mine_drawing");
var compressorRoom_1 = require("./compressorRoom");
var COMPRESSORROOM = /** @class */ (function (_super) {
    __extends(COMPRESSORROOM, _super);
    // public UndegraundPump1: UndegraundPump;
    function COMPRESSORROOM(container, width, height) {
        var _this = _super.call(this, container, width, height) || this;
        _this.name = 'Compressorroom';
        _this.addBatcher();
        return _this;
    }
    COMPRESSORROOM.prototype.addBatcher = function () {
        this.Pump1 = new compressorRoom_1.Pump(new mine_drawing_1.Point(430, 350), 100, 0);
        this.addWidget(this.Pump1);
        this.Pump2 = new compressorRoom_1.Pump(new mine_drawing_1.Point(612.5, 350), 100, 0);
        this.addWidget(this.Pump2);
        this.Pump3 = new compressorRoom_1.Pump(new mine_drawing_1.Point(795, 350), 100, 0);
        this.addWidget(this.Pump3);
        this.Pump4 = new compressorRoom_1.Pump(new mine_drawing_1.Point(977.5, 350), 100, 0);
        this.addWidget(this.Pump4);
        this.Pump5 = new compressorRoom_1.Pump(new mine_drawing_1.Point(1160, 350), 100, 0);
        this.addWidget(this.Pump5);
        this.Pool1 = new compressorRoom_1.Pool(new mine_drawing_1.Point(400, 550), 900);
        this.addWidget(this.Pool1);
        this.Valve1 = new compressorRoom_1.Valve(new mine_drawing_1.Point(360, 100), 50, 0, 50);
        this.addWidget(this.Valve1);
        // this.UndegraundPump1 = new UndegraundPump(new Point(800, 300), 100, 0)
        // this.addWidget(this.UndegraundPump1);
    };
    return COMPRESSORROOM;
}(mine_drawing_1.Scheme));
exports.COMPRESSORROOM = COMPRESSORROOM;
//# sourceMappingURL=_compressorRoom.js.map