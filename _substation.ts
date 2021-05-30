import { Scheme, Disposition, animateScheme, Point, Pool, PropParams } from './mine_drawing';
import { Trunk, SubstationCell, Generator } from './substation'

export class SUBSTATION extends Scheme {
    public Generator1: Generator;
    constructor(container: string, width: number, height: number) {
        super(container, width, height);
        this.name = 'Substation';
        this.addBatcher();
    }
    addBatcher() {
        this.Generator1 = new Generator(new Point(200, 233), 100)
        this.addWidget(this.Generator1);
    }
}
