import { Scheme, Disposition, animateScheme, Point, Pool, PropParams } from './mine_drawing';
import { Skip } from './skip'

export class SKIP extends Scheme {
    constructor(container: string, width: number, height: number) {
        super(container, width, height);
        this.name = 'Skip';
        let Skip1 = new Skip(new Point(200, 50), 700)
        this.addWidget(Skip1);
    }
}