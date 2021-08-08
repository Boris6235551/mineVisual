import Konva from 'konva';
import { BaseMineDraw, Point } from './mine_drawing';
import { CreateLabel } from './utils'

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
    public firstNumber: number;
    public amount: number
    constructor(p0: Point, length: number, firstNumber: number, amount: number) {
        super(p0, length);
        this.name = 'Substation';
        this.cell = new Array();
        this.firstNumber = firstNumber;
        this.amount = amount;
        let n: number;
        for (n = firstNumber; n < amount; n++) {
            this.cell[n] = false;
            // ячейки
            this.primitives.push(this.createRectangle(p0.x + n * length * 0.0588, p0.y + length * 0.04,
                length * 0.07, length * 0.0588, 'rgba(253, 200, 88, 0.54)', '#46802B', length * 0.001));
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
        //     "C1": true,
        //     "C2": true,
        //     "C3": false,
        //     "C4": false,
        //     "C5": false,
        //     "C6": false,
        //     "C7": true,
        //     "D1": true,
        //     "D2": false,
        //     "D3": false,
        //     "D4": false,
        //     "D5": true,
        //     "D6": false,
        //     "D7": true,
        //     "D8": true,
        //     "B1": true,
        //     "B2": true,
        // }
        for (let n = 0; n < 15; n++) {
            this.cell[n] = Object.values(mes)[n+7];
        }

    }
    nextFrame(): void {
        for (let n = 0; n < (this.amount - this.firstNumber); n++) {
            if (this.cell[this.firstNumber + n]) {
                this.primitives[n * 7 + 4].attrs.points[0] = this.primitives[n * 7 + 4].attrs.points[12];
                this.primitives[n * 7 + 4].attrs.points[1] = this.primitives[n * 7 + 4].attrs.points[13];
                this.primitives[n * 7 + 4].stroke('#055659');
                this.primitives[n * 7 + 2].stroke('#055659');
                this.primitives[n * 7].fill('#FDC858');
                this.primitives[n * 7 + 5].fill('#6BC4A6');
                this.primitives[n * 7 + 6].fill('#6BC4A6');
            }
            else {
                this.primitives[n * 7 + 4].attrs.points[0] = this.primitives[n * 7 + 4].attrs.points[0];
                this.primitives[n * 7 + 4].attrs.points[1] = this.primitives[n * 7 + 4].attrs.points[1];
                this.primitives[n * 7 + 4].stroke('#84AFB1')
                this.primitives[n * 7 + 2].stroke('#84AFB1')
                this.primitives[n * 7].fill('rgba(253, 200, 88, 0.54)');
                this.primitives[n * 7 + 5].fill('#C46B6B');
                this.primitives[n * 7 + 6].fill('#C46B6B');
            }
        }
    };
}

export class Incomers extends BaseMineDraw {
    public incomer: any[];
    private buttonOn: number[];
    private buttonOff: number[];
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'Substation';
        this.incomer = new Array();
        this.primitives.push(this.createLine( // this.primitives[0].attrs.points[5]  switch A1
            p0.x - length * 2.41, p0.y - length,
            p0.x - length * 2.74, p0.y - length,
            p0.x - length * 3.07, p0.y - length,
            length * 0.02
        ));
        this.primitives.push(this.createLine( // this.primitives[1].attrs.points[5]  switch A2
            p0.x - length * 1.75, p0.y - length,
            p0.x - length * 2.08, p0.y - length,
            p0.x - length * 2.41, p0.y - length,
            length * 0.02
        ));
        this.primitives.push(this.createLine( // this.primitives[2].attrs.points[5]  switch A4
            p0.x + length * 2.7, p0.y - length,
            p0.x + length * 3.03, p0.y - length,
            p0.x + length * 3.36, p0.y - length,
            length * 0.02
        ));
        this.primitives.push(this.createLine( // this.primitives[3].attrs.points[5]  switch A5
            p0.x + length * 3.36, p0.y - length,
            p0.x + length * 3.69, p0.y - length,
            p0.x + length * 4.02, p0.y - length,
            length * 0.02
        ));
        this.primitives.push(this.createLine( // this.primitives[4].attrs.points[4]  switch B1
            p0.x + length * 0.8, p0.y,
            p0.x + length * 0.8, p0.y - length * 0.33,
            p0.x + length * 0.8, p0.y - length * 0.66,
            length * 0.02
        ));
        this.primitives.push(this.createLine( // this.primitives[5].attrs.points[5]  switch B2
            p0.x, p0.y,
            p0.x + length * 0.33, p0.y,
            p0.x + length * 0.66, p0.y,
            length * 0.02
        ));
        this.primitives.push(this.createLine( // this.primitives[6].attrs.points[4]  switch B3
            p0.x + length * 0.15, p0.y,
            p0.x + length * 0.15, p0.y - length * 0.33,
            p0.x + length * 0.15, p0.y - length * 0.66,
            length * 0.02
        ));
        // ------------------------------------------------------------------------------------
        this.primitives.push(this.createLine(p0.x + length * 0.66, p0.y, p0.x + length, p0.y, p0.x + length, p0.y, length * 0.02));

        this.primitives.push(this.createLine(p0.x + length * 0.15, p0.y - length * 0.66, p0.x + length * 0.15, p0.y - length,
            p0.x + length * 0.15, p0.y - length, length * 0.02));
        this.primitives.push(this.createLine(p0.x + length * 0.8, p0.y - length * 0.66, p0.x + length * 0.8, p0.y - length,
            p0.x + length * 0.8, p0.y - length, length * 0.02));
        this.primitives.push(this.createLine(p0.x + length * 0.15, p0.y - length, p0.x - length * 0.85, p0.y - length,
            p0.x - length * 0.85, p0.y - length, length * 0.02));
        this.primitives.push(this.createLine(p0.x + length * 0.8, p0.y - length, p0.x + length * 1.8, p0.y - length,
            p0.x + length * 1.8, p0.y - length, length * 0.02));
        this.primitives.push(this.createCircle(p0.x - length * 1.1, p0.y - length, length * 0.25, length * 0.02));
        this.primitives.push(this.createCircle(p0.x - length * 1.5, p0.y - length, length * 0.25, length * 0.02));
        this.primitives.push(this.createCircle(p0.x + length * 2.05, p0.y - length, length * 0.25, length * 0.02));
        this.primitives.push(this.createCircle(p0.x + length * 2.45, p0.y - length, length * 0.25, length * 0.02));
        this.primitives.push(this.createLine(p0.x - length * 3.07, p0.y - length, p0.x - length * 4.07, p0.y - length,
            p0.x - length * 4.07, p0.y - length, length * 0.02));
        this.primitives.push(this.createLine(p0.x + length * 4.02, p0.y - length, p0.x + length * 5.02, p0.y - length,
            p0.x + length * 5.02, p0.y - length, length * 0.02));
        this.primitives.push(this.createCircle(p0.x + length * 0.15, p0.y, length * 0.01, length * 0.05));
        this.primitives.push(this.createCircle(p0.x + length * 0.8, p0.y, length * 0.01, length * 0.05));
        // label draw
        this.primitives = this.primitives.concat(CreateLabel(p0.newPointMoved(- length * 3, - length * 0.8), null, 'A1', 20, 27));
        this.primitives = this.primitives.concat(CreateLabel(p0.newPointMoved(- length * 2.3, - length * 0.8), null, 'A2', 20, 27));
        this.primitives = this.primitives.concat(CreateLabel(p0.newPointMoved(- length * 0.4, - length * 0.8), null, 'B3', 20, 27));
        this.primitives = this.primitives.concat(CreateLabel(p0.newPointMoved(length * 1, - length * 0.8), null, 'B1', 20, 27));
        this.primitives = this.primitives.concat(CreateLabel(p0.newPointMoved(length * 3, - length * 0.8), null, 'A4', 20, 27));
        this.primitives = this.primitives.concat(CreateLabel(p0.newPointMoved(length * 3.7, - length * 0.8), null, 'A5', 20, 27));
        this.primitives = this.primitives.concat(CreateLabel(p0.newPointMoved(length * 0.3, length * 0.1), null, 'B2', 20, 27));
        this.buttonOn = [
            this.primitives[0].attrs.points[5],
            this.primitives[1].attrs.points[5],
            this.primitives[2].attrs.points[5],
            this.primitives[3].attrs.points[5],
            this.primitives[4].attrs.points[4],
            this.primitives[5].attrs.points[5],
            this.primitives[6].attrs.points[4]
        ];
        this.buttonOff = [
            this.primitives[0].attrs.points[5] - 20,
            this.primitives[1].attrs.points[5] - 20,
            this.primitives[2].attrs.points[5] - 20,
            this.primitives[3].attrs.points[5] - 20,
            this.primitives[4].attrs.points[4] - 20,
            this.primitives[5].attrs.points[5] - 20,
            this.primitives[6].attrs.points[4] - 20
        ];
        // this.setBaseProperty(null)
    }
    protected createLine(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2, x3, y3],
            stroke: 'black',
            strokeWidth: strokeWidth,
        });
    }
    protected createCircle(x: number, y: number, radius: number, strokeWidth: number): Konva.Circle {
        return new Konva.Circle({
            x: x,
            y: y,
            radius: radius,
            fill: '',
            stroke: 'black',
            strokeWidth: strokeWidth,
        });
    }
    setBaseProperty(mes: any) {
        // mes = {
        //     "A1": false,
        //     "A2": false,
        //     "A4": false,
        //     "A5": false,
        //     "B1": false,
        //     "B2": false,
        //     "B3": false,
        // }
        for (let n = 0; n < 7; n++) {
            this.incomer[n] = Object.values(mes)[n];
        }
    }
    nextFrame(): void {
        for (let n = 0; n < 7; n++) {
            if (this.incomer[n]) {
                if (n == 4 || n == 6) this.primitives[n].attrs.points[4] = this.buttonOn[n]
                else this.primitives[n].attrs.points[5] = this.buttonOn[n]
            }
            else {
                if (n == 4 || n == 6)
                    this.primitives[n].attrs.points[4] = this.buttonOff[n]
                else this.primitives[n].attrs.points[5] = this.buttonOff[n]
            }
        }
    };
}

export class Generator extends BaseMineDraw {
    public generators: any[]
    constructor(p0: Point, length: number) { //p0 - центр прямоугольника, length - большая сторона прямоугольника
        super(p0, length);
        this.name = 'Generator';
        this.generators = new Array();
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
    nextFrame(): void {
        if (this.propBit) {
            this.primitives[1].fill('#923434');
            this.primitives[2].fill('#F2A5A5');
            this.primitives[3].fill('#E4C0C0');
            this.primitives[4].stroke('#DB1010');
            this.primitives[5].stroke('#DB1010');
            this.primitives[6].stroke('#DB1010');
            this.primitives[8].fill('#DB1010');
            this.primitives[9].fill('#DB1010');
            this.primitives[10].fill('#DB1010');
        }
        else {
            this.primitives[1].fill('#42732B');
            this.primitives[2].fill('#CBDEDE');
            this.primitives[3].fill('#C6FFAC');
            this.primitives[4].stroke('#005236');
            this.primitives[5].stroke('#005236');
            this.primitives[6].stroke('#005236');
            this.primitives[8].fill('#005236');
            this.primitives[9].fill('#005236');
            this.primitives[10].fill('#005236');
        }
    }
};
