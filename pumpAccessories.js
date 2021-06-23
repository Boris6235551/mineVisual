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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compressor = exports.UndegraundPump = exports.ValveCheck = exports.Valve = exports.ValveError = exports.ValveState = exports.WaterTower = exports.MinePool = exports.Pool = exports.PureWater = exports.IndustrialWater = exports.UndergroundWater = exports.Pump = exports.PumpState = void 0;
var konva_1 = __importDefault(require("konva"));
var mine_drawing_1 = require("./mine_drawing");
var utils_1 = require("./utils");
var PumpState;
(function (PumpState) {
    PumpState[PumpState["stop"] = 0] = "stop";
    PumpState[PumpState["starting"] = 1] = "starting";
    PumpState[PumpState["run"] = 2] = "run";
    PumpState[PumpState["stopping"] = 3] = "stopping";
    PumpState[PumpState["alarm"] = 4] = "alarm";
    PumpState[PumpState["revers"] = 5] = "revers";
})(PumpState = exports.PumpState || (exports.PumpState = {}));
;
var PumpError;
(function (PumpError) {
    PumpError[PumpError["NoError"] = 0] = "NoError";
    PumpError[PumpError["StartingTimeOut"] = 1] = "StartingTimeOut";
    PumpError[PumpError["StoppingTimeOut"] = 2] = "StoppingTimeOut";
    PumpError[PumpError["AccidentPressure"] = 3] = "AccidentPressure";
})(PumpError || (PumpError = {}));
var PumpMode;
(function (PumpMode) {
    PumpMode[PumpMode["Auto"] = 1] = "Auto";
    PumpMode[PumpMode["Service"] = 2] = "Service";
})(PumpMode || (PumpMode = {}));
var Pump = /** @class */ (function (_super) {
    __extends(Pump, _super);
    function Pump(p0, length, disposition) {
        var _this = _super.call(this, p0, length, disposition) || this;
        _this.name = 'Pump';
        // this.status = PumpState;
        var p00 = _this.rect.p0;
        var p02 = _this.rect.getMiddlePoint();
        // верхний прямоугольник 0
        var x = p02.x - length * 0.05;
        var y = p00.y;
        var height = length * 0.035;
        var width = length * 0.1;
        var fill = '#C4C4C4';
        if (disposition == mine_drawing_1.Disposition.Vertical)
            _this.primitives.push(_this.createRectangle(x, y, height, width, fill));
        else
            _this.primitives.push(_this.createRectangle(p00.x, p02.y - length * 0.05, width, height, fill));
        // нижний прямоугольник 1
        y = p00.y + length * 0.954;
        if (disposition == mine_drawing_1.Disposition.Vertical)
            _this.primitives.push(_this.createRectangle(x, y, height, width, fill));
        else
            _this.primitives.push(_this.createRectangle(p00.x + length * 0.954, p02.y - length * 0.05, width, height, fill));
        // центральный прямоугольик 2
        x = p00.x, y = p02.y - length * 0.361, height = length * 0.71, width = _this.calcSize(length);
        fill = '#EFEFEF';
        var stroke = '#AEB4B4';
        var strokeWidth = length * 0.0135;
        var cornerRadius = 0.05 * length;
        if (disposition == mine_drawing_1.Disposition.Vertical)
            _this.primitives.push(_this.createRectangle(x, y, height, width, fill, stroke, strokeWidth, cornerRadius));
        else
            _this.primitives.push(_this.createRectangle(p02.x - length * 0.361, p00.y, width, height, fill, stroke, strokeWidth, cornerRadius));
        // верхняя пирамида верх 3
        x = p02.x - length * 0.035;
        y = p00.y + length * 0.035;
        height = length * 0.05;
        width = length * 0.07;
        fill = '#02A96D';
        if (disposition == mine_drawing_1.Disposition.Vertical)
            _this.primitives.push(_this.createRectangle(x, y, height, width, fill));
        else
            _this.primitives.push(_this.createRectangle(p00.x + length * 0.035, p02.y - length * 0.035, width, height, fill));
        // верхняя пирамида низ 4
        x = p02.x - length * 0.11;
        y = p00.y + length * 0.085;
        width = length * 0.22;
        if (disposition == mine_drawing_1.Disposition.Vertical)
            _this.primitives.push(_this.createRectangle(x, y, height, width, fill));
        else
            _this.primitives.push(_this.createRectangle(p00.x + length * 0.085, p02.y - length * 0.11, width, height, fill));
        // нижняя пирамида верх 5
        x = p02.x - length * 0.11;
        y = p00.y + length * 0.858;
        if (disposition == mine_drawing_1.Disposition.Vertical)
            _this.primitives.push(_this.createRectangle(x, y, height, width, fill));
        else
            _this.primitives.push(_this.createRectangle(p00.x + length * 0.858, p02.y - length * 0.11, width, height, fill));
        // нижняя пирамида низ 6
        x = p02.x - length * 0.035;
        y = p00.y + length * 0.907;
        width = length * 0.07;
        if (disposition == mine_drawing_1.Disposition.Vertical)
            _this.primitives.push(_this.createRectangle(x, y, height, width, fill));
        else
            _this.primitives.push(_this.createRectangle(p00.x + length * 0.907, p02.y - length * 0.035, width, height, fill));
        // центральный прямоугольник анимации 7
        x = p00.x + length * 0.00675, y = p02.y - length * 0.29, height = length * 0.58,
            width = _this.calcSize(length) - length * 0.0135;
        fill = '#1D8EEA';
        stroke = '';
        strokeWidth = 0;
        cornerRadius = 0;
        if (disposition == mine_drawing_1.Disposition.Vertical)
            _this.primitives.push(_this.createRectangle(x, y, height, width, fill, stroke, strokeWidth, cornerRadius));
        else
            _this.primitives.push(_this.createRectangle(p02.x - length * 0.29, p00.y + length * 0.00675, width, height, fill, stroke, strokeWidth, cornerRadius));
        // белый прямоугольник анимации1 8
        x = p00.x + length * 0.00675, y = p02.y - length * 0.29, height = length * 0.084, width = _this.calcSize(length) - length * 0.0135;
        fill = '#EDF6FC';
        stroke = '';
        strokeWidth = 0;
        cornerRadius = 0;
        if (disposition == mine_drawing_1.Disposition.Vertical)
            _this.primitives.push(_this.createRectangle(x, y, height, width, fill, stroke, strokeWidth, cornerRadius));
        else
            _this.primitives.push(_this.createRectangle(p02.x - length * 0.29, p00.y + length * 0.00675, width, height, fill, stroke, strokeWidth, cornerRadius));
        // белый прямоугольник анимации2 9
        y = p02.y - length * 0.042;
        if (disposition == mine_drawing_1.Disposition.Vertical)
            _this.primitives.push(_this.createRectangle(x, y, height, width, fill, stroke, strokeWidth, cornerRadius));
        else
            _this.primitives.push(_this.createRectangle(p02.x - length * 0.042, p00.y + length * 0.00675, width, height, fill, stroke, strokeWidth, cornerRadius));
        // белый прямоугольник анимации3 10
        y = p02.y + length * 0.206;
        if (disposition == mine_drawing_1.Disposition.Vertical)
            _this.primitives.push(_this.createRectangle(x, y, height, width, fill, stroke, strokeWidth, cornerRadius));
        else
            _this.primitives.push(_this.createRectangle(p02.x + length * 0.206, p00.y + length * 0.00675, width, height, fill, stroke, strokeWidth, cornerRadius));
        _this.step = length * 0.084;
        var R = length * 0.14;
        var r = length * 0.06;
        // окружность внешняя 11
        x = p02.x;
        y = p02.y;
        var radius = R;
        stroke = '#444343';
        strokeWidth = length * 0.01;
        fill = '';
        _this.primitives.push(_this.createCircle(x, y, radius, fill, stroke, strokeWidth));
        // окружность средняя 12
        radius = r;
        fill = '#A1DC77';
        _this.primitives.push(_this.createCircle(x, y, radius, fill, stroke, strokeWidth));
        // окружность внутренняя  13
        radius = length * 0.04;
        fill = '#00C734';
        _this.primitives.push(_this.createCircle(x, y, radius, fill, stroke, strokeWidth));
        // линия 1 14
        var p0lx = p02.x;
        var p0ly = p02.y - r;
        var p1lx = p02.x - R * Math.sin(45);
        var p1ly = p02.y - R * Math.cos(45);
        _this.primitives.push(_this.createLine(p0lx, p0ly, p1lx, p1ly, stroke, strokeWidth, p02));
        // линия 2 15
        p0lx = p02.x - r * Math.sin(120);
        p0ly = p02.y + r * Math.cos(120);
        p1lx = p02.x - R * Math.sin(75);
        p1ly = p02.y + R * Math.cos(75);
        _this.primitives.push(_this.createLine(p0lx, p0ly, p1lx, p1ly, stroke, strokeWidth, p02));
        // линия 3 16
        p0lx = p02.x + r * Math.sin(240);
        p0ly = p02.y + r * Math.cos(240);
        p1lx = p02.x + R * Math.sin(285);
        p1ly = p02.y + R * Math.cos(285);
        _this.primitives.push(_this.createLine(p0lx, p0ly, p1lx, p1ly, stroke, strokeWidth, p02));
        var _a = utils_1.CreateLabel(p0.newPointMoved(length * 0.4, length * 0.3), null, ''), lr = _a[0], lt = _a[1];
        _this.primitives = _this.primitives.concat([lr, lt]);
        _this.label = lt;
        return _this;
    }
    Pump.prototype.calcSize = function (length, factor) {
        if (factor === void 0) { factor = 2.57; }
        return this.getOdd(length / factor);
    };
    ;
    // setState(newState: PumpState): void {
    //     this.state = newState;
    // }
    Pump.prototype.createRectangle = function (x, y, height, width, fill, stroke, strokeWidth, cornerRadius) {
        return new konva_1.default.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            cornerRadius: cornerRadius,
        });
    };
    Pump.prototype.createCircle = function (x, y, radius, fill, stroke, strokeWidth) {
        return new konva_1.default.Circle({
            x: x,
            y: y,
            radius: radius,
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    Pump.prototype.createLine = function (p0lx, p0ly, p1lx, p1ly, stroke, strokeWidth, p02) {
        return new konva_1.default.Line({
            x: p02.x,
            y: p02.y,
            points: [p0lx, p0ly, p1lx, p1ly],
            stroke: stroke,
            strokeWidth: strokeWidth,
            offset: {
                x: p02.x,
                y: p02.y,
            },
        });
    };
    Pump.prototype.showFrame = function (fill2, fill3, fill4, fill5, fill6, fill7, fill8, fill9, fill10, fill12, fill13, stroke2, stroke7, stroke11, stroke12, stroke13, stroke14, stroke15, stroke16, strokeWidth7) {
        this.primitives[2].fill(fill2);
        this.primitives[3].fill(fill3);
        this.primitives[4].fill(fill4);
        this.primitives[5].fill(fill5);
        this.primitives[6].fill(fill6);
        this.primitives[7].fill(fill7);
        this.primitives[8].fill(fill8);
        this.primitives[9].fill(fill9);
        this.primitives[10].fill(fill10);
        this.primitives[12].fill(fill12);
        this.primitives[13].fill(fill13);
        this.primitives[2].stroke(stroke2);
        this.primitives[7].stroke(stroke7);
        this.primitives[11].stroke(stroke11);
        this.primitives[12].stroke(stroke12);
        this.primitives[13].stroke(stroke13);
        this.primitives[14].stroke(stroke14);
        this.primitives[15].stroke(stroke15);
        this.primitives[16].stroke(stroke16);
        this.primitives[7].strokeWidth(strokeWidth7);
    };
    Pump.prototype.setBaseProperty = function (mes) {
        this.status = mes.Status;
        this.mode = mes.Mode;
        if (this.mode == PumpMode.Auto)
            this.setLabel('A');
        else if (this.mode == PumpMode.Service)
            this.setLabel('S');
        else
            this.setLabel('E');
        this.error = mes.Error;
    };
    Pump.prototype.nextFrame = function (angel) {
        if (angel === void 0) { angel = 30; }
        var dy = this.step;
        switch (this.status) {
            case PumpState.run:
            case PumpState.stopping:
            case PumpState.starting:
                this.primitives[14].rotate(angel);
                this.primitives[15].rotate(angel);
                this.primitives[16].rotate(angel);
                if (this.animationFrame < 2) {
                    dy = this.step;
                    this.primitives[10].fill('');
                    this.animationFrame += 1;
                }
                else {
                    dy = -(2 * this.step);
                    this.primitives[10].fill('#EDF6FC');
                    this.animationFrame = 0;
                }
                if (this.disposition == mine_drawing_1.Disposition.Vertical) {
                    this.primitives[8].move({ x: 0, y: dy });
                    this.primitives[9].move({ x: 0, y: dy });
                    this.primitives[10].move({ x: 0, y: dy });
                }
                else {
                    this.primitives[8].move({ x: dy, y: 0 });
                    this.primitives[9].move({ x: dy, y: 0 });
                    this.primitives[10].move({ x: dy, y: 0 });
                }
                return;
            case PumpState.revers:
                this.primitives[14].rotate(angel);
                this.primitives[15].rotate(angel);
                this.primitives[16].rotate(angel);
                if (this.animationFrame < 2) {
                    dy = this.step;
                    this.primitives[8].fill('');
                    this.animationFrame += 1;
                }
                else {
                    dy = -(2 * this.step);
                    this.primitives[8].fill('#EDF6FC');
                    this.animationFrame = 0;
                }
                if (this.disposition == mine_drawing_1.Disposition.Vertical) {
                    this.primitives[8].move({ x: 0, y: -dy });
                    this.primitives[9].move({ x: 0, y: -dy });
                    this.primitives[10].move({ x: 0, y: -dy });
                }
                else {
                    this.primitives[8].move({ x: -dy, y: 0 });
                    this.primitives[9].move({ x: -dy, y: 0 });
                    this.primitives[10].move({ x: -dy, y: 0 });
                }
                return;
            case PumpState.stop:
                this.showFrame('#EFEFEF', '#FE668B', '#AEB4B4', '#AEB4B4', '#FE668B', '#EDF6FC', '', '', '', '#CFCDCD', '#7E7D7D', '#AEB4B4', '#D99CAB', '#AAA6A6', '#AAA6A6', '#AAA6A6', '#AAA6A6', '#AAA6A6', '#AAA6A6', 3);
                return;
            case PumpState.alarm:
                if (this.animationFrame == 0) {
                    this.showFrame('#000000', '#DB0000', '#DB0000', '#DB0000', '#DB0000', '#EDF6FC', '', '', '', '#000000', '#FF0000', '#000000', '#000000', '#444343', '#444343', '#444343', '#444343', '#444343', '#444343', 3);
                    this.animationFrame = 1;
                }
                else {
                    this.showFrame('#DB0000', '#000000', '#000000', '#000000', '#000000', '#EDF6FC', '', '', '', '#000000', '#FF0000', '#000000', '#DB0000', '#000000', '#444343', '#444343', '#444343', '#444343', '#444343', 3);
                    this.animationFrame = 0;
                }
                return;
        }
    };
    return Pump;
}(mine_drawing_1.BaseMineDraw));
exports.Pump = Pump;
// элементы массива 0-9 - цвета уровней воды, элементы 10 и 11 - цвета фона бассейна
var WaveCount = 10;
var BackColorIndex = 10;
var LineColorIndex = 11;
exports.UndergroundWater = ['#EFFAF5', '#E1F4ED', '#D1E9E0', '#C1DBD1', '#A7CABD', '#97BFB0', '#8DB5A6', '#85AC9D', '#789F90', '#6F9385', '#7D5A5A', '#C06B5A'];
exports.IndustrialWater = ['#96FFDA', '#73FFCD', '#0BFFA8', '#01EA97', '#04CF87', '#01BE7B', '#00AB6E', '#039863', '#028758', '#026D47', '#FE896F', '#D28878'];
exports.PureWater = ['#AAD7FF', '#8DC9FF', '#5BB1FF', '#359EFF', '#1F94FF', '#0085FF', '#0071D9', '#0061BA', '#00519C', '#02498B', '#FE896F', '#D28878'];
var Pool = /** @class */ (function (_super) {
    __extends(Pool, _super);
    function Pool(p0, length, color) {
        var _this = _super.call(this, p0, length) || this;
        _this.waves = [];
        // console.log(`class Pool constructor ${JSON.stringify(this.rect)}`)
        _this.waves = [];
        _this.name = 'Pool';
        _this.p00 = _this.rect.p0;
        _this.p02 = _this.rect.getMiddlePoint();
        _this.height = _this.rect.p1.y - _this.rect.p0.y;
        _this.width = length;
        var sickness = _this.getWallThickness();
        var waveX0 = _this.p00.x + sickness;
        var waveHeigh = (_this.height - sickness) * 0.1;
        var waveWidth = _this.width - sickness * 2;
        _this.primitives.push(utils_1.createRectangle(_this.p00.x, _this.p00.y, _this.height, _this.width, color[BackColorIndex], color[LineColorIndex], length * 0.001, length * 0.001));
        _this.primitives.push(utils_1.createRectangle(waveX0, _this.p00.y, _this.height - sickness, waveWidth, '#E9EDEA', '#34E7E7', length * 0.0005, 0));
        for (var i = 0; i < WaveCount; i++) {
            var r = utils_1.createRectangle(waveX0, _this.p00.y + waveHeigh * i, waveHeigh, waveWidth, color[i], '', 0, 0);
            _this.primitives.push(r);
            _this.waves.push(r);
        }
        // label
        _this.primitives.push(utils_1.createCircle(_this.p02.x, _this.p02.y, length * 0.07, length * 0.001, 'white', '#34E7E7'));
        _this.label = utils_1.createText(_this.p02.x - length * 0.058, _this.p02.y - length * 0.02, '', length * 0.05);
        _this.primitives.push(_this.label);
        _this.showLevel(100);
        return _this;
    }
    Pool.prototype.calcSize = function (length, factor) {
        if (factor === void 0) { factor = 2.2; }
        // console.log(`class Pool calcSize ${factor}`)
        return this.getOdd(length / factor);
    };
    ;
    Pool.prototype.getWallThickness = function () {
        return this.width * 0.04;
    };
    Pool.prototype.showLevel = function (level) {
        // console.log(`#######################################Pump showLevel level=${level}`)
        this.level = level;
        this.setLabel(this.level.toString() + '%');
        var val = Math.round(this.level / 10); // 0, 1, 2, ...  10
        var lastUnvisibleIndex = WaveCount - val - 1;
        for (var i = 0; i < WaveCount; i++) {
            if (i <= lastUnvisibleIndex)
                this.waves[i].visible(false);
            else
                this.waves[i].visible(true);
        }
        //this.layer.draw();
    };
    // nextFrame(): void {
    //     this.setLabel('90')
    // }
    Pool.prototype.setBaseProperty = function (mes) {
        this.showLevel(mes.Level); // Level - %
        // HLevel
        // LLevel    
    };
    return Pool;
}(mine_drawing_1.BaseMineDraw));
exports.Pool = Pool;
var MinePool = /** @class */ (function (_super) {
    __extends(MinePool, _super);
    function MinePool(p0, length) {
        return _super.call(this, p0, length, exports.UndergroundWater) || this;
    }
    MinePool.prototype.calcSize = function (length, factor) {
        if (factor === void 0) { factor = 3.5; }
        // console.log(`class Pool calcSize ${factor}`)
        return this.getOdd(length / factor);
    };
    ;
    MinePool.prototype.getWallThickness = function () {
        return this.width * 0.02;
    };
    return MinePool;
}(Pool));
exports.MinePool = MinePool;
var WaterTower = /** @class */ (function (_super) {
    __extends(WaterTower, _super);
    function WaterTower(p0, length) {
        var _this = _super.call(this, p0, length, exports.PureWater) || this;
        // console.log(`class Pool constructor ${JSON.stringify(this.rect)}`)
        _this.name = 'WaterTower';
        _this.primitives.push(utils_1.createRectangle(_this.p00.x + _this.width * 0.17, _this.p00.y + _this.height, _this.width * 1.35, _this.width * 0.65, '#DCDBDB', '#B9C3C3', length * 0.001, 0));
        _this.primitives.push(utils_1.createRectangle(_this.p00.x + _this.width * 0.425, _this.p00.y + _this.height, _this.width * 1.35, _this.width * 0.12, '#B7B4B4', '', 0, 0));
        return _this;
    }
    WaterTower.prototype.calcSize = function (length, factor) {
        if (factor === void 0) { factor = 0.71; }
        // console.log(`class Pool calcSize ${factor}`)
        return this.getOdd(length / factor);
    };
    ;
    WaterTower.prototype.getWallThickness = function () {
        return this.width * 0.08;
    };
    return WaterTower;
}(Pool));
exports.WaterTower = WaterTower;
var ValveState;
(function (ValveState) {
    ValveState[ValveState["init"] = 0] = "init";
    ValveState[ValveState["closed"] = 1] = "closed";
    ValveState[ValveState["opening"] = 2] = "opening";
    ValveState[ValveState["opened"] = 3] = "opened";
    ValveState[ValveState["closing"] = 4] = "closing";
    ValveState[ValveState["calibration"] = 5] = "calibration";
    ValveState[ValveState["alarm"] = 6] = "alarm";
    ValveState[ValveState["stop"] = 7] = "stop";
})(ValveState = exports.ValveState || (exports.ValveState = {}));
;
var ValveError;
(function (ValveError) {
    ValveError[ValveError["NoError"] = 0] = "NoError";
    ValveError[ValveError["CloseAndOpenValveInputs"] = 1] = "CloseAndOpenValveInputs";
    ValveError[ValveError["OpeningTimeOut"] = 2] = "OpeningTimeOut";
    ValveError[ValveError["ClosingTimeOut"] = 3] = "ClosingTimeOut";
    ValveError[ValveError["AlarmValveInput"] = 4] = "AlarmValveInput";
})(ValveError = exports.ValveError || (exports.ValveError = {}));
;
var ValveMode;
(function (ValveMode) {
    ValveMode[ValveMode["HandDrive"] = 0] = "HandDrive";
    ValveMode[ValveMode["Auto"] = 1] = "Auto";
    ValveMode[ValveMode["Service"] = 2] = "Service";
})(ValveMode || (ValveMode = {}));
;
var ValvePrimitive;
(function (ValvePrimitive) {
    ValvePrimitive[ValvePrimitive["triangle0"] = 0] = "triangle0";
    ValvePrimitive[ValvePrimitive["triangle1"] = 1] = "triangle1";
    ValvePrimitive[ValvePrimitive["rectangleCentr"] = 2] = "rectangleCentr";
    ValvePrimitive[ValvePrimitive["circle"] = 3] = "circle";
    ValvePrimitive[ValvePrimitive["opening"] = 4] = "opening";
})(ValvePrimitive || (ValvePrimitive = {}));
var Valve = /** @class */ (function (_super) {
    __extends(Valve, _super);
    function Valve(p0, length, disposition) {
        var _this = _super.call(this, p0, length, disposition) || this;
        _this.name = 'Valve';
        _this.state = ValveState.opened;
        var p00 = _this.rect.p0;
        var p01 = (disposition == mine_drawing_1.Disposition.Vertical) ? _this.rect.rightTop() : _this.rect.getMiddlePoint();
        var p02 = (disposition == mine_drawing_1.Disposition.Vertical) ? _this.rect.getMiddlePoint() : _this.rect.leftButtom();
        _this.primitives.push(_this.createTriangle(p00, p01, p02, length));
        var p10 = _this.rect.p1;
        var p11 = (disposition == mine_drawing_1.Disposition.Vertical) ? _this.rect.leftButtom() : _this.rect.getMiddlePoint();
        var p12 = (disposition == mine_drawing_1.Disposition.Vertical) ? _this.rect.getMiddlePoint() : _this.rect.rightTop();
        _this.primitives.push(_this.createTriangle(p10, p11, p12, length));
        _this.primitives.push(_this.createRectangle(length));
        _this.primitives.push(_this.createCircle(length));
        _this.labelsetPercentage = _this.createText(length, '');
        _this.primitives.push(_this.labelsetPercentage);
        console.log(_this.labelsetPercentage);
        _this.rect.p0.y -= 2;
        _this.rect.p1.y += 2;
        var _a = utils_1.CreateLabel(p0.newPointMoved(length * 0.5, length * 0.5), disposition, ''), lr = _a[0], lt = _a[1];
        _this.primitives = _this.primitives.concat([lr, lt]);
        _this.label = lt;
        _this.nextFrame();
        return _this;
    }
    Valve.prototype.setState = function (newState) {
        this.state = newState;
    };
    Valve.prototype.createTriangle = function (p0, p1, p2, length) {
        return new konva_1.default.Line({
            points: [p0.x, p0.y, p1.x, p1.y, p2.x, p2.y],
            fill: '',
            stroke: '',
            strokeWidth: Math.trunc(length * 0.02),
            closed: true,
        });
    };
    Valve.prototype.createRectangle = function (length) {
        var dxC = (this.disposition == mine_drawing_1.Disposition.Horizontal) ? Math.trunc(length / 19.8) : Math.trunc(length / 5.4);
        var dyC = (this.disposition == mine_drawing_1.Disposition.Horizontal) ? Math.trunc(length / 5.4) : Math.trunc(length / 19.8);
        var height = (this.disposition == mine_drawing_1.Disposition.Horizontal) ? length / 2.7 : length / 9.9;
        var width = (this.disposition == mine_drawing_1.Disposition.Horizontal) ? length / 9.9 : length / 2.7;
        return new konva_1.default.Rect({
            x: this.rect.getMiddlePoint().x - dxC,
            y: this.rect.getMiddlePoint().y - dyC,
            height: height,
            width: width,
            fill: '',
        });
    };
    Valve.prototype.createCircle = function (length) {
        var dxC = (this.disposition == mine_drawing_1.Disposition.Horizontal) ? 0 : Math.trunc(0.55 * length);
        var dyC = (this.disposition == mine_drawing_1.Disposition.Horizontal) ? Math.trunc(0.55 * length) : 0;
        return new konva_1.default.Circle({
            x: this.rect.getMiddlePoint().x - dxC,
            y: this.rect.getMiddlePoint().y - dyC,
            radius: Math.trunc(length / 2.7),
            fill: '',
            stroke: '',
            strokeWidth: 1,
        });
    };
    Valve.prototype.createText = function (length, text) {
        var dxC = (this.disposition == mine_drawing_1.Disposition.Horizontal) ? Math.trunc(0.28 * length) : Math.trunc(0.8 * length);
        var dyC = (this.disposition == mine_drawing_1.Disposition.Horizontal) ? Math.trunc(0.65 * length) : Math.trunc(0.1 * length);
        return new konva_1.default.Text({
            x: this.rect.getMiddlePoint().x - dxC,
            y: this.rect.getMiddlePoint().y - dyC,
            text: text,
            fontSize: length / 4,
            fontStyle: 'bold',
            fontFamily: 'Roboto',
            fill: '',
        });
    };
    Valve.prototype.calcSize = function (length, factor) {
        if (factor === void 0) { factor = 1.59; }
        return this.getOdd(length / factor);
    };
    ;
    Valve.prototype.showFrame = function (fill0, fill1, stroke, rectFill, circleStroke) {
        this.primitives[ValvePrimitive.triangle0].stroke(stroke);
        this.primitives[ValvePrimitive.triangle0].fill(fill0);
        this.primitives[ValvePrimitive.triangle1].stroke(stroke);
        this.primitives[ValvePrimitive.triangle1].fill(fill1);
        this.primitives[ValvePrimitive.rectangleCentr].fill(rectFill);
        this.primitives[ValvePrimitive.circle].stroke(circleStroke);
    };
    Valve.prototype.setPercentage = function (text) {
        if (this.labelsetPercentage != null)
            this.labelsetPercentage.text(text);
    };
    Valve.prototype.setBaseProperty = function (mes) {
        if (mes.pos === undefined) {
            this.setPercentage('');
            this.primitives[3].visible(false);
        }
        else
            this.setPercentage(mes.pos + '%');
        this.state = mes.Status;
        this.mode = mes.Mode;
        if (this.mode == ValveMode.Auto)
            this.setLabel('A');
        else if (this.mode == ValveMode.Service)
            this.setLabel('S');
        else if (this.mode == ValveMode.HandDrive)
            this.setLabel('H');
        else
            this.setLabel('E');
        this.error = mes.Error;
    };
    Valve.prototype.nextFrame = function () {
        switch (this.state) {
            case ValveState.calibration:
            case ValveState.init:
                this.showFrame('#AEB4B4', '#AEB4B4', '#E3093E', '#E3093E', '#E3093E');
                break;
            case ValveState.closed:
                this.showFrame('#FE668B', '#FE668B', '#E3093E', '#E3093E', '#E3093E');
                break;
            case ValveState.opened:
                if (this.animationFrame == 0) {
                    this.showFrame('#1D8EEA', '#E1F1FB', '#00C734', '#7AD03E', '#7AD03E');
                    this.animationFrame = 1;
                }
                else if (this.animationFrame == 1) {
                    this.showFrame('#1D8EEA', '#1D8EEA', '#00C734', '#7AD03E', '#7AD03E');
                    this.animationFrame = 2;
                }
                else {
                    this.showFrame('#E1F1FB', '#1D8EEA', '#00C734', '#7AD03E', '#7AD03E');
                    this.animationFrame = 0;
                }
                break;
            case ValveState.opening:
                if (this.animationFrame == 0) {
                    this.showFrame('#A1DC77', '#E1F1FB', '#F0FF41', '#7AD03E', '#7AD03E');
                    this.animationFrame = 1;
                }
                else {
                    this.showFrame('#E1F1FB', '#A1DC77', '#7AD03E', '#7AD03E', '#7AD03E');
                    this.animationFrame = 0;
                }
                break;
            case ValveState.closing:
                if (this.animationFrame == 0) {
                    this.showFrame('#FE668B', '#E1F1FB', '#F0FF41', '#E3093E', '#E3093E');
                    this.animationFrame = 1;
                }
                else {
                    this.showFrame('#E1F1FB', '#FE668B', '#E3093E', '#E3093E', '#E3093E');
                    this.animationFrame = 0;
                }
                break;
            case ValveState.alarm:
                if (this.animationFrame == 0) {
                    this.showFrame('#EF0000', '#EF0000', '#010101', '#EF0000', '#EF0000');
                    this.animationFrame = 1;
                }
                else {
                    this.showFrame('#010101', '#010101', '#FF0000', '#EF0000', '#EF0000');
                    this.animationFrame = 0;
                }
                break;
        }
    };
    return Valve;
}(mine_drawing_1.BaseMineDraw));
exports.Valve = Valve;
var ValveCheck = /** @class */ (function (_super) {
    __extends(ValveCheck, _super);
    function ValveCheck(p0, length, disposition) {
        if (disposition === void 0) { disposition = mine_drawing_1.Disposition.Vertical; }
        var _this = _super.call(this, p0, length, disposition) || this;
        _this.name = 'Valvecheck';
        var p00 = _this.rect.p0;
        var p01 = (disposition == mine_drawing_1.Disposition.Vertical) ? _this.rect.rightTop() : _this.rect.getMiddlePoint();
        var p02 = (disposition == mine_drawing_1.Disposition.Vertical) ? _this.rect.getMiddlePoint() : _this.rect.leftButtom();
        _this.primitives.push(_this.createTriangle(p00, p01, p02, length, '#E1F1FB', '#000000'));
        var p10 = _this.rect.p1;
        var p11 = (disposition == mine_drawing_1.Disposition.Vertical) ? _this.rect.leftButtom() : _this.rect.getMiddlePoint();
        var p12 = (disposition == mine_drawing_1.Disposition.Vertical) ? _this.rect.getMiddlePoint() : _this.rect.rightTop();
        _this.primitives.push(_this.createTriangle(p10, p11, p12, length, '#1D8EEA', '#00C734'));
        var p03 = p00.newPointMoved(length * 0.16, length * 0.08);
        var p04 = p01.newPointMoved(-length * 0.16, length * 0.08);
        var p05 = p02.newPointMoved(0, -length * 0.16);
        _this.primitives.push(_this.createTriangle(p03, p04, p05, length, '#000000', ''));
        return _this;
    }
    ValveCheck.prototype.createTriangle = function (p0, p1, p2, length, fill, stroke) {
        return new konva_1.default.Line({
            points: [p0.x, p0.y, p1.x, p1.y, p2.x, p2.y],
            fill: fill,
            stroke: stroke,
            strokeWidth: Math.trunc(length * 0.035),
            closed: true,
        });
    };
    ValveCheck.prototype.calcSize = function (length, factor) {
        if (factor === void 0) { factor = 1.59; }
        return this.getOdd(length / factor);
    };
    ;
    return ValveCheck;
}(mine_drawing_1.BaseMineDraw));
exports.ValveCheck = ValveCheck;
var UndegraundPump = /** @class */ (function (_super) {
    __extends(UndegraundPump, _super);
    function UndegraundPump(p0, length, disposition) {
        var _this = _super.call(this, p0, length, mine_drawing_1.Disposition.Vertical) || this;
        var p1lx = p0.x + _this.calcSize(length) / 2;
        var p1ly = p0.y;
        var p2lx = p0.x + _this.calcSize(length) / 2;
        var p2ly = p0.y + length;
        var p3lx = p0.x + length;
        var p3ly = p0.y + length;
        var p4lx = p0.x + length;
        var p4ly = p0.y;
        var offsetX = length * 0.5 - _this.calcSize(length) * 0.25;
        _this.primitives.push(_this.createLineUndegraund(p1lx, p1ly, p2lx, p2ly, p3lx, p3ly, p4lx, p4ly, length * 0.0157, offsetX, 0));
        p1lx = p0.x + length, p1ly = p0.y,
            p2lx = p3lx = p4lx = p0.x + 1.1 * length,
            p2ly = p3ly = p4ly = p0.y + 0.1 * length;
        for (var i = 0; i < length; i = i + 0.1 * length)
            _this.primitives.push(_this.createLineUndegraund(p1lx, p1ly, p2lx, p2ly, p3lx, p3ly, p4lx, p4ly, length * 0.0157, offsetX, -i));
        p1lx = p0.x + length - offsetX, p1ly = p0.y + length,
            p2lx = p3lx = p4lx = p0.x + 0.9 * length - offsetX,
            p2ly = p3ly = p4ly = p0.y + 0.1 * length + length;
        for (var i = 0; i < 0.8 * length; i = i + 0.1 * length)
            _this.primitives.push(_this.createLineUndegraund(p1lx, p1ly, p2lx, p2ly, p3lx, p3ly, p4lx, p4ly, length * 0.0157, i, 0));
        p1lx = p0.x + _this.calcSize(length) / 2, p1ly = p0.y + length,
            p2lx = p3lx = p4lx = p0.x - 0.1 * length + _this.calcSize(length) / 2,
            p2ly = p3ly = p4ly = p0.y + 0.9 * length;
        for (var i = 0; i < length; i = i + 0.1 * length)
            _this.primitives.push(_this.createLineUndegraund(p1lx, p1ly, p2lx, p2ly, p3lx, p3ly, p4lx, p4ly, length * 0.0157, offsetX, i));
        _this.primitives[1].hide();
        _this.primitives[5].hide();
        _this.primitives[6].hide();
        console.log(_this.primitives);
        return _this;
    }
    // setState(newState: PumpState): void {
    //     this.state = newState == PumpState.run ? PumpState.revers : newState;
    // }
    UndegraundPump.prototype.createLineUndegraund = function (p1lx, p1ly, p2lx, p2ly, p3lx, p3ly, p4lx, p4ly, strokeWidth, offsetX, offsetY) {
        return new konva_1.default.Line({
            points: [p1lx, p1ly, p2lx, p2ly, p3lx, p3ly, p4lx, p4ly],
            stroke: '#980505',
            strokeWidth: strokeWidth,
            offset: {
                x: offsetX,
                y: offsetY,
            },
        });
    };
    return UndegraundPump;
}(Pump));
exports.UndegraundPump = UndegraundPump;
var Compressor = /** @class */ (function (_super) {
    __extends(Compressor, _super);
    function Compressor(p0, length) {
        var _this = _super.call(this, p0, length) || this;
        _this.name = 'Compressor';
        _this.compressors = new Array();
        // динамически меняющиеся объекты
        for (var i = 0; i < 4; i++) {
            _this.primitives.push(_this.createCircle(p0.x + length * 0.08 + i * length * 0.29, p0.y + length * 0.2558, length * 0.074, length * 0.0015, '#FDC858', '#000000'));
            _this.primitives.push(_this.createRectangle(p0.x - length * 0.0116 + i * length * 0.29, p0.y + length * 0.4968, length * 0.2874, length * 0.1833, '#44B5A1'));
        }
        // общая магистраль 
        _this.primitives.push(_this.createLine(p0.x, p0.y, p0.x + length, p0.y, '#84AFB1', length * 0.03));
        _this.primitives.push(_this.createLine(p0.x - length * 0.016, p0.y, p0.x, p0.y, '#055659', length * 0.046));
        //  насосы
        for (var n = 0; n <= 3; n++) {
            var l = 0;
            while (l <= length * 0.3153) {
                _this.primitives.push(_this.createLine(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.015 + l, p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.025 + l, '#055659', length * 0.034));
                _this.primitives.push(_this.createLine(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.025 + l, p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.067 + l, '#84AFB1', length * 0.023));
                _this.primitives.push(_this.createLine(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.067 + l, p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.077 + l, '#055659', length * 0.034));
                _this.primitives.push(_this.createTriangle(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.0842 + l, length * 0.014, 180, length * 0.001));
                _this.primitives.push(_this.createTriangle(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.112 + l, length * 0.014, 0, length * 0.001));
                _this.primitives.push(_this.createLine(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.1194 + l, p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.1294 + l, '#055659', length * 0.034));
                _this.primitives.push(_this.createLine(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.1294 + l, p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.1715 + l, '#84AFB1', length * 0.023));
                _this.primitives.push(_this.createLine(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.1715 + l, p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.1815 + l, '#055659', length * 0.034));
                l = l + length * 0.3153;
            }
            for (var lv = 1; lv < 9; lv++) {
                _this.primitives.push(_this.createLine(p0.x - length * 0.0116 + length * 0.0202 * lv + n * length * 0.29, p0.y + length * 0.4968, p0.x - length * 0.0116 + length * 0.0202 * lv + n * length * 0.29, p0.y + length * 0.7842, '#055659', length * 0.0037));
            }
            for (var lh = 1; lh < 14; lh++) {
                _this.primitives.push(_this.createLine(p0.x - length * 0.0116 + n * length * 0.29, p0.y + length * 0.4968 + length * 0.0206 * lh, p0.x - length * 0.0116 + length * 0.1833 + n * length * 0.29, p0.y + length * 0.4968 + length * 0.0206 * lh, '#055659', length * 0.0037));
            }
        }
        return _this;
    }
    ;
    Compressor.prototype.createRectangle = function (x, y, height, width, fill) {
        return new konva_1.default.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: fill,
        });
    };
    Compressor.prototype.createLine = function (x1, y1, x2, y2, stroke, strokeWidth) {
        return new konva_1.default.Line({
            points: [x1, y1, x2, y2],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    Compressor.prototype.createTriangle = function (x, y, radius, rotation, strokeWidth) {
        return new konva_1.default.RegularPolygon({
            x: x,
            y: y,
            sides: 3,
            radius: radius,
            fill: '#481D88',
            rotation: rotation,
            stroke: '#000000',
            strokeWidth: strokeWidth,
        });
    };
    Compressor.prototype.createCircle = function (x, y, radius, strokeWidth, fill, stroke) {
        return new konva_1.default.Circle({
            x: x,
            y: y,
            radius: radius,
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    Compressor.prototype.setBaseProperty = function (mes) {
        for (var n = 0; n < 4; n++) {
            this.compressors[n] = Object.values(mes)[n];
        }
    };
    Compressor.prototype.nextFrame = function () {
        for (var n = 0; n < 4; n++) {
            if (this.compressors[n]) {
                this.primitives[n * 2].stroke('#46802B');
                this.primitives[n * 2].fill('#FDC858');
                this.primitives[n * 2 + 1].fill('#44B5A1');
            }
            else {
                this.primitives[n * 2].stroke('#C46B6B');
                this.primitives[n * 2].fill('#EBE0CB');
                this.primitives[n * 2 + 1].fill('#E5DDCC');
            }
        }
    };
    ;
    return Compressor;
}(mine_drawing_1.BaseMineDraw));
exports.Compressor = Compressor;
;
//# sourceMappingURL=pumpAccessories.js.map