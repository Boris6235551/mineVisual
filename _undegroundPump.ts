import { Scheme, Disposition, Point, PropParams, BaseMineDraw } from './mine_drawing';
import { Pump, MinePool, UndegraundPump, Pool, Valve, ValveCheck, UndergroundWater, IndustrialWater, PureWater, WaterTower } from './pumpAccessories'
import {Connection} from './tube';

const dxIndex = 0;   
const dyIndex = 1;
const dispIndex = 2;

class BASEPUMP extends Scheme {
    protected items: (Valve | Pump | Pool | ValveCheck)[];   // | ValveCheck  - no need to send message
    protected basePoint: Point;
    constructor(container: string, width: number, height: number, basePoint: Point) {
        super(container, width, height);
        this.basePoint = basePoint;
        this.items = [];
    }
    protected addItem(item: (Valve | Pump | Pool | ValveCheck), name: string, recieveMessage: boolean = true){
        item.name = name;
        if(recieveMessage) this.items.push(item);
        this.addWidget(item);
    }
    findByName(name: string): BaseMineDraw {
        for (let w of this.widgets) {
            if(w.name == name) return w;
        }
        return null;
    }
    createConnections(datas){
        for ( let obj of datas) this.connect(obj.begin, obj.end);
    }
    connect(upName: string, downName: string){  // connect vertcal objects
        let upWidget = this.findByName(upName);
        let downWidget = this.findByName(downName);
        if(upWidget == null || downWidget == null) return;
        let line =  new Connection(new Point(0,0), 5, Disposition.Vertical);
        line.connectVertical(upWidget, downWidget);
        this.addWidget(line);
//  if(upWidget.name == 'Y16' && downWidget.name == 'Y13') 
//     console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Y16 rect=${upWidget.printRect()}; 
//                 Y13 rect=${downWidget.printRect()}; line rect =${line.printRect()}`);

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
            // console.log(`del properies of ${widget.name}; mesProps length=${mesProps.length}`);
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
    [0,         0,      Disposition.Horizontal],    // Yx1
    [92,        0,      Disposition.Horizontal],    // Yx2
    [40,        180,    Disposition.Vertical],      // Yx3 
    [135,       90,     Disposition.Vertical],      // Yx4
    [85,        220,    Disposition.Horizontal],    // Yx5
    [40,        90,     null],                      // Yx6  back closed valve
    [40,        380,    null]                       // Yx7  back closed valve
];

let mineConnections = [
    /*-------------       LINE 1       --------------*/
    {begin: 'Y16', end: 'Y13', dir: true, disp: Disposition.Vertical},
    {begin: 'Y13', end: 'Pump1', dir: true, disp: Disposition.Vertical},
    {begin: 'Pump1', end: 'Y17', dir: true, disp: Disposition.Vertical},

    {begin: 'Y11', end: 'Y12', dir: true, disp: Disposition.Horizontal},
    /*-----------------------------------------------*/

    {begin: 'Y26', end: 'Y23', dir: true, disp: Disposition.Vertical},
    {begin: 'Y23', end: 'Pump2', dir: true, disp: Disposition.Vertical},
    {begin: 'Pump2', end: 'Y27', dir: true, disp: Disposition.Vertical},

    {begin: 'Y36', end: 'Y33', dir: true, disp: Disposition.Vertical},
    {begin: 'Y33', end: 'Pump3', dir: true, disp: Disposition.Vertical},
    {begin: 'Pump3', end: 'Y37', dir: true, disp: Disposition.Vertical},



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
            this.createConnections(mineConnections);
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
        this.addItem(new Pump( p.newPointMoved(30,250), 100, 0), 'Pump' + number.toString());
        for(let i = 0; i < vPoints.length; i++){
            let name = 'Y' + number.toString() + (i + 1).toString();
            let v: (Valve | ValveCheck);
            let received: boolean;
            if(vPoints[i][dispIndex] == null) 
               [v, received] = [new ValveCheck(p.newPointMoved(vPoints[i][dxIndex], vPoints[i][dyIndex]), 30), false]; 
            else [v, received] = [new Valve(p.newPointMoved(vPoints[i][dxIndex], vPoints[i][dyIndex]), 
                                                            30, vPoints[i][dispIndex]), true];  
            this.addItem( v, name, received);    
        }        
    }
}

/**********************************************************************************
 ****************           TECH AND CLEAR SURFACE PUMPS           ****************
 **********************************************************************************/
let surfaceValvesData = [
    /***************     TECH PUMPS    ***************/
    {dXY: [182,	261], disp: null,                  name: 'XS1' },   // XS1 back
    /*-------------     TECH LINE 2    --------------*/
    {dXY: [140,	329], disp: Disposition.Vertical,  name: 'Y222'},   // Y2.2.2
    {dXY: [100,	515], disp: Disposition.Vertical,  name: 'Y220'},   // Y2.2.0 zalivka
    {dXY: [140,	505], disp: Disposition.Vertical,  name: 'Y221'},   // Y2.2.1
    {dXY: [140,	592], disp: null,                  name: 'XS2' },   // XS2 back
    /*-------------     TECH LINE 1    --------------*/
    {dXY: [224,	329], disp: Disposition.Vertical,  name: 'Y212'},   // Y2.1.2
    {dXY: [278,	515], disp: Disposition.Vertical,  name: 'Y210'},   // Y2.1.0 zalivka    
    {dXY: [224,	505], disp: Disposition.Vertical,  name: 'Y211'},   // Y2.1.1
    {dXY: [224,	592], disp: null,                  name: 'XS3' },   // XS3 back before
    /*-----------------------------------------------*/
    {dXY: [182,	734], disp: Disposition.Vertical,  name: 'Y2_'  },   // Y2 input valve

    /****     CLEAR PUMPS    ****/
    {dXY: [418,	261], disp: null,                  name: 'XS4' },   // XS4 back
    /*-------------     CLEAR LINE 2    --------------*/
    {dXY: [377,	329], disp: Disposition.Vertical,  name: 'Y122'  },   // Y1.2.2	307	379
    {dXY: [338,	515], disp: Disposition.Vertical,  name: 'Y120'  },   // Y1.2.0 zalivka	273	515
    {dXY: [377,	505], disp: Disposition.Vertical,  name: 'Y121'  },   // Y1.2.1	307	525	
    /*-------------     CLEAR LINE 1    --------------*/
    {dXY: [461,	329], disp: Disposition.Vertical,  name: 'Y112'  },   // Y1.1.2	361	379
    {dXY: [515,	515], disp: Disposition.Vertical,  name: 'Y110'  },   // Y1.1.0 zalivka	395	515
    {dXY: [461,	505], disp: Disposition.Vertical,  name: 'Y111'  },   // Y1.1.1	361	525
    /*-----------------------------------------------*/
    {dXY: [419,	604], disp: null,                  name: 'XS5' },   // XS5 back
    {dXY: [419,	734], disp: Disposition.Vertical,  name: 'Y1_'  },   // Y1 input valve
]; 

let surfacePumpsData = [
    { dXY: [  1, 606], name: 'M0' },  // M0 pump zalivka
    { dXY: [ 68, 767+25], name: 'DP4'}, // DP4 down pump
    { dXY: [130, 383], name: 'M4' }, // M4 pump
    { dXY: [214, 383], name: 'M3' }, // M3 pump

    { dXY: [530, 767+25], name: 'DP3'}, // DP3 down pump	420	742
    { dXY: [367, 383], name: 'M2' }, // M2 pump	299	423		
    { dXY: [451, 383], name: 'M1' }, // M1 pump	353	423
];

let surfaceConnections = [
    {begin: 'Y222', end: 'M4', dir: true, disp: Disposition.Vertical},
    {begin: 'M4', end: 'Y221', dir: true, disp: Disposition.Vertical},
    {begin: 'Y221', end: 'XS2', dir: true, disp: Disposition.Vertical},

    {begin: 'Y212', end: 'M3', dir: true, disp: Disposition.Vertical},
    {begin: 'M3', end: 'Y211', dir: true, disp: Disposition.Vertical},
    {begin: 'Y211', end: 'XS3', dir: true, disp: Disposition.Vertical},

    {begin: 'Y122', end: 'M2', dir: true, disp: Disposition.Vertical},
    {begin: 'M2', end: 'Y121', dir: true, disp: Disposition.Vertical},
    // {begin: 'Y121', end: 'XS2', dir: true, disp: Disposition.Vertical},

    {begin: 'Y112', end: 'M1', dir: true, disp: Disposition.Vertical},
    {begin: 'M1', end: 'Y111', dir: true, disp: Disposition.Vertical},
    // {begin: 'Y221', end: 'XS2', dir: true, disp: Disposition.Vertical},

];

const dYYY = -210;
const kX = 1;

export class SURFACEPUMP extends BASEPUMP {
    constructor(container: string, width: number, height: number, basePoint: Point) {
        super(container, width, height, basePoint);
        this.name = 'clearPump';
        this.secondName = 'techPump';
        this.createWidgets(basePoint);
        this.createConnections(surfaceConnections);
    }
    protected getPoint(dXY: number[]){
        return this.basePoint.newPointMoved(dXY[dxIndex] * kX, dXY[dyIndex] + dYYY);
    }
    createWidgets(p: Point){
        this.addItem(new Pool( this.getPoint([118, 642]), 150, IndustrialWater), 'Tech');
        this.addItem(new Pool( this.getPoint([355, 642]), 150, PureWater), 'Clear');
        this.addItem(new WaterTower( this.getPoint([/*530*/600/kX,/*100*/0 - dYYY]), 200), 'Tower');
        //this.items[this.items.length - 1].printRect();

        for(let i = 0; i < surfacePumpsData.length; i++)
            this.addItem( new Pump(this.getPoint(surfacePumpsData[i].dXY), 100, 0), surfacePumpsData[i].name);
        for(let i = 0; i < surfaceValvesData.length; i++){
            let obj = surfaceValvesData[i];
            let v: (Valve | ValveCheck);
            if(obj.disp == null) this.addItem( new ValveCheck(this.getPoint(obj.dXY), 30), obj.name, false ); 
            else this.addItem( new Valve(this.getPoint(obj.dXY), 30, obj.disp), obj.name);
        }
    }
    // createConnections(){
    //     this.connect('Y222', 'M4');
    //     this.connect('M4', 'Y221');
    //     this.connect('Y221', 'XS2');

    // }
}
