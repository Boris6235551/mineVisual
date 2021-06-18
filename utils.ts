import Konva from 'konva';
import { BaseMineDraw, Point, Disposition, } from './mine_drawing';

export function CreateLabel(p: Point, position: Disposition, text: string, height: number = 20, width: number = 20): (Konva.Rect | Konva.Text)[] {
    if (position == 0) p.y = p.y - 10;
    else if (position == 1) p.x = p.x - 10;
    let r = new Konva.Rect({
        x: p.x,
        y: p.y,
        height: height,
        width: width,
        fill: '#FEFFBC',
        stroke: '',
        strokeWidth: 0,
        cornerRadius: 5,
    });
    let t = new Konva.Text({
        x: p.x + 5,
        y: p.y + 4,
        text: text,
        fontSize: 15,
        fontStyle: 'bold',
        fontFamily: 'Roboto',
        fill: '',
    });
    return [r, t]
}

export function createText(x: number, y: number, text: string, fontSize: number): Konva.Text {
    return new Konva.Text({
        x: x,
        y: y,
        text: text,
        fontSize: fontSize,
        fontStyle: 'bold',
        fontFamily: 'Roboto',
    });
}

export function createRectangle(x: number, y: number, height: number, width: number, fill: string, stroke?: string,
    strokeWidth?: number, cornerRadius?: number): Konva.Rect {
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
export function createCircle(x: number, y: number, radius: number, strokeWidth: number, fill: string, stroke: string): Konva.Circle {
    return new Konva.Circle({
        x: x,
        y: y,
        radius: radius,
        fill: fill,
        stroke: stroke,
        strokeWidth: strokeWidth,
    });
}