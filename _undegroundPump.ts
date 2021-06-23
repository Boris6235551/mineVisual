import { Scheme, Disposition, Point, Rectangle, BaseMineDraw } from './mine_drawing';
import { Pump, MinePool, UndegraundPump, Pool, Valve, ValveCheck, UndergroundWater, IndustrialWater, PureWater, WaterTower } from './pumpAccessories'
import {Connection} from './tube';

const dxIndex = 0;   
const dyIndex = 1;
const dispIndex = 2;

class BASEPUMP extends Scheme {
    protected items: (Valve | Pump | Pool | ValveCheck)[];   // | ValveCheck  - no need to send message
    protected lines: Connection[];
    protected basePoint: Point;
    constructor(container: string, width: number, height: number, basePoint: Point) {
        super(container, width, height);
        this.basePoint = basePoint;
        this.items = [];
        this.lines = [];
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
    findLineByName(name: string):Connection {
        if(name == '') return null;
        for(let l of this.lines) {
            if(l.name == name) return l;
        }
        return null;
    }
    /*********      'M'   widget middle side point   *********/    
    getMiddle(name: string, disp: Disposition, first: boolean = true): Point{
        let w = this.findByName(name);
        if(w == null) return null;
        return disp==Disposition.Vertical ? ( first ? w.rect.getMiddleDownPoint() : w.rect.getMiddleUpPoint() ) : 
                                    ( first ? w.rect.getMiddleRightPoint() : w.rect.getMiddleLeftPoint() );
    }
    /*********      'B'   line begin side point   *********/
    getLineBegin(name: string): Point{
        let l = this.findLineByName(name);
        if(l == null) return null;
        return l.getBegin();
    }
    /*********      's'      *********/
    getSurface(name: string, disp: Disposition, p: Point, first: boolean = true ){
        let w = this.findByName(name);
        if(w == null) return null;
        return disp==Disposition.Vertical ? ( first ? new Point( p.x, w.rect.p1.y) : new Point( p.x, w.rect.p0.y) ) : 
                                    ( first ? new Point( w.rect.p1.x, p.y) : new Point( w.rect.p0.x, p.y) );
    }
    /*********      'm'      *********/
    getMiddleCross(name: string, disp: Disposition, bP: Point, first: boolean = true){
        let w = this.findByName(name);
        if(w == null) return null;
        let mhp = w.rect.getMiddlePoint();
        let mvp = first ? w.rect.getMiddleDownPoint() : w.rect.getMiddleUpPoint();
        return disp==Disposition.Vertical ? new Point( bP.x, mvp.y) : new Point( mhp.x, bP.y);
    }
    /*********      'd'      *********/
    getDelta(delta: number, disp: Disposition, p: Point, first: boolean = true){
        if( isNaN(delta) ) return null;
        return disp==Disposition.Vertical ? ( first ? new Point(p.x, p.y - delta) : new Point(p.x, p.y + delta) ) : 
                                            ( first ? new Point(p.x - delta, p.y) : new Point(p.x + delta, p.y) );
    }
    /*********      'l'      *********/
    getLineCross(name: string, disp: Disposition, p: Point, first: boolean = true){
        if(name == '') return null;
        let l = this.findLineByName(name);
        if(l == null) return null;
        return disp==Disposition.Vertical ? (first ? new Point(p.x, l.rect.p1.y) : new Point(p.x, l.rect.p0.y)) :
                                            (first ? new Point(l.rect.p1.x, p.y) : new Point(l.rect.p0.x, p.y));
    }
    createConnections(datas){ 
        for ( let obj of datas) 
            this.connect(obj.begin, obj.end, obj.disp, obj.type, obj.hasOwnProperty('name') ? obj.name : '');
    }
    connect(firstName: string, secondName: string, disp: Disposition, type: string, name:string){  
        let p0: Point;
        let p1: Point;
        if(type[0] == 'M' || type[0] == 'B') {
            p0 = type[0] == 'M' ? this.getMiddle(firstName, disp) : this.getLineBegin(firstName);
            if(p0 == null) return;
            if(type[1] == 's') p1 = this.getSurface(secondName, disp, p0, false);
            else if(type[1] == 'm') p1 = this.getMiddleCross( secondName, disp, p0, false);
            else if(type[1] == 'd') p1 = this.getDelta( parseInt(secondName), disp, p0, false);
            else if(type[1] == 'l') p1 = this.getLineCross(secondName, disp, p0, false);
            if(p1 == null) return;
        }
        else if(type[1] == 'M' || type[1] == 'B'){
            p1 = type[1] == 'M' ? this.getMiddle(secondName, disp, false) : this.getLineBegin(secondName);
            if(p1 == null) return;
            if(type[0] == 's') p0 = this.getSurface(firstName, disp, p1);
            else if(type[0] == 'm') p0 = this.getMiddleCross( firstName, disp, p1);
            else if(type[0] == 'd') p0 = this.getDelta( parseInt(firstName), disp, p1);
            else if(type[0] == 'l') p0 = this.getLineCross(firstName, disp, p1);
            if(p0 == null) return;
        }
        let line =  new Connection(new Point(0,0), 5, disp);
        line.connectPointPoint(p0, 0, p1, 0);
        line.name = name;
        this.lines.push(line);
        this.addWidget(line);
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
    // /*-------------       LINE 1       --------------*/
    // {begin: 'Y16', end: 'Y13', dir: true, disp: Disposition.Vertical, type: 'HV'},
    // {begin: 'Y13', end: 'Pump1', dir: true, disp: Disposition.Vertical, type: 'HV'},
    // {begin: 'Pump1', end: 'Y17', dir: true, disp: Disposition.Vertical, type: 'HV'},

    // {begin: 'Y11', end: 'Y12', dir: true, disp: Disposition.Horizontal, type: 'HV'},
    // /*-----------------------------------------------*/

    // {begin: 'Y26', end: 'Y23', dir: true, disp: Disposition.Vertical, type: 'HV'},
    // {begin: 'Y23', end: 'Pump2', dir: true, disp: Disposition.Vertical, type: 'HV'},
    // {begin: 'Pump2', end: 'Y27', dir: true, disp: Disposition.Vertical, type: 'HV'},

    // {begin: 'Y36', end: 'Y33', dir: true, disp: Disposition.Vertical, type: 'HV'},
    // {begin: 'Y33', end: 'Pump3', dir: true, disp: Disposition.Vertical, type: 'HV'},
    // {begin: 'Pump3', end: 'Y37', dir: true, disp: Disposition.Vertical, type: 'HV'},



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
            // this.createConnections(mineConnections);
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
    /***************     TECH PUMPS    ***************/
    {begin: 'Y222', end: 'M4', dir: true, disp: Disposition.Vertical, type: 'Ms'},
    {begin: 'M4', end: 'Y221', dir: true, disp: Disposition.Vertical, type: 'Ms'},
    {begin: 'Y221', end: 'XS2', dir: true, disp: Disposition.Vertical, type: 'Ms'},

    {begin: 'XS2', end: 'Tech', dir: true, disp: Disposition.Vertical, type: 'Ms'},

    {begin: 'Y212', end: 'M3', dir: true, disp: Disposition.Vertical, type: 'Ms'},
    {begin: 'M3', end: 'Y211', dir: true, disp: Disposition.Vertical, type: 'Ms'},
    {begin: 'Y211', end: 'XS3', dir: true, disp: Disposition.Vertical, type: 'Ms'},

    {begin: 'XS3', end: 'Tech', dir: true, disp: Disposition.Vertical, type: 'Ms'},
    {begin: 'Tech', end: 'Y2_', dir: true, disp: Disposition.Vertical, type: 'sM'},

    {begin: '15', end: 'Y222', dir: true, disp: Disposition.Vertical, type: 'dM', name: 'Y222line'},
    {begin: 'Y222line', end: 'XS1', dir: true, disp: Disposition.Horizontal, type: 'Bm'},
    {begin: '15', end: 'Y212', dir: true, disp: Disposition.Vertical, type: 'dM', name: 'Y212line'},
    {begin: 'XS1', end: 'Y212line', dir: true, disp: Disposition.Horizontal, type: 'mB'},
    {begin: 'XS1', end: 'Y212line', dir: true, disp: Disposition.Vertical, type: 'Ml'},
    {begin: '30', end: 'XS1', dir: true, disp: Disposition.Vertical, type: 'dM'},
    /*------------------  M0  -----------------------------*/    
    {begin: '30', end: 'M0', dir: true, disp: Disposition.Vertical, type: 'dM', name: 'M0line'},
    {begin: 'M0line', end: 'Y110', dir: false, disp: Disposition.Horizontal, type: 'Bm', name: 'M0Yline'},
    {begin: 'Y220', end: 'M0Yline', dir: true, disp: Disposition.Vertical, type: 'Ml'},
    {begin: 'Y210', end: 'M0Yline', dir: true, disp: Disposition.Vertical, type: 'Ml'},
    {begin: 'Y120', end: 'M0Yline', dir: true, disp: Disposition.Vertical, type: 'Ml'},
    {begin: 'Y110', end: 'M0Yline', dir: true, disp: Disposition.Vertical, type: 'Ml'},

    {begin: '60', end: 'Y220', dir: true, disp: Disposition.Vertical, type: 'dM', name: 'Y220Pumpline'},
    {begin: 'Y220Pumpline', end: 'M4', dir: true, disp: Disposition.Horizontal, type: 'Bs'},

    {begin: '60', end: 'Y210', dir: true, disp: Disposition.Vertical, type: 'dM', name: 'Y210Pumpline'},
    {begin: 'M3', end: 'Y210Pumpline', dir: true, disp: Disposition.Horizontal, type: 'sB'},

    {begin: '60', end: 'Y120', dir: true, disp: Disposition.Vertical, type: 'dM', name: 'Y120Pumpline'},
    {begin: 'Y120Pumpline', end: 'M2', dir: true, disp: Disposition.Horizontal, type: 'Bs'},
    {begin: '60', end: 'Y110', dir: true, disp: Disposition.Vertical, type: 'dM', name: 'Y110Pumpline'},
    {begin: 'M1', end: 'Y110Pumpline', dir: true, disp: Disposition.Horizontal, type: 'sB'},
    /****************     CLEAR PUMPS    ****************/
    {begin: 'Y122', end: 'M2', dir: true, disp: Disposition.Vertical, type: 'Ms'},
    {begin: 'M2', end: 'Y121', dir: true, disp: Disposition.Vertical, type: 'Ms'},

    {begin: 'Y112', end: 'M1', dir: true, disp: Disposition.Vertical, type: 'Ms'},
    {begin: 'M1', end: 'Y111', dir: true, disp: Disposition.Vertical, type: 'Ms'},

    {begin: 'XS5', end: 'Clear', dir: true, disp: Disposition.Vertical, type: 'Ms'},
    {begin: 'Clear', end: 'Y1_', dir: true, disp: Disposition.Vertical, type: 'sM'},

    
    {begin: '15', end: 'Y122', dir: true, disp: Disposition.Vertical, type: 'dM', name: 'Y122line'},
    {begin: 'Y122line', end: 'XS4', dir: true, disp: Disposition.Horizontal, type: 'Bm'},
    {begin: '15', end: 'Y112', dir: true, disp: Disposition.Vertical, type: 'dM', name: 'Y112line'},
    {begin: 'XS4', end: 'Y112line', dir: true, disp: Disposition.Horizontal, type: 'mB'},
    {begin: 'XS4', end: 'Y112line', dir: true, disp: Disposition.Vertical, type: 'Ml'},
    {begin: '30', end: 'XS4', dir: true, disp: Disposition.Vertical, type: 'dM'},




    {begin: '50', end: 'XS5', dir: true, disp: Disposition.Vertical, type: 'dM', name: 'XS5line'},
    {begin: 'XS5line', end: 'Y111', dir: true, disp: Disposition.Horizontal, type: 'Bm', name: 'XS5Rline'},
    {begin: 'Y111', end: 'XS5Rline', dir: true, disp: Disposition.Vertical, type: 'Ml'},
    {begin: 'Y121', end: 'XS5line', dir: true, disp: Disposition.Horizontal, type: 'mB', name: 'XS5Lline'},
    {begin: 'Y121', end: 'XS5Lline', dir: true, disp: Disposition.Vertical, type: 'mB'},

    {begin: '10', end: 'DP4', dir: true, disp: Disposition.Vertical, type: 'dM', name: 'DP4line'},
    {begin: '10', end: 'DP3', dir: true, disp: Disposition.Vertical, type: 'dM', name: 'DP3line'},
    {begin: 'DP4line', end: 'DP3line', dir: true, disp: Disposition.Horizontal, type: 'Bl', name: 'DP43line'},
    {begin: 'Y2_', end: 'DP43line', dir: true, disp: Disposition.Vertical, type: 'Ml'},
    {begin: 'Y1_', end: 'DP43line', dir: true, disp: Disposition.Vertical, type: 'Ml'},
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
