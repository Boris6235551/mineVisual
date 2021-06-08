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
exports.BATCHER = void 0;
var mine_drawing_1 = require("./mine_drawing");
var batcher_1 = require("./batcher");
var BATCHER = /** @class */ (function (_super) {
    __extends(BATCHER, _super);
    function BATCHER(container, width, height) {
        var _this = _super.call(this, container, width, height) || this;
        _this.name = 'Batcher';
        _this.addBatcher();
        return _this;
    }
    BATCHER.prototype.addBatcher = function () {
        this.BunkerLeft = new batcher_1.Bunker(new mine_drawing_1.Point(1262, 333), 2);
        this.addWidget(this.BunkerLeft);
        this.BunkerRight = new batcher_1.Bunker(new mine_drawing_1.Point(1617, 333), 2, false);
        this.addWidget(this.BunkerRight);
        this.FeederLeft1 = new batcher_1.FeederLeft(new mine_drawing_1.Point(1262, 332), 2);
        this.addWidget(this.FeederLeft1);
        this.FeederRight1 = new batcher_1.FeederRight(new mine_drawing_1.Point(1660, 332), 2);
        this.addWidget(this.FeederRight1);
        this.ChuteLeft1 = new batcher_1.ChuteLeft(new mine_drawing_1.Point(1289, 440), 2);
        this.addWidget(this.ChuteLeft1);
        this.ChuteRight1 = new batcher_1.ChuteRight(new mine_drawing_1.Point(1627, 440), 2);
        this.addWidget(this.ChuteRight1);
        var BatcherLeft1 = new batcher_1.BatcherLeft(new mine_drawing_1.Point(1277, 500), 2);
        this.addWidget(BatcherLeft1);
        var BatcherRight1 = new batcher_1.BatcherRight(new mine_drawing_1.Point(1615, 500), 2);
        this.addWidget(BatcherRight1);
        this.GateLeft1 = new batcher_1.GateLeft(new mine_drawing_1.Point(1277, 500), 2);
        this.addWidget(this.GateLeft1);
        this.GateRight1 = new batcher_1.GateRight(new mine_drawing_1.Point(1615, 500), 2);
        this.addWidget(this.GateRight1);
        this.TongueLeft1 = new batcher_1.TongueLeft(new mine_drawing_1.Point(1277, 500), 2);
        this.addWidget(this.TongueLeft1);
        this.TongueRight1 = new batcher_1.TongueRight(new mine_drawing_1.Point(1615, 500), 2);
        this.addWidget(this.TongueRight1);
        this.LeftInfo1 = new batcher_1.LeftInfo(new mine_drawing_1.Point(1390, 700), 80);
        this.addWidget(this.LeftInfo1);
        this.RightInfo1 = new batcher_1.RightInfo(new mine_drawing_1.Point(1694, 700), 80);
        this.addWidget(this.RightInfo1);
        this.ShiftInfo1 = new batcher_1.ShiftInfo(new mine_drawing_1.Point(1694, 800), 80);
        this.addWidget(this.ShiftInfo1);
    };
    return BATCHER;
}(mine_drawing_1.Scheme));
exports.BATCHER = BATCHER;
//# sourceMappingURL=_batcher.js.map