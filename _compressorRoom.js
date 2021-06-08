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
    // public Pool1: Pool;
    // public UndegraundPump1: UndegraundPump;
    function COMPRESSORROOM(container, width, height) {
        var _this = _super.call(this, container, width, height) || this;
        _this.name = 'Compressorroom';
        _this.addBatcher();
        return _this;
    }
    COMPRESSORROOM.prototype.addBatcher = function () {
        this.Pump1 = new compressorRoom_1.Pump(new mine_drawing_1.Point(400, 100), 100, 0);
        this.addWidget(this.Pump1);
        this.Pump2 = new compressorRoom_1.Pump(new mine_drawing_1.Point(500, 100), 100, 0);
        this.addWidget(this.Pump2);
        this.Pump3 = new compressorRoom_1.Pump(new mine_drawing_1.Point(600, 100), 100, 0);
        this.addWidget(this.Pump3);
        this.Pump4 = new compressorRoom_1.Pump(new mine_drawing_1.Point(700, 100), 100, 0);
        this.addWidget(this.Pump4);
        this.Pump5 = new compressorRoom_1.Pump(new mine_drawing_1.Point(800, 100), 100, 0);
        this.addWidget(this.Pump5);
        // this.Pool1 = new Pool(new Point(800, 200), 100, 0)
        // this.addWidget(this.Pool1);
        // this.UndegraundPump1 = new UndegraundPump(new Point(800, 300), 100, 0)
        // this.addWidget(this.UndegraundPump1);
    };
    return COMPRESSORROOM;
}(mine_drawing_1.Scheme));
exports.COMPRESSORROOM = COMPRESSORROOM;
//# sourceMappingURL=_compressorRoom.js.map