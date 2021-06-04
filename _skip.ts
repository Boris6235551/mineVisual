import { Scheme, Disposition, animateScheme, Point, Pool, PropParams } from './mine_drawing';
import { Skip } from './skip'

export class SKIP extends Scheme {
    public Skip1: Skip;
    constructor(container: string, width: number, height: number) {
        super(container, width, height);
        this.name = 'Skip';
        this.Skip1 = new Skip(new Point(1554, 70), 600)
        this.addWidget(this.Skip1);
    }
}