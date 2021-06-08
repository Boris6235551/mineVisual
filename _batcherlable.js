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
exports.BATCHERLABLE = void 0;
var mine_drawing_1 = require("./mine_drawing");
var batcherlable_1 = require("./batcherlable");
var BATCHERLABLE = /** @class */ (function (_super) {
    __extends(BATCHERLABLE, _super);
    function BATCHERLABLE(container, width, height) {
        var _this = _super.call(this, container, width, height) || this;
        _this.name = 'BatcherLable';
        _this.addBatcher();
        return _this;
    }
    BATCHERLABLE.prototype.addBatcher = function () {
        this.LeftInfo1 = new batcherlable_1.LeftInfo(new mine_drawing_1.Point(1390, 700), 80);
        this.addWidget(this.LeftInfo1);
        this.RightInfo1 = new batcherlable_1.RightInfo(new mine_drawing_1.Point(1694, 700), 80);
        this.addWidget(this.RightInfo1);
        this.ShiftInfo1 = new batcherlable_1.ShiftInfo(new mine_drawing_1.Point(1694, 800), 80);
        this.addWidget(this.ShiftInfo1);
    };
    return BATCHERLABLE;
}(mine_drawing_1.Scheme));
exports.BATCHERLABLE = BATCHERLABLE;
//# sourceMappingURL=_batcherlable.js.map