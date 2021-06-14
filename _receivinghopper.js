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
exports.RECEIVINGHOPPER = void 0;
var mine_drawing_1 = require("./mine_drawing");
var dsf_1 = require("./dsf");
var RECEIVINGHOPPER = /** @class */ (function (_super) {
    __extends(RECEIVINGHOPPER, _super);
    function RECEIVINGHOPPER(container, width, height) {
        var _this = _super.call(this, container, width, height) || this;
        _this.name = 'Skip';
        _this.ReceivingHopper1 = new dsf_1.ReceivingHopper(new mine_drawing_1.Point(300, 70), 60);
        _this.addWidget(_this.ReceivingHopper1);
        _this.ReceivingHopper1.name = 'Skip';
        return _this;
    }
    return RECEIVINGHOPPER;
}(mine_drawing_1.Scheme));
exports.RECEIVINGHOPPER = RECEIVINGHOPPER;
//# sourceMappingURL=_receivinghopper.js.map