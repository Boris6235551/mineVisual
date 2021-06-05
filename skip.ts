import Konva from 'konva';
import { BaseMineDraw, Point } from './mine_drawing';

export class Skip extends BaseMineDraw {
    public positionUp: boolean;
    public positionDown: boolean;
    public moveUp: boolean;
    public moveDown: boolean;
    public skipLoadA: boolean;
    public skipLoadB: boolean;
    public openA: boolean;
    public openB: boolean;
    private length: number;
    private topSkip: number;
    private bottomSkip: number;
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'Skip';
        this.length = length;
        this.topSkip = this.length * 0.34;
        this.bottomSkip = this.length * 1.04;
        this.positionUp = false;
        this.positionDown = false;
        this.moveUp = false;
        this.moveDown = false;
        this.skipLoadA = false;
        this.skipLoadB = false;
        this.openA = false;
        this.openB = false;
        // линия поверхности земли
        this.primitives.push(this.createLine(
            p0.x, p0.y + length * 0.31,
            p0.x + length * 0.57, p0.y + length * 0.31,
            length * 0.002));
        for (let i = 0; i < 28; i++) {
            this.primitives.push(this.createLine(
                p0.x + i * length * 0.02, p0.y + length * 0.31,
                p0.x + length * 0.02 + i * length * 0.02, p0.y + length * 0.33,
                length * 0.002));
        }
        this.primitives.push(this.createLine(
            p0.x, p0.y + length * 0.31,
            p0.x - length * 0.33, p0.y + length * 0.31,
            length * 0.002));
        for (let i = 0; i < 16; i++) {
            this.primitives.push(this.createLine(
                p0.x - i * length * 0.02, p0.y + length * 0.31,
                p0.x - length * 0.02 - i * length * 0.02, p0.y + length * 0.33,
                length * 0.002));
        }
        for (let i = 0; i < 54; i++) {
            this.primitives.push(this.createLine(
                p0.x, p0.y + length * 0.31 + i * length * 0.02,
                p0.x - length * 0.02, p0.y + length * 0.33 + i * length * 0.02,
                length * 0.002));
        }
        for (let i = 0; i < 54; i++) {
            this.primitives.push(this.createLine(
                p0.x + length * 0.2, p0.y + length * 0.31 + i * length * 0.02,
                p0.x + length * 0.22, p0.y + length * 0.33 + i * length * 0.02,
                length * 0.002));
        }
        //  вертикальный ствол шахты
        this.primitives.push(this.createRectangleTrunk(p0.x, p0.y, length * 1.4, length * 0.2, length * 0.003));
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
        // скип 1
        this.primitives.push(this.createLine(p0.x + length * 0.052, p0.y + length * 0.07,
            p0.x + length * 0.052, p0.y + length * 0.57, length * 0.006));
        this.primitives.push(this.createRectangle(p0.x + length * 0.02, p0.y + length * 0.57,
            length * 0.08, length * 0.061, '#331A38', '#FDC858', length * 0.006, 0));
        //  скип 2
        this.primitives.push(this.createLine(p0.x + length * 0.152, p0.y + length * 0.17,
            p0.x + length * 0.152, p0.y + length * 0.57, length * 0.006));
        this.primitives.push(this.createRectangle(p0.x + length * 0.12, p0.y + length * 0.57,
            length * 0.08, length * 0.061, '#331A38', '#FDC858', length * 0.006, 0));
        // крыша скипа
        this.primitives.push(this.createRectangle(p0.x - length * 0.02, p0.y - length * 0.05,
            length * 0.03, length * 0.3, '#005236', '', 0, 0));
        this.primitives.push(this.createLineHouseRoof(p0.x + length * 0.29, p0.y + length * 0.31,
            p0.x + length * 0.02, p0.y - length * 0.05,
            p0.x, p0.y - length * 0.05,
            p0.x + length * 0.27, p0.y + length * 0.31));
        //  две нижние подставки скипов 
        this.primitives.push(this.createRectangle(p0.x, length * 1.12,
            length * 0.02, length * 0.1, 'red', '', 0, 0));
        this.primitives.push(this.createRectangle(p0.x + length * 0.1, length * 1.12,
            length * 0.02, length * 0.1, 'red', '', 0, 0));
        //  две верхние крышки скипов 
        this.primitives.push(this.createRectangle(p0.x + length * 0.02 - length * 0.1, this.topSkip,
            length * 0.01, length * 0.1, 'red', '', 0, 0));
        this.primitives.push(this.createRectangle(p0.x + length * 0.12 + length * 0.061, this.topSkip,
            length * 0.01, length * 0.1, 'red', '', 0, 0));
        // скрытие верхних и нижних крышек скипов
        this.hidingCover();
    }
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
    private hidingCover(): void {
        this.primitives[169].visible(false);
        this.primitives[170].visible(false);
        this.primitives[171].visible(false);
        this.primitives[172].visible(false);
    }
    setBaseProperty(mes: any) {
        this.positionUp = mes.upPositionA;
        this.positionDown = mes.downPositionA;
        this.moveUp = mes.normalUp;
        this.moveDown = mes.normalDown;
        this.skipLoadA = mes.skipLoadA;
        this.skipLoadB = mes.skipLoadB;
    }
    nextFrame(): void {
        this.hidingCover();
        if (this.positionUp) {                           // положение скипа А вверху, а скипа В внизу
            this.primitives[163].attrs.points[3] = (this.topSkip);
            this.primitives[164].y(this.topSkip);
            this.primitives[165].attrs.points[3] = (this.bottomSkip);
            this.primitives[166].y(this.bottomSkip);
        }
        else if (this.positionDown) {                   // положение скипа А внизу, а скипа В вверху
            this.primitives[163].attrs.points[3] = this.bottomSkip;
            this.primitives[164].y(this.bottomSkip);
            this.primitives[165].attrs.points[3] = this.topSkip;
            this.primitives[166].y(this.topSkip);
        }
        else if (this.moveUp) {                        // движение скипа А вверх, а скипа В вниз
            if (this.primitives[163].attrs.points[3] >= this.topSkip) {
                this.primitives[163].attrs.points[3] = this.primitives[163].attrs.points[3] - 5
                this.primitives[164].move({ x: 0, y: -5 });
                this.primitives[165].attrs.points[3] = this.primitives[165].attrs.points[3] + 5
                this.primitives[166].move({ x: 0, y: 5 });
            }
            else {
                this.primitives[163].attrs.points[3] = this.bottomSkip
                this.primitives[164].y(this.bottomSkip);
                this.primitives[165].attrs.points[3] = this.topSkip
                this.primitives[166].y(this.topSkip);
            }
        }
        else if (this.moveDown) {                     // движение скипа А вниз, а скипа В вверх
            if (this.primitives[163].attrs.points[3] <= this.bottomSkip) {
                this.primitives[163].attrs.points[3] = this.primitives[163].attrs.points[3] + 5
                this.primitives[164].move({ x: 0, y: +5 });
                this.primitives[165].attrs.points[3] = this.primitives[165].attrs.points[3] - 5
                this.primitives[166].move({ x: 0, y: -5 });
            }
            else {
                this.primitives[163].attrs.points[3] = this.topSkip
                this.primitives[164].y(this.topSkip);
                this.primitives[165].attrs.points[3] = this.bottomSkip
                this.primitives[166].y(this.bottomSkip);
            }
        }
        else if (this.skipLoadA) {                  // скип А внизу, скип В вверху, отображение левой полосы 
            this.primitives[163].attrs.points[3] = this.bottomSkip;
            this.primitives[164].y(this.bottomSkip);
            this.primitives[165].attrs.points[3] = this.topSkip;
            this.primitives[166].y(this.topSkip);
            this.primitives[169].visible(true);
        }
        else if (this.skipLoadB) {                  // скип А вверху, скип В внизу, отображение правой полосы 
            this.primitives[163].attrs.points[3] = (this.topSkip);
            this.primitives[164].y(this.topSkip);
            this.primitives[165].attrs.points[3] = (this.bottomSkip);
            this.primitives[166].y(this.bottomSkip);
            this.primitives[170].visible(true);
        }
        else if (this.openA) {
            this.primitives[163].attrs.points[3] = (this.topSkip);
            this.primitives[164].y(this.topSkip);
            this.primitives[165].attrs.points[3] = (this.bottomSkip);
            this.primitives[166].y(this.bottomSkip);
            this.primitives[171].visible(true);
        }
        else if (this.openB) {
            this.primitives[163].attrs.points[3] = this.bottomSkip;
            this.primitives[164].y(this.bottomSkip);
            this.primitives[165].attrs.points[3] = this.topSkip;
            this.primitives[166].y(this.topSkip);
            this.primitives[172].visible(true);
        }
    }
};