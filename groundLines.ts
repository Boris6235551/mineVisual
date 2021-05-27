import Konva from 'konva';
import { BaseMineDraw, Point } from './mine_drawing';

export class GroundHorizontalLine extends BaseMineDraw {
    constructor(p0: Point, length: number) {
        super(p0, length);
        // линия поверхности земли
        this.primitives.push(this.createLine(p0.x, p0.y,
            p0.x + length, p0.y,
            length * 0.002)
        );
        let n:number = Math.floor(length/15)
        for (let i = 0; i < n; i++) {
            this.primitives.push(this.createLine(
                p0.x + i * 15, p0.y + 10,
                p0.x + 10 + i * 15, p0.y,
                length * 0.0005)
            );
        }
    }
    private createLine(x1: number, y1: number, x2: number, y2: number, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2],
            stroke: '#331A38',
            strokeWidth: strokeWidth,
        });
    }
}

export class GroundVerticalLine extends BaseMineDraw {
    constructor(p0: Point, length: number) {
        super(p0, length);
        // линия поверхности земли
        this.primitives.push(this.createLine(p0.x, p0.y,
            p0.x, p0.y + length,
            length * 0.002)
        );
        let n:number = Math.floor(length/15)
        for (let i = 0; i < n; i++) {
            this.primitives.push(this.createLine(
                p0.x - 10, p0.y + 20 + i * 15,
                p0.x, p0.y + 10 + i * 15,
                length * 0.0005)
            );
        }
    }
    private createLine(x1: number, y1: number, x2: number, y2: number, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2],
            stroke: '#331A38',
            strokeWidth: strokeWidth,
        });
    }
}