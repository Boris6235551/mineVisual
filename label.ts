import Konva from 'konva';
import { BaseMineDraw, Disposition, Point } from './mine_drawing';

export class Label extends BaseMineDraw {
    protected x: number;
    protected y: number;
    protected height: number;
    protected length: number;
    constructor(connected: BaseMineDraw, position: boolean, label: string) {
        let disposition = connected.disposition;
        let p0 = connected.rect.p0;
        length = (disposition == Disposition.Vertical) ? connected.rect.p1.y - p0.y : connected.rect.p1.x - p0.x;
        let objWidth = (disposition == Disposition.Vertical) ? connected.rect.p1.x - p0.x : connected.rect.p1.y - p0.y;
        super(p0, length, disposition);
        this.type = 'Label';
        this.x = (disposition == Disposition.Vertical) ? p0.x + objWidth : p0.x + length * 0.25;
        this.y = (disposition == Disposition.Vertical) ? p0.y + length * 0.25 : p0.y + objWidth;
        this.height = length * 0.12;
        let width: number = this.calcSize(this.height);
        let strokeWidth: number = length * 0.003;
        if (position == false && disposition == Disposition.Vertical) this.x = this.x - objWidth - width;
        else if (position == false && disposition == Disposition.Horizontal) this.y = this.y - objWidth - this.height;
        this.primitives.push(this.createRectangle(this.x, this.y, this.height, width, strokeWidth));
        this.primitives.push(this.createText(this.x, this.y, width, this.height, label));
    }

    protected calcSize(length: number, factor: number = 0.8): number {
        return this.getOdd(length / factor);
    }

    createRectangle(x: number, y: number, height: number, width: number,
        strokeWidth: number): Konva.Rect {
        return new Konva.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: '#FEFFBC',
            stroke: 'red',
            strokeWidth: strokeWidth,
            cornerRadius: length * 0.03,
        });
    }

    protected createText(x: number, y: number, width: number, height: number, text: string): Konva.Text {
        return new Konva.Text({
            x: x,
            y: y,
            text: text,
            fontSize: width * 0.6,
            fontStyle: 'bold',
            fontFamily: 'Roboto',
            align: 'center',
            verticalAlign: 'middle',
            width: width,
            height: height,
        });
    }
}

export class LabelDegree extends Label {
    constructor(connected: BaseMineDraw, position: boolean, label: string) {
        super(connected, position, label);
        let heightDegree: number = length * 0.15;
        let widthDegree: number = this.calcSize(length * 0.15);
        if (this.disposition == Disposition.Horizontal) {
            this.x = this.x + length * 0.2;
            this.y = (position == false) ? this.y - (heightDegree - this.height) : this.y;
        }
        else {
            this.x = (position == false)? this.x - (heightDegree - this.height): this.x;
            this.y = this.y + length * 0.15;
        }
        let strokeWidth = length * 0.01;
        this.primitives.push(this.createRectangle(this.x, this.y, heightDegree, widthDegree, strokeWidth));
        this.primitives.push(this.createText(this.x, this.y, widthDegree, heightDegree, label));
        // удаление первого и втрого элемента массива primitives
        this.primitives.splice(0, 2)
    }
}