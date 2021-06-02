import { Scheme, Disposition, animateScheme, Point, Pool, PropParams } from './mine_drawing';
import { Cage } from './cage'

export class CAGE extends Scheme {
    public Cage1: Cage;
    constructor(container: string, width: number, height: number) {
        super(container, width, height);
        this.name = 'Cage';
        this.Cage1 = new Cage(new Point(200, 70), 500)
        this.addWidget(this.Cage1);
    }
}