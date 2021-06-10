import {Scheme, Disposition, animateScheme, Point} from './mine_drawing';

// import {Valve, ValveState} from './valve';

import {Connection, Corner, CornerOrientation} from './tube';

import {Pump, PumpState, Undegraund} from './Pump';



export class TechWater extends Scheme{

    constructor(container: string, width: number, height: number){
        super(container, width, height);
        this.name = "TechWater";
        this.addValve();
    }
    addValve(){
        // let pumpM1_1 = new Pump(10, 10, Disposition.Horizontal);
        // let valveY1 = new Valve(new Point(100, 30), 90, Disposition.Vertical, 90);
        //valveY1.setPercentage(100);
        // valveY1.setState(ValveState.opening);
        // this.addWidget(valveY1);

        // let valveY2 = new Valve(new Point(100, 801), 90, Disposition.Vertical, 80);
        // valveY2.setState(ValveState.opened);
        // this.addWidget(valveY2);

        let corn = new Corner(new Point(200, 200), 1, Disposition.Vertical, CornerOrientation.LeftUp, true );
        this.addWidget(corn);

        let Pump1 = new Pump(new Point(200, 50), 250, Disposition.Horizontal);
        this.addWidget(Pump1);
        Pump1.setState(PumpState.run)

        let Pump2 = new Pump(new Point(500, 100), 250, Disposition.Vertical);
        this.addWidget(Pump2);
        Pump2.setState(PumpState.revers)

        let Pump3 = new Undegraund(new Point(200, 400), 100, Disposition.Vertical);
        this.addWidget(Pump3);
        Pump3.setState(PumpState.revers)
        // let pool1 = new Pool(new Point(400, 50), 250, 100);

        // valveY2.setState(ValveState.opened)
        // surfaceScheme.addWidget(pumpM1_1);

        //  valveY2.setState(ValveState.opened);
        //  surfaceScheme.addWidget(valveY2);

        //  valveY3.setState(ValveState.opened);

        // surfaceScheme.addWidget(pool1);
        let line1 = new Connection(new Point(0,0), 100, Disposition.Vertical);
        // line1.connectVertical(valveY1, valveY2);
        this.addWidget(line1);

    }
}