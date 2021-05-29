import Konva from 'konva';
import { BaseMineDraw, Point } from './mine_drawing';

export enum SkipState {
    stop = 0, run, leftUp, rightUp
};

export class Skip extends BaseMineDraw {
    private level0: number;
    private level1: number;
    private level2: number;
    private level3: number;
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'Skip';
        // линия поверхности земли
        // this.primitives.push(this.createLine(p0.x - length * 0.11, p0.y + length * 0.31,
        //     p0.x + length * 0.57, p0.y + length * 0.31, length * 0.002));
        // for (let i = 0; i < 17; i++) {
        //     this.primitives.push(this.createLine(p0.x - length * 0.11 + i * length * 0.04, p0.y + length * 0.34,
        //         p0.x - length * 0.07 + i * length * 0.04, p0.y + length * 0.31, length * 0.0005));
        // }
        //  вертикальный ствол шахты
        this.primitives.push(this.createRectangleTrunk(p0.x, p0.y, length, length * 0.2, length * 0.003));
        // домик
        this.primitives.push(this.createLineHouse(p0.x + length * 0.42, p0.y + length * 0.31,
            p0.x + length * 0.42, p0.y + length * 0.15,
            p0.x + length * 0.485, p0.y + length * 0.1,
            p0.x + length * 0.55, p0.y + length * 0.15,
            p0.x + length * 0.55, p0.y + length * 0.31,
        ));
        this.primitives.push(this.createRectangle(p0.x + length * 0.42, p0.y + length * 0.16,
            length * 0.13, length * 0.12, '#CBDEDE', '', 0, 0));
        // привод скипа
        this.primitives.push(this.createCircle(p0.x + length * 0.48, p0.y + length * 0.24,
            length * 0.035, '#055659', length * 0.006, '#331A38'));
        this.primitives.push(this.createCircle(p0.x + length * 0.48, p0.y + length * 0.24,
            length * 0.015, '#FDC858', 0, ''));
        this.primitives.push(this.createCircle(p0.x + length * 0.068, p0.y + length * 0.07,
            length * 0.016, '#FDC858', length * 0.005, '#331A38'));
        this.primitives.push(this.createCircle(p0.x + length * 0.168, p0.y + length * 0.17,
            length * 0.016, '#FDC858', length * 0.005, '#331A38'));
        this.primitives.push(this.createLine(p0.x + length * 0.5, p0.y + length * 0.211,
            p0.x + length * 0.07, p0.y + length * 0.054, length * 0.006));
        this.primitives.push(this.createLine(p0.x + length * 0.47, p0.y + length * 0.274,
            p0.x + length * 0.16, p0.y + length * 0.15, length * 0.006));
        //  подвижные скипы
        const level1 = p0.y + length * 0.57;
        const level2 = p0.y + length * 0.67;
        const level3 = p0.y + length * 0.8;
        // скип 1
        this.primitives.push(this.createLine(p0.x + length * 0.052, p0.y + length * 0.07,
            p0.x + length * 0.052, level1, length * 0.006));
        this.primitives.push(this.createRectangle(p0.x + length * 0.02, level1,
            length * 0.08, length * 0.061, '#331A38', '#FDC858', length * 0.006, 0));
        //  скип 2
        this.primitives.push(this.createLine(p0.x + length * 0.152, p0.y + length * 0.17,
            p0.x + length * 0.152, level1, length * 0.006));
        this.primitives.push(this.createRectangle(p0.x + length * 0.12, level1,
            length * 0.08, length * 0.061, '#331A38', '#FDC858', length * 0.006, 0));
        // крыша скипа
        this.primitives.push(this.createRectangle(p0.x - length * 0.02, p0.y - length * 0.05,
            length * 0.03, length * 0.3, '#005236', '', 0, 0));
        this.primitives.push(this.createLineHouseRoof(p0.x + length * 0.29, p0.y + length * 0.31,
            p0.x + length * 0.02, p0.y - length * 0.05,
            p0.x, p0.y - length * 0.05,
            p0.x + length * 0.27, p0.y + length * 0.31));
    };
    private createRectangle(x: number, y: number, height: number, width: number, fill: string,
        stroke: string, strokeWidth: number, cornerRadius: number): Konva.Rect {
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
    private createRectangleTrunk(x: number, y: number, height: number, width: number, strokeWidth: number): Konva.Rect {
        return new Konva.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            stroke: '#331A38',
            strokeWidth: strokeWidth,
            fillLinearGradientStartPoint: { x: x + width, y: y + height },
            fillLinearGradientColorStops: [0.5, '#835757', 1, '#FFFFFF'],
        });
    }
    private createLine(x1: number, y1: number, x2: number, y2: number, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2],
            stroke: '#331A38',
            strokeWidth: strokeWidth,
        });
    }
    private createLineHouse(x1: number, y1: number, x2: number, y2: number,
        x3: number, y3: number, x4: number, y4: number, x5: number, y5: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5],
            fill: '#331A38',
            closed: true,
        });
    }
    private createLineHouseRoof(x1: number, y1: number, x2: number, y2: number,
        x3: number, y3: number, x4: number, y4: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4],
            fill: '#005236',
            closed: true,
        });
    }
    private createCircle(x: number, y: number, radius: number, fill: string, strokeWidth: number,
        stroke: string): Konva.Circle {
        return new Konva.Circle({
            x: x,
            y: y,
            radius: radius,
            stroke: stroke,
            strokeWidth: strokeWidth,
            fill: fill,
        });
    }
    public setState(newState: SkipState): void {
        this.state = newState;
    }
    nextFrame(): void {
        switch (this.state) {
            case 0:
                this.primitives[16].attrs.points[3] = this.level0;
                this.primitives[17].y(this.level0);
                return;
            case 1:
                this.primitives[16].attrs.points[3] = this.level1;
                this.primitives[17].y(this.level1);
                return;
            case 2:
                this.primitives[16].attrs.points[3] = this.level2;
                this.primitives[17].y(this.level2);
            case 3:
                this.primitives[16].attrs.points[3] = this.level3;
                this.primitives[17].y(this.level3);
                return;
        }
    }
};