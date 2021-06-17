import { Scheme, Disposition, animateScheme, Point, PropParams } from './mine_drawing';
import { Pump, UndegraundPump, Pool, Valve, ValveCheck } from './pumpAccessories'


let vPoints = [ 
 /*  dxIndex    dyIndex dispositionIndex*/   
    [0,         0,      Disposition.Horizontal], 
    [92,        0,      Disposition.Horizontal], 
    [40,        180,    Disposition.Vertical],  //43 
    [135,       90,     Disposition.Vertical], 
    [85,        220,    Disposition.Horizontal], 
    [40,        90,     null], // 43
    [40,        380,    null] 
];

let vsPoints = [
    /***************     TECH PUMPS    ***************/
    [167,	    689,    Disposition.Vertical],  // Y2
    [166,	    311,    null],                  // XS1 back
    /*-------------     TECH LINE 2    --------------*/
    [140,	    567,    null],                  // XS2 back
    [100,	    515,    Disposition.Vertical],  // Y2.2.0 zalivka
    [140,	    525,    Disposition.Vertical],  // Y2.2.1
    [140,	    379,    Disposition.Vertical],  // Y2.2.2
    /*-------------     TECH LINE 2    --------------*/
    [194,	    567,    null],                  // XS3 back before
    [228,	    515,    Disposition.Vertical],  // Y2.1.0 zalivka
    [194,	    379,    Disposition.Vertical],  // Y2.1.1
    [194,	    525,    Disposition.Vertical],  // Y2.1.2
    /****     CLEAR PUMPS    ****/
    [334,	    689,    Disposition.Vertical],  // Y1
    [333,	    311,    null],                  // XS4 back
    [334,	    579,    null],                  // XS5 back
    /*-------------     CLEAR LINE 2    --------------*/
    [273,	    515,    Disposition.Vertical],  // Y1.2.0 zalivka	273	515		
    [307,	    525,    Disposition.Vertical],  // Y1.2.1	307	525	
    [307,	    379,    Disposition.Vertical],  // Y1.2.2	307	379

    /*-------------     CLEAR LINE 1    --------------*/
    [395,	    515,    Disposition.Vertical],  // Y1.2.1 zalivka	395	515
    [361,	    525,    Disposition.Vertical],  // Y1.1.1	361	525
    [361,	    379,    Disposition.Vertical]   // Y1.1.2	361	379
];

let psPoints = [
    [1,     581], // M0 pump zalivka
    [68,    742], // DP4 down pump
    [132,	423], // M4 pump
    [186,	423], // M3 pump
    
    [420,	742], // DP3 down pump	420	742
    [299,	423], // M2 pump	299	423		
    [353,	423], // M1 pump	353	423


]

const dxIndex = 0;   
const dyIndex = 1;
const dispIndex = 2;

const LINES_COUNT1: number   = 3;
const LINES_COUNT2: number   = 2;
const DELTA_X: number       = 184;

export class UNDEGROUNDPUMP extends Scheme {
    private items: (Valve | ValveCheck | Pump | Pool)[];
    constructor(container: string, width: number, height: number, basePoint: Point, number: number) {
        super(container, width, height);
        this.items = [];
        if(number == 1){
            this.name = 'drainageA';
            for(let i = 0; i < LINES_COUNT1; i++) 
                this.createWidgets(basePoint.newPointMoved(DELTA_X * i, 0), i + 1);
        }
        else{
            this.name = 'drainageB';
            let pool = new Pool( basePoint.newPointMoved(0, 450) , 900);   // new Point(400, 550)
            this.addWidget(pool);
            this.items.push(pool);
            for(let i = LINES_COUNT1; i < LINES_COUNT1 + LINES_COUNT2; i++) 
                this.createWidgets(basePoint.newPointMoved(DELTA_X * i, 0), i + 1);
        }
    }
    createWidgets(p: Point, number: number) {
        let pump = new Pump( p.newPointMoved(30,250), 100, 0);     // new Point(430, 350)
        pump.name = 'Pump' + number.toString();
        //console.log(`class UNDEGROUNDPUMP pump name=${pump.name}`);
        this.items.push(pump)
        this.addWidget(pump);
        for(let i = 0; i < vPoints.length; i++){
            let v: (Valve | ValveCheck);
            if(vPoints[i][dispIndex] == null) 
                v = new ValveCheck(p.newPointMoved(vPoints[i][dxIndex], vPoints[i][dyIndex]), 30) 
            else {
                v = new Valve(p.newPointMoved(vPoints[i][dxIndex], vPoints[i][dyIndex]), 
                                                            30, vPoints[i][dispIndex], 50);  
                this.items.push( v );
            }
            v.name = 'Y' + number.toString() + (i + 1).toString();
            this.addWidget( v );    
            //console.log(`class UNDEGROUNDPUMP valve name=${v.name}`)
        }        
    }
    send(mes: any){
//        console.log(`received message UNDEGROUNDPUMP name=${this.name}`);
        let mesProps = Object.getOwnPropertyNames(mes);
        for(const widget of this.items){
            let wMes = {};
            let delIndexes =[];
            for(let i = 0; i < mesProps.length; i++){
                if( mesProps[i].startsWith(widget.name) ) {
                    wMes[mesProps[i]] = mes[mesProps[i]];
                    delIndexes.push(i);
                }
            }
//            console.log(`sended to ${widget.name}\n message  =${JSON.stringify(wMes)}`);    
            for (let i = delIndexes.length - 1; i >= 0; i--) mesProps.splice(delIndexes[i],1);
//            console.log(`del properies of ${widget.name}; mesProps length=${mesProps.length}`);
            if(mesProps.length == 0) return;
        }
        
        //console.log(`message properies=${mesProps}`);
    }

}

export class SURFACEPUMP extends Scheme {
    private items: (Valve | ValveCheck | Pump | Pool)[];
    private basePoint: Point;
    constructor(container: string, width: number, height: number, basePoint: Point, number: number) {
        super(container, width, height);
        this.basePoint = basePoint;
        this.items = [];
        if(number == 1){

        }
        this.createWidgets(basePoint, number);
    }
    getP0(i, ar): Point {
        return this.basePoint.newPointMoved(ar[i][dxIndex], ar[i][dyIndex]);
    }
    createWidgets(p: Point, number: number){
        let pool = new Pool( p.newPointMoved(270,617), 150);   
        this.addWidget(pool);
        this.items.push(pool);

        for(let i = 0; i < psPoints.length; i++){
            let pump = new Pump( this.getP0(i, psPoints), 100, 0);   
            this.items.push(pump);
            this.addWidget(pump);    
        }
        for(let i = 0; i < vsPoints.length; i++){
            let v: (Valve | ValveCheck);
            if(vsPoints[i][dispIndex] == null) 
                v = new ValveCheck( this.getP0(i,vsPoints), 30) 
            else {
                v = new Valve(this.getP0(i,vsPoints), 30, vsPoints[i][dispIndex], 50);  
                this.items.push( v );
            }
            v.name = 'Y' + number.toString() + (i + 1).toString();
            this.addWidget( v );    
            //console.log(`class UNDEGROUNDPUMP valve name=${v.name}`)
        }        
    }
    
}



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