import Konva from 'konva';
import { BaseMineDraw, Point } from './mine_drawing';

export class Bunker extends BaseMineDraw {
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'Bunker';
        // приёмный бункер
        this.primitives.push(this.createLineReceivingHopper(p0.x + length * 62, p0.y + length * 32,
            p0.x + length * 113, p0.y + length * 32,
            p0.x + length * 99, p0.y + length * 58,
            p0.x + length * 99, p0.y + length * 64,
            p0.x + length * 77, p0.y + length * 64,
            p0.x + length * 77, p0.y + length * 58,
            '#21686C', '#000000', length * 0.3)
        );

        this.primitives.push(this.createRectangle(p0.x + length * 73, p0.y + length * 35,
            length * 12.2, length * 14.3, '#F9F9F9', '#FE982A', length * 1.1, length * 4.7));

        let t1 = '10'
        this.primitives.push(this.createText(p0.x + length * 75.5, p0.y + length * 38.5, t1 + ' t', length * 6));
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
    nextFrame(): void {
        switch (this.propBit) {
            case true:
                this.primitives[0].fill('#045658');
                break;
            case false:
                this.primitives[0].fill('#A6C3C4');
                break;
        }
    }
}

export class FeederLeft extends BaseMineDraw {
    public enable: boolean;
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.enable = false;
        this.name = 'FeederLeft';
        this.primitives.push(this.createLineReceivingHopper(p0.x + length * 77, p0.y + length * 68,
            p0.x + length * 98, p0.y + length * 68,
            p0.x + length * 114, p0.y + length * 86,
            p0.x + length * 114, p0.y + length * 99,
            p0.x + length * 77, p0.y + length * 86,
            '#005236', '#000000', length * 0.6)
        );
    }
    private createLineReceivingHopper(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number,
        x4: number, y4: number, x5: number, y5: number, fill: string, stroke: string, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5],
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            closed: true,
        });
    }
    nextFrame(): void {
        if (this.enable) {
            switch (this.propBit) {
                case true:
                    this.primitives[0].fill('#045658');
                    break;
                case false:
                    this.primitives[0].fill('#835757');
                    break;
            }
        }
        else this.primitives[0].fill('#99BAAF');
    }
}

export class FeederRight extends BaseMineDraw {
    public enable: boolean;
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'FeederRight';
        this.primitives.push(this.createLineReceivingHopper(p0.x + length * 77, p0.y + length * 68,
            p0.x + length * 77, p0.y + length * 86,
            p0.x + length * 40, p0.y + length * 99,
            p0.x + length * 40, p0.y + length * 86,
            p0.x + length * 56, p0.y + length * 68,
            '#005236', '#000000', length * 0.6)
        );
    }
    private createLineReceivingHopper(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number,
        x4: number, y4: number, x5: number, y5: number, fill: string, stroke: string, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5],
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            closed: true,
        });
    }
    nextFrame(): void {
        if (this.enable) {
            switch (this.propBit) {
                case true:
                    this.primitives[0].fill('#045658');
                    break;
                case false:
                    this.primitives[0].fill('#835757');
                    break;
            }
        }
        else this.primitives[0].fill('#99BAAF');
    }
}

export class ChuteLeft extends BaseMineDraw {
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'ChuteLeft';
        this.primitives.push(this.createLineReceivingHopper(
            p0.x + length * 78, p0.y + length * 48,
            p0.x + length * 118, p0.y + length * 48,
            p0.x + length * 118, p0.y + length * 51,
            p0.x + length * 103, p0.y + length * 51,
            p0.x + length * 103, p0.y + length * 69,
            p0.x + length * 78, p0.y + length * 69,
            '#8AC171', '#000000', length * 0.6)
        );
        this.primitives.push(this.createLine(p0.x + length * 90, p0.y + length * 48,
            p0.x + length * 90, p0.y + length * 69, length * 0.6));
    }
    private createLineReceivingHopper(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number,
        x4: number, y4: number, x5: number, y5: number, x6: number, y6: number, fill: string, stroke: string, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6],
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            closed: true,
        });
    }
    private createLine(x1: number, y1: number, x2: number, y2: number, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2],
            stroke: '#331A38',
            strokeWidth: strokeWidth,
        });
    }
    nextFrame(): void {
        switch (this.propBit) {
            case true:
                this.primitives[0].fill('#045658');
                break;
            case false:
                this.primitives[0].fill('#D0E6C6');
                break;
        }
    }
}

export class ChuteRight extends BaseMineDraw {
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'ChuteRight';
        this.primitives.push(this.createLineReceivingHopper(
            p0.x + length * 78, p0.y + length * 48,
            p0.x + length * 78, p0.y + length * 69,
            p0.x + length * 53, p0.y + length * 69,
            p0.x + length * 53, p0.y + length * 51,
            p0.x + length * 38, p0.y + length * 51,
            p0.x + length * 38, p0.y + length * 48,
            '#8AC171', '#000000', length * 0.6)
        );
        this.primitives.push(this.createLine(p0.x + length * 66, p0.y + length * 48,
            p0.x + length * 66, p0.y + length * 69, length * 0.6));
    }
    private createLineReceivingHopper(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number,
        x4: number, y4: number, x5: number, y5: number, x6: number, y6: number, fill: string, stroke: string, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6],
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            closed: true,
        });
    }
    private createLine(x1: number, y1: number, x2: number, y2: number, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2],
            stroke: '#331A38',
            strokeWidth: strokeWidth,
        });
    }
    nextFrame(): void {
        switch (this.propBit) {
            case true:
                this.primitives[0].fill('#045658');
                break;
            case false:
                this.primitives[0].fill('#D0E6C6');
                break;
        }
    }
}

export class BatcherLeft extends BaseMineDraw {
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'BatcherLeft';
        this.primitives.push(this.createLineReceivingHopper(
            p0.x + length * 84, p0.y + length * 43,
            p0.x + length * 109, p0.y + length * 43,
            p0.x + length * 109, p0.y + length * 53,
            p0.x + length * 127, p0.y + length * 65,
            p0.x + length * 127, p0.y + length * 87,
            p0.x + length * 84, p0.y + length * 68,
            '#8AC171', '#000000', length * 0.4)
        );

        this.primitives.push(this.createRectangle(p0.x + length * 88, p0.y + length * 55,
            length * 12.2, length * 14.3, '#F9F9F9', '#FE982A', length * 1.1, length * 4.7));

        let text = 'A'
        this.primitives.push(this.createText(p0.x + length * 93, p0.y + length * 59, text, length * 6));
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
}

export class BatcherRight extends BaseMineDraw {
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'BatcherRight';
        this.primitives.push(this.createLineReceivingHopper(
            p0.x + length * 59, p0.y + length * 43,
            p0.x + length * 84, p0.y + length * 43,
            p0.x + length * 84, p0.y + length * 68,
            p0.x + length * 41, p0.y + length * 87,
            p0.x + length * 41, p0.y + length * 65,
            p0.x + length * 59, p0.y + length * 53,
            '#8AC171', '#000000', length * 0.4)
        );

        this.primitives.push(this.createRectangle(p0.x + length * 66, p0.y + length * 55,
            length * 12.2, length * 14.3, '#F9F9F9', '#FE982A', length * 1.1, length * 4.7));

        let text = 'B'
        this.primitives.push(this.createText(p0.x + length * 71, p0.y + length * 59, text, length * 6));
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
}

export class GateLeft extends BaseMineDraw {
    private baseY: number;
    public opened: boolean;
    public closed: boolean;
    private posAlarm: number;
    private posOpen: number;
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.opened = false;
        this.closed = true;
        this.name = 'GateLeft';
        let hight = length * 21.5
        this.baseY = p0.y + length * 65;
        this.posAlarm = this.baseY - hight / 2;
        this.posOpen = this.baseY - hight;
        this.primitives.push(this.createRectangle(p0.x + length * 127, this.baseY,
            hight, length * 4.8, '#FDC858', '#000000', length * 0.4));
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
    nextFrame(): void {
        if (this.opened) {
            this.primitives[0].y(this.posOpen);
            this.primitives[0].fill('#FDC858');
        }
        else if (this.closed) {
            this.primitives[0].y(this.baseY);
            this.primitives[0].fill('#FDC858');
        }
        else {
            this.primitives[0].fill('red');
            this.primitives[0].y(this.posAlarm);
        }
    }
}

export class GateRight extends BaseMineDraw {
    private baseY: number;
    public opened: boolean;
    public closed: boolean;
    private posAlarm: number;
    private posOpen: number;
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'GateRight';
        this.opened = false;
        this.closed = true;
        let hight = length * 21.5
        this.baseY = p0.y + length * 65;
        this.posAlarm = this.baseY - hight / 2;
        this.posOpen = this.baseY - hight;
        this.primitives.push(this.createRectangle(p0.x + length * 36.2, this.baseY,
            length * 21.5, length * 4.8, '#FDC858', '#000000', length * 0.4));
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
    nextFrame(): void {
        if (this.opened) {
            this.primitives[0].y(this.posOpen);
            this.primitives[0].fill('#FDC858');
        }
        else if (this.closed) {
            this.primitives[0].y(this.baseY);
            this.primitives[0].fill('#FDC858');
        }
        else {
            this.primitives[0].fill('red');
            this.primitives[0].y(this.posAlarm);
        }
    }
}

const tongueOpen = 0;
const tongueClose = 1;
const tongueErr = 2;

export class TongueLeft extends BaseMineDraw {
    // private closey: number;
    // private closex: number;
    // private openx: number;
    // private openy: number
    public opened: boolean;
    public closed: boolean;
    public dx: number;
    public dy: number;
    private prevState: number;

    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'TongueLeft';
        this.dx = (127 - 84) * length * 0.6;
        this.dy = (87 - 68) * length * 0.6;
        this.prevState = tongueClose;
        this.opened = false;
        this.closed = true;
        this.primitives.push(this.createLineReceivingHopper(
            p0.x + length * 84, p0.y + length * 68,
            p0.x + length * 127, p0.y + length * 87,
            p0.x + length * 127, p0.y + length * 94,
            p0.x + length * 84, p0.y + length * 75,
            '#21686C', '#000000', length * 0.4)
        );
    }
    private createLineReceivingHopper(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number,
        x4: number, y4: number, fill: string, stroke: string, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4],
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            closed: true,
        });
    }
    nextFrame(): void {
        if (this.opened) {  // open
            if(this.prevState == tongueOpen) return;
            else if(this.prevState == tongueClose) this.move( {x: this.dx, y: this.dy});
            else this.move({x: 0.5 * this.dx, y: 0.5 * this.dy})
            this.prevState = tongueOpen;
            this.primitives[0].fill('#21686C');
        }
        else if (this.closed) { //close
            if(this.prevState == tongueClose) return;
            else if(this.prevState == tongueOpen) this.move( {x: -this.dx, y: -this.dy});
            else this.move({x: -0.5 * this.dx, y: -0.5 * this.dy})
            this.prevState = tongueClose;
            this.primitives[0].fill('#21686C');
        }
        else {  // error
            if(this.prevState == tongueErr) return;
            else if(this.prevState == tongueOpen) this.move({x: -0.5 * this.dx, y: -0.5 * this.dy});
            else this.move({x: 0.5 * this.dx, y: 0.5 * this.dy});
            this.prevState = tongueErr;
            this.primitives[0].fill('red');
        }
    }
}

export class TongueRight extends BaseMineDraw {
    public opened: boolean;
    public closed: boolean;
    public dx: number;
    public dy: number;
    private prevState: number;
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'TongueRight';
        this.dx = (127 - 84) * length * 0.6;
        this.dy = (87 - 68) * length * 0.6;
        this.prevState = tongueClose;
        this.opened = false;
        this.closed = true;
        this.primitives.push(this.createLineReceivingHopper(
            p0.x + length * 41, p0.y + length * 87,
            p0.x + length * 84, p0.y + length * 68,
            p0.x + length * 84, p0.y + length * 75,
            p0.x + length * 41, p0.y + length * 94,
            '#21686C', '#000000', length * 0.4)
        );
    }
    private createLineReceivingHopper(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number,
        x4: number, y4: number, fill: string, stroke: string, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4],
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            closed: true,
        });
    }
    nextFrame(): void {
        if (this.opened) {  // open
            if(this.prevState == tongueOpen) return;
            else if(this.prevState == tongueClose) this.move( {x: this.dx, y: this.dy});
            else this.move({x: -0.5 * this.dx, y: 0.5 * this.dy})
            this.prevState = tongueOpen;
            this.primitives[0].fill('#21686C');
        }
        else if (this.closed) { //close
            if(this.prevState == tongueClose) return;
            else if(this.prevState == tongueOpen) this.move( {x: -this.dx, y: -this.dy});
            else this.move({x: 0.5 * this.dx, y: -0.5 * this.dy})
            this.prevState = tongueClose;
            this.primitives[0].fill('#21686C');
        }
        else {  // error
            if(this.prevState == tongueErr) return;
            else if(this.prevState == tongueOpen) this.move({x: 0.5 * this.dx, y: -0.5 * this.dy});
            else this.move({x: -0.5 * this.dx, y: 0.5 * this.dy});
            this.prevState = tongueErr;
            this.primitives[0].fill('red');
        }
    }
}