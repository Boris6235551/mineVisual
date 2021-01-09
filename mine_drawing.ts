import Konva from 'konva';
//const Konva = require('konva');
// https://www.typescriptlang.org/docs/handbook/classes.html

export enum Disposition {
    Vertical = 0,
    Horizontal
};

export class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x; this.y = y;
    };
    copyPoint(p: Point): void {
        this.x = p.x;
        this.y = p.y;
    }
};

export class Rectangle {
    p0: Point;
    p1: Point;
    constructor(p0: Point, p1: Point) {
        this.p0 = new Point(0, 0);
        this.p1 = new Point(0, 0);
        this.p0.copyPoint(p0);
        this.p1.copyPoint(p1);
    };
    rightTop(): Point {
        let Rx = this.p1.x;
        let Ry = this.p0.y;
        return new Point(Rx, Ry);
    }
    leftButtom(): Point {
        let Ly = this.p1.y;
        let Lx = this.p0.x;
        return new Point(Lx, Ly);
    }
    getMiddlePoint(): Point {
        let lx = this.p0.x + Math.trunc((this.p1.x - this.p0.x) / 2) + 1;
        let ly = this.p0.y + Math.trunc((this.p1.y - this.p0.y) / 2) + 1;
        return new Point(lx, ly);
    }
};

class BaseMineDraw {
    protected type: string;
    readonly rect: Rectangle;
    readonly disposition: Disposition;
    protected state: any;
    protected animationFrame: number = 0;
    // getCentralPoint(): Point {
    //     let xCentr = this.rect;
    //     let yCentr = this.rect;
    //     return new Point(xCentr, yCentr);
    // }
    constructor(p0: Point, length: number, disposition?: Disposition, percentage?: number) {
        this.type = "Base";
        this.disposition = disposition;
        let dx: number;
        let dy: number;
        if (disposition == Disposition.Vertical) {
            dy = this.getOdd(length);
            dx = this.calcSize(length);
        }
        else {
            dx = this.getOdd(length);
            dy = this.calcSize(length);
        }
        this.rect = new Rectangle(p0, new Point(p0.x + dx, p0.y + dy));
    }
    protected setPercentage(percentage: number) {
        return percentage + '%'
    }
    protected getOdd(num: number): number {
        return Math.trunc(num / 2) * 2 + 1;
    }
    protected calcSize(length: number, factor: number = 1.59): number {
        return this.getOdd(length / factor);
    };

    // addToScheme(scheme: Scheme): void{

    // };
    draw(layer: Konva.Layer): void { };
    nextFrame(): void { };
    // get rect(): Rectangle{
    //     return this.rect;
    // }

};

export class Scheme {

    widgets: BaseMineDraw[];
    stage: Konva.Stage;
    private layer: Konva.Layer;
    private interval: NodeJS.Timeout;
    constructor(container: string, width: number, height: number) {
        clearInterval(this.interval);
        this.widgets = [];
        this.stage = new Konva.Stage({
            container: container,
            width: width,
            height: height
        });
        this.layer = new Konva.Layer();
        this.stage.add(this.layer);
        if (this.widgets.length) this.interval = setInterval(this.update, 100);
    }
    addWidget(widget: BaseMineDraw) {
        this.widgets.push(widget);
        console.log("Scheme . addWidget ", typeof this.widgets, this.widgets);
        this.widgets[this.widgets.length - 1].draw(this.layer);
        this.layer.draw();
        //if(this.interval == undefined) this.interval = setInterval(this.update, 1000 );
        console.log('this.interval', typeof this.interval, this.interval);

    }
    update(): void {
        //console.log('uppppppdaaaate', typeof this.widgets);
        //if(this.widgets.length == 0) return;
        for (let i = 0; i < this.widgets.length; i++) this.widgets[i].nextFrame();
        this.layer.draw();
    }
}
let interval: NodeJS.Timeout;

export function animateScheme(scheme: Scheme, timeOut: number) {
    interval = setInterval(() => { scheme.update(); }, timeOut);
}

export class Pump extends BaseMineDraw {
    // private state: ValveState;
    //private ind: number;
    private rects: Konva.Rect[];   // Konva.Rect
    private main: Konva.Rect;
    constructor(p0, length: number, disposition: Disposition) {
        super(p0, length, disposition);
        this.rects = [];
        this.type = 'Pump';
        this.state = ValveState.closed;
        //this.ind = 0;
        this.main = new Konva.Rect({
            x: 10,
            y: 100,
            width: 240,
            height: 80,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 4,
            cornerRadius: 16
        });
        for (let i = 0; i < 6; i++) {
            let x = 10 + 40 * i;
            let color: string;
            if (i == 2 || i == 5) color = 'white';
            else color = 'blue';
            let r = new Konva.Rect({
                x: i == 5 ? x - 20 : x,
                y: 10,
                width: (i == 0 || i == 5) ? 60 : 40,
                height: 80,
                fill: color,
                stroke: 'black',
                strokeWidth: 4,
                cornerRadius: (i == 0 || i == 5) ? 16 : 0
            });
            this.rects.push(r);
        }
    }
    nextFrame(): void {
        switch (this.state) {
            case 0:
                // 2, 5
                this.rects[1].fill('blue');
                this.rects[2].fill('white');
                this.rects[4].fill('blue');
                this.rects[5].fill('white');
                break;
            case 1:
                // 0, 3
                this.rects[5].fill('blue');
                this.rects[0].fill('white');
                this.rects[2].fill('blue');
                this.rects[3].fill('white');
                break;
            case 2:
                // 1, 4
                this.rects[0].fill('blue');
                this.rects[1].fill('white');
                this.rects[3].fill('blue');
                this.rects[4].fill('white');
                break;
        }
        if (this.state == 2) this.state = 0;
        else this.state++;
    };
    draw(layer: Konva.Layer): void {
        // layer.add(this.main);
        for (let i = 0; i < 4; i++) layer.add(this.rects[i]);
        layer.add(this.rects[5]);
        layer.add(this.rects[4]);
    }
    calcSize(factor = 1.45): number {
        return super.calcSize(factor);
    }

}

export enum ValveState {
    closed = 0, opened, opening, closing, alarm, stop
};

export class Valve extends BaseMineDraw {
    private triangle0: Konva.Line;
    private triangle1: Konva.Line;
    private rectangleCentr: Konva.Rect;
    private circle: Konva.Circle;
    private openingSize: Konva.Text;
    private primitives: any[]; // triangle0, triangle1, rectangleCentr, круг, текст
    constructor(p0: Point, length: number, disposition: Disposition, percentage: number) {
        super(p0, length, disposition, percentage);
        this.type = 'Valve';
        // this.state = ValveState.closed;
        let p00: Point = this.rect.p0;
        let p01: Point = (disposition == Disposition.Vertical) ? this.rect.rightTop() : this.rect.getMiddlePoint();
        let p02: Point = (disposition == Disposition.Vertical) ? this.rect.getMiddlePoint() : this.rect.leftButtom();
        this.triangle0 = this.createTriangle(p00, p01, p02);
        let p10: Point = this.rect.p1;
        let p11: Point = (disposition == Disposition.Vertical) ? this.rect.leftButtom() : this.rect.getMiddlePoint();
        let p12: Point = (disposition == Disposition.Vertical) ? this.rect.getMiddlePoint() : this.rect.rightTop();
        this.triangle1 = this.createTriangle(p10, p11, p12);
        this.rectangleCentr = this.createRectangle(length, disposition);
        this.circle = this.createCircle(length);
        this.openingSize = this.createText(length, disposition, percentage);
    }
    setState(newState: ValveState): void {
        this.state = newState;
    }
    private createTriangle(p0: Point, p1: Point, p2: Point): Konva.Line {
        return new Konva.Line({
            points: [p0.x, p0.y, p1.x, p1.y, p2.x, p2.y],
            fill: '',
            stroke: '',
            strokeWidth: 5,
            closed: true,
        });
    }
    private createRectangle(length, disposition): Konva.Rect {
        let x: number;
        let y: number;
        let height: number;
        let width: number;
        if (disposition == Disposition.Horizontal) {
            x = this.rect.getMiddlePoint().x - Math.trunc(length / 19.8);
            y = this.rect.getMiddlePoint().y - Math.trunc(length / 5.4);
            height = length / 2.7;
            width = length / 9.9;
        } else {
            x = this.rect.getMiddlePoint().x - Math.trunc(length / 5.4);
            y = this.rect.getMiddlePoint().y - Math.trunc(length / 19.8);
            height = length / 9.9;
            width = length / 2.7;
        };
        return new Konva.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: '',
        });
    }

    private createCircle(length): Konva.Circle {
        let x: number;
        let y: number;
        if (this.disposition == Disposition.Horizontal) {
            x = this.rect.getMiddlePoint().x;
            y = this.rect.getMiddlePoint().y - Math.trunc(0.39 * length);
        } else {
            x = this.rect.getMiddlePoint().x - Math.trunc(0.39 * length);
            y = this.rect.getMiddlePoint().y;
        };
        return new Konva.Circle({
            x: x,
            y: y,
            radius: Math.trunc(length / 4.79),
            fill: '',
            stroke: '',
            strokeWidth: 1,
        });
    }

    private createText(length, disposition, percentage): Konva.Text {
        let x: number;
        let y: number;
        if (disposition == Disposition.Horizontal) {
            x = this.rect.getMiddlePoint().x - Math.trunc(0.1 * length);
            y = this.rect.getMiddlePoint().y - Math.trunc(0.43 * length);
        } else {
            x = this.rect.getMiddlePoint().x - Math.trunc(0.5 * length);
            y = this.rect.getMiddlePoint().y - Math.trunc(0.04 * length);
        };
        return new Konva.Text({
            x: x,
            y: y,
            text: this.setPercentage(percentage),
            fontSize: 18,
            fontFamily: 'Roboto',
            fill: '',
        });
    }

    private showFrame(fill0: string, fill1: string, stroke: string, rectFill: string, circleStroke: string): void {
        this.triangle0.stroke(stroke);
        this.triangle0.fill(fill0);
        this.triangle1.stroke(stroke);
        this.triangle1.fill(fill1);
        this.rectangleCentr.fill(rectFill);
        this.circle.stroke(circleStroke);
    }

    nextFrame(): void {
        switch (this.state) {
            case ValveState.closed:
                this.showFrame('#FE668B', '#FE668B', '#E3093E', '#E3093E', '#E3093E');
                break;
            case ValveState.opened:
                if (this.animationFrame == 0) {
                    this.showFrame('#1D8EEA', '#E1F1FB', '#00C734', '#7AD03E', '#7AD03E');
                    this.animationFrame = 1;
                }
                else if (this.animationFrame == 1) {
                    this.showFrame('#1D8EEA', '#1D8EEA', '#00C734', '#7AD03E', '#7AD03E');
                    this.animationFrame = 2;
                }
                else {
                    this.showFrame('#E1F1FB', '#1D8EEA', '#00C734', '#7AD03E', '#7AD03E');
                    this.animationFrame = 0;
                }
                break;
            case ValveState.opening:
                if (this.animationFrame == 0) {
                    this.showFrame('#A1DC77', '#E1F1FB', '#F0FF41', '#7AD03E', '#7AD03E');
                    this.animationFrame = 1;
                }
                else {
                    this.showFrame('#E1F1FB', '#A1DC77', '#7AD03E', '#7AD03E', '#7AD03E');
                    this.animationFrame = 0;
                }
                break;
            case ValveState.closing:
                if (this.animationFrame == 0) {
                    this.showFrame('#FE668B', '#E1F1FB', '#F0FF41', '#E3093E', '#E3093E');
                    this.animationFrame = 1;
                }
                else {
                    this.showFrame('#E1F1FB', '#FE668B', '#E3093E', '#E3093E', '#E3093E');
                    this.animationFrame = 0;
                }
                break;
            case ValveState.alarm:
                if (this.animationFrame == 0) {
                    this.showFrame('#EF0000', '#EF0000', '#010101', '#EF0000', '#EF0000');
                    this.animationFrame = 1;
                }
                else {
                    this.showFrame('#010101', '#010101', '#FF0000', '#EF0000', '#EF0000');
                    this.animationFrame = 0;
                }
                break;
        }
    }

    draw(layer: Konva.Layer): void {
        layer.add(this.triangle0, this.triangle1, this.rectangleCentr, this.circle, this.openingSize);
    }
}

export class Pool extends BaseMineDraw {
    private rectangle1: Konva.Rect;
    private rectangle2: Konva.Rect;
    // private rectangle3: Konva.Rect;
    private rectangle3: any[] = new Array()
    private circle: Konva.Circle;
    private openingSize: Konva.Text;
    private primitives: any[]; // triangle0, triangle1, rectangleCentr, круг, текст
    constructor(p0: Point, length: number, percentage) {
        super(p0, length, percentage);
        this.type = 'Pool';
        this.rectangle1 = this.createRectangle1(p0, length);
        this.rectangle2 = this.createRectangle2(p0, length);
        let i: number;
        let waterLevel: string[] = [
            '#02498B', '#00519C', '#0061BA', '#0071D9', '#0085FF', 
            '#1F94FF', '#359EFF', '#5BB1FF', '#8DC9FF', '', '#02498B'
        ];
        if (percentage == 0) this.rectangle3[0] = this.createRectangle3(p0, length, waterLevel[9])
        else if (percentage == 100) this.rectangle3[0] = this.createRectangle3(p0, length, waterLevel[9])
        else {
            p0.y = p0.y + this.calcSize(length) * 0.93 - 5;
            for (i = 0; i < percentage.toString()[0]; i++) {
                p0.y = p0.y - this.calcSize(length) * 0.093;
                this.rectangle3[i] = this.createRectangle3(p0, length, waterLevel[i])
            }
        }

        this.circle = this.createCircle(length);
    }

    private createRectangle1(p0, length: number): Konva.Rect {
        return new Konva.Rect({
            x: p0.x,
            y: p0.y,
            height: this.calcSize(length),
            width: length,
            fill: '#FE896F',
            stroke: '#D28878',
            strokeWidth: 10,
            cornerRadius: 10
        });
    }

    private createRectangle2(p0, length: number): Konva.Rect {
        return new Konva.Rect({
            x: p0.x + this.calcSize(length) * 0.125,
            y: p0.y - 3,
            height: this.calcSize(length) * 0.93,
            width: length * 0.84,
            fill: '#E1F1FB',
            stroke: '#34E7E7',
            strokeWidth: 5,
            cornerRadius: 18
        });
    }

    private createRectangle3(p0, length: number, waterLevel): Konva.Rect {
        return new Konva.Rect({
            x: p0.x + this.calcSize(length) * 0.125 + 3,
            y: p0.y,
            height: this.calcSize(length) * 0.093,
            width: length * 0.84 - 6,
            fill: waterLevel,
            // stroke: '',
            // strokeWidth: 0,
            // cornerRadius: 50
        });
    }

    private createCircle(length: number): Konva.Circle {
        let x: number;
        let y: number;
        if (this.disposition == Disposition.Horizontal) {
            x = this.rect.getMiddlePoint().x;
            y = this.rect.getMiddlePoint().y - Math.trunc(0.39 * length);
        } else {
            x = this.rect.getMiddlePoint().x - Math.trunc(0.39 * length);
            y = this.rect.getMiddlePoint().y;
        };
        return new Konva.Circle({
            x: x,
            y: y,
            radius: Math.trunc(length / 4.79),
            fill: '',
            stroke: '',
            strokeWidth: 1,
        });
    }

    private createText(length, disposition): Konva.Text {
        let x: number;
        let y: number;
        if (disposition == Disposition.Horizontal) {
            x = this.rect.getMiddlePoint().x - Math.trunc(0.1 * length);
            y = this.rect.getMiddlePoint().y - Math.trunc(0.43 * length);
        } else {
            x = this.rect.getMiddlePoint().x - Math.trunc(0.5 * length);
            y = this.rect.getMiddlePoint().y - Math.trunc(0.04 * length);
        };
        return new Konva.Text({
            x: x,
            y: y,
            text: '100 %',
            fontSize: 18,
            fontFamily: 'Roboto',
            fill: '',
        });
    }



    draw(layer: Konva.Layer): void {
        let i: number;
        for (i = 0; i < this.rectangle3.length; i++)
            layer.add(this.rectangle1, this.rectangle2, this.rectangle3[i]);
    }
}

