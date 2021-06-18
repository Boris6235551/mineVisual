import { Scheme, Disposition, Point, PropParams } from './mine_drawing';
import { Pump, MinePool, UndegraundPump, Pool, Valve, ValveCheck, UndergroundWater, IndustrialWater, PureWater, WaterTower } from './pumpAccessories'


const dxIndex = 0;   
const dyIndex = 1;
const dispIndex = 2;

class BASEPUMP extends Scheme {
    protected items: (Valve | Pump | Pool)[];   // | ValveCheck  - no need to send message
    protected basePoint: Point;
    constructor(container: string, width: number, height: number, basePoint: Point) {
        super(container, width, height);
        this.basePoint = basePoint;
        this.items = [];
    }
    send(mes: any) {
        console.log(`received message UNDEGROUNDPUMP name=${this.name}`);
        let mesProps = Object.getOwnPropertyNames(mes);
        for (const widget of this.items) {
            let wMes = {};
            let sendToWidget = false;
            let delIndexes = [];
            for (let i = 0; i < mesProps.length; i++) {
                if (mesProps[i].startsWith(widget.name)) {
                    let beginCount = widget.name.length;
                    let newPropName = mesProps[i].substring(beginCount);
                    wMes[newPropName] = mes[mesProps[i]];
                    sendToWidget = true;
                    //wMes[mesProps[i]] = mes[mesProps[i]];
                    delIndexes.push(i);
                }
            }
            console.log(`sended to ${widget.name}\n message  =${JSON.stringify(wMes)}`);
            if(sendToWidget) widget.setBaseProperty(wMes);
            for (let i = delIndexes.length - 1; i >= 0; i--) mesProps.splice(delIndexes[i], 1);
            console.log(`del properies of ${widget.name}; mesProps length=${mesProps.length}`);
            if (mesProps.length == 0) return;
        }
        console.log(`message properies=${mesProps}`);
        this.update();
    }
}

/**********************************************************************************
 ****************                 UNDEGRAUND PUMPS                 ****************
 **********************************************************************************/

let vPoints = [ 
 /*  dxIndex    dyIndex   dispIndex  dispositionIndex*/   
    [0,         0,      Disposition.Horizontal], 
    [92,        0,      Disposition.Horizontal], 
    [40,        180,    Disposition.Vertical],  //43 
    [135,       90,     Disposition.Vertical], 
    [85,        220,    Disposition.Horizontal], 
    [40,        90,     null], // 43
    [40,        380,    null] 
];

const LINES_COUNT1: number   = 3;
const LINES_COUNT2: number   = 2;
const DELTA_X: number       = 184;

export class UNDEGROUNDPUMP extends BASEPUMP {
    constructor(container: string, width: number, height: number, basePoint: Point, number: number) {
        super(container, width, height, basePoint);
        if(number == 1){
            this.name = 'drainageA';
            for(let i = 0; i < LINES_COUNT1; i++) 
                this.createWidgets(basePoint.newPointMoved(DELTA_X * i, 0), i + 1);
        }
        else{
            this.name = 'drainageB';
            let pool = new MinePool( basePoint.newPointMoved(0, 450) , 950);   // new Point(400, 550)
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
}

/**********************************************************************************
 ****************           TECH AND CLEAR SURFACE PUMPS           ****************
 **********************************************************************************/

let surfaceValvesData = [
    /***************     TECH PUMPS    ***************/
    {dXY: [167, 689], disp: Disposition.Vertical,  name: 'Y2'  },   // Y2 input valve
    {dXY: [166,	311], disp: null,                  name: 'XS1' },   // XS1 back
    /*-------------     TECH LINE 2    --------------*/
    {dXY: [140,	567], disp: null,                  name: 'XS2' },   // XS2 back
    {dXY: [100,	515], disp: Disposition.Vertical,  name: 'Y220'},   // Y2.2.0 zalivka
    {dXY: [140,	525], disp: Disposition.Vertical,  name: 'Y221'},   // Y2.2.1
    {dXY: [140,	379], disp: Disposition.Vertical,  name: 'Y222'},   // Y2.2.2
    /*-------------     TECH LINE 1    --------------*/
    {dXY: [194,	567], disp: null,                  name: 'XS3' },   // XS3 back before
    {dXY: [228,	515], disp: Disposition.Vertical,  name: 'Y210'},   // Y2.1.0 zalivka
    
    {dXY: [194,	379], disp: Disposition.Vertical,  name: 'Y211'},   // Y2.1.1
    {dXY: [194,	525], disp: Disposition.Vertical,  name: 'Y212'},   // Y2.1.2
    /****     CLEAR PUMPS    ****/
    {dXY: [334,	689], disp: Disposition.Vertical,  name: 'Y1'  },   // Y1 input valve
    {dXY: [333, 311], disp: null,                  name: 'XS4' },   // XS4 back
    {dXY: [334,	579], disp: null,                  name: 'XS5' },   // XS5 back
    /*-------------     CLEAR LINE 2    --------------*/
    {dXY: [273, 515], disp: Disposition.Vertical,  name: 'Y120'  },   // Y1.2.0 zalivka	273	515
    {dXY: [307,	525], disp: Disposition.Vertical,  name: 'Y121'  },   // Y1.2.1	307	525	
    {dXY: [307,	379], disp: Disposition.Vertical,  name: 'Y122'  },   // Y1.2.2	307	379
    /*-------------     CLEAR LINE 1    --------------*/
    {dXY: [395, 515], disp: Disposition.Vertical,  name: 'Y110'  },   // Y1.1.0 zalivka	395	515
    {dXY: [361,	525], disp: Disposition.Vertical,  name: 'Y111'  },   // Y1.1.1	361	525
    {dXY: [361,	379], disp: Disposition.Vertical,  name: 'Y112'  },   // Y1.1.2	361	379
]; 

let surfacePumpsData = [
    { dXY: [1,   581], name: 'M0' },  // M0 pump zalivka
    { dXY: [68,  742], name: 'DP4'}, // DP4 down pump
    { dXY: [132, 423], name: 'M4' }, // M4 pump
    { dXY: [186, 423], name: 'M3' }, // M3 pump

    { dXY: [420, 742], name: 'DP3'}, // DP3 down pump	420	742
    { dXY: [299, 423], name: 'M2' }, // M2 pump	299	423		
    { dXY: [353, 423], name: 'M1' }, // M1 pump	353	423
];

export class SURFACEPUMP extends BASEPUMP {
    constructor(container: string, width: number, height: number, basePoint: Point) {
        super(container, width, height, basePoint);
        this.name = 'clearPump';
        this.secondName = 'techPump';
        this.createWidgets(basePoint);
    }
    protected getPoint(dXY: number[]){
        return this.basePoint.newPointMoved(dXY[dxIndex], dXY[dyIndex]);
    }
    private addItem(item: (Valve | Pump | Pool), name: string){
        item.name = name;
        this.items.push(item);
        this.addWidget(item);
    }
    createWidgets(p: Point){
        this.addItem(new Pool( p.newPointMoved(103,617), 150, IndustrialWater), 'Tech');
        this.addItem(new Pool( p.newPointMoved(270,617), 150, PureWater), 'Clear');
        this.addItem(new WaterTower( p.newPointMoved(530,100), 200), 'Tower');
        for(let i = 0; i < surfacePumpsData.length; i++)
            this.addItem( new Pump(this.getPoint(surfacePumpsData[i].dXY), 100, 0), surfacePumpsData[i].name);
        for(let i = 0; i < surfaceValvesData.length; i++){
            let obj = surfaceValvesData[i];
            let v: (Valve | ValveCheck);
            if(obj.disp == null) v = new ValveCheck(this.getPoint(obj.dXY), 30) 
            else {
                v = new Valve(this.getPoint(obj.dXY), 30, obj.disp, 50);  
                v.name = obj.name;
                this.items.push( v );
            }
            this.addWidget( v );    
            //console.log(`class UNDEGROUNDPUMP valve name=${v.name}`)
        }
    }
}
