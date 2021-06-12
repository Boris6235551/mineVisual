import { Scheme, Disposition, animateScheme, Point, PropParams } from './mine_drawing';
import { Trunk, UndergroundSubstationCell, Generator } from './substation'

export class UNDERGROUNDSUBSTATION extends Scheme {
    public Generator1: Generator;
    public Trunk1: Trunk;
    public UndergroundSubstationCell1: UndergroundSubstationCell;
    // public SubstationCells: SubstationCell;
    constructor(container: string, width: number, height: number) {
        super(container, width, height);
        this.name = 'UndegroundStation';
        this.addBatcher();
    }
    addBatcher() {
        // this.Generator1 = new Generator(new Point(200, 233), 100)
        // this.addWidget(this.Generator1);

        this.Trunk1 = new Trunk(new Point(250, 800), 670)
        this.addWidget(this.Trunk1);
        
        this.UndergroundSubstationCell1 = new UndergroundSubstationCell(new Point(250, 800), 1000)
        this.addWidget(this.UndergroundSubstationCell1);

    }
}
