import { Scheme, Disposition, animateScheme, Point, PropParams } from './mine_drawing';
import { Trunk, SubstationCell, Generator } from './substation'

export class SUBSTATION extends Scheme {
    public Generator1: Generator;
    public Trunk1: Trunk;
    public Trunk2: Trunk;
    public SubstationCell1: SubstationCell;
    public SubstationCell2: SubstationCell;
    // public SubstationCells: SubstationCell;
    constructor(container: string, width: number, height: number) {
        super(container, width, height);
        this.name = 'Substation';
        this.addBatcher();
    }
    addBatcher() {
        // this.Generator1 = new Generator(new Point(200, 233), 100)
        // this.addWidget(this.Generator1);

        this.Trunk1 = new Trunk(new Point(700, 860), 295)
        this.addWidget(this.Trunk1);

        this.Trunk2 = new Trunk(new Point(1200, 860), 335)
        this.addWidget(this.Trunk2);
        
        this.SubstationCell1 = new SubstationCell(new Point(700, 857), 1000, 0, 7)
        this.addWidget(this.SubstationCell1);

        this.SubstationCell2 = new SubstationCell(new Point(790, 857), 1000, 7, 15)
        this.addWidget(this.SubstationCell2);

    }
}