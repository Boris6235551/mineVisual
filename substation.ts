import Konva from 'konva';
import { BaseMineDraw, Point } from './mine_drawing';

export class Trunk extends BaseMineDraw {
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'Trunk';
        // общая шина ячеек
        let i: number;
        this.primitives.push(this.createRectangle(p0.x, p0.y, length * 0.0183, length * 1.41, '',
            '#FA458C', length * 0.001));
        for (i = 1; i <= 5; i++) {
            this.primitives.push(this.createLine(p0.x, p0.y + length * 0.003 * i,
                p0.x + length * 1.41, p0.y + length * 0.003 * i, '#FA458C', length * 0.001));
        }
        for (i = 1; i <= 235; i++) {
            this.primitives.push(this.createLine(p0.x + length * 0.006 * i, p0.y,
                p0.x + length * 0.006 * i, p0.y + length * 0.0183, '#FA458C', length * 0.001));
        }
        this.primitives.push(this.createLine(p0.x, p0.y + length * 0.00915,
            p0.x + length * 1.41, p0.y + length * 0.00915, '#055659', length * 0.003));
        // ячейки
        // for (i = 0; i <= 16; i++) {

        // }
    };
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

export class SubstationCell extends BaseMineDraw {
    private namePlace: string;
    constructor(p0: Point, length: number, namePlace: string, n: number) {
        super(p0, length);
        this.namePlace = namePlace;
        this.name = 'SubstationCell';
        // ячейки
        this.primitives.push(this.createRectangle(p0.x + n * length * 0.0588, p0.y + length * 0.04,
            length * 0.07, length * 0.0588, '#FDC858', '#21686C', length * 0.001));
        this.primitives.push(this.createLine(p0.x + n * length * 0.0588, p0.y + length * 0.075,
            p0.x + length * 0.059 + n * length * 0.0588, p0.y + length * 0.075, '#055659', length * 0.001));
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
        // вертикальная линия соединения ячейки с шиной
        this.primitives.push(this.createLine(p0.x + n * length * 0.0588 + length * 0.0294, p0.y + length * 0.007,
            p0.x + n * length * 0.0588 + length * 0.0294, p0.y + length * 0.0476, '#055659', length * 0.003));
        this.primitives.push(this.createText(p0.x + n * length * 0.0585 + length * 0.009, p0.y + length * 0.087,
            'Cell # ' + (n + 1), length * 0.013));
        this.primitives.push(this.createCircle(p0.x + length * 0.0082 + n * length * 0.0588, p0.y + length * 0.0676,
            length * 0.0025, '#6BC4A6'));
        this.primitives.push(this.createCircle(p0.x + length * 0.0502 + n * length * 0.0588, p0.y + length * 0.0676,
            length * 0.0025, '#6BC4A6'));
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
        if (this.namePlace == 'SubStation') {
            // if (this.propBit) {
            switch (this.propBit) {
                case true:
                    this.primitives[2].attrs.points[0] = this.primitives[2].attrs.points[12];
                    this.primitives[2].attrs.points[1] = this.primitives[2].attrs.points[13];
                    this.primitives[0].fill('#FDC858')
                    this.primitives[6].fill('#6BC4A6')
                    this.primitives[5].fill('#6BC4A6')
                    // this.animationFrame = 1;
                    break;
                case false:
                    this.primitives[2].attrs.points[0] = this.primitives[2].attrs.points[0];
                    this.primitives[2].attrs.points[1] = this.primitives[2].attrs.points[1];
                    // this.animationFrame = 0;
                    this.primitives[0].fill('rgba(253, 200, 88, 0.54)')
                    this.primitives[6].fill('#C46B6B')
                    this.primitives[5].fill('#C46B6B')
                    break;
            }
            // }
        }
        else if (this.namePlace == 'UndegroundStation') {
            // if (this.propBit) {
            switch (this.propBit) {
                case true:
                    this.primitives[2].attrs.points[0] = this.primitives[2].attrs.points[12];
                    this.primitives[2].attrs.points[1] = this.primitives[2].attrs.points[13];
                    this.primitives[0].fill('#8AC171')
                    this.primitives[6].fill('#FDC858')
                    this.primitives[5].fill('#FDC858')
                    // this.animationFrame = 1;
                    break;
                case false:
                    this.primitives[2].attrs.points[0] = this.primitives[2].attrs.points[0];
                    this.primitives[2].attrs.points[1] = this.primitives[2].attrs.points[1];
                    // this.animationFrame = 0;
                    this.primitives[0].fill('rgba(138, 193, 113, 0.41)')
                    this.primitives[6].fill('#C46B6B')
                    this.primitives[5].fill('#C46B6B')
                    break;
            }
            // }
        }
    };
}

export class Generator extends BaseMineDraw {
    constructor(p0: Point, length: number) { //p0 - центр прямоугольника, length - большая сторона прямоугольника
        super(p0, length);
        this.name = 'Generator';
        this.primitives.push(this.createLine(p0.x - length, p0.y, p0.x + length, p0.y, '#005236', length * 0.04));
        this.primitives.push(this.createRectangle(p0.x - length * 0.5, p0.y - length * 0.195, length * 0.39, length));
        this.primitives.push(this.createCircle(p0.x, p0.y, length * 0.4, '#F2A5A5', length * 0.015, '#331A38'));
        this.primitives.push(this.createCircle(p0.x, p0.y, length * 0.34, '#E4C0C0', length * 0.015, '#331A38'));
        this.primitives.push(this.createLine(p0.x, p0.y, p0.x - (length * 0.28) * Math.cos(0), p0.y + (length * 0.28) * Math.sin(0), '#DB1010', length * 0.02));
        this.primitives.push(this.createLine(p0.x, p0.y, p0.x + (length * 0.28) * Math.cos(45), p0.y + (length * 0.28) * Math.sin(45), '#DB1010', length * 0.02));
        this.primitives.push(this.createLine(p0.x, p0.y, p0.x + (length * 0.28) * Math.cos(45), p0.y - (length * 0.28) * Math.sin(45), '#DB1010', length * 0.02));
        this.primitives.push(this.createCircle(p0.x, p0.y, length * 0.05, '#331A38', 0, ''));
        this.primitives.push(this.createEllipse(p0.x - (length * 0.28) * Math.cos(0), p0.y + (length * 0.28) * Math.sin(0), length * 0.02, length * 0.07, '#DB1010', 0));
        this.primitives.push(this.createEllipse(p0.x + (length * 0.28) * Math.cos(45), p0.y + (length * 0.28) * Math.sin(45), length * 0.02, length * 0.07, '#DB1010', 60));
        this.primitives.push(this.createEllipse(p0.x + (length * 0.28) * Math.cos(45), p0.y - (length * 0.28) * Math.sin(45), length * 0.02, length * 0.07, '#DB1010', 120));
    }
    private createLine(x1: number, y1: number, x2: number, y2: number, stroke: string, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    }
    private createRectangle(x: number, y: number, height: number, width: number): Konva.Rect {
        return new Konva.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: '#923434',
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
    private createEllipse(x: number, y: number, radiusX: number, radiusY: number, fill: string, rotation: number): Konva.Ellipse {
        return new Konva.Ellipse({
            x: x,
            y: y,
            radiusX: radiusX,
            radiusY: radiusY,
            fill: fill,
            rotation: rotation
        });
    }
}