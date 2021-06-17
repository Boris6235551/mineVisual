import { Scheme, Disposition, animateScheme, Point, PropParams } from './mine_drawing';
import { Trunk, SubstationCell, Generator, Incomers } from './substation'

export class SUBSTATION extends Scheme {
    public Generator1: Generator;
    public Generator2: Generator;
    public Generator3: Generator;
    public Generator4: Generator;
    public Trunk1: Trunk;
    public Trunk2: Trunk;
    public SubstationCell1: SubstationCell;
    public SubstationCell2: SubstationCell;
    public Incomers1: Incomers;
    // public SubstationCells: SubstationCell;
    constructor(container: string, width: number, height: number) {
        super(container, width, height);
        this.name = 'Substation';
        this.addBatcher();
    }
    addBatcher() {

        this.Trunk1 = new Trunk(new Point(700, 860), 295)
        this.addWidget(this.Trunk1);

        this.Trunk2 = new Trunk(new Point(1200, 860), 335)
        this.addWidget(this.Trunk2);

        this.SubstationCell1 = new SubstationCell(new Point(700, 857), 1000, 0, 7)
        this.addWidget(this.SubstationCell1);

        this.SubstationCell2 = new SubstationCell(new Point(790, 857), 1000, 7, 15)
        this.addWidget(this.SubstationCell2);

        this.Incomers1 = new Incomers(new Point(1115, 863), 85)
        this.addWidget(this.Incomers1);

        this.Generator1 = new Generator(new Point(1550, 500), 80)
        this.addWidget(this.Generator1);

        this.Generator2 = new Generator(new Point(1800, 500), 80)
        this.addWidget(this.Generator2);

        this.Generator3 = new Generator(new Point(1550, 650), 80)
        this.addWidget(this.Generator3);

        this.Generator4 = new Generator(new Point(1800, 650), 80)
        this.addWidget(this.Generator4);
    }
}