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

export class Cell extends BaseMineDraw {
    public cell: any[];
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'SubstationCell';
    }
    protected createRectangle(x: number, y: number, height: number, width: number, fill: string,
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
    protected createLine(x1: number, y1: number, x2: number, y2: number,
        stroke: string, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    }
    protected createLineSwitch(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number,
        x5: number, y5: number, x6: number, y6: number, x7: number, y7: number, stroke: string, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6, x7, y7],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    }
    protected createText(x: number, y: number, text: string, fontSize: number): Konva.Text {
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
    protected createCircle(x: number, y: number, radius: number, fill: string): Konva.Circle {
        return new Konva.Circle({
            x: x,
            y: y,
            radius: radius,
            fill: fill,
        });
    }
}

export class UndergroundSubstationCell extends Cell {
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'UndegroundStation';
        this.cell = new Array();
        let n: number;
        // let nameCell = ['Incomer No.3', 'Pump M5', 'Pump M4', 'Pump M3', 'Bus coopler No.2', 'Incomer No.2', 'Pump M2', 'Pump M1', '', 'Bus coopler No.1', 'Incomer No.1',
        //     'Transform main - 270m', 'Transform No.2 100kVA - 270m south', 'Rectifier No.2 - 270m south', 'Transform No.1 100kVA - 270m north', 'Rectifier No.1 - 270m',
        // 'Substation No.2 - 228m']
        for (n = 0; n < 16; n++) {
            this.cell[n] = false;
            let numberCell = n
            if (n >= 8) numberCell = numberCell + 1;
            // ячейки
            this.primitives.push(this.createRectangle(p0.x + n * length * 0.0588, p0.y + length * 0.04,
                length * 0.07, length * 0.0588, 'rgba(138, 193, 113, 0.41)', '#46802B', length * 0.001));
            this.primitives.push(this.createLine(p0.x + n * length * 0.0588, p0.y + length * 0.075,
                p0.x + length * 0.059 + n * length * 0.0588, p0.y + length * 0.075, '#46802B', length * 0.001));
            // вертикальная линия соединения ячейки с шиной
            this.primitives.push(this.createLine(p0.x + n * length * 0.0588 + length * 0.0294, p0.y + length * 0.007,
                p0.x + n * length * 0.0588 + length * 0.0294, p0.y + length * 0.0476, '#84AFB1', length * 0.003));
            this.primitives.push(this.createText(p0.x + n * length * 0.0585 + length * 0.009, p0.y + length * 0.087,
                'Cell # ' + (numberCell + 1), length * 0.013));
            // ячейки прямоугольник анимации
            // a = c, b = d анимация выключателя
            let a = p0.x + length * 0.0282 + n * length * 0.0588;
            let b = p0.y + length * 0.0576;
            let c = p0.x + length * 0.0322 + n * length * 0.0588;
            let d = p0.y + length * 0.0676;
            this.primitives.push(this.createLineSwitch(
                a, b,
                p0.x + length * 0.0202 + n * length * 0.0588, p0.y + length * 0.0676,
                p0.x + length * 0.0082 + n * length * 0.0588, p0.y + length * 0.0676,
                p0.x + length * 0.0082 + n * length * 0.0588, p0.y + length * 0.0476,
                p0.x + length * 0.0502 + n * length * 0.0588, p0.y + length * 0.0476,
                p0.x + length * 0.0502 + n * length * 0.0588, p0.y + length * 0.0676,
                c, d,
                '#84AFB1', length * 0.003));
            this.primitives.push(this.createCircle(p0.x + length * 0.0082 + n * length * 0.0588, p0.y + length * 0.0676,
                length * 0.0025, '#C46B6B'));
            this.primitives.push(this.createCircle(p0.x + length * 0.0502 + n * length * 0.0588, p0.y + length * 0.0676,
                length * 0.0025, '#C46B6B'));
        }
        // this.setBaseProperty(null)
    }
    setBaseProperty(mes: any) {
        // mes = {
        //     "cell1": true,
        //     "cell2": false,
        //     "cell3": false,
        //     "cell4": true,
        //     "cell5": false,
        //     "cell6": false,
        //     "cell7": false,
        //     "cell8": false,
        //     "cell10": false,
        //     "cell11": false,
        //     "cell12": false,
        //     "cell13": false,
        //     "cell14": false,
        //     "cell15": false,
        //     "cell16": false,
        //     "cell17": true,
        // }
        for (let n = 0; n < 16; n++) {
            this.cell[n] = Object.values(mes)[n];
        }
    }
    nextFrame(): void {
        for (let n = 0; n < 16; n++) {
            if (this.cell[n]) {
                this.primitives[n * 7 + 4].attrs.points[0] = this.primitives[n * 7 + 4].attrs.points[12];
                this.primitives[n * 7 + 4].attrs.points[1] = this.primitives[n * 7 + 4].attrs.points[13];
                this.primitives[n * 7 + 4].stroke('#055659');
                this.primitives[n * 7 + 2].stroke('#055659');
                this.primitives[n * 7].fill('#8AC171');
                this.primitives[n * 7 + 5].fill('#FDC858');
                this.primitives[n * 7 + 6].fill('#FDC858');
            }
            else {
                this.primitives[n * 7 + 4].attrs.points[0] = this.primitives[n * 7 + 4].attrs.points[0];
                this.primitives[n * 7 + 4].attrs.points[1] = this.primitives[n * 7 + 4].attrs.points[1];
                this.primitives[n * 7 + 4].stroke('#84AFB1')
                this.primitives[n * 7 + 2].stroke('#84AFB1')
                this.primitives[n * 7].fill('rgba(138, 193, 113, 0.41)');
                this.primitives[n * 7 + 5].fill('#C46B6B');
                this.primitives[n * 7 + 6].fill('#C46B6B');
            }
        }
    };
}

export class SubstationCell extends Cell {
    constructor(p0: Point, length: number, firstNumber: number, amount: number) {
        super(p0, length);
        this.name = 'UndegroundStation';
        this.cell = new Array();
        let n: number;
        for (n = firstNumber; n < amount; n++) {
            this.cell[n] = false;
            // ячейки
            this.primitives.push(this.createRectangle(p0.x + n * length * 0.0588, p0.y + length * 0.04,
                length * 0.07, length * 0.0588, 'rgba(138, 193, 113, 0.41)', '#46802B', length * 0.001));
            this.primitives.push(this.createLine(p0.x + n * length * 0.0588, p0.y + length * 0.075,
                p0.x + length * 0.059 + n * length * 0.0588, p0.y + length * 0.075, '#46802B', length * 0.001));
            // вертикальная линия соединения ячейки с шиной
            this.primitives.push(this.createLine(p0.x + n * length * 0.0588 + length * 0.0294, p0.y + length * 0.007,
                p0.x + n * length * 0.0588 + length * 0.0294, p0.y + length * 0.0476, '#84AFB1', length * 0.003));
            this.primitives.push(this.createText(p0.x + n * length * 0.0585 + length * 0.009, p0.y + length * 0.087,
                'Cell # ' + (n + 1), length * 0.013));
            // ячейки прямоугольник анимации
            // a = c, b = d анимация выключателя
            let a = p0.x + length * 0.0282 + n * length * 0.0588;
            let b = p0.y + length * 0.0576;
            let c = p0.x + length * 0.0322 + n * length * 0.0588;
            let d = p0.y + length * 0.0676;
            this.primitives.push(this.createLineSwitch(
                a, b,
                p0.x + length * 0.0202 + n * length * 0.0588, p0.y + length * 0.0676,
                p0.x + length * 0.0082 + n * length * 0.0588, p0.y + length * 0.0676,
                p0.x + length * 0.0082 + n * length * 0.0588, p0.y + length * 0.0476,
                p0.x + length * 0.0502 + n * length * 0.0588, p0.y + length * 0.0476,
                p0.x + length * 0.0502 + n * length * 0.0588, p0.y + length * 0.0676,
                c, d,
                '#84AFB1', length * 0.003));
            this.primitives.push(this.createCircle(p0.x + length * 0.0082 + n * length * 0.0588, p0.y + length * 0.0676,
                length * 0.0025, '#C46B6B'));
            this.primitives.push(this.createCircle(p0.x + length * 0.0502 + n * length * 0.0588, p0.y + length * 0.0676,
                length * 0.0025, '#C46B6B'));
        }
        // this.setBaseProperty(null)
    }
    setBaseProperty(mes: any) {
        // mes = {
        //     "cell1": true,
        //     "cell2": false,
        //     "cell3": false,
        //     "cell4": true,
        //     "cell5": false,
        //     "cell6": false,
        //     "cell7": false,
        //     "cell8": false,
        //     "cell10": false,
        //     "cell11": false,
        //     "cell12": false,
        //     "cell13": false,
        //     "cell14": false,
        //     "cell15": false,
        //     "cell16": false,
        //     "cell17": true,
        // }
        for (let n = 0; n < 16; n++) {
            this.cell[n] = Object.values(mes)[n];
        }
    }
    nextFrame(): void {
        for (let n = 0; n < 16; n++) {
            if (this.cell[n]) {
                this.primitives[n * 7 + 4].attrs.points[0] = this.primitives[n * 7 + 4].attrs.points[12];
                this.primitives[n * 7 + 4].attrs.points[1] = this.primitives[n * 7 + 4].attrs.points[13];
                this.primitives[n * 7 + 4].stroke('#055659');
                this.primitives[n * 7 + 2].stroke('#055659');
                this.primitives[n * 7].fill('#8AC171');
                this.primitives[n * 7 + 5].fill('#FDC858');
                this.primitives[n * 7 + 6].fill('#FDC858');
            }
            else {
                this.primitives[n * 7 + 4].attrs.points[0] = this.primitives[n * 7 + 4].attrs.points[0];
                this.primitives[n * 7 + 4].attrs.points[1] = this.primitives[n * 7 + 4].attrs.points[1];
                this.primitives[n * 7 + 4].stroke('#84AFB1')
                this.primitives[n * 7 + 2].stroke('#84AFB1')
                this.primitives[n * 7].fill('rgba(138, 193, 113, 0.41)');
                this.primitives[n * 7 + 5].fill('#C46B6B');
                this.primitives[n * 7 + 6].fill('#C46B6B');
            }
        }
    };
}

export class Incomers extends BaseMineDraw {
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'Incomers';
        // this.primitives.push(this.createLine());
    }
    protected createLine(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4],
            stroke: 'black',
            strokeWidth: strokeWidth,
        });
    }
    protected createCircle(x: number, y: number, radius: number, fill: string): Konva.Circle {
        return new Konva.Circle({
            x: x,
            y: y,
            radius: radius,
            fill: fill,
        });
    }
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