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
exports.SKIP = void 0;
var mine_drawing_1 = require("./mine_drawing");
var skip_1 = require("./skip");
var SKIP = /** @class */ (function (_super) {
    __extends(SKIP, _super);
    function SKIP(container, width, height) {
        var _this = _super.call(this, container, width, height) || this;
        _this.name = 'Skip';
        _this.Skip1 = new skip_1.Skip(new mine_drawing_1.Point(120, 70), 600);
        _this.addWidget(_this.Skip1);
        return _this;
    }
    return SKIP;
}(mine_drawing_1.Scheme));
exports.SKIP = SKIP;
//# sourceMappingURL=_skip.js.map