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
        // this.p0.x = p0.x; this.p0.y = p0.y; this.p1.x = p1.x; this.p1.y = p1.y;
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
    // width: number;
    // height: number;
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
    protected getOdd(num: number): number {
        return Math.trunc(num / 2) * 2 + 1;
    }
    // getCentralPoint(): Point {
    //     let xCentr = this.rect;
    //     let yCentr = this.rect;
    //     return new Point(xCentr, yCentr);
    // }
    constructor(p0: Point, length: number, disposition: Disposition) {
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
        if (this.widgets.length) this.interval = setInterval(this.update, 1000);
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
    private main0: Konva.Line;
    private main1: Konva.Line;
    // private mainRectangle: Konva.Rect;
    setState(newState: ValveState): void {
        this.state = newState;
    }
    private createTriangle(p0: Point, p1: Point, p2: Point): Konva.Line {
        return new Konva.Line({
            points: [p0.x, p0.y, p1.x, p1.y, p2.x, p2.y],
            fill: 'rgba(29, 142, 234, 1)',
            stroke: '#00C734',
            strokeWidth: 5,
            closed: true,
        });
    }
    constructor(p0: Point, length: number, disposition: Disposition) {
        super(p0, length, disposition);
        this.type = 'Valve';
        this.state = ValveState.closed;
        let p00: Point = this.rect.p0;
        let p01: Point = (disposition == Disposition.Vertical) ? this.rect.rightTop() : this.rect.getMiddlePoint();
        let p02: Point = (disposition == Disposition.Vertical) ? this.rect.getMiddlePoint() : this.rect.leftButtom();
        this.main0 = this.createTriangle(p00, p01, p02);
        let p10: Point = this.rect.p1;
        let p11: Point = (disposition == Disposition.Vertical) ? this.rect.leftButtom() : this.rect.getMiddlePoint();
        let p12: Point = (disposition == Disposition.Vertical) ? this.rect.getMiddlePoint() : this.rect.rightTop();
        this.main1 = this.createTriangle(p10, p11, p12);
    }
    nextFrame(): void {
        if (this.state == ValveState.opening) {
            if (this.animationFrame == 0) {
                this.main0.stroke('#F0FF41');
                this.main0.fill('#A1DC77');
                this.main1.stroke('#F0FF41');
                this.main1.fill('#E1F1FB');
                this.animationFrame +=1;
            }
            else {
                this.main0.stroke('#7AD03E');
                this.main0.fill('#E1F1FB');
                this.main1.stroke('#7AD03E');
                this.main1.fill('#A1DC77');
                this.animationFrame = 0;
            }
        }
    }
    draw(layer: Konva.Layer): void {
        layer.add(this.main0, this.main1);
    }
    // calcSize(factor = 1.45): number {
    //     return super.calcSize(factor);
    // }

}
// export = Pump;
// export = Scheme;

// module.exports = {
//     Pump: Pump,
//     Scheme: Scheme,
//     Disposition: Disposition
// }

