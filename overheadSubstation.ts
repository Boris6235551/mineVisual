import Konva from 'konva';
import { BaseMineDraw, Point } from './mine_drawing';

export class OverheadSubstationTrunk extends BaseMineDraw {
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'OverheadSubstationTrunk';
        // общая шина ячеек
        let i: number;
        length = length * 0.647
        this.primitives.push(this.createRectangle(p0.x, p0.y, length * 0.0183, length, '',
            '#FA458C', length * 0.001));
        for (i = 1; i <= 5; i++) {
            this.primitives.push(this.createLine(p0.x, p0.y + length * 0.003 * i,
                p0.x + length, p0.y + length * 0.003 * i, '#FA458C', length * 0.001));
        }
        for (i = 1; i <= 166; i++) {
            this.primitives.push(this.createLine(p0.x + length * 0.006 * i, p0.y,
                p0.x + length * 0.006 * i, p0.y + length * 0.0183, '#FA458C', length * 0.001));
        }
        this.primitives.push(this.createLine(p0.x, p0.y + length * 0.00915,
            p0.x + length, p0.y + length * 0.00915, '#055659', length * 0.003));
    };
    private createCells(){
        
    }
    private createRectangle(x: number, y: number, height: number, width: number, fill: string,
        stroke: string, strokeWidth: number): Konva.Rect {
        return new Konva.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
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
}

export class OverheadSubstationCell extends BaseMineDraw {
    constructor(p0: Point, length: number, n: number) {
        super(p0, length);
        this.name = 'OverheadSubstationCell';
        // ячейки
        // for (n = 0; n <= 16; n++) {
            this.primitives.push(this.createRectangle(p0.x + n * length * 0.0588, p0.y + length * 0.04,
                length * 0.07, length * 0.0588, '#8AC171', '#46802B', length * 0.001));
            this.primitives.push(this.createLine(p0.x + n * length * 0.0588, p0.y + length * 0.075,
                p0.x + length * 0.059 + n * length * 0.0588, p0.y + length * 0.075, '#055659', length * 0.001));
            // this.primitives.push(this.createRectangle(p0.x + i * length * 0.0588 + length * 0.0082, p0.y + length * 0.0476,
            //     length * 0.02, length * 0.042, '#FDC858', '#21686C', length * 0.001));
            // выключатель, координаты первой точки должны быть равны координатам последней точки
            let a = p0.x + length * 0.0282 + n * length * 0.0588;
            let b = p0.y + length * 0.0576;
            let c = p0.x + length * 0.0322 + n * length * 0.0588;
            let d = p0.y + length * 0.0676;
            // a = c, b = d; // анимация выключателя
            this.primitives.push(this.createLineSwitch(
                a, b,
                p0.x + length * 0.0202 + n * length * 0.0588, p0.y + length * 0.0676,
                p0.x + length * 0.0082 + n * length * 0.0588, p0.y + length * 0.0676,
                p0.x + length * 0.0082 + n * length * 0.0588, p0.y + length * 0.0476,
                p0.x + length * 0.0502 + n * length * 0.0588, p0.y + length * 0.0476,
                p0.x + length * 0.0502 + n * length * 0.0588, p0.y + length * 0.0676,
                c, d,
                '#055659', length * 0.003));
            this.primitives.push(this.createLine(p0.x + n * length * 0.0588 + length * 0.0294, p0.y + length * 0.006,
                p0.x + n * length * 0.0588 + length * 0.0294, p0.y + length * 0.0476, '#055659', length * 0.003));
            this.primitives.push(this.createText(p0.x + n * length * 0.0584 + length * 0.009, p0.y + length * 0.087,
                'Cell # ' + (n + 1), length * 0.013));
            this.primitives.push(this.createCircle(p0.x + length * 0.0082 + n * length * 0.0588, p0.y + length * 0.0676,
                length * 0.0025, '#FDC858'));
            this.primitives.push(this.createCircle(p0.x + length * 0.0502 + n * length * 0.0588, p0.y + length * 0.0676,
                length * 0.0025, '#FDC858'));
        // }
    }
    private createRectangle(x: number, y: number, height: number, width: number, fill: string,
        stroke: string, strokeWidth: number): Konva.Rect {
        return new Konva.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
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
    private createLineSwitch(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number,
        x5: number, y5: number, x6: number, y6: number, x7: number, y7: number, stroke: string, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, x7, y7],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    }
    private createText(x: number, y: number, text: string, fontSize: number): Konva.Text {
        return new Konva.Text({
            x: x,
            y: y,
            text: text,
            fontSize: fontSize,
            fontStyle: 'bold',
            fontFamily: 'Roboto',
            fill: 'black'
        });
    }
    private createCircle(x: number, y: number, radius: number, fill: string): Konva.Circle {
        return new Konva.Circle({
            x: x,
            y: y,
            radius: radius,
            fill: fill,
        });
    }
    nextFrame(): void {
        if (this.propBit) {
            switch (this.animationFrame) {
                case 0:
                    this.primitives[2].attrs.points[0] = this.primitives[2].attrs.points[12];
                    this.primitives[2].attrs.points[1] = this.primitives[2].attrs.points[13];
                    this.animationFrame = 1;
                    break;
                case 1:
                    this.primitives[2].attrs.points[0] = this.primitives[2].attrs.points[0];
                    this.primitives[2].attrs.points[1] = this.primitives[2].attrs.points[1];
                    this.animationFrame = 0;
                    break;
            }
        }
    };
}

