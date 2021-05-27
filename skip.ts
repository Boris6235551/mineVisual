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
        // приёмный бункер
        this.primitives.push(this.createLineReceivingHopper(p0.x + length * 0.3, p0.y + length * 0.43,
            p0.x + length * 0.41, p0.y + length * 0.43,
            p0.x + length * 0.3781, p0.y + length * 0.4839,
            p0.x + length * 0.3869, p0.y + length * 0.5037,
            p0.x + length * 0.3231, p0.y + length * 0.5037,
            p0.x + length * 0.3319, p0.y + length * 0.4839,
            '#21686C', '#000000', length * 0.001)
        );
        this.primitives.push(this.createLineReceivingHopper(p0.x + length * 0.3231, p0.y + length * 0.515,
            p0.x + length * 0.3869, p0.y + length * 0.515,
            p0.x + length * 0.3869, p0.y + length * 0.545,
            p0.x + length * 0.27, p0.y + length * 0.575,
            p0.x + length * 0.27, p0.y + length * 0.555,
            p0.x + length * 0.3231, p0.y + length * 0.515,
            '#005236', '#000000', length * 0.001)
        );
        this.primitives.push(this.createLineReceivingHopper(p0.x + length * 0.22, p0.y + length * 0.585,
            p0.x + length * 0.3, p0.y + length * 0.585,
            p0.x + length * 0.3, p0.y + length * 0.625,
            p0.x + length * 0.25, p0.y + length * 0.625,
            p0.x + length * 0.25, p0.y + length * 0.595,
            p0.x + length * 0.22, p0.y + length * 0.595,
            '#8AC171', '#000000', length * 0.001)
        );
        this.primitives.push(this.createLine(p0.x + length * 0.275, p0.y + length * 0.585,
            p0.x + length * 0.275, p0.y + length * 0.625, length * 0.001));

        this.primitives.push(this.createLineReceivingHopper(
            p0.x + length * 0.26, p0.y + length * 0.63,
            p0.x + length * 0.29, p0.y + length * 0.63,
            p0.x + length * 0.29, p0.y + length * 0.67,
            p0.x + length * 0.2, p0.y + length * 0.7,
            p0.x + length * 0.2, p0.y + length * 0.68,
            p0.x + length * 0.26, p0.y + length * 0.65,
            '#8AC171', '#000000', length * 0.001)
        );

        // выдвижной рукав средняя часть, два положения

        const position1 = 0;  // положение 1
        const position2 = length * 0.04; // положение 2 по x
        const position3 = length * 0.013; // положение 2 по y

        this.primitives.push(this.createLineReceivingHopper(
            p0.x + length * 0.2 - position2, p0.y + length * 0.69 + position3,
            p0.x + length * 0.29 - position2, p0.y + length * 0.65 + position3,
            p0.x + length * 0.29 - position2, p0.y + length * 0.67 + position3,
            p0.x + length * 0.2 - position2, p0.y + length * 0.7 + position3,
            p0.x + length * 0.2 - position2, p0.y + length * 0.7 + position3,
            p0.x + length * 0.2 - position2, p0.y + length * 0.7 + position3,
            '#946868', '#000000', length * 0.001)
        );

        // выдвижной рукав третья часть, два вкл./выкл.

        this.primitives.push(this.createLineReceivingHopper(
            p0.x + length * 0.1 - length * 0.04, p0.y + length * 0.726 + length * 0.013,
            p0.x + length * 0.2 - length * 0.04, p0.y + length * 0.692 + length * 0.013,
            p0.x + length * 0.2 - length * 0.04, p0.y + length * 0.7 + length * 0.013,
            p0.x + length * 0.1 - length * 0.04, p0.y + length * 0.733 + length * 0.013,
            p0.x + length * 0.1 - length * 0.04, p0.y + length * 0.733 + length * 0.013,
            p0.x + length * 0.1 - length * 0.04, p0.y + length * 0.733 + length * 0.013,
            '#946868', '#000000', length * 0.001)
        );

        // два блока с текстом в приёмном бункере

        this.primitives.push(this.createRectangle(p0.x + length * 0.358, p0.y + length * 0.434,
            length * 0.02, length * 0.03, '#F9F9F9', '#FE982A', length * 0.002, length * 0.007));

        let t1 = '10'
        this.primitives.push(this.createText(p0.x + length * 0.365, p0.y + length * 0.44, t1 + ' t', length * 0.01));

        this.primitives.push(this.createRectangle(p0.x + length * 0.265, p0.y + length * 0.59,
            length * 0.02, length * 0.03, '#F9F9F9', '#FE982A', length * 0.002, length * 0.007));

        let t2 = 'A'
        this.primitives.push(this.createText(p0.x + length * 0.276, p0.y + length * 0.595, t2, length * 0.014));

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
    private createLineReceivingHopper(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number,
        x4: number, y4: number, x5: number, y5: number, x6: number, y6: number,
        fill: string, stroke: string, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6],
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
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