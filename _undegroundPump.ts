import { Scheme, Disposition, animateScheme, Point, PropParams } from './mine_drawing';
import { Pump, UndegraundPump, Pool, Valve, ValveCheck } from './pumpAccessories'

let mes = {
    Y11Status: 0,   // enum ValveStatus InitState = 0, Closed, Opening, Opened, Closing , Calibration
    Y12Status: 1,
    Y13Status: 3,
    Y14Status: 4,
    Y15Status: 5,
    Y21Status: 2,
    Y22Status: 4,
    Y23Status: 5,
    Y24Status: 0,
    Y25Status: 1,
    Y31Status: 2,
    Y32Status: 3,
    Y33Status: 4,
    Y34Status: 5,
    Y35Status: 4,
    
    Y11Mode: 0,     // enum ValveMode HandDrive = 0, Service, Auto
    Y12Mode: 1,
    Y13Mode: 2,
    Y14Mode: 2,
    Y15Mode: 1,
    Y21Mode: 0,
    Y22Mode: 1,
    Y23Mode: 2,
    Y24Mode: 0,
    Y25Mode: 1,
    Y31Mode: 2,
    Y32Mode: 2,
    Y33Mode: 1,
    Y34Mode: 0,
    Y35Mode: 1,
    
    Y11Error: 0,    // enum ValveError NoError = 0, CloseAndOpenVlaveInputs, OpeningTimeOut, ClosingTimeOut, AlarmValveInput 
    Y12Error: 1,
    Y13Error: 2,
    Y14Error: 3,
    Y15Error: 2,
    Y21Error: 1,
    Y22Error: 0,
    Y23Error: 1,
    Y24Error: 2,
    Y25Error: 3,
    Y31Error: 3,
    Y32Error: 2,
    Y33Error: 1,
    Y34Error: 0,
    Y35Error: 1,
    
    Pump1Status: 0, // enum PumpStatus Stopped = 0, Starting, Working, Stopping, Error
    Pump2Status: 1,
    Pump3Status: 4,
    
    Pump1Mode: 1,   // enum PumpMode Service = 1, Auto
    Pump2Mode: 2,
    Pump3Mode: 1,
    
    Pump1Error: 0,  // enum PumpError NoError = 0, StartingTimeOut, StoppingTimeOut, AccidentPressure
    Pump2Error: 1,
    Pump3Error: 3,
    
    posY11: 0,      // 0 - 100
    posY12: 100,
    posY13: 35,
    posY14: 0,
    posY15: 0,
    posY21: 0,
    posY22: 0,
    posY23: 0,
    posY24: 0,
    posY25: 0,
    posY31: 0,
    posY32: 0,
    posY33: 0,
    posY34: 0,
    posY35: 0,
    reserve: null
} 

let vPoints = [ 
 /*  dxIndex    dyIndex dispositionIndex*/   
    [0,         0,      Disposition.Horizontal], 
    [92,        0,      Disposition.Horizontal], 
    [43,        180,    Disposition.Vertical], 
    [135,       90,     Disposition.Vertical], 
    [85,        220,    Disposition.Horizontal], 
    [43,        90,     null], 
    [40,        380,    null] 
];
const dxIndex = 0;   
const dyIndex = 1;
const dispIndex = 2;

const LINES_COUNT: number   = 5;
const DELTA_X: number       = 184;

export class UNDEGROUNDPUMP extends Scheme {
    private number: number;     // pump number by order
    public Pump: Pump;
    private items: (Valve | ValveCheck | Pump)[];
    
    // public Valve1: Valve;
    // public Valve2: Valve;
    // public Valve11: Valve;
    // public Valve12: Valve;
    // public Valve21: Valve;
    // public ValveCheck1: ValveCheck;
    // public ValveCheck6: ValveCheck;

    // public Valve13: Valve;
    // public Valve14: Valve;
    // public Valve15: Valve;
    // public Pump2: Pump;
    // public Pump3: Pump;
    // public Pump4: Pump;
    // public Pump5: Pump;
    // public Pool1: Pool;
    // public Valve3: Valve;
    // public Valve4: Valve;
    // public Valve5: Valve;
    // public Valve6: Valve;
    // public Valve7: Valve;
    // public Valve8: Valve;
    // public Valve9: Valve;
    // public Valve10: Valve;
    // public Valve16: Valve;
    // public Valve17: Valve;
    // public Valve18: Valve;
    // public Valve19: Valve;
    // public Valve20: Valve;
    
    // public Valve22: Valve;
    // public Valve23: Valve;
    // public Valve24: Valve;
    // public Valve25: Valve;
    
    // public ValveCheck2: ValveCheck;
    // public ValveCheck3: ValveCheck;
    // public ValveCheck4: ValveCheck;
    // public ValveCheck5: ValveCheck;
    // public ValveCheck7: ValveCheck;
    // public ValveCheck8: ValveCheck;
    // public ValveCheck9: ValveCheck;
    // public ValveCheck10: ValveCheck;
    // public UndegraundPump1: UndegraundPump;
    constructor(container: string, width: number, height: number, basePoint: Point, number: number) {
        super(container, width, height);
        this.number = number;
        this.name = (number > 0 && number < 4) ? ('drainageA') : ('drainageB');
        this.items = [];
        for(let i = 0; i < LINES_COUNT; i++)
            this.createWidgets(basePoint.newPointMoved(DELTA_X * i, 0), i + 1);
    }
    createWidgets(p: Point, number: number) {
        let pump = new Pump( p.newPointMoved(30,250), 100, 0);     // new Point(430, 350)
        pump.name = 'Pump' + number.toString();
        console.log(`class UNDEGROUNDPUMP pump name=${pump.name}`);
        this.items.push(pump)
        this.addWidget(pump);
        for(let i = 0; i < vPoints.length; i++){
            let v: (Valve | ValveCheck);
            if(vPoints[i][dispIndex] == null) 
                v = new ValveCheck(p.newPointMoved(vPoints[i][dxIndex], vPoints[i][dyIndex]), 30) 
            else v = new Valve(p.newPointMoved(vPoints[i][dxIndex], vPoints[i][dyIndex]), 
                                                            30, vPoints[i][dispIndex], 50);  
            v.name = 'Y' + number.toString() + (i + 1).toString();
            this.addWidget( v );    
            console.log(`class UNDEGROUNDPUMP valve name=${v.name}`)
            this.items.push( v );
        }        

        this.Pool1 = new Pool(new Point(400, 550), 900)
        this.addWidget(this.Pool1);

        // this.Valve1 = new Valve( p, 30, 1, 50)            // basePoint new Point(400, 100) => [0, 0]
        // this.addWidget(this.Valve1);
        // this.Valve1.name = 'Y11'

        // this.Valve2 = new Valve(p.newPointMoved(92, 0), 30, 1, 50); // new Point(492, 100) => [92, 0]
        // this.addWidget(this.Valve2);
        // this.Valve2.name = 'Y12'

        // this.Valve11 = new Valve(new Point(443, 280), 30, 0, 50);   // new Point(443, 280) => [43, 180]
        // this.addWidget(this.Valve11);
        // this.Valve11.name = 'Y13'

        // this.Valve12 = new Valve(new Point(535, 190), 30, 0, 50);   // new Point(535, 190) => [135, 90]
        // this.addWidget(this.Valve12);
        // this.Valve12.name = 'Y14'

        // this.Valve21 = new Valve(new Point(485, 320), 30, 1, 50)    // new Point(485, 320) => [85, 220]
        // this.addWidget(this.Valve21);
        // this.Valve21.name = 'Y15'

        // this.ValveCheck1 = new ValveCheck(new Point(443, 190), 30)  // new Point(443, 190) => [43, 90]
        // this.addWidget(this.ValveCheck1);

        // this.ValveCheck6 = new ValveCheck(new Point(440, 480), 30)  // new Point(440, 480) => [40, 380]
        // this.addWidget(this.ValveCheck6);



// return;

//         this.Pump2 = new Pump(new Point(612.5, 350), 100, 0)
//         this.addWidget(this.Pump2);
//         this.Pump2.name = 'Pump2'

//         this.Pump3 = new Pump(new Point(795, 350), 100, 0)
//         this.addWidget(this.Pump3);
//         this.Pump3.name = 'Pump3'

//         this.Pump4 = new Pump(new Point(977.5, 350), 100, 0)
//         this.addWidget(this.Pump4);
//         this.Pump4.name = 'Pump4'

//         this.Pump5 = new Pump(new Point(1160, 350), 100, 0)
//         this.addWidget(this.Pump5);
//         this.Pump5.name = 'Pump5'


//         this.Valve3 = new Valve(new Point(584, 100), 30, 1, 50)
//         this.addWidget(this.Valve3);
//         this.Valve3.name = 'Y21'

//         this.Valve4 = new Valve(new Point(676, 100), 30, 1, 50)
//         this.addWidget(this.Valve4);
//         this.Valve4.name = 'Y22'

//         this.Valve5 = new Valve(new Point(768, 100), 30, 1, 50)
//         this.addWidget(this.Valve5);
//         this.Valve5.name = 'Y31'

//         this.Valve6 = new Valve(new Point(860, 100), 30, 1, 50)
//         this.addWidget(this.Valve6);
//         this.Valve6.name = 'Y32'

//         this.Valve7 = new Valve(new Point(952, 100), 30, 1, 50)
//         this.addWidget(this.Valve7);
//         this.Valve7.name = 'Y41'

//         this.Valve8 = new Valve(new Point(1044, 100), 30, 1, 50)
//         this.addWidget(this.Valve8);
//         this.Valve8.name = 'Y42'

//         this.Valve9 = new Valve(new Point(1136, 100), 30, 1, 50)
//         this.addWidget(this.Valve9);
//         this.Valve9.name = 'Y51'

//         this.Valve10 = new Valve(new Point(1230, 100), 30, 1, 50)
//         this.addWidget(this.Valve10);
//         this.Valve10.name = 'Y52'


//         this.Valve13 = new Valve(new Point(627, 280), 30, 0, 50)
//         this.addWidget(this.Valve13);
//         this.Valve13.name = 'Y23'

//         this.Valve14 = new Valve(new Point(719, 190), 30, 0, 50)
//         this.addWidget(this.Valve14);
//         this.Valve14.name = 'Y24'

//         this.Valve15 = new Valve(new Point(811, 280), 30, 0, 50)
//         this.addWidget(this.Valve15);
//         this.Valve15.name = 'Y33'

//         this.Valve16 = new Valve(new Point(900, 190), 30, 0, 50)
//         this.addWidget(this.Valve16);
//         this.Valve16.name = 'Y34'

//         this.Valve17 = new Valve(new Point(991, 280), 30, 0, 50)
//         this.addWidget(this.Valve17);
//         this.Valve17.name = 'Y43'

//         this.Valve18 = new Valve(new Point(1084, 190), 30, 0, 50)
//         this.addWidget(this.Valve18);
//         this.Valve18.name = 'Y44'

//         this.Valve19 = new Valve(new Point(1173, 280), 30, 0, 50)
//         this.addWidget(this.Valve19);
//         this.Valve19.name = 'Y53'

//         this.Valve20 = new Valve(new Point(1268, 190), 30, 0, 50)
//         this.addWidget(this.Valve20);
//         this.Valve20.name = 'Y54'

//         this.Valve22 = new Valve(new Point(667, 320), 30, 1, 50)
//         this.addWidget(this.Valve22);
//         this.Valve22.name = 'Y25'

//         this.Valve23 = new Valve(new Point(850, 320), 30, 1, 50)
//         this.addWidget(this.Valve23);
//         this.Valve23.name = 'Y35'

//         this.Valve24 = new Valve(new Point(1032, 320), 30, 1, 50)
//         this.addWidget(this.Valve24);
//         this.Valve24.name = 'Y45'

//         this.Valve25 = new Valve(new Point(1215, 320), 30, 1, 50)
//         this.addWidget(this.Valve25);
//         this.Valve25.name = 'Y55'

//         this.ValveCheck2 = new ValveCheck(new Point(627, 190), 30)
//         this.addWidget(this.ValveCheck2);

//         this.ValveCheck3 = new ValveCheck(new Point(811, 190), 30)
//         this.addWidget(this.ValveCheck3);

//         this.ValveCheck4 = new ValveCheck(new Point(991, 190), 30)
//         this.addWidget(this.ValveCheck4);

//         this.ValveCheck5 = new ValveCheck(new Point(1173, 190), 30)
//         this.addWidget(this.ValveCheck5);


//         this.ValveCheck7 = new ValveCheck(new Point(623, 480), 30)
//         this.addWidget(this.ValveCheck7);

//         this.ValveCheck8 = new ValveCheck(new Point(806, 480), 30)
//         this.addWidget(this.ValveCheck8);

//         this.ValveCheck9 = new ValveCheck(new Point(987, 480), 30)
//         this.addWidget(this.ValveCheck9);

//         this.ValveCheck10 = new ValveCheck(new Point(1169, 480), 30)
//         this.addWidget(this.ValveCheck10);

        // this.UndegraundPump1 = new UndegraundPump(new Point(800, 300), 100, 0)
        // this.addWidget(this.UndegraundPump1);
    }

}