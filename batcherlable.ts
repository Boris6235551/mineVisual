import Konva from 'konva';
import { BaseMineDraw, Point } from './mine_drawing';
const moment = require('moment');

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
    public mes12: any;
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
        if (this.monthA != 12) {
            this.setText(this.primitives[1], 'L Skip No. ' + this.numberA);
            this.setText(this.primitives[2], this.weightA);
            this.setText(this.primitives[3], this.dateA);
            this.primitives[0].visible(true)
        }
        else if (this.monthA == 12) {
            this.setText(this.primitives[1], '');
            this.setText(this.primitives[2], '');
            this.setText(this.primitives[3], '');
            this.primitives[0].visible(false)
        }
        else if (this.endMonth != 12) {
            this.setText(this.primitives[1], '');
            this.setText(this.primitives[2], '');
            this.setText(this.primitives[3], '');
            this.primitives[0].visible(false)
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
        if (this.monthB != 12) {
            this.setText(this.primitives[1], 'R Skip No. ' + this.numberB);
            this.setText(this.primitives[2], this.weightB);
            this.setText(this.primitives[3], this.dateB);
            this.primitives[0].visible(true)
        }
        else if (this.monthB == 12) {
            this.setText(this.primitives[1], '');
            this.setText(this.primitives[2], '');
            this.setText(this.primitives[3], '');
            this.primitives[0].visible(false)
        }
        else if (this.endMonth != 12) {
            this.setText(this.primitives[1], '');
            this.setText(this.primitives[2], '');
            this.setText(this.primitives[3], '');
            this.primitives[0].visible(false)
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
        this.primitives.push(this.createRectangle(p0.x, p0.y + length * 0.1, length * 1.4, length * 3.1, 'white', '#FE982A', length * 0.1, length * 0.1))
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

    numberWithSpaces(x: number) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

    nextFrame(): void {
        if (false) {
            this.setText(this.primitives[1], 'Shift start:  ' + this.beginDate);
            this.setText(this.primitives[2], 'Shift end:    ' + this.endDate);
            this.setText(this.primitives[3], 'Total skips:   ' + this.skipCount + ' pcs');
            this.setText(this.primitives[4], 'Total weight: ' + this.net + ' kg');
        }
        else if (true) {
            this.setText(this.primitives[1], 'Shift start:  ' + this.beginDate);
            this.setText(this.primitives[2], 'Shift end:    ');
            this.setText(this.primitives[3], 'Total skips:   ' + this.skipCount + ' pcs');
            this.setText(this.primitives[4], 'Total weight: ' + this.numberWithSpaces(this.net) + ' kg');
        }
    }
}