import Konva from 'konva';
import {BaseMineDraw, Disposition, Point} from './mine_drawing';

export enum ValveState {
    closed = 0, opened, opening, closing, alarm, stop
};

enum ValvePrimitive {
    triangle0 = 0, triangle1, rectangleCentr, circle, opening
}

export class Valve extends BaseMineDraw {
    constructor(p0: Point, length: number, disposition: Disposition, percentage: number) {
        super(p0, length, disposition);
        this.type = 'Valve';
        this.state = ValveState.closed;
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
        this.primitives.push(this.createText(length, percentage));
        this.rect.p0.y -= 2;
        this.rect.p1.y += 2;
        this.nextFrame();
    }
    setState(newState: ValveState): void {
        this.state = newState;
    }
    setPercentage(percentage: number) {
        return percentage + '%'
    }
    private createTriangle(p0: Point, p1: Point, p2: Point, length: number): Konva.Line {
        return new Konva.Line({
            points: [p0.x, p0.y, p1.x, p1.y, p2.x, p2.y],
            fill: '',
            stroke: '',
            strokeWidth: Math.trunc(length*0.02),
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
        let dxC = (this.disposition == Disposition.Horizontal) ? 0 : Math.trunc(0.39 * length);
        let dyC = (this.disposition == Disposition.Horizontal) ? Math.trunc(0.39 * length) : 0;
        return new Konva.Circle({
            x: this.rect.getMiddlePoint().x - dxC,
            y: this.rect.getMiddlePoint().y - dyC,
            radius: Math.trunc(length / 4.79),
            fill: '',
            stroke: '',
            strokeWidth: 1,
        });
    }

    private createText(length: number, percentage): Konva.Text {
        let dxC = (this.disposition == Disposition.Horizontal) ? Math.trunc(0.16 * length) : Math.trunc(0.54 * length);
        let dyC = (this.disposition == Disposition.Horizontal) ? Math.trunc(0.45 * length) : Math.trunc(0.06 * length);
        return new Konva.Text({
            x: this.rect.getMiddlePoint().x - dxC,
            y: this.rect.getMiddlePoint().y - dyC,
            text: this.setPercentage(percentage),
            fontSize: length/6,
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

    nextFrame(): void {
        switch (this.state) {
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