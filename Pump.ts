import Konva from 'konva';
import { BaseMineDraw, Disposition, Point } from './mine_drawing';

export enum PumpState {
    open = 0, revers, stop, alarm
};

enum PumpPrimitive {
    rectangleTop = 0, rectangleBottom, rectangleMain,
}

export class Pump extends BaseMineDraw {
    private step: number;
    constructor(p0: Point, length: number, disposition: Disposition) {
        super(p0, length, disposition);
        this.type = 'Pump';
        this.state = PumpState;
        let p00: Point = this.rect.p0;
        let p01: Point = (disposition == Disposition.Vertical) ? this.rect.rightTop() : this.rect.getMiddlePoint();
        let p02: Point = (disposition == Disposition.Vertical) ? this.rect.getMiddlePoint() : this.rect.leftButtom();
        console.log(p02);
        let p10: Point = this.rect.p1;
        let p11: Point = (disposition == Disposition.Vertical) ? this.rect.leftButtom() : this.rect.getMiddlePoint();
        let p12: Point = (disposition == Disposition.Vertical) ? this.rect.getMiddlePoint() : this.rect.rightTop();
        // верхний прямоугольник 0
        let x: number = p02.x - length * 0.05;
        let y: number = p00.y;
        let height: number = length * 0.035;
        let width: number = length * 0.1;
        let fill: string = '#C4C4C4';
        this.primitives.push(this.createRectangle(x, y, height, width, fill));
        // нижний прямоугольник 1
        y = p11.y - length * 0.046;
        this.primitives.push(this.createRectangle(x, y, height, width, fill));
        // центральный прямоугольик 2
        x = p00.x, y = p02.y - length * 0.361, height = length * 0.71, width = p01.x - p00.x; fill = '#EFEFEF'
        let stroke: string = '#AEB4B4'; let strokeWidth: number = length * 0.0135; let cornerRadius: number = 18;
        this.primitives.push(this.createRectangle(x, y, height, width, fill, stroke, strokeWidth, cornerRadius));
        // верхняя пирамида верх 3
        x = p02.x - length * 0.035; y = p00.y + length * 0.035; height = length * 0.05;
        width = length * 0.07; fill = '#02A96D'
        this.primitives.push(this.createRectangle(x, y, height, width, fill));
        // верхняя пирамида низ 4
        x = p02.x - length * 0.11; y = p00.y + length * 0.085; width = length * 0.22;
        this.primitives.push(this.createRectangle(x, y, height, width, fill));
        // нижняя пирамида верх 5
        x = p02.x - length * 0.11; y = p00.y + length * 0.858;
        this.primitives.push(this.createRectangle(x, y, height, width, fill));
        // нижняя пирамида низ 6
        x = p02.x - length * 0.035; y = p00.y + length * 0.857 + length * 0.05; width = length * 0.07;
        this.primitives.push(this.createRectangle(x, y, height, width, fill));

        // центральный прямоугольник анимации 7
        x = p00.x, y = p02.y - length * 0.29, height = length * 0.58, width = p01.x - p00.x; fill = '#1D8EEA'
        stroke = ''; strokeWidth = 0; cornerRadius = 0;
        this.primitives.push(this.createRectangle(x, y, height, width, fill, stroke, strokeWidth, cornerRadius));

        // белый прямоугольник анимации1 8
        x = p00.x, y = p02.y - length * 0.29, height = length * 0.084, width = p01.x - p00.x; fill = '#EDF6FC'
        stroke = ''; strokeWidth = 0; cornerRadius = 0;
        this.primitives.push(this.createRectangle(x, y, height, width, fill, stroke, strokeWidth, cornerRadius));

        // белый прямоугольник анимации2 9
        x = p00.x, y = p02.y - length * 0.042, height = length * 0.084, width = p01.x - p00.x; fill = '#EDF6FC'
        stroke = ''; strokeWidth = 0; cornerRadius = 0;
        this.primitives.push(this.createRectangle(x, y, height, width, fill, stroke, strokeWidth, cornerRadius));

        // белый прямоугольник анимации3 10
        x = p00.x, y = p02.y + length * 0.206, height = length * 0.084, width = p01.x - p00.x; fill = '#EDF6FC'
        stroke = ''; strokeWidth = 0; cornerRadius = 0;
        this.primitives.push(this.createRectangle(x, y, height, width, fill, stroke, strokeWidth, cornerRadius));

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

    private moveWhite(): void {
        let dy: number = this.step;
        switch (this.state) {
            case PumpState.open:
                if (this.animationFrame < 2) { dy = this.step; this.primitives[10].fill('') }
                else { dy = - (2 * this.step); this.primitives[10].fill('#EDF6FC') }
                this.primitives[8].move({ x: 0, y: dy });
                this.primitives[9].move({ x: 0, y: dy });
                this.primitives[10].move({ x: 0, y: dy });
                return;
            case PumpState.revers:
                if (this.animationFrame < 2) { dy = this.step; this.primitives[8].fill('') }
                else { dy = - (2 * this.step); this.primitives[8].fill('#EDF6FC') }
                this.primitives[8].move({ x: 0, y: -dy });
                this.primitives[9].move({ x: 0, y: -dy });
                this.primitives[10].move({ x: 0, y: -dy });
                return;
            case PumpState.stop:

            case PumpState.alarm:
        }
    }

    nextFrame(angel: number = 30): void {
        this.moveWhite();
        if (this.animationFrame < 2) this.animationFrame += 1;
        else this.animationFrame = 0;
        this.primitives[14].rotate(angel);
        this.primitives[15].rotate(angel);
        this.primitives[16].rotate(angel);

    }

    // nextFrame(): void {
    //     this.moveLine();
    //     if(this.animationFrame < 3) this.animationFrame +=1;
    //     else this.animationFrame = 0;
    // };

    // fill0: string, fill1: string, stroke: string, rectFill: string, circleStroke: string
    // private showFrame(): void {
    //     this.primitives[PumpPrimitive.rectangleTop];
    //     this.primitives[PumpPrimitive.rectangleBottom];
    //     this.primitives[PumpPrimitive.rectangleMain];
    // this.primitives[EnginePrimitive.triangle0].fill(fill0);
    // this.primitives[EnginePrimitive.triangle1].stroke(stroke);
    // this.primitives[EnginePrimitive.triangle1].fill(fill1);
    // this.primitives[EnginePrimitive.rectangleCentr].fill(rectFill);
    // this.primitives[EnginePrimitive.circle].stroke(circleStroke);
    // }

    // nextFrame(): void {
    //     switch (this.state) {
    //         case ValveState.closed:
    //             this.showFrame('#FE668B', '#FE668B', '#E3093E', '#E3093E', '#E3093E');
    //             break;
    //         case ValveState.opened:
    //             if (this.animationFrame == 0) {
    //                 this.showFrame('#1D8EEA', '#E1F1FB', '#00C734', '#7AD03E', '#7AD03E');
    //                 this.animationFrame = 1;
    //             }
    //             else if (this.animationFrame == 1) {
    //                 this.showFrame('#1D8EEA', '#1D8EEA', '#00C734', '#7AD03E', '#7AD03E');
    //                 this.animationFrame = 2;
    //             }
    //             else {
    //                 this.showFrame('#E1F1FB', '#1D8EEA', '#00C734', '#7AD03E', '#7AD03E');
    //                 this.animationFrame = 0;
    //             }
    //             break;
    //         case ValveState.opening:
    //             if (this.animationFrame == 0) {
    //                 this.showFrame('#A1DC77', '#E1F1FB', '#F0FF41', '#7AD03E', '#7AD03E');
    //                 this.animationFrame = 1;
    //             }
    //             else {
    //                 this.showFrame('#E1F1FB', '#A1DC77', '#7AD03E', '#7AD03E', '#7AD03E');
    //                 this.animationFrame = 0;
    //             }
    //             break;
    //         case ValveState.closing:
    //             if (this.animationFrame == 0) {
    //                 this.showFrame('#FE668B', '#E1F1FB', '#F0FF41', '#E3093E', '#E3093E');
    //                 this.animationFrame = 1;
    //             }
    //             else {
    //                 this.showFrame('#E1F1FB', '#FE668B', '#E3093E', '#E3093E', '#E3093E');
    //                 this.animationFrame = 0;
    //             }
    //             break;
    //         case ValveState.alarm:
    //             if (this.animationFrame == 0) {
    //                 this.showFrame('#EF0000', '#EF0000', '#010101', '#EF0000', '#EF0000');
    //                 this.animationFrame = 1;
    //             }
    //             else {
    //                 this.showFrame('#010101', '#010101', '#FF0000', '#EF0000', '#EF0000');
    //                 this.animationFrame = 0;
    //             }
    //             break;
    //     }
    // }
}