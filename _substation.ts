import { Scheme, Disposition, animateScheme, Point, PropParams } from './mine_drawing';
import { Trunk, SubstationCell, Generator } from './substation'

export class SUBSTATION extends Scheme {
    public Generator1: Generator;
    public Trunk1: Trunk;
    // public SubstationCells: SubstationCell;
    constructor(container: string, width: number, height: number) {
        super(container, width, height);
        this.name = 'Substation';
        this.addBatcher();
    }
    addBatcher() {
        // this.Generator1 = new Generator(new Point(200, 233), 100)
        // this.addWidget(this.Generator1);
        this.Trunk1 = new Trunk(new Point(30, 800), 1000)
        this.addWidget(this.Trunk1);
        let SubstationCells = []
        for (let n: number = 0; n <= 23; n++) {
            SubstationCells[n] = new SubstationCell(new Point(30, 800), 1000, 'UndegroundStation', n)
                this.addWidget(SubstationCells[n]);
            }
    }
}
