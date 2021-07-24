import Konva from 'konva';
import { BaseMineDraw, FlowDriver, Point, Disposition, } from './mine_drawing';
import { CreateLabel, createText, createRectangle, createCircle } from './utils'

export enum PumpState {
    stop = 0, starting, run, stopping, alarm, revers
};

export enum PumpError {
    NoError = 0, StartingTimeOut, StoppingTimeOut, AccidentPressure
}

export enum PumpMode {
    Auto = 1, Service
}

export class Pump extends FlowDriver {
    private step: number;
    // private a: number;
    public status: PumpState;
    public mode: PumpMode;
    public error: PumpError;
    constructor(p0: Point, length: number, disposition: Disposition) {
        super(p0, length, disposition);
        this.name = 'Pump';
        // this.status = PumpState;
        let p00: Point = this.rect.p0;
        let p02: Point = this.rect.getMiddlePoint();

        // верхний прямоугольник 0
        let x: number = p02.x - length * 0.05;
        let y: number = p00.y;
        let height: number = length * 0.035;
        let width: number = length * 0.1;
        let fill: string = '#C4C4C4';
        if (disposition == Disposition.Vertical)
            this.primitives.push(this.createRectangle(x, y, height, width, fill));
        else
            this.primitives.push(this.createRectangle(p00.x, p02.y - length * 0.05, width, height, fill));

        // нижний прямоугольник 1
        y = p00.y + length * 0.954;
        if (disposition == Disposition.Vertical)
            this.primitives.push(this.createRectangle(x, y, height, width, fill));
        else
            this.primitives.push(this.createRectangle(p00.x + length * 0.954, p02.y - length * 0.05, width, height, fill));

        // центральный прямоугольик 2
        x = p00.x, y = p02.y - length * 0.361, height = length * 0.71, width = this.calcSize(length); fill = '#EFEFEF'
        let stroke: string = '#AEB4B4'; let strokeWidth: number = length * 0.0135; let cornerRadius: number = 0.05 * length;
        if (disposition == Disposition.Vertical)
            this.primitives.push(this.createRectangle(x, y, height, width, fill, stroke, strokeWidth, cornerRadius));
        else
            this.primitives.push(this.createRectangle(p02.x - length * 0.361, p00.y, width, height, fill, stroke, strokeWidth, cornerRadius));
        // верхняя пирамида верх 3
        x = p02.x - length * 0.035; y = p00.y + length * 0.035; height = length * 0.05;
        width = length * 0.07; fill = '#02A96D'
        if (disposition == Disposition.Vertical)
            this.primitives.push(this.createRectangle(x, y, height, width, fill));
        else
            this.primitives.push(this.createRectangle(p00.x + length * 0.035, p02.y - length * 0.035, width, height, fill));
        // верхняя пирамида низ 4
        x = p02.x - length * 0.11; y = p00.y + length * 0.085; width = length * 0.22;
        if (disposition == Disposition.Vertical)
            this.primitives.push(this.createRectangle(x, y, height, width, fill));
        else
            this.primitives.push(this.createRectangle(p00.x + length * 0.085, p02.y - length * 0.11, width, height, fill));
        // нижняя пирамида верх 5
        x = p02.x - length * 0.11; y = p00.y + length * 0.858;
        if (disposition == Disposition.Vertical)
            this.primitives.push(this.createRectangle(x, y, height, width, fill));
        else
            this.primitives.push(this.createRectangle(p00.x + length * 0.858, p02.y - length * 0.11, width, height, fill));

        // нижняя пирамида низ 6
        x = p02.x - length * 0.035; y = p00.y + length * 0.907; width = length * 0.07;
        if (disposition == Disposition.Vertical)
            this.primitives.push(this.createRectangle(x, y, height, width, fill));
        else
            this.primitives.push(this.createRectangle(p00.x + length * 0.907, p02.y - length * 0.035, width, height, fill));
        // центральный прямоугольник анимации 7
        x = p00.x + length * 0.00675, y = p02.y - length * 0.29, height = length * 0.58,
            width = this.calcSize(length) - length * 0.0135; fill = '#1D8EEA'; stroke = ''; strokeWidth = 0; cornerRadius = 0;
        if (disposition == Disposition.Vertical)
            this.primitives.push(this.createRectangle(x, y, height, width, fill, stroke, strokeWidth, cornerRadius));
        else
            this.primitives.push(this.createRectangle(p02.x - length * 0.29, p00.y + length * 0.00675, width, height, fill, stroke, strokeWidth, cornerRadius));

        // белый прямоугольник анимации1 8
        x = p00.x + length * 0.00675, y = p02.y - length * 0.29, height = length * 0.084, width = this.calcSize(length) - length * 0.0135;
        fill = '#EDF6FC'; stroke = ''; strokeWidth = 0; cornerRadius = 0;
        if (disposition == Disposition.Vertical)
            this.primitives.push(this.createRectangle(x, y, height, width, fill, stroke, strokeWidth, cornerRadius));
        else
            this.primitives.push(this.createRectangle(p02.x - length * 0.29, p00.y + length * 0.00675, width, height, fill, stroke, strokeWidth, cornerRadius));


        // белый прямоугольник анимации2 9
        y = p02.y - length * 0.042;
        if (disposition == Disposition.Vertical)
            this.primitives.push(this.createRectangle(x, y, height, width, fill, stroke, strokeWidth, cornerRadius));
        else
            this.primitives.push(this.createRectangle(p02.x - length * 0.042, p00.y + length * 0.00675, width, height, fill, stroke, strokeWidth, cornerRadius));

        // белый прямоугольник анимации3 10
        y = p02.y + length * 0.206;
        if (disposition == Disposition.Vertical)
            this.primitives.push(this.createRectangle(x, y, height, width, fill, stroke, strokeWidth, cornerRadius));
        else
            this.primitives.push(this.createRectangle(p02.x + length * 0.206, p00.y + length * 0.00675, width, height, fill, stroke, strokeWidth, cornerRadius));

        this.step = length * 0.084;
        let R: number = length * 0.14; let r: number = length * 0.06;

        // окружность внешняя 11
        x = p02.x; y = p02.y; let radius: number = R; stroke = '#444343';
        strokeWidth = length * 0.01; fill = '';
        this.primitives.push(this.createCircle(x, y, radius, fill, stroke, strokeWidth));
        // окружность средняя 12
        radius = r; fill = '#A1DC77';
        this.primitives.push(this.createCircle(x, y, radius, fill, stroke, strokeWidth));
        // окружность внутренняя  13
        radius = length * 0.04; fill = '#00C734';
        this.primitives.push(this.createCircle(x, y, radius, fill, stroke, strokeWidth));

        // линия 1 14
        let p0lx: number = p02.x; let p0ly: number = p02.y - r;
        let p1lx: number = p02.x - R * Math.sin(45);
        let p1ly: number = p02.y - R * Math.cos(45);
        this.primitives.push(this.createLine(p0lx, p0ly, p1lx, p1ly, stroke, strokeWidth, p02));

        // линия 2 15
        p0lx = p02.x - r * Math.sin(120); p0ly = p02.y + r * Math.cos(120);
        p1lx = p02.x - R * Math.sin(75); p1ly = p02.y + R * Math.cos(75);
        this.primitives.push(this.createLine(p0lx, p0ly, p1lx, p1ly, stroke, strokeWidth, p02));

        // линия 3 16
        p0lx = p02.x + r * Math.sin(240); p0ly = p02.y + r * Math.cos(240);
        p1lx = p02.x + R * Math.sin(285); p1ly = p02.y + R * Math.cos(285);
        this.primitives.push(this.createLine(p0lx, p0ly, p1lx, p1ly, stroke, strokeWidth, p02));

        let [lr, lt] = CreateLabel(p0.newPointMoved(length * 0.4, length * 0.3), null, '');
        this.primitives = this.primitives.concat([lr, lt]);
        this.label = lt;
    }

    protected calcSize(length: number, factor: number = 2.57): number {
        return this.getOdd(length / factor);
    };

    // setState(newState: PumpState): void {
    //     this.state = newState;
    // }

    private createRectangle(x: number, y: number, height: number, width: number, fill: string, stroke?: string,
        strokeWidth?: number, cornerRadius?: number): Konva.Rect {
        return new Konva.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            cornerRadius: cornerRadius,
        });
    }

    private createCircle(x: number, y: number, radius: number,
        fill: string, stroke: string, strokeWidth: number): Konva.Circle {
        return new Konva.Circle({
            x: x,
            y: y,
            radius: radius,
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    }

    private createLine(p0lx: number, p0ly: number, p1lx: number, p1ly: number,
        stroke: string, strokeWidth: number, p02: Point): Konva.Line {
        return new Konva.Line({
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
    }

    private showFrame(fill2: string, fill3: string, fill4: string, fill5: string, fill6: string, fill7: string,
        fill8: string, fill9: string, fill10: string, fill12: string, fill13: string, stroke2: string,
        stroke7: string, stroke11: string, stroke12: string, stroke13: string, stroke14: string,
        stroke15: string, stroke16: string, strokeWidth7: number): void {
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
    }

    setBaseProperty(mes: any) {
        this.status = mes.Status;
        this.mode = mes.Mode;
        if (this.mode == PumpMode.Auto) this.setLabel('A');
        else if (this.mode == PumpMode.Service) this.setLabel('S');
        else this.setLabel('E')
        this.error = mes.Error;
        this.setFlow(this.status == PumpState.run);
    }

    nextFrame(angel: number = 30): void {
        let dy: number = this.step;
        switch (this.status) {
            case PumpState.revers: case PumpState.stopping: case PumpState.starting:
                this.primitives[14].rotate(angel);
                this.primitives[15].rotate(angel);
                this.primitives[16].rotate(angel);
                if (this.animationFrame < 2) { dy = this.step; this.primitives[10].fill(''); this.animationFrame += 1; }
                else { dy = - (2 * this.step); this.primitives[10].fill('#EDF6FC'); this.animationFrame = 0; }
                if (this.disposition == Disposition.Vertical) {
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
            case PumpState.run:
                this.primitives[14].rotate(angel);
                this.primitives[15].rotate(angel);
                this.primitives[16].rotate(angel);
                if (this.animationFrame < 2) { dy = this.step; this.primitives[8].fill(''); this.animationFrame += 1; }
                else { dy = - (2 * this.step); this.primitives[8].fill('#EDF6FC'); this.animationFrame = 0; }
                if (this.disposition == Disposition.Vertical) {
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
                this.showFrame('#EFEFEF', '#FE668B', '#AEB4B4', '#AEB4B4', '#FE668B', '#EDF6FC', '', '', '',
                    '#CFCDCD', '#7E7D7D', '#AEB4B4', '#D99CAB', '#AAA6A6', '#AAA6A6', '#AAA6A6', '#AAA6A6',
                    '#AAA6A6', '#AAA6A6', 3);
                return;
            case PumpState.alarm:
                if (this.animationFrame == 0) {
                    this.showFrame('#000000', '#DB0000', '#DB0000', '#DB0000', '#DB0000', '#EDF6FC', '', '', '',
                        '#000000', '#FF0000', '#000000', '#000000', '#444343', '#444343', '#444343', '#444343',
                        '#444343', '#444343', 3);
                    this.animationFrame = 1;
                }
                else {
                    this.showFrame('#DB0000', '#000000', '#000000', '#000000', '#000000', '#EDF6FC', '', '', '',
                        '#000000', '#FF0000', '#000000', '#DB0000', '#000000', '#444343', '#444343', '#444343',
                        '#444343', '#444343', 3);
                    this.animationFrame = 0;
                }
                return;
        }
    }
}

// элементы массива 0-9 - цвета уровней воды, элементы 10 и 11 - цвета фона бассейна
const WaveCount = 10;
const BackColorIndex = 10;
const LineColorIndex = 11;
export const UndergroundWater = ['#EFFAF5', '#E1F4ED', '#D1E9E0', '#C1DBD1', '#A7CABD', '#97BFB0', '#8DB5A6', '#85AC9D', '#789F90', '#6F9385', '#7D5A5A', '#C06B5A']
export const IndustrialWater = ['#96FFDA', '#73FFCD', '#0BFFA8', '#01EA97', '#04CF87', '#01BE7B', '#00AB6E', '#039863', '#028758', '#026D47', '#FE896F', '#D28878']
export const PureWater = ['#AAD7FF', '#8DC9FF', '#5BB1FF', '#359EFF', '#1F94FF', '#0085FF', '#0071D9', '#0061BA', '#00519C', '#02498B', '#FE896F', '#D28878']


export class Pool extends BaseMineDraw {
    protected p00: Point;
    protected p02: Point;
    protected height: number;
    protected width: number;
    private level: number;
    private waves: (Konva.Rect | Konva.Text | Konva.Circle | Konva.Line | Konva.Ellipse)[] = [];
    constructor(p0: Point, length: number, color?: any) {
        super(p0, length);
        // console.log(`class Pool constructor ${JSON.stringify(this.rect)}`)
        this.waves = [];
        this.name = 'Pool';
        this.p00 = this.rect.p0;
        this.p02 = this.rect.getMiddlePoint();
        this.height = this.rect.p1.y - this.rect.p0.y;
        this.width = length;
        let sickness = this.getWallThickness();
        let waveX0 = this.p00.x + sickness;
        let waveHeigh = (this.height - sickness) * 0.1;
        let waveWidth = this.width - sickness * 2;
        this.primitives.push(createRectangle(this.p00.x, this.p00.y, this.height, this.width, color[BackColorIndex], color[LineColorIndex],
            length * 0.001, length * 0.001));
        this.primitives.push(createRectangle(waveX0, this.p00.y, this.height - sickness, waveWidth, '#E9EDEA', '#34E7E7',
            length * 0.0005, 0));

        for (let i = 0; i < WaveCount; i++) {
            let r = createRectangle(waveX0, this.p00.y + waveHeigh * i, waveHeigh, waveWidth, color[i], '', 0, 0);
            this.primitives.push(r);
            this.waves.push(r);
        }
        // label
        this.primitives.push(createCircle(this.p02.x, this.p02.y, length * 0.07, length * 0.001, 'white', '#34E7E7'));
        this.label = createText(this.p02.x - length * 0.058, this.p02.y - length * 0.02, '', length * 0.05)
        this.primitives.push(this.label);
        this.showLevel(100);
    }
    protected calcSize(length: number, factor: number = 2.2): number {
        // console.log(`class Pool calcSize ${factor}`)
        return this.getOdd(length / factor);
    };
    protected getWallThickness(): number {
        return this.width * 0.04;
    }
    private showLevel(level) {
        // console.log(`#######################################Pump showLevel level=${level}`)
        this.level = level;
        this.setLabel(this.level.toString() + '%');
        let val = Math.round(this.level / 10);  // 0, 1, 2, ...  10
        let lastUnvisibleIndex = WaveCount - val - 1;
        for (let i = 0; i < WaveCount; i++) {
            if (i <= lastUnvisibleIndex) this.waves[i].visible(false);
            else this.waves[i].visible(true);
        }
        //this.layer.draw();
    }
    // nextFrame(): void {
    //     this.setLabel('90')
    // }
    setBaseProperty(mes: any) {
        this.showLevel(mes.Level) // Level - %
        // HLevel
        // LLevel    
    }
}

export class MinePool extends Pool {
    constructor(p0: Point, length: number) {
        super(p0, length, UndergroundWater);
    }
    protected calcSize(length: number, factor: number = 3.5): number {
        // console.log(`class Pool calcSize ${factor}`)
        return this.getOdd(length / factor);
    };
    protected getWallThickness(): number {
        return this.width * 0.02;
    }
}

export class WaterTower extends Pool {
    constructor(p0: Point, length: number) {
        super(p0, length, PureWater);
        // console.log(`class Pool constructor ${JSON.stringify(this.rect)}`)
        this.name = 'WaterTower';
        this.primitives.push(createRectangle(this.p00.x + this.width * 0.17, this.p00.y + this.height, this.width * 1.35, this.width * 0.65, '#DCDBDB', '#B9C3C3', length * 0.001, 0));
        this.primitives.push(createRectangle(this.p00.x + this.width * 0.425, this.p00.y + this.height, this.width * 1.35, this.width * 0.12, '#B7B4B4', '', 0, 0));
    }
    protected calcSize(length: number, factor: number = 0.71): number {
        // console.log(`class Pool calcSize ${factor}`)
        return this.getOdd(length / factor);
    };
    protected getWallThickness(): number {
        return this.width * 0.08;
    }
}

export enum ValveState {
    init = 0, closed, opening, opened, closing, calibration, alarm, stop,
};

export enum ValveError {
    NoError = 0, CloseAndOpenValveInputs, OpeningTimeOut, ClosingTimeOut, AlarmValveInput
};

enum ValveMode {
    HandDrive = 0, Auto, Service
};

enum ValvePrimitive {
    triangle0 = 0, triangle1, rectangleCentr, circle, opening
}

export class Valve extends FlowDriver {
    public state: ValveState;
    public mode: ValveMode;
    public error: ValveError;
    protected labelsetPercentage: any;
    constructor(p0: Point, length: number, disposition: Disposition) {
        super(p0, length, disposition);
        this.name = 'Valve';
        this.state = ValveState.opened;
        let p00: Point = this.rect.p0;
        let p01: Point = (disposition == Disposition.Vertical) ? this.rect.rightTop() : this.rect.getMiddlePoint();
        let p02: Point = (disposition == Disposition.Vertical) ? this.rect.getMiddlePoint() : this.rect.leftButtom();
        this.primitives.push(this.createTriangle(p00, p01, p02, length));
        let p10: Point = this.rect.p1;
        let p11: Point = (disposition == Disposition.Vertical) ? this.rect.leftButtom() : this.rect.getMiddlePoint();
        let p12: Point = (disposition == Disposition.Vertical) ? this.rect.getMiddlePoint() : this.rect.rightTop();
        this.primitives.push(this.createTriangle(p10, p11, p12, length));
        this.primitives.push(this.createRectangle(length));
        this.primitives.push(this.createCircle(length));
        this.labelsetPercentage = this.createText(length, '');
        this.primitives.push(this.labelsetPercentage);
        //console.log(this.labelsetPercentage)
        this.rect.p0.y -= 2;
        this.rect.p1.y += 2;
        let [lr, lt] = CreateLabel(p0.newPointMoved(length * 0.5, length * 0.5), disposition, '');
        this.primitives = this.primitives.concat([lr, lt]);
        this.label = lt;

        this.nextFrame();
    }
    setState(newState: ValveState): void {
        this.state = newState;
    }
    private createTriangle(p0: Point, p1: Point, p2: Point, length: number): Konva.Line {
        return new Konva.Line({
            points: [p0.x, p0.y, p1.x, p1.y, p2.x, p2.y],
            fill: '',
            stroke: '',
            strokeWidth: Math.trunc(length * 0.02),
            closed: true,
        });
    }
    private createRectangle(length: number): Konva.Rect {
        let dxC = (this.disposition == Disposition.Horizontal) ? Math.trunc(length / 19.8) : Math.trunc(length / 5.4);
        let dyC = (this.disposition == Disposition.Horizontal) ? Math.trunc(length / 5.4) : Math.trunc(length / 19.8);
        let height = (this.disposition == Disposition.Horizontal) ? length / 2.7 : length / 9.9;
        let width = (this.disposition == Disposition.Horizontal) ? length / 9.9 : length / 2.7;
        return new Konva.Rect({
            x: this.rect.getMiddlePoint().x - dxC,
            y: this.rect.getMiddlePoint().y - dyC,
            height: height,
            width: width,
            fill: '',
        });
    }

    private createCircle(length: number): Konva.Circle {
        let dxC = (this.disposition == Disposition.Horizontal) ? 0 : Math.trunc(0.55 * length);
        let dyC = (this.disposition == Disposition.Horizontal) ? Math.trunc(0.55 * length) : 0;
        return new Konva.Circle({
            x: this.rect.getMiddlePoint().x - dxC,
            y: this.rect.getMiddlePoint().y - dyC,
            radius: Math.trunc(length / 2.7),
            fill: '',
            stroke: '',
            strokeWidth: 1,
        });
    }

    private createText(length: number, text): Konva.Text {
        let dxC = (this.disposition == Disposition.Horizontal) ? Math.trunc(0.28 * length) : Math.trunc(0.8 * length);
        let dyC = (this.disposition == Disposition.Horizontal) ? Math.trunc(0.65 * length) : Math.trunc(0.1 * length);
        return new Konva.Text({
            x: this.rect.getMiddlePoint().x - dxC,
            y: this.rect.getMiddlePoint().y - dyC,
            text: text,
            fontSize: length / 4,
            fontStyle: 'bold',
            fontFamily: 'Roboto',
            fill: '',
        });
    }
    protected calcSize(length: number, factor: number = 1.59): number {
        return this.getOdd(length / factor);
    };

    private showFrame(fill0: string, fill1: string, stroke: string, rectFill: string, circleStroke: string): void {
        this.primitives[ValvePrimitive.triangle0].stroke(stroke);
        this.primitives[ValvePrimitive.triangle0].fill(fill0);
        this.primitives[ValvePrimitive.triangle1].stroke(stroke);
        this.primitives[ValvePrimitive.triangle1].fill(fill1);
        this.primitives[ValvePrimitive.rectangleCentr].fill(rectFill);
        this.primitives[ValvePrimitive.circle].stroke(circleStroke);
    }

    setPercentage(text: string) {
        if (this.labelsetPercentage != null) this.labelsetPercentage.text(text);
    }

    setBaseProperty(mes: any) {
        if (mes.pos === undefined) {
            this.setPercentage('')
            this.primitives[3].visible(false)
        }
        else this.setPercentage(mes.pos + '%')
        this.state = mes.Status;
        this.mode = mes.Mode;
        if (this.mode == ValveMode.Auto) this.setLabel('A');
        else if (this.mode == ValveMode.Service) this.setLabel('S');
        else if (this.mode == ValveMode.HandDrive) this.setLabel('H');
        else this.setLabel('E')
        this.error = mes.Error;
    }

    nextFrame(): void {
        switch (this.state) {
            case ValveState.calibration: case ValveState.init:
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
    }
}

export class ValveCheck extends BaseMineDraw {
    constructor(p0: Point, length: number, disposition: Disposition = Disposition.Vertical) {
        super(p0, length, disposition);
        this.name = 'Valvecheck';
        let p00: Point = this.rect.p0;
        let p01: Point = (disposition == Disposition.Vertical) ? this.rect.rightTop() : this.rect.getMiddlePoint();
        let p02: Point = (disposition == Disposition.Vertical) ? this.rect.getMiddlePoint() : this.rect.leftButtom();
        this.primitives.push(this.createTriangle(p00, p01, p02, length, '#E1F1FB', '#000000'));
        let p10: Point = this.rect.p1;
        let p11: Point = (disposition == Disposition.Vertical) ? this.rect.leftButtom() : this.rect.getMiddlePoint();
        let p12: Point = (disposition == Disposition.Vertical) ? this.rect.getMiddlePoint() : this.rect.rightTop();
        this.primitives.push(this.createTriangle(p10, p11, p12, length, '#1D8EEA', '#00C734'));
        let p03: Point = p00.newPointMoved(length * 0.16, length * 0.08)
        let p04: Point = p01.newPointMoved(-length * 0.16, length * 0.08)
        let p05: Point = p02.newPointMoved(0, -length * 0.16)
        this.primitives.push(this.createTriangle(p03, p04, p05, length, '#000000', ''));
    }
    private createTriangle(p0: Point, p1: Point, p2: Point, length: number, fill: string, stroke: string): Konva.Line {
        return new Konva.Line({
            points: [p0.x, p0.y, p1.x, p1.y, p2.x, p2.y],
            fill: fill,
            stroke: stroke,
            strokeWidth: Math.trunc(length * 0.035),
            closed: true,
        });
    }
    protected calcSize(length: number, factor: number = 1.59): number {
        return this.getOdd(length / factor);
    };

}

export class UndegraundPump extends Pump {
    constructor(p0: Point, length: number, disposition: Disposition) {
        super(p0, length, Disposition.Vertical);

        let p1lx: number = p0.x + this.calcSize(length) / 2; let p1ly: number = p0.y;
        let p2lx: number = p0.x + this.calcSize(length) / 2; let p2ly: number = p0.y + length;
        let p3lx: number = p0.x + length; let p3ly: number = p0.y + length;
        let p4lx: number = p0.x + length; let p4ly: number = p0.y;
        let offsetX: number = length * 0.5 - this.calcSize(length) * 0.25;
        this.primitives.push(this.createLineUndegraund(p1lx, p1ly, p2lx, p2ly, p3lx, p3ly,
            p4lx, p4ly, length * 0.0157, offsetX, 0));

        p1lx = p0.x + length, p1ly = p0.y,
            p2lx = p3lx = p4lx = p0.x + 1.1 * length,
            p2ly = p3ly = p4ly = p0.y + 0.1 * length;

        for (let i = 0; i < length; i = i + 0.1 * length)
            this.primitives.push(this.createLineUndegraund(p1lx, p1ly, p2lx, p2ly, p3lx, p3ly, p4lx, p4ly,
                length * 0.0157, offsetX, -i));

        p1lx = p0.x + length - offsetX, p1ly = p0.y + length,
            p2lx = p3lx = p4lx = p0.x + 0.9 * length - offsetX,
            p2ly = p3ly = p4ly = p0.y + 0.1 * length + length;

        for (let i = 0; i < 0.8 * length; i = i + 0.1 * length)
            this.primitives.push(this.createLineUndegraund(p1lx, p1ly, p2lx, p2ly, p3lx, p3ly, p4lx, p4ly,
                length * 0.0157, i, 0));

        p1lx = p0.x + this.calcSize(length) / 2, p1ly = p0.y + length,
            p2lx = p3lx = p4lx = p0.x - 0.1 * length + this.calcSize(length) / 2,
            p2ly = p3ly = p4ly = p0.y + 0.9 * length;

        for (let i = 0; i < length; i = i + 0.1 * length)
            this.primitives.push(this.createLineUndegraund(p1lx, p1ly, p2lx, p2ly, p3lx, p3ly, p4lx, p4ly,
                length * 0.0157, offsetX, i));

        this.primitives[1].hide();
        this.primitives[5].hide();
        this.primitives[6].hide();

        console.log(this.primitives)
    }
    // setState(newState: PumpState): void {
    //     this.state = newState == PumpState.run ? PumpState.revers : newState;
    // }
    private createLineUndegraund(p1lx: number, p1ly: number, p2lx: number, p2ly: number, p3lx: number, p3ly: number,
        p4lx: number, p4ly: number, strokeWidth: number, offsetX: number, offsetY: number): Konva.Line {
        return new Konva.Line({
            points: [p1lx, p1ly, p2lx, p2ly, p3lx, p3ly, p4lx, p4ly],
            stroke: '#980505',
            strokeWidth: strokeWidth,
            offset: {
                x: offsetX,
                y: offsetY,
            },
        });
    }
}

export class Compressor extends BaseMineDraw {
    private compressors: any[]
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'Compressor';
        this.compressors = new Array();
        // динамически меняющиеся объекты
        for (let i = 0; i < 4; i++) {
            this.primitives.push(this.createCircle(p0.x + length * 0.08 + i * length * 0.29, p0.y + length * 0.2558,
                length * 0.074, length * 0.0015, '#FDC858', '#000000'));

            this.primitives.push(this.createRectangle(p0.x - length * 0.0116 + i * length * 0.29, p0.y + length * 0.4968,
                length * 0.2874, length * 0.1833, '#44B5A1'));
        }
        // общая магистраль 
        this.primitives.push(this.createLine(p0.x, p0.y, p0.x + length, p0.y, '#84AFB1', length * 0.03));
        this.primitives.push(this.createLine(p0.x - length * 0.016, p0.y, p0.x, p0.y, '#055659', length * 0.046));
        //  насосы
        for (let n = 0; n <= 3; n++) {
            let l = 0;
            while (l <= length * 0.3153) {
                this.primitives.push(this.createLine(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.015 + l,
                    p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.025 + l, '#055659', length * 0.034));
                this.primitives.push(this.createLine(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.025 + l,
                    p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.067 + l, '#84AFB1', length * 0.023));
                this.primitives.push(this.createLine(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.067 + l,
                    p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.077 + l, '#055659', length * 0.034));

                this.primitives.push(this.createTriangle(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.0842 + l,
                    length * 0.014, 180, length * 0.001));
                this.primitives.push(this.createTriangle(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.112 + l,
                    length * 0.014, 0, length * 0.001));

                this.primitives.push(this.createLine(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.1194 + l,
                    p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.1294 + l, '#055659', length * 0.034));
                this.primitives.push(this.createLine(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.1294 + l,
                    p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.1715 + l, '#84AFB1', length * 0.023));
                this.primitives.push(this.createLine(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.1715 + l,
                    p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.1815 + l, '#055659', length * 0.034));
                l = l + length * 0.3153;
            }
            for (let lv = 1; lv < 9; lv++) {
                this.primitives.push(this.createLine(p0.x - length * 0.0116 + length * 0.0202 * lv + n * length * 0.29, p0.y + length * 0.4968,
                    p0.x - length * 0.0116 + length * 0.0202 * lv + n * length * 0.29, p0.y + length * 0.7842, '#055659', length * 0.0037));
            }
            for (let lh = 1; lh < 14; lh++) {
                this.primitives.push(this.createLine(p0.x - length * 0.0116 + n * length * 0.29, p0.y + length * 0.4968 + length * 0.0206 * lh,
                    p0.x - length * 0.0116 + length * 0.1833 + n * length * 0.29, p0.y + length * 0.4968 + length * 0.0206 * lh, '#055659', length * 0.0037));
            }
        }
    };
    private createRectangle(x: number, y: number, height: number, width: number, fill: string): Konva.Rect {
        return new Konva.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: fill,
        });
    }
    private createLine(x1: number, y1: number, x2: number, y2: number,
        stroke: string, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    }
    private createTriangle(x: number, y: number, radius: number, rotation: number, strokeWidth: number): Konva.RegularPolygon {
        return new Konva.RegularPolygon({
            x: x,
            y: y,
            sides: 3,
            radius: radius,
            fill: '#481D88',
            rotation: rotation,
            stroke: '#000000',
            strokeWidth: strokeWidth,
        });
    }
    private createCircle(x: number, y: number, radius: number, strokeWidth: number, fill: string, stroke: string): Konva.Circle {
        return new Konva.Circle({
            x: x,
            y: y,
            radius: radius,
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    }
    setBaseProperty(mes: any) {
        for (let n = 0; n < 4; n++) {
            this.compressors[n] = Object.values(mes)[n];
        }
    }
    nextFrame(): void {
        for (let n = 0; n < 4; n++) {
            if (this.compressors[n]) {
                this.primitives[n * 2].stroke('#46802B')
                this.primitives[n * 2].fill('#FDC858')
                this.primitives[n * 2 + 1].fill('#44B5A1')
            }
            else {
                this.primitives[n * 2].stroke('#C46B6B')
                this.primitives[n * 2].fill('#EBE0CB')
                this.primitives[n * 2 + 1].fill('#E5DDCC')
            }
        }
    };
};
