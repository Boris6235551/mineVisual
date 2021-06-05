import Konva from 'konva';
import { BaseMineDraw, Point } from './mine_drawing';

export class Cage extends BaseMineDraw {
    public mainFastUp: boolean;
    public mainFastDown: boolean;
    public dynamicBreak: boolean;
    public level0: boolean;
    public ventLevel: boolean;
    public subLevel: boolean;
    public productionLevel: boolean;
    public platformDown: boolean;
    private pointLevel0: number;
    private pointLevel1: number;
    private pointLevel2: number;
    private pointLevel3: number;
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'Cage';
        this.mainFastUp = false;
        this.mainFastDown = false;
        this.dynamicBreak = false;
        this.level0 = false;
        this.ventLevel = false;
        this.subLevel = false;
        this.productionLevel = false;
        this.platformDown = false;
        this.pointLevel0 = p0.y + length * 0.31 - length * 0.061;
        this.pointLevel1 = p0.y + length * 0.57;
        this.pointLevel2 = p0.y + length * 0.67;
        this.pointLevel3 = p0.y + length * 0.8;
        // линия поверхности земли
        this.primitives.push(this.createLine(
            p0.x - length, p0.y + length * 0.31,
            p0.x + length * 0.3, p0.y + length * 0.31,
            length * 0.002));
        for (let i = 0; i < 37; i++) {
            this.primitives.push(this.createLine(
                p0.x - length * 0.6 + i * length * 0.025, p0.y + length * 0.31,
                p0.x - length * 0.626 + i * length * 0.025, p0.y + length * 0.335,
                length * 0.003)
            );
        }
        // три уровня стволов шахт
        this.primitives.push(this.createRectangle(p0.x - length * 0.16, p0.y + length * 0.57, length * 0.06, length * 0.42,
            '#AC9595', '', 0, 0));
        this.primitives.push(this.createRectangle(p0.x - length * 0.16, p0.y + length * 0.67, length * 0.06, length * 0.42,
            '#977B7B', '', 0, 0));
        this.primitives.push(this.createRectangle(p0.x - length * 0.16, p0.y + length * 0.8, length * 0.06, length * 0.42,
            '#7D5A5A', '', 0, 0));
        // указатели уровней стволов шахт
        this.primitives.push(this.createRectangle(p0.x + length * 0.13, p0.y + length * 0.565, length * 0.02, length * 0.059,
            '#FFFFFF', '#84AFB1', length * 0.003, 5));
        this.primitives.push(this.createRectangle(p0.x + length * 0.13, p0.y + length * 0.665, length * 0.02, length * 0.059,
            '#FFFFFF', '#84AFB1', length * 0.003, 5));
        this.primitives.push(this.createRectangle(p0.x + length * 0.13, p0.y + length * 0.795, length * 0.02, length * 0.059,
            '#FFFFFF', '#84AFB1', length * 0.003, 5));
        this.primitives.push(this.createText(p0.x + length * 0.145, p0.y + length * 0.571,
            '228 m', length * 0.0096));
        this.primitives.push(this.createText(p0.x + length * 0.145, p0.y + length * 0.671,
            '246 m', length * 0.0096));
        this.primitives.push(this.createText(p0.x + length * 0.145, p0.y + length * 0.801,
            '270 m', length * 0.0096));
        // вертикальный ствол шахты
        this.primitives.push(this.createRectangleTrunk(p0.x, p0.y, length, length * 0.1, length * 0.003));
        // домик
        this.primitives.push(this.createLineHouse(p0.x - length * 0.35, p0.y + length * 0.31,
            p0.x - length * 0.35, p0.y + length * 0.15,
            p0.x - length * 0.265, p0.y + length * 0.1,
            p0.x - length * 0.18, p0.y + length * 0.15,
            p0.x - length * 0.18, p0.y + length * 0.31,
        ));
        this.primitives.push(this.createRectangle(p0.x - length * 0.33, p0.y + length * 0.16,
            length * 0.13, length * 0.15, '#CBDEDE', '', 0, 0));
        // привод клети
        this.primitives.push(this.createCircle(p0.x - length * 0.24, p0.y + length * 0.24,
            length * 0.035, '#055659', length * 0.006, '#331A38'));
        this.primitives.push(this.createCircle(p0.x - length * 0.24, p0.y + length * 0.24,
            length * 0.015, '#FDC858', 0, ''));
        this.primitives.push(this.createCircle(p0.x + length * 0.036, p0.y + length * 0.07,
            length * 0.016, '#FDC858', length * 0.005, '#331A38'));
        this.primitives.push(this.createLine(p0.x - length * 0.24, p0.y + length * 0.205,
            p0.x + length * 0.03, p0.y + length * 0.055, length * 0.006));
        //  подвижная клеть
        this.primitives.push(this.createLine(p0.x + length * 0.052, p0.y + length * 0.07,
            p0.x + length * 0.052, this.pointLevel2, length * 0.006));
        this.primitives.push(this.createRectangle(p0.x + length * 0.02, this.pointLevel2,
            length * 0.061, length * 0.061, '#FE982A', '#331A38', length * 0.006, 0));
        // крыша клети
        this.primitives.push(this.createRectangle(p0.x - length * 0.15, p0.y - length * 0.05,
            length * 0.03, length * 0.3, '#005236', '', 0, 0));
        this.primitives.push(this.createLineHouseRoof(p0.x - length * 0.1, p0.y + length * 0.31,
            p0.x + length * 0.11, p0.y - length * 0.05,
            p0.x + length * 0.13, p0.y - length * 0.05,
            p0.x - length * 0.08, p0.y + length * 0.31));
        console.log(this.primitives[34])
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
    setBaseProperty(mes: any) {
        this.mainFastUp = mes.mainFastUp;
        this.mainFastDown = mes.mainFastDown;
        this.dynamicBreak = mes.dynamicBreak;
        this.level0 = mes.level0;
        this.ventLevel = mes.ventLevel;
        this.subLevel = mes.subLevel;
        this.productionLevel = mes.productionLevel;
        this.platformDown = mes.platformDown;
    }
    nextFrame(): void {
        if (this.mainFastUp) {
            if (this.primitives[54].attrs.points[3] > this.pointLevel0) {
                this.primitives[54].attrs.points[3] = this.primitives[54].attrs.points[3] - 5;
                this.primitives[55].move({ x: 0, y: -5 });
            }
            else {
                this.primitives[54].attrs.points[3] = this.pointLevel3;
                this.primitives[55].y(this.pointLevel3);
            }
        }
        if (this.mainFastDown) {
            if (this.primitives[54].attrs.points[3] < this.pointLevel3) {
                this.primitives[54].attrs.points[3] = this.primitives[54].attrs.points[3] + 5;
                this.primitives[55].move({ x: 0, y: 5 });
            }
            else {
                this.primitives[54].attrs.points[3] = this.pointLevel0;
                this.primitives[55].y(this.pointLevel0);
            }
        }
        if (this.level0) {
            this.primitives[54].attrs.points[3] = this.pointLevel0;
            this.primitives[55].y(this.pointLevel0);
        }
        if ( this.ventLevel) {
            this.primitives[54].attrs.points[3] = this.pointLevel1;
            this.primitives[55].y(this.pointLevel1);
        }
        if (this.subLevel) {
            this.primitives[54].attrs.points[3] = this.pointLevel2;
            this.primitives[55].y(this.pointLevel2);
        }
        if (this.productionLevel) {
            this.primitives[54].attrs.points[3] = this.pointLevel3;
            this.primitives[55].y(this.pointLevel3);
        }
    }
};