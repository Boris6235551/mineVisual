import Konva from 'konva';
import { BaseMineDraw, Point } from './mine_drawing';
const moment = require('moment');

/************************************************************************
*                               EXPORTS: 
*************************************************************************
*   Bunker                  (propBit - active/passive)
*   FeederLeft, FeederRight (enable - active/passive, propBit - on/off)
*   ChuteLeft, ChuteRight   (propBit - active/passive)
*   BatcherLeft, BatcherRight ()
*   GateLeft, GateRight (opened, closed)
*   TangueLeft, TangueRight (opened, closed)
*************************************************************************/

export class Bunker extends BaseMineDraw {
    private isLeft: boolean;
    constructor(p0: Point, length: number, left = true) {
        super(p0, length);
        this.name = 'Bunker';
        this.isLeft = left;
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
    setBaseProperty(mes: any) {
        if (this.isLeft) {
            console.log(`Bunker left active =${mes.chuteLoadA}`)
            this.propBit = mes.chuteLoadA;
        }
        else {
            console.log(`Bunker right active =${mes.chuteLoadB}`)
            this.propBit = mes.chuteLoadB;
        }
    }
}

export class FeederBase extends BaseMineDraw {
    protected enable: boolean;
    constructor(p0: Point, length: number) {
        super(p0, length);
    }
    protected createLineReceivingHopper(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number,
        x4: number, y4: number, x5: number, y5: number, fill: string, stroke: string, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5],
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            closed: true,
        });
    }
    public nextFrame(): void {
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

export class FeederLeft extends FeederBase {
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
    setBaseProperty(mes: any) {
        console.log(`FeederRight active =${mes.chuteLoadA}; on/off ${mes.feederOn}`)
        this.enable = mes.chuteLoadA;
        this.propBit = mes.feederOn;
    }
}

export class FeederRight extends FeederBase {
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
    setBaseProperty(mes: any) {
        console.log(`FeederRight active =${mes.chuteLoadB}; on/off ${mes.feederOn}`)
        this.enable = mes.chuteLoadB;
        this.propBit = mes.feederOn;
    }
}

export class ChuteBase extends BaseMineDraw {
    constructor(p0: Point, length: number) {
        super(p0, length);
    }
    protected createLineReceivingHopper(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number,
        x4: number, y4: number, x5: number, y5: number, x6: number, y6: number, fill: string, stroke: string, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6],
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            closed: true,
        });
    }
    protected createLine(x1: number, y1: number, x2: number, y2: number, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2],
            stroke: '#331A38',
            strokeWidth: strokeWidth,
        });
    }
    public nextFrame(): void {
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

export class ChuteLeft extends ChuteBase {
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
    setBaseProperty(mes: any) {
        console.log(`chuteA=${mes.chuteLoadA}`)
        this.propBit = mes.chuteLoadA;
    }
}

export class ChuteRight extends ChuteBase {
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
    setBaseProperty(mes: any) {
        console.log(`chuteB=${mes.chuteLoadB}`)
        this.propBit = mes.chuteLoadB;
    }
}

export class BatcherBase extends BaseMineDraw {
    constructor(p0: Point, length: number) {
        super(p0, length);
    }
    protected createLineReceivingHopper(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number,
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
    protected createRectangle(x: number, y: number, height: number, width: number, fill: string,
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
}

export class BatcherLeft extends BatcherBase {
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
}

export class BatcherRight extends BatcherBase {
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
}

export class GateBase extends BaseMineDraw {
    protected baseY: number;
    public opened: boolean;
    public closed: boolean;
    protected posAlarm: number;
    protected posOpen: number;
    protected hight: number;
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.opened = false;
        this.closed = true;
        this.name = 'GateLeft';
        this.hight = length * 21.5
        this.baseY = p0.y + length * 65;
        this.posAlarm = this.baseY - this.hight / 2;
        this.posOpen = this.baseY - this.hight;
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
    public nextFrame(): void {
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

export class GateLeft extends GateBase {
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'GateLeft';
        this.primitives.push(this.createRectangle(p0.x + length * 127, this.baseY,
            this.hight, length * 4.8, '#FDC858', '#000000', length * 0.4));
    }
    setBaseProperty(mes: any) {
        console.log(`trayOpenedA=${mes.gateOpenedA}; mes.trayClosedA=${mes.gateClosedA}`)
        this.opened = mes.gateOpenedA;
        this.closed = mes.gateClosedA;
    }
}

export class GateRight extends GateBase {
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'GateRight';
        this.primitives.push(this.createRectangle(p0.x + length * 36.2, this.baseY,
            this.hight, length * 4.8, '#FDC858', '#000000', length * 0.4));
    }
    setBaseProperty(mes: any) {
        console.log(`trayOpenedB=${mes.gateOpenedB}; mes.trayClosedA=${mes.gateClosedB}`)
        this.opened = mes.gateOpenedB;
        this.closed = mes.gateClosedB;
    }
}

const tongueOpen = 0;
const tongueClose = 1;
const tongueErr = 2;

class TongueBase extends BaseMineDraw {
    public opened: boolean;
    public closed: boolean;
    protected dx: number;
    protected dy: number;
    protected prevState: number;
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.dx = (127 - 84) * length * 0.6;
        this.dy = (87 - 68) * length * 0.6;
        this.prevState = tongueClose;
        this.opened = false;
        this.closed = true;
    }
    protected createLineReceivingHopper(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number,
        x4: number, y4: number, fill: string, stroke: string, strokeWidth: number): Konva.Line {
        return new Konva.Line({
            points: [x1, y1, x2, y2, x3, y3, x4, y4],
            fill: fill,
            stroke: stroke,
            strokeWidth: strokeWidth,
            closed: true,
        });
    }
}

export class TongueLeft extends TongueBase {
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'TongueLeft';
        this.primitives.push(this.createLineReceivingHopper(
            p0.x + length * 84, p0.y + length * 68,
            p0.x + length * 127, p0.y + length * 87,
            p0.x + length * 127, p0.y + length * 94,
            p0.x + length * 84, p0.y + length * 75,
            '#21686C', '#000000', length * 0.4)
        );
    }
    setBaseProperty(mes: any) {
        console.log(`tongue left opened =${mes.trayOpenedA}; tongue left closed=${mes.trayClosedA}`)
        this.opened = mes.trayOpenedA;
        this.closed = mes.trayClosedA;
    }
    nextFrame(): void {
        if (this.opened) {  // open
            if (this.prevState == tongueOpen) return;
            else if (this.prevState == tongueClose) this.move({ x: this.dx, y: this.dy });
            else this.move({ x: 0.5 * this.dx, y: 0.5 * this.dy })
            this.prevState = tongueOpen;
            this.primitives[0].fill('#21686C');
        }
        else if (this.closed) { //close
            if (this.prevState == tongueClose) return;
            else if (this.prevState == tongueOpen) this.move({ x: -this.dx, y: -this.dy });
            else this.move({ x: -0.5 * this.dx, y: -0.5 * this.dy })
            this.prevState = tongueClose;
            this.primitives[0].fill('#21686C');
        }
        else {  // error
            if (this.prevState == tongueErr) return;
            else if (this.prevState == tongueOpen) this.move({ x: -0.5 * this.dx, y: -0.5 * this.dy });
            else this.move({ x: 0.5 * this.dx, y: 0.5 * this.dy });
            this.prevState = tongueErr;
            this.primitives[0].fill('red');
        }
    }
}

export class TongueRight extends TongueBase {
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'TongueRight';
        this.primitives.push(this.createLineReceivingHopper(
            p0.x + length * 41, p0.y + length * 87,
            p0.x + length * 84, p0.y + length * 68,
            p0.x + length * 84, p0.y + length * 75,
            p0.x + length * 41, p0.y + length * 94,
            '#21686C', '#000000', length * 0.4)
        );
    }
    setBaseProperty(mes: any) {
        console.log(`tongue right opened =${mes.trayOpenedB}; tongue left closed=${mes.trayClosedB}`)
        this.opened = mes.trayOpenedB;
        this.closed = mes.trayClosedB;
    }
    nextFrame(): void {
        if (this.opened) {  // open
            if (this.prevState == tongueOpen) return;
            else if (this.prevState == tongueClose) this.move({ x: this.dx, y: this.dy });
            else this.move({ x: -0.5 * this.dx, y: 0.5 * this.dy })
            this.prevState = tongueOpen;
            this.primitives[0].fill('#21686C');
        }
        else if (this.closed) { //close
            if (this.prevState == tongueClose) return;
            else if (this.prevState == tongueOpen) this.move({ x: -this.dx, y: -this.dy });
            else this.move({ x: 0.5 * this.dx, y: -0.5 * this.dy })
            this.prevState = tongueClose;
            this.primitives[0].fill('#21686C');
        }
        else {  // error
            if (this.prevState == tongueErr) return;
            else if (this.prevState == tongueOpen) this.move({ x: 0.5 * this.dx, y: -0.5 * this.dy });
            else this.move({ x: -0.5 * this.dx, y: 0.5 * this.dy });
            this.prevState = tongueErr;
            this.primitives[0].fill('red');
        }
    }
}

export class LabelInfo extends BaseMineDraw {
    public numberA: number;
    public weightA: string;
    public dateA: string;
    public monthA: number;
    public numberB: number;
    public weightB: string;
    public dateB: string;
    public monthB: number
    public beginMonth: number;
    public endMonth: number;
    public skipCount: number;
    public net: number;
    public beginDate: string;
    public endDate: string;
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'Labelinfo';
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
    protected createRectangle(x: number, y: number, height: number, width: number, fill: string,
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
    protected setText(obj: any, text: string) {
        obj.text(text);
    }
}

export class LeftInfo extends LabelInfo {
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'Leftinfo';
        this.numberA = 0;
        this.weightA = '';
        this.dateA = '';
        this.monthA = 0;
        this.primitives.push(this.createRectangle(p0.x, p0.y + length * 0.1, length, length * 1.8, 'white', '#FE982A', length * 0.1, length * 0.1))
        this.primitives.push(this.createText(p0.x + length * 0.2, p0.y + length * 0.2, 'L Skip No.', length * 0.2))
        this.primitives.push(this.createText(p0.x + length * 0.2, p0.y + length * 0.5, '', length * 0.2))
        this.primitives.push(this.createText(p0.x + length * 0.2, p0.y + length * 0.8, '', length * 0.2))
    }
    setBaseProperty(mes: any) {
        this.monthA = mes.monthA
        this.endMonth = mes.endMonth
        this.numberA = mes.numberA
        this.weightA = mes.grossA + '-' + mes.tareA + '=' + (mes.grossA - mes.tareA)
        this.dateA = moment(mes.monthA + ' ' + mes.dateA + ' ' + mes.year + ' ' + mes.hoursA + ' ' + mes.minutesA + ' ' + mes.secondsA, "MM DD YY HH mm ss").format("MM-DD-YY HH:mm:ss");
    }

    nextFrame(): void {
        if (this.monthA != 0) {
            this.setText(this.primitives[1], 'L Skip No.' + this.numberA);
            this.setText(this.primitives[2], this.weightA);
            this.setText(this.primitives[3], this.dateA);
        }
        else if (this.monthA == 0) {
            this.setText(this.primitives[1], '');
            this.setText(this.primitives[2], '');
            this.setText(this.primitives[3], '');
        }
        else if (this.endMonth != 0) {
            this.setText(this.primitives[1], '');
            this.setText(this.primitives[2], '');
            this.setText(this.primitives[3], '');
        }
    }
}

export class RightInfo extends LabelInfo {
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'Rightinfo';
        this.numberB = 0;
        this.weightB = '';
        this.dateB = '';
        this.monthB = 0;
        this.primitives.push(this.createRectangle(p0.x, p0.y + length * 0.1, length, length * 1.8, 'white', '#FE982A', length * 0.1, length * 0.1))
        this.primitives.push(this.createText(p0.x + length * 0.2, p0.y + length * 0.2, 'R Skip No.', length * 0.2))
        this.primitives.push(this.createText(p0.x + length * 0.2, p0.y + length * 0.5, '', length * 0.2))
        this.primitives.push(this.createText(p0.x + length * 0.2, p0.y + length * 0.8, '', length * 0.2))
    }
    setBaseProperty(mes: any) {
        this.numberB = mes.numberB
        this.weightB = mes.grossB + '-' + mes.tareB + '=' + (mes.grossB - mes.tareB)
        this.dateB = moment(mes.monthB + ' ' + mes.dateB + ' ' + mes.year + ' ' + mes.hoursB + ' ' + mes.minutesB + ' ' + mes.secondsB, "MM DD YY HH mm ss").format("MM-DD-YY HH:mm:ss");
    }

    nextFrame(): void {
        if (this.monthB != 0) {
            this.setText(this.primitives[1], 'R Skip No.' + this.numberB);
            this.setText(this.primitives[2], this.weightB);
            this.setText(this.primitives[3], this.dateB);
        }
        else if (this.monthB == 0) {
            this.setText(this.primitives[1], '');
            this.setText(this.primitives[2], '');
            this.setText(this.primitives[3], '');
        }
        else if (this.endMonth != 0) {
            this.setText(this.primitives[1], '');
            this.setText(this.primitives[2], '');
            this.setText(this.primitives[3], '');
        }
    }
}

export class ShiftInfo extends LabelInfo {
    constructor(p0: Point, length: number) {
        super(p0, length);
        this.name = 'Shiftinfo';
        this.beginMonth = 0;
        this.endMonth = 0;
        this.skipCount = 0;
        this.net = 0;
        this.beginDate = '';
        this.endDate = '';
        this.primitives.push(this.createRectangle(p0.x, p0.y + length * 0.1, length * 1.4, length * 1.8, 'white', '#FE982A', length * 0.1, length * 0.1))
        this.primitives.push(this.createText(p0.x + length * 0.2, p0.y + length * 0.2, '', length * 0.2))
        this.primitives.push(this.createText(p0.x + length * 0.2, p0.y + length * 0.5, '', length * 0.2))
        this.primitives.push(this.createText(p0.x + length * 0.2, p0.y + length * 0.8, '', length * 0.2))
        this.primitives.push(this.createText(p0.x + length * 0.2, p0.y + length * 1.1, '', length * 0.2))
    }
    setBaseProperty(mes: any) {
        this.beginMonth = mes.beginMonth;
        this.endMonth = mes.endMonth;
        this.beginDate = moment(mes.beginMonth + ' ' + mes.beginDate + ' ' + mes.year + ' ' + mes.beginHours + ' ' + mes.beginMinutes + ' ' + mes.beginSeconds, "MM DD YY HH mm ss").format("MM-DD-YY HH:mm:ss");
        this.endDate = moment(mes.endMonth + ' ' + mes.endDate + ' ' + mes.year + ' ' + mes.endHours + ' ' + mes.endMinutes + ' ' + mes.endSeconds, "MM DD YY HH mm ss").format("MM-DD-YY HH:mm:ss");
        this.skipCount = mes.skipCount;
        this.net = mes.net;
    }

    nextFrame(): void {
        this.setText(this.primitives[1], 'Shift begin:');
        this.setText(this.primitives[2], this.beginDate);
        this.setText(this.primitives[3], 'Total skips:' + this.skipCount);
        this.setText(this.primitives[4], 'Total weight:' + this.net);
        if (this.endMonth != 0) {
            this.setText(this.primitives[1], 'Shift end:');
            this.setText(this.primitives[2], this.endDate);
            this.setText(this.primitives[3], 'Total skips:' + this.skipCount);
            this.setText(this.primitives[4], 'Total weight:' + this.net);
        }
    }
}