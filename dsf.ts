import Konva from 'konva';
import { BaseMineDraw, Point, PropParams } from './mine_drawing';

export class Conveyor extends BaseMineDraw {
    constructor(p0: Point, length: number, heightConveyor: number) {
        super(p0, length, heightConveyor);
        this.name = 'Conveyor';
        this.primitives.push(this.createLine(p0.x, p0.y, length));  // primitive 0
        this.primitives.push(this.createLine(p0.x, p0.y + heightConveyor, length)); // primitive 1
        this.primitives.push(this.createCircle(p0.x, p0.y + heightConveyor / 2, heightConveyor / 2 + 1.5,
            'white', 3, '#331A38'));    // primitive 2
        this.primitives.push(this.createCircle(p0.x + length, p0.y + heightConveyor / 2, heightConveyor / 2 + 1.5,
            'white', 3, '#331A38'));    // primitive 3
        this.primitives.push(this.createRectangle(p0.x, p0.y, heightConveyor, length,));    // primitive 4
        this.primitives.push(this.createCircle(p0.x, p0.y + heightConveyor / 2, heightConveyor / 2,
            '#481D88', length * 0.01, '#FDC858'));  // primitive 5
        this.primitives.push(this.createCircle(p0.x + length, p0.y + heightConveyor / 2, heightConveyor / 2,
            '#481D88', length * 0.01, '#FDC858'));  // primitive 6
        this.primitives.push(this.createCircle(p0.x, p0.y + heightConveyor / 2, heightConveyor / 4.57,
            '#8AC171', length * 0.01, '#FDC858'));  // primitive 7
        this.primitives.push(this.createCircle(p0.x + length, p0.y + heightConveyor / 2, heightConveyor / 4.57,
            '#8AC171', length * 0.01, '#FDC858'));  // primitive 8
    };
    private createRectangle(x: number, y: number, height: number, width: number): Konva.Rect {
        return new Konva.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: '#6BC4A6',
        });
    }
    private createLine(x: number, y: number, length: number): Konva.Line {
        return new Konva.Line({
            points: [x, y, length + x, y],
            stroke: '#331A38',
            strokeWidth: 6,
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
        // mes = {
        //     "upPositionA": false,

        // }
        this.positionUp = mes.upPositionA;
    }
    nextFrame(): void {
        if (this.propBit) this.primitives[4].fill('#6BC4A6');
        else this.primitives[4].fill('red');
    }
};

export class SeparatorRight extends BaseMineDraw {
    constructor(p0: Point, length: number) {
        super(p0, length);
        // let i: number;
        this.primitives.push(this.createLineTriple(p0.x + length * 0.04, p0.y + length * 0.12,
            p0.x + length * 0.96, p0.y + length * 0.58,
            length * 0.1, '#FB6AA3'));
        this.primitives.push(this.createLineTriple(p0.x + length * 0.06, p0.y + length * 0.22,
            p0.x + length * 0.9, p0.y + length * 0.64,
            length * 0.08, '#055659'));
        this.primitives.push(this.createLine(p0.x + length * 0.2, p0.y + length,
            p0.x, p0.y,
            p0.x + length, p0.y + length * 0.5,
            p0.x + length * 0.6, p0.y + length,
            length * 0.08, '#055659'));
        for (let i = 2; i <= 10; i++) {
            this.primitives.push(this.createRectangle(
                p0.x + length * 0.1 + length * 0.08 * i, p0.y - length * 0.001 + length * 0.04 * i,
                length * 0.08, length * 0.26));
        }
    };
    private createRectangle(x: number, y: number, height: number, width: number): Konva.Rect {
        return new Konva.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: '',
            rotation: 118
        });
    }
    private createLine(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number,
        x4: number, y4: number, strokeWidth: number, stroke: string): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    private createLineTriple(x1: number, y1: number, x2: number, y2: number, strokeWidth: number, stroke: string): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    private showFrame(fill3: string, fill4: string, fill5: string, fill6: string, fill7: string,
        fill8: string, fill9: string, fill10: string, fill11: string): void {
        this.primitives[3].fill(fill3);
        this.primitives[4].fill(fill4);
        this.primitives[5].fill(fill5);
        this.primitives[6].fill(fill6);
        this.primitives[7].fill(fill7);
        this.primitives[8].fill(fill8);
        this.primitives[9].fill(fill9);
        this.primitives[10].fill(fill10);
        this.primitives[11].fill(fill11);
    };
    nextFrame(): void {
        if (this.propBit) {
            switch (this.animationFrame) {
                case 1:
                    this.showFrame('', '', 'white', '', 'white', '', 'white', '', 'white')
                    this.animationFrame = 0
                    break;
                case 0:
                    this.showFrame('', 'white', '', 'white', '', 'white', '', 'white', '')
                    this.animationFrame = 1
                    break;
            }
        }
    }
}

export class SeparatorLeft extends BaseMineDraw {
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.primitives.push(this.createLineTriple(p0.x - length * 0.04, p0.y + length * 0.12,
            p0.x - length * 0.96, p0.y + length * 0.58,
            length * 0.1, '#FB6AA3'));
        this.primitives.push(this.createLineTriple(p0.x - length * 0.06, p0.y + length * 0.22,
            p0.x - length * 0.9, p0.y + length * 0.64,
            length * 0.08, '#055659'));
        this.primitives.push(this.createLine(p0.x - length * 0.2, p0.y + length,
            p0.x, p0.y,
            p0.x - length, p0.y + length * 0.5,
            p0.x - length * 0.6, p0.y + length,
            length * 0.08, '#055659'));
        for (let i = 2; i <= 10; i++) {
            this.primitives.push(this.createRectangle(
                p0.x - length * 0.043 - length * 0.08 * i, p0.y - length * 0.028 + length * 0.04 * i,
                length * 0.08, length * 0.26));
        }
    };
    private createRectangle(x: number, y: number, height: number, width: number): Konva.Rect {
        return new Konva.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: '',
            rotation: 63
        });
    }
    private createLine(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number,
        x4: number, y4: number, strokeWidth: number, stroke: string): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    private createLineTriple(x1: number, y1: number, x2: number, y2: number, strokeWidth: number, stroke: string): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    private showFrame(fill3: string, fill4: string, fill5: string, fill6: string, fill7: string,
        fill8: string, fill9: string, fill10: string, fill11: string): void {
        this.primitives[3].fill(fill3);
        this.primitives[4].fill(fill4);
        this.primitives[5].fill(fill5);
        this.primitives[6].fill(fill6);
        this.primitives[7].fill(fill7);
        this.primitives[8].fill(fill8);
        this.primitives[9].fill(fill9);
        this.primitives[10].fill(fill10);
        this.primitives[11].fill(fill11);
    };
    nextFrame(): void {
        if (this.propBit) {
            switch (this.animationFrame) {
                case 1:
                    this.showFrame('', '', 'white', '', 'white', '', 'white', '', 'white')
                    this.animationFrame = 0
                    break;
                case 0:
                    this.showFrame('', 'white', '', 'white', '', 'white', '', 'white', '')
                    this.animationFrame = 1
                    break;
            }
        }
    }
}

export class ConeCrusher extends BaseMineDraw {
    constructor(p0: Point, length: number) {
        super(p0, length);
        let rotation = -10;  // угол наклона во время движения
        // большой треугольник
        this.primitives.push(this.createTriangle(p0.x, p0.y, length, length, '#44B5A1', rotation, '481D88', length * 0.02));
        // вложенный треугольник
        this.primitives.push(this.createTriangle(p0.x, p0.y, length * 0.5, length, '#FA458C', rotation, '', 0));
        this.primitives.push(this.createCircle(p0.x, p0.y - length, length * 0.1));
        this.primitives.push(this.createRectangle(p0.x + length * 0.35, p0.y - length * 1.2,
            length * 0.1, length * 2, 60));
        this.primitives.push(this.createRectangle(p0.x - length * 0.28, p0.y - length * 1.16,
            length * 0.1, length * 2, 120));
    };
    private createTriangle(x: number, y: number, radius: number, length: number, fill: string, rotation: number, stroke: string,
        strokeWidth: number): Konva.RegularPolygon {
        return new Konva.RegularPolygon({
            x: x,
            y: y - length,
            sides: 3,
            radius: radius,
            fill: fill,
            rotation: rotation,
            offset: { x: 0, y: - length },
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    }
    private createCircle(x: number, y: number, radius: number): Konva.Circle {
        return new Konva.Circle({
            x: x,
            y: y,
            radius: radius,
            fill: '#481D88'
        });
    }
    private createRectangle(x: number, y: number, height: number, width: number,
        rotationRectangle: number): Konva.Rect {
        return new Konva.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: '#005236',
            rotation: rotationRectangle
        });
    }
    nextFrame(): void {
        if (this.propBit) {
            switch (this.animationFrame) {
                case 0:
                    this.primitives[0].rotation(-10);
                    this.primitives[1].rotation(-10);
                    this.animationFrame = 1;
                    break;
                case 1:
                    this.primitives[0].rotation(0);
                    this.primitives[1].rotation(0);
                    this.animationFrame = 2;
                    break;
                case 2:
                    this.primitives[0].rotation(10);
                    this.primitives[1].rotation(10);
                    this.animationFrame = 0;
                    break;
            }
        }
    };
}
export class Crush extends BaseMineDraw {
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'Crush';
        // трапеция грохота
        this.primitives.push(this.createLine(p0.x, p0.y, p0.x + length * 0.3, p0.y,
            p0.x + length * 0.7, p0.y + length, p0.x, p0.y + length, '#005236', '', 0));
        // два белых круга двигателя грохота
        this.primitives.push(this.createCircle(p0.x + length * 1.05, p0.y - length * 0.1,
            length * 0.265, 'white', length * 0.03, 'black'));
        this.primitives.push(this.createCircle(p0.x + length * 1.6, p0.y + length * 0.95,
            length * 0.115, 'white', length * 0.03, 'black'));
        // белая трапеция двигателя грохота
        this.primitives.push(this.createLine(
            p0.x + length * 0.8, p0.y,
            p0.x + length * 1.5, p0.y + length,
            p0.x + length * 1.7, p0.y + length * 0.9,
            p0.x + length * 1.3, p0.y - length * 0.2,
            'white', '', length * 0.03)
        );
        // двигатель грохота
        this.primitives.push(this.createLine( // backgroud
            p0.x + length * 1.3, p0.y - length * 0.2,
            p0.x + length * 0.8, p0.y,
            p0.x + length * 1.5, p0.y + length,
            p0.x + length * 1.7, p0.y + length * 0.9,
            '#8AC171', '', 0)
        );
        this.primitives.push(this.createLine(
            p0.x + length * 0.8, p0.y,
            p0.x + length * 1.5, p0.y + length,
            p0.x + length * 1.5, p0.y + length,
            p0.x + length * 1.5, p0.y + length,
            '', '#000000', length * 0.03)
        );
        this.primitives.push(this.createLine(
            p0.x + length * 1.3, p0.y - length * 0.2,
            p0.x + length * 1.7, p0.y + length * 0.9,
            p0.x + length * 1.7, p0.y + length * 0.9,
            p0.x + length * 1.7, p0.y + length * 0.9,
            '', '#000000', length * 0.03));
        this.primitives.push(this.createCircle(p0.x + length * 1.05, p0.y - length * 0.1,
            length * 0.24, '#6BC4A6', length * 0.02, '#FDC858'));
        this.primitives.push(this.createCircle(p0.x + length * 1.05, p0.y - length * 0.1,
            length * 0.1, '#481D88', length * 0.04, '#FA458C'));
        this.primitives.push(this.createCircle(p0.x + length * 1.6, p0.y + length * 0.95,
            length * 0.098, '#6BC4A6', length * 0.02, '#FDC858'));
        this.primitives.push(this.createCircle(p0.x + length * 1.6, p0.y + length * 0.95,
            length * 0.05, '#481D88', length * 0.02, '#FA458C'));
        // правая подвижная часть грохота
        this.primitives.push(this.createLineMove([p0.x + length * 1.1, p0.y, p0.x + length * 0.9, p0.y + length,
        p0.x + length * 0.9, p0.y + length, p0.x + length * 0.9, p0.y + length], '',
            '#005236', length * 0.07));
    };
    private createLineMove(points: number[], fill: string, stroke: string, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: points,
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            closed: true,
        });
    }
    private createLine(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number,
        x4: number, y4: number, fill: string, stroke: string, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4],
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
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
    nextFrame(): void {
        if (this.propBit) {
            switch (this.animationFrame) {
                case 0:
                    this.primitives[11].attrs.points[0] = this.primitives[11].attrs.points[0] - 15;
                    this.animationFrame = 1;
                    break;
                case 1:
                    this.primitives[11].attrs.points[0] = this.primitives[11].attrs.points[0] + 15;
                    this.animationFrame = 0;
                    break;
            }
        }
    };
};

export class Stone extends BaseMineDraw {
    constructor(p0: Point, radius: number) {
        super(p0, radius);
        this.name = 'Stone';

        // degrees to radians
        function toRad(degrees) {
            let pi = Math.PI;
            return degrees * (pi / 180);
        };
        /* quadrant */
        const xy = 0;
        const _xy = 1;
        const _x_y = 2;
        const x_y = 3;

        function getPoint(radius, degrees, quadrant) {
            let x;
            let y;
            switch (quadrant) {
                case xy:
                    x = radius * Math.cos(toRad(degrees));
                    y = radius * Math.cos(toRad(90 - degrees));
                    break;
                case _xy:
                    x = - radius * Math.cos(toRad(90 - degrees));
                    y = radius * Math.cos(toRad(degrees));
                    break;
                case _x_y:
                    x = - radius * Math.cos(toRad(degrees));
                    y = - radius * Math.cos(toRad(90 - degrees));
                    break;
                case x_y:
                    x = radius * Math.cos(toRad(90 - degrees));
                    y = - radius * Math.cos(toRad(degrees));
                    break;
            }
            return { x: x, y: y };
        }

        let stone1 = [
            40, xy,
            50, _xy,
            60, _x_y,
            15, x_y,
            50, x_y
        ]
        let p = []
        for (let i = 0; i < stone1.length; i = i + 2) {
            p[i] = getPoint(radius, stone1[i], stone1[i + 1]);
            // console.log(p);
        }
        console.log(p);
        this.primitives.push(this.createLine(p0.x + p[0].x, p0.y + p[0].y, p0.x + p[2].x, p0.y + p[2].y, p0.x + p[4].x, p0.y + p[4].y,
            p0.x + p[6].x, p0.y + p[6].y, p0.x + p[8].x, p0.y + p[8].y));
    }
    private createLine(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number,
        x4: number, y4: number, x5: number, y5: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5],
            fill: '#FE982A',
            closed: true,
        });
    }
};

export class BatcherLeft extends BaseMineDraw {
    name: string;
    constructor(p0: Point, length: number) {
        super(p0, length);
        let colorState = '';
        this.primitives.push(this.createLine(p0.x, p0.y, p0.x, p0.y + length,
            p0.x - length * 2, p0.y + length * 1.4, p0.x - length * 2, p0.y + length * 1.1, '#46802B', '', 0));
    };
    private createLine(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number,
        x4: number, y4: number, fill: string, stroke: string, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4],
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            closed: true,
        });
    }
    // nextFrame(): void {
    //     switch (this.propBit) {
    //         case true:
    //             this.primitives[0].fill('#46802B');
    //             break;
    //         case false:
    //             this.primitives[0].fill('red');
    //             break;
    //     }
    // }
}

export class BatcherRight extends BaseMineDraw {
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.primitives.push(this.createLine(p0.x, p0.y, p0.x, p0.y + length,
            p0.x + length * 2, p0.y + length * 1.4, p0.x + length * 2, p0.y + length * 1.1,
            '#46802B', '', 0));
    };
    private createLine(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number,
        x4: number, y4: number, fill: string, stroke: string, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4],
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            closed: true,
        });
    }
    // nextFrame(): void {
    //     switch (this.propBit) {
    //         case true:
    //             this.primitives[0].fill('#46802B');
    //             break;
    //         case false:
    //             this.primitives[0].fill('red');
    //             break;
    //     }
    // }
}

export class ReceivingHopper extends BaseMineDraw {
    public bunkHighUnload: boolean;
    public bunkLowUnload: boolean
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.bunkHighUnload = false;
        this.bunkLowUnload = false;
        // p0 верхняя левая точка
        this.primitives.push(this.createLine(p0.x, p0.y,
            p0.x + length, p0.y,
            p0.x + length * 0.71, p0.y + length * 0.49,
            p0.x + length * 0.79, p0.y + length * 0.67,
            p0.x + length * 0.21, p0.y + length * 0.67,
            p0.x + length * 0.29, p0.y + length * 0.49,
            '#21686C', '', 0)
        );
        this.primitives.push(this.createLineReceivingHopper(
            p0.x + length * 0.057, p0.y + length * 0.1,
            p0.x + length * 0.94, p0.y + length * 0.1,
            length * 0.02)
        );
        this.primitives.push(this.createLineReceivingHopper(
            p0.x + length * 0.12, p0.y + length * 0.21,
            p0.x + length * 0.88, p0.y + length * 0.21,
            length * 0.02)
        );
        this.primitives.push(this.createLineReceivingHopper(
            p0.x + length * 0.19, p0.y + length * 0.32,
            p0.x + length * 0.81, p0.y + length * 0.32,
            length * 0.02)
        );
        this.primitives.push(this.createLineReceivingHopper(
            p0.x + length * 0.25, p0.y + length * 0.43,
            p0.x + length * 0.75, p0.y + length * 0.43,
            length * 0.02)
        );
        this.primitives.push(this.createLineReceivingHopper(
            p0.x + length * 0.27, p0.y + length * 0.54,
            p0.x + length * 0.73, p0.y + length * 0.54,
            length * 0.02)
        );
        // mode bunkLowUnload
        this.primitives.push(this.createLine(
            p0.x + length * 0.26, p0.y + length * 0.43,
            p0.x + length * 0.75, p0.y + length * 0.43,
            p0.x + length * 0.79, p0.y + length * 0.67,
            p0.x + length * 0.21, p0.y + length * 0.67,
            p0.x + length * 0.26, p0.y + length * 0.43,
            p0.x + length * 0.26, p0.y + length * 0.43,
            '', '', 0)
        );
        // mode bunkHighUnload
        this.primitives.push(this.createLine(
            p0.x, p0.y,
            p0.x + length, p0.y,
            p0.x + length * 0.88, p0.y + length * 0.21,
            p0.x + length * 0.12, p0.y + length * 0.21,
            p0.x, p0.y,
            p0.x, p0.y,
            '', '', 0)
        );
        this.primitives.push(this.createLine(
            p0.x + length * 0.355, p0.y + length * 0.69,
            p0.x + length * 0.5, p0.y + length * 0.45,
            p0.x + length * 0.645, p0.y + length * 0.69,
            p0.x + length * 0.355, p0.y + length * 0.69,
            p0.x + length * 0.355, p0.y + length * 0.69,
            p0.x + length * 0.355, p0.y + length * 0.69,
            'white', '', 0)
        );
        // this.setBaseProperty(null);
    }
    private createLine(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number,
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
    private createLineReceivingHopper(x1: number, y1: number, x2: number, y2: number, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2],
            stroke: '#FDC858',
            strokeWidth: strokeWidth,
        });
    }
    setBaseProperty(mes: any) {
        // mes = {
        //     "bunkHighUnload": true,
        //     "bunkLowUnload": true,
        // }
        this.bunkHighUnload = mes.bunkHighUnload;
        this.bunkLowUnload = mes.bunkLowUnload;
    }
    nextFrame(): void {
        if (this.bunkHighUnload) {
            this.primitives[6].fill('red');
        }
        if (this.bunkLowUnload) {
            this.primitives[7].fill('red');
        }
    }
}

export class ArrowPointer extends BaseMineDraw {
    constructor(p0: Point, lengthWidth: number, lengthHeight: number, color: string) {
        super(p0, lengthWidth);
        this.primitives.push(this.createLine(p0.x, p0.y, p0.x - lengthWidth, p0.y, color, 2));
        this.primitives.push(this.createLine(p0.x, p0.y, p0.x, p0.y + lengthHeight, color, 2));
        this.primitives.push(this.createTriangle(p0.x, p0.y + lengthHeight, color, 7));
    }
    private createLine(x1: number, y1: number, x2: number, y2: number, stroke: string, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2],
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    };
    private createTriangle(x: number, y: number, fill: string, radius: number): Konva.RegularPolygon {
        return new Konva.RegularPolygon({
            x: x,
            y: y,
            sides: 3,
            radius: radius,
            fill: fill,
            rotation: 180,
        });
    }
}

export class InformationTable extends BaseMineDraw {
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.primitives.push(this.createRectangle(p0.x, p0.y, length * 0.6, length, length * 0.05));
    }
    private createRectangle(x: number, y: number, height: number, width: number, strokeWidth: number): Konva.Rect {
        return new Konva.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            stroke: 'black',
            strokeWidth: strokeWidth,
            cornerRadius: 10,
        });
    }
}

export class Pile extends BaseMineDraw {
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.primitives.push(this.createTriangle(p0.x, p0.y, length * 0.5, '', 'black', length * 0.03));
    }
    private createTriangle(x: number, y: number, radius: number, fill: string, stroke: string, strokeWidth: number): Konva.RegularPolygon {
        return new Konva.RegularPolygon({
            x: x,
            y: y,
            sides: 3,
            radius: radius,
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
        });
    }
}