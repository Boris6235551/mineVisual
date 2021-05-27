import Konva from 'konva';
import { BaseMineDraw, Point } from './mine_drawing';

export class CompressorRoom extends BaseMineDraw {
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'CompressorRoom';
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

            this.primitives.push(this.createCircle(p0.x + length * 0.08 + n * length * 0.29, p0.y + length * 0.2558,
                length * 0.074, length * 0.0015));

            this.primitives.push(this.createRectangle(p0.x - length * 0.0116 + n * length * 0.29, p0.y + length * 0.4968,
                length * 0.2874, length * 0.1833));

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
    private createRectangle(x: number, y: number, height: number, width: number): Konva.Rect {
        return new Konva.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: '#44B5A1',
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
    private createCircle(x: number, y: number, radius: number, strokeWidth: number): Konva.Circle {
        return new Konva.Circle({
            x: x,
            y: y,
            radius: radius,
            fill: '#FDC858',
            stroke: '#000000',
            strokeWidth: strokeWidth,
        });
    }
};
