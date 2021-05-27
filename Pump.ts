import Konva from 'konva';
import { BaseMineDraw, Disposition, Point } from './mine_drawing';

export enum PumpState {
    run = 0, revers, stop, alarm
};

export class Pump extends BaseMineDraw {
    private step: number;
    private a: number;
    constructor(p0: Point, length: number, disposition: Disposition) {
        super(p0, length, disposition);
        this.name = 'Pump';
        this.state = PumpState;
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
        let stroke: string = '#AEB4B4'; let strokeWidth: number = length * 0.0135; let cornerRadius: number = 0.05*length;
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
    }

    protected calcSize(length: number, factor: number = 2.57): number {
        return this.getOdd(length / factor);
    };

    setState(newState: PumpState): void {
        this.state = newState;
    }

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

    nextFrame(angel: number = 30): void {
        let dy: number = this.step;
        switch (this.state) {
            case PumpState.run:
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
            case PumpState.revers:
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

export class Undegraund extends Pump {
    constructor(p0: Point, length: number, disposition: Disposition) {
        super(p0, length, Disposition.Vertical);

        let p1lx: number = p0.x + this.calcSize(length)/2; let p1ly: number = p0.y;
        let p2lx: number = p0.x + this.calcSize(length)/2; let p2ly: number = p0.y + length;
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

        p1lx = p0.x + this.calcSize(length)/2, p1ly = p0.y + length,
            p2lx = p3lx = p4lx = p0.x - 0.1 * length + this.calcSize(length)/2,
            p2ly = p3ly = p4ly = p0.y + 0.9 * length;

        for (let i = 0; i < length; i = i + 0.1 * length)
            this.primitives.push(this.createLineUndegraund(p1lx, p1ly, p2lx, p2ly, p3lx, p3ly, p4lx, p4ly,
                length * 0.0157, offsetX, i));

        this.primitives[1].hide();
        this.primitives[5].hide();
        this.primitives[6].hide();

        console.log(this.primitives)
    }
    setState(newState: PumpState): void {
        this.state = newState == PumpState.run ? PumpState.revers : newState;
    }
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