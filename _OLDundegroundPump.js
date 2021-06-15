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
exports.UNDEGROUNDPUMP = void 0;
var mine_drawing_1 = require("./mine_drawing");
var Pump_1 = require("./Pump");
var UNDEGROUNDPUMP = /** @class */ (function (_super) {
    __extends(UNDEGROUNDPUMP, _super);
    function UNDEGROUNDPUMP(container, width, height) {
        var _this = _super.call(this, container, width, height) || this;
        _this.name = 'Undegroundpump';
        _this.addBatcher();
        return _this;
    }
    UNDEGROUNDPUMP.prototype.addBatcher = function () {
        this.Pump1 = new Pump_1.Pump(new mine_drawing_1.Point(200, 233), 100, 1);
        this.addWidget(this.Pump1);
        this.Undegraund1 = new Pump_1.Undegraund(new mine_drawing_1.Point(400, 233), 100, 1);
        this.addWidget(this.Undegraund1);
    };
    return UNDEGROUNDPUMP;
}(mine_drawing_1.Scheme));
exports.UNDEGROUNDPUMP = UNDEGROUNDPUMP;
//# sourceMappingURL=_OLDundegroundPump.js.map