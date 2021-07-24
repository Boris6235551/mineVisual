import { Scheme, Disposition, Point, Rectangle, BaseMineDraw, FlowDriver } from './mine_drawing';
import { Pump, MinePool, UndegraundPump, Pool, Valve, ValveCheck, UndergroundWater, IndustrialWater, PureWater, WaterTower } from './pumpAccessories'
import {Connection} from './tube';

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
    protected addItem(item: (Valve | Pump | Pool | ValveCheck), name: string, recieveMessage: boolean = true, 
                        flowControllNames: string = ''){
        item.name = name;
        if(recieveMessage) this.items.push(item);
        this.addWidget(item);
        if(flowControllNames == '') return;
        this.addFlowDriver(<FlowDriver>item, flowControllNames);
    }
    addFlowDriver(item: FlowDriver, flowControllNames: string){
        if(flowControllNames == undefined) return;
        let driverNames = flowControllNames.split(' ');
        // if(flowControllNames == 'Y13')
        //     console.log(`addFlowDriver for item=${item.name} driverNames=${driverNames}`)
        let driver = <FlowDriver>this.findByName(driverNames[0]);
        if(driver == null) {
            //if(flowControllNames == 'Y13') console.log(`addFlowDriver NOT to fined driverNames=${driverNames[0]}`)
            return;
        }
        // if(flowControllNames == 'Y13') console.log(`addFlowDriver driver Name=${driver.name} add element${item.name}`)
        driver.addToFlowElements(item);
        if(driverNames.length == 1) return;
        for(let i = 1; i < driverNames.length; i++){
            driver = <FlowDriver>this.findByName(driverNames[i]);
            if(driver == null) continue;
            driver.addToSetElements(item); 
        }
    }
    // itemByName(name: string): (Valve | Pump ){
    //     for (let item of this.items) {
    //         if(item.name == name) return item;
    //     }
    //     return null;
    // }
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
    /*********      'B or E'   line begin or end side point   *********/
    getLineBeginEnd(name: string, begin: boolean = true): Point{
        let l = this.findLineByName(name);
        if(l == null) return null;
        return begin ? l.getBegin() : l.getEnd();
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
        // let mhp = w.rect.getMiddlePoint();
        // let mvp = first ? w.rect.getMiddleDownPoint() : w.rect.getMiddleUpPoint();
        // return disp==Disposition.Vertical ? new Point( bP.x, mvp.y) : new Point( mhp.x, bP.y);
        let mp = w.rect.getMiddlePoint();
        return disp==Disposition.Vertical ? new Point( bP.x, mp.y) : new Point( mp.x, bP.y);
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
        for ( let obj of datas) {
            //console.log(obj)
            this.connect(obj.begin, obj.end, obj.disp, obj.type, obj.dir, 
                obj.hasOwnProperty('name') ? obj.name : '', obj.flowControll);
        }
            
    }
    connect(firstName: string, secondName: string, disp: Disposition, type: string, dir: boolean, 
                name:string, flowControllNames:string){  
        let p0: Point;
        let p1: Point;
        if(type[0] == 'M' || type[0] == 'B' || type[0] == 'E') {
            p0 = type[0] == 'M' ? this.getMiddle(firstName, disp) : this.getLineBeginEnd(firstName, type[0] == 'B');
            if(p0 == null) return;
            if(type[1] == 's') p1 = this.getSurface(secondName, disp, p0, false);
            else if(type[1] == 'm') p1 = this.getMiddleCross( secondName, disp, p0, false);
            else if(type[1] == 'd') p1 = this.getDelta( parseInt(secondName), disp, p0, false);
            else if(type[1] == 'l') p1 = this.getLineCross(secondName, disp, p0, false);
            if(p1 == null) return;
        }
        else if(type[1] == 'M' || type[1] == 'B' || type[1] == 'E'){
            p1 = type[1] == 'M' ? this.getMiddle(secondName, disp, false) : this.getLineBeginEnd(secondName, type[1] == 'B');
            if(p1 == null) return;
            if(type[0] == 's') p0 = this.getSurface(firstName, disp, p1);
            else if(type[0] == 'm') p0 = this.getMiddleCross( firstName, disp, p1);
            else if(type[0] == 'd') p0 = this.getDelta( parseInt(firstName), disp, p1);
            else if(type[0] == 'l') p0 = this.getLineCross(firstName, disp, p1);
            if(p0 == null) return;
        }
        let line =  new Connection(new Point(0,0), 5, disp, dir);
        line.connectPointPoint(p0, 0, p1, 0);
        line.name = name;
        this.lines.push(line);
        this.addWidget(line);
        this.addFlowDriver(line, flowControllNames);    // *****  FlowControll

    }
    send(mes: any) {
        //console.log(`received message UNDEGROUNDPUMP name=${this.name}`);
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
        //    console.log(`sended to ${widget.name}\n message  =${JSON.stringify(wMes)}`);
            if(sendToWidget) widget.setBaseProperty(wMes);
            for (let i = delIndexes.length - 1; i >= 0; i--) mesProps.splice(delIndexes[i], 1);
            // console.log(`del properies of ${widget.name}; mesProps length=${mesProps.length}`);
            if (mesProps.length == 0) return;
        }
        //console.log(`message properies=${mesProps}`);
        
        this.update();
    }
}       // END BASE PUMP

/**********************************************************************************
 ****************                 UNDEGRAUND PUMPS                 ****************
 **********************************************************************************/
 const dxIndex = 0;   
 const dyIndex = 1;
 const dispIndex = 2;
 const elementIndex = 0;
 const flowControllIndex = 1;
 
// array to create Valves or 
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
//  element   controller
let PumpValveControllTable = [
    ['Y@3',  'Pump@'],
    ['Y@1',  'Y@3'],
    ['Y@2',  'Y@3'],
];

let InitFlowValves = ['Y14', 'Y15', 'Y24', 'Y25', 'Y34', 'Y35', 'Y44', 'Y45', 'Y54', 'Y55'];

let mineConnections = [
    // /*-------------       LINE 1       --------------*/
    // {begin: 'Y11', end: 'Y16', dir: true, disp: Disposition.Vertical, type: 'mM', name: 'Y16u'},
    // {begin: 'Y11', end: 'Y16u', dir: true, disp: Disposition.Horizontal, type: 'Ml', name: 'Y11r'},
    // {begin: 'Y16u', end: 'Y12', dir: false, disp: Disposition.Horizontal, type: 'lM', name: 'Y12l'},
    
    // {begin: 'Y16', end: 'Y13', dir: true, disp: Disposition.Vertical, type: 'Ms', name: 'Y16d'},
    // {begin: 'Y13', end: 'Pump1', dir: true, disp: Disposition.Vertical, type: 'Ms', name: 'Y13d'},  //Y13down
    // {begin: 'Pump1', end: 'Y17', dir: true, disp: Disposition.Vertical, type: 'sM'},
    // {begin: 'Y17', end: 'minePool', dir: true, disp: Disposition.Vertical, type: 'Ms'},
    // /*-----------------------------------------------*/
    // {begin: '20', end: 'Y14', dir: false, disp: Disposition.Vertical, type: 'dM', name: 'Y14u'},
    // {begin: 'Y16u', end: 'Y14u', dir: false, disp: Disposition.Horizontal, type: 'lB'},
    // {begin: 'Y14', end: 'minePool', dir: false, disp: Disposition.Vertical, type: 'Ms', name: 'Y14d'},
    // /*-----------------------------------------------*/
    // {begin: 'Y13d', end: 'Y15', dir: false, disp: Disposition.Horizontal, type: 'lM', name: 'Y15l'},
    // {begin: 'Y15', end: 'Y14d', dir: false, disp: Disposition.Horizontal, type: 'Ml', name: 'Y15r'},


    {begin: '40', end: 'lY51', dir: true, disp: Disposition.Vertical, type: 'dB', name: 'ulY51', flowControll: 'Y51'},
    //{begin: '30', end: 'lY51', dir: true, disp: Disposition.Vertical, type: 'dB', name: ''},
    {begin: '760', end: 'ulY51', dir: true, disp: Disposition.Horizontal, type: 'dB', name: 'stav1', flowControll: 'Y51'},
    {begin: 'stav1', end: 'lY41', dir: true, disp: Disposition.Vertical, type: 'lB', name: 'ulY41', flowControll: 'Y41'},
    {begin: 'stav1', end: 'lY31', dir: true, disp: Disposition.Vertical, type: 'lB', name: 'ulY31', flowControll: 'Y31'},
    {begin: 'stav1', end: 'lY21', dir: true, disp: Disposition.Vertical, type: 'lB', name: 'ulY21', flowControll: 'Y21'},
    {begin: 'stav1', end: 'lY11', dir: true, disp: Disposition.Vertical, type: 'lB', name: 'ulY11', flowControll: 'Y11'},

    {begin: '60', end: 'rY52', dir: true, disp: Disposition.Vertical, type: 'dE', name: 'urY52', flowControll: 'Y52'},
    {begin: '880', end: 'urY52', dir: true, disp: Disposition.Horizontal, type: 'dB', name: 'stav2', flowControll: 'Y52'},
    {begin: 'stav2', end: 'rY42', dir: true, disp: Disposition.Vertical, type: 'lE', name: 'urY42', flowControll: 'Y42'},
    {begin: 'stav2', end: 'rY32', dir: true, disp: Disposition.Vertical, type: 'lE', name: 'urY32', flowControll: 'Y32'},
    {begin: 'stav2', end: 'rY22', dir: true, disp: Disposition.Vertical, type: 'lE', name: 'urY22', flowControll: 'Y22'},
    {begin: 'stav2', end: 'rY12', dir: true, disp: Disposition.Vertical, type: 'lE', name: 'urY12', flowControll: 'Y12'},

    {begin: '60', end: 'stav1', dir: true, disp: Disposition.Vertical, type: 'dB', name: 'ustav1', flowControll: 'Y11 Y21 Y31 Y41 Y51'},
    {begin: '40', end: 'stav2', dir: true, disp: Disposition.Vertical, type: 'dB', name: 'ustav2'},
];
let mineConnectionsTemplates = [
    /*-------------       LINE @       --------------*/
    {begin: '10', end: 'Y@1', dir: true, disp: Disposition.Horizontal, type: 'dM', name: 'lY@1', flowControll: 'Y@1'},
    {begin: 'Y@2', end: '20', dir: false, disp: Disposition.Horizontal, type: 'Md', name: 'rY@2', flowControll: 'Y@2'},
    /*-----------------------------------------------*/
    {begin: 'Y@1', end: 'Y@6', dir: true, disp: Disposition.Vertical, type: 'mM', name: 'uY@6', flowControll: 'Y@3'},
    {begin: 'Y@1', end: 'uY@6', dir: true, disp: Disposition.Horizontal, type: 'Ml', name: 'rY@1', flowControll: 'Y@3'},
    {begin: 'uY@6', end: 'Y@2', dir: false, disp: Disposition.Horizontal, type: 'lM', name: 'lY@2', flowControll: 'Y@3'},
    
    {begin: 'Y@6', end: 'Y@3', dir: true, disp: Disposition.Vertical, type: 'Ms', name: 'dY@6', flowControll: 'Y@3'},
    {begin: 'Y@3', end: 'Pump@', dir: true, disp: Disposition.Vertical, type: 'Ms', name: 'dY@3', flowControll: 'Pump@'},  //Y13down
    {begin: 'Pump@', end: 'Y@7', dir: true, disp: Disposition.Vertical, type: 'sM', name: 'uY@7', flowControll: 'Pump@'},
    {begin: 'Y@7', end: 'minePool', dir: true, disp: Disposition.Vertical, type: 'Ms', name: 'dY@7', flowControll: 'Pump@'},
    /*-----------------------------------------------*/
    {begin: '20', end: 'Y@4', dir: false, disp: Disposition.Vertical, type: 'dM', name: 'uY@4', flowControll: 'Y@4'},
    {begin: 'uY@6', end: 'uY@4', dir: false, disp: Disposition.Horizontal, type: 'lB', name: 'luY@4', flowControll: 'Y@4'},
    {begin: 'Y@4', end: 'minePool', dir: false, disp: Disposition.Vertical, type: 'Ms', name: 'dY@4', flowControll: 'Y@4'},
    /*-----------------------------------------------*/
    {begin: 'dY@3', end: 'Y@5', dir: false, disp: Disposition.Horizontal, type: 'lM', name: 'lY@5', flowControll: 'Y@5'},
    {begin: 'Y@5', end: 'dY@4', dir: false, disp: Disposition.Horizontal, type: 'Ml', name: 'rY@5', flowControll: 'Y@5'},
    
];

// const LINES_COUNT1: number   = 3;
// const LINES_COUNT2: number   = 2;
const LINES_COUNT: number = 5;
const DELTA_X: number       = 184;

export class UNDEGROUNDPUMP extends BASEPUMP {
    private connectionsTable: any[];
    private flowControllTable: any[];
    private flowInitValves: FlowDriver[];
    constructor(container: string, width: number, height: number, basePoint: Point) {     //, number: number
        super(container, width, height, basePoint);
        this.connectionsTable = [];
        this.flowControllTable = [];
        this.flowInitValves = [];
        this.name = 'drainageA';
        this.secondName = 'drainageB';
        this.addItem(new MinePool( basePoint.newPointMoved(0, 450) , 950), 'minePool');
        for(let i = 0; i < LINES_COUNT; i++) {
            this.prepareFlowTable(i+1);
            this.createWidgets(basePoint.newPointMoved(DELTA_X * i, 0), i + 1);
            this.prepareConnectionsTable(i + 1);
        }
        //console.log(JSON.stringify(this.flowControllTable, null, 4));
        this.createConnections(this.connectionsTable);    
        this.createConnections(mineConnections);
        this.prepareFlowInitValves();
    }
    prepareFlowInitValves(){
        for(let valName of InitFlowValves) {
            let valObj = this.findByName(valName)
            //console.log(`prepareFlowInitValves valve name=${valName}; object name = ${valObj==null ? 'null':valObj.name}`)
            this.flowInitValves.push(<FlowDriver>valObj);
        }
    }
    prepareConnectionsTable(number: number){
        for(let obj of mineConnectionsTemplates){
            let properies =  Object.getOwnPropertyNames(obj);
            let newObj = {};
            for(let prop of properies){
                if(typeof obj[prop] == 'string') newObj[prop] = obj[prop].replace('@', (number).toString());
                else newObj[prop] = obj[prop];
            }
            this.connectionsTable.push(newObj);
            // mineConnections.push(newObj);
            // console.log(`prepareConnectionsTable for line=${number} => ${JSON.stringify(newObj)}`)
        }
    }
    prepareFlowTable(number: number){
        //console.log(`prepareFlowTable for number${number}`)
        for(let i = 0; i < PumpValveControllTable.length; i++){
            let newFlow = PumpValveControllTable[i][elementIndex].replace('@', (number).toString());
            let newControlller = PumpValveControllTable[i][flowControllIndex].replace('@', (number).toString());
            this.flowControllTable.push([newFlow, newControlller]);
        }
    }
    findFlowController(name: string): string{
        for(let i = 0; i < this.flowControllTable.length; i++){
            //console.log(`i=${i}; this.flowControllTable[i]=${this.flowControllTable[i]}`)
            if(this.flowControllTable[i][elementIndex] == name) {
                // if(this.flowControllTable[i][flowControllIndex] == 'Y13') 
                //     console.log(`!!!!!!!!!!!!for ${this.flowControllTable[i][flowControllIndex]}; 
                //     flow=${name}`)
                return this.flowControllTable[i][flowControllIndex];
            }
        }
        return '';
    }
    createWidgets(p: Point, number: number) {
        this.addItem(new Pump( p.newPointMoved(30,250), 100, 0), 'Pump' + number.toString());
        let flowElements = [];
        for(let i = 0; i < vPoints.length; i++){
            let name = 'Y' + number.toString() + (i + 1).toString();
            let v: (Valve | ValveCheck);
            let received: boolean;
            if(vPoints[i][dispIndex] == null) 
               [v, received] = [new ValveCheck(p.newPointMoved(vPoints[i][dxIndex], vPoints[i][dyIndex]), 30), false]; 
            else {
                [v, received] = [new Valve(p.newPointMoved(vPoints[i][dxIndex], vPoints[i][dyIndex]), 
                                                            30, vPoints[i][dispIndex]), true];  
                flowElements.push(v);
            }
            this.addItem( v, name, received); //    
        }  
        for(let i = 0; i < flowElements.length; i++){
            let elName = flowElements[i].name;
            let controller = this.findFlowController(elName);
            if(controller != '') this.addFlowDriver(flowElements[i], controller)
        }
        //      
    }
    send(mes: any){
        super.send(mes);
        for(let v of this.flowInitValves) {
           // console.log(`<<<<<<<<<<<<<<< v.name=${v.name}`)
            v.setFlow(true);
        }
    }
}

/**********************************************************************************
 ****************           TECH AND CLEAR SURFACE PUMPS           ****************
 **********************************************************************************/
let surfaceValvesData = [
    /***************     TECH PUMPS    ***************/
    {dXY: [182,	261], disp: null,                  name: 'XS1',  flowControll: ''},   // XS1 back
    /*-------------     TECH LINE 2    --------------*/
    {dXY: [140,	329], disp: Disposition.Vertical,  name: 'Y222', flowControll: 'M4'},   // Y2.2.2
    {dXY: [100,	515], disp: Disposition.Vertical,  name: 'Y220', flowControll: 'M0'},   // Y2.2.0 zalivka
    {dXY: [140,	505], disp: Disposition.Vertical,  name: 'Y221', flowControll: 'M4'},   // Y2.2.1
    {dXY: [140,	592], disp: null,                  name: 'XS2',  flowControll: ''},   // XS2 back
    /*-------------     TECH LINE 1    --------------*/
    {dXY: [224,	329], disp: Disposition.Vertical,  name: 'Y212', flowControll: 'M3'},   // Y2.1.2
    {dXY: [278,	515], disp: Disposition.Vertical,  name: 'Y210', flowControll: 'M0'},   // Y2.1.0 zalivka    
    {dXY: [224,	505], disp: Disposition.Vertical,  name: 'Y211', flowControll: 'M3'},   // Y2.1.1
    {dXY: [224,	592], disp: null,                  name: 'XS3' , flowControll: ''},   // XS3 back before
    /*-----------------------------------------------*/
    {dXY: [182,	734], disp: Disposition.Vertical,  name: 'Y2_' , flowControll: 'DP4 DP3'},    // Y2 input valve

    /****     CLEAR PUMPS    ****/
    {dXY: [418,	261], disp: null,                  name: 'XS4' , flowControll: ''},   // XS4 back
    /*-------------     CLEAR LINE 2    --------------*/
    {dXY: [377,	329], disp: Disposition.Vertical,  name: 'Y122', flowControll: 'M2'},   // Y1.2.2	307	379
    {dXY: [338,	515], disp: Disposition.Vertical,  name: 'Y120', flowControll: 'M0'},   // Y1.2.0 zalivka	273	515
    {dXY: [377,	505], disp: Disposition.Vertical,  name: 'Y121', flowControll: 'M2'},   // Y1.2.1	307	525	
    /*-------------     CLEAR LINE 1    --------------*/
    {dXY: [461,	329], disp: Disposition.Vertical,  name: 'Y112', flowControll: 'M1'},   // Y1.1.2	361	379
    {dXY: [515,	515], disp: Disposition.Vertical,  name: 'Y110', flowControll: 'M0'},   // Y1.1.0 zalivka	395	515
    {dXY: [461,	505], disp: Disposition.Vertical,  name: 'Y111', flowControll: 'M1'},   // Y1.1.1	361	525
    /*-----------------------------------------------*/
    {dXY: [419,	604], disp: null,                  name: 'XS5' , flowControll: ''},   // XS5 back
    {dXY: [419,	734], disp: Disposition.Vertical,  name: 'Y1_' , flowControll: 'DP4 DP3'},   // Y1 input valve
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
    {begin: 'Y222', end: 'M4', dir: true, disp: Disposition.Vertical, type: 'Ms',  name: 'dY222', flowControll: 'M4'},
    {begin: 'M4', end: 'Y221', dir: true, disp: Disposition.Vertical, type: 'Ms',  name: 'uY221', flowControll: 'M4'},
    {begin: 'Y221', end: 'XS2', dir: true, disp: Disposition.Vertical, type: 'Ms', name: '', flowControll: 'Y221'},

    {begin: 'XS2', end: 'Tech', dir: true, disp: Disposition.Vertical, type: 'Ms', name: '', flowControll: 'Y221'},

    {begin: 'Y212', end: 'M3', dir: true, disp: Disposition.Vertical, type: 'Ms',  name: '', flowControll: 'M3'},
    {begin: 'M3', end: 'Y211', dir: true, disp: Disposition.Vertical, type: 'Ms',  name: '', flowControll: 'M3'},
    {begin: 'Y211', end: 'XS3', dir: true, disp: Disposition.Vertical, type: 'Ms', name: '', flowControll: 'Y211'},

    {begin: 'XS3', end: 'Tech', dir: true, disp: Disposition.Vertical, type: 'Ms', name: '', flowControll: 'Y211'},
    {begin: 'Tech', end: 'Y2_', dir: true, disp: Disposition.Vertical, type: 'sM', name: '', flowControll: 'Y2_'},

    {begin: '15', end: 'Y222', dir: true, disp: Disposition.Vertical, type: 'dM', name: 'Y222line', flowControll: 'Y222'},
    {begin: 'Y222line', end: 'XS1', dir: false, disp: Disposition.Horizontal, type: 'Bm', name: '', flowControll: 'Y222'},
    {begin: '15', end: 'Y212', dir: true, disp: Disposition.Vertical, type: 'dM', name: 'Y212line', flowControll: 'Y212'},
    {begin: 'XS1', end: 'Y212line', dir: true, disp: Disposition.Horizontal, type: 'mB', name: '', flowControll: 'Y212'},
    {begin: 'XS1', end: 'Y212line', dir: true, disp: Disposition.Vertical, type: 'Ml', name: '', flowControll: 'Y222 Y212'},
    {begin: '30', end: 'XS1', dir: true, disp: Disposition.Vertical, type: 'dM', name: '', flowControll: 'Y222 Y212'},
    /*------------------  M0  -----------------------------*/    
    {begin: '30', end: 'M0', dir: true, disp: Disposition.Vertical, type: 'dM', name: 'M0line', flowControll: 'M0'},
    {begin: 'M0line', end: 'Y110', dir: false, disp: Disposition.Horizontal, type: 'Bm', name: 'M0Yline', flowControll: 'M0'},
    {begin: 'Y220', end: 'M0Yline', dir: true, disp: Disposition.Vertical, type: 'Ml', name: 'dY220', flowControll: 'M0'},
    {begin: 'Y210', end: 'M0Yline', dir: true, disp: Disposition.Vertical, type: 'Ml', name: 'dY210', flowControll: 'M0'},
    {begin: 'Y120', end: 'M0Yline', dir: true, disp: Disposition.Vertical, type: 'Ml', name: 'dY120', flowControll: 'M0'},
    {begin: 'Y110', end: 'M0Yline', dir: true, disp: Disposition.Vertical, type: 'Ml', name: 'dY110', flowControll: 'M0'},

    {begin: '60', end: 'Y220', dir: true, disp: Disposition.Vertical, type: 'dM', name: 'Y220Pumpline', flowControll: 'Y220'},
    {begin: 'Y220Pumpline', end: 'M4', dir: true, disp: Disposition.Horizontal, type: 'Bs', name: '', flowControll: 'Y220'},

    {begin: '60', end: 'Y210', dir: true, disp: Disposition.Vertical, type: 'dM', name: 'Y210Pumpline', flowControll: 'Y210'},
    {begin: 'M3', end: 'Y210Pumpline', dir: true, disp: Disposition.Horizontal, type: 'sB', name: '', flowControll: 'Y210'},

    {begin: '60', end: 'Y120', dir: true, disp: Disposition.Vertical, type: 'dM', name: 'Y120Pumpline', flowControll: 'Y120'},
    {begin: 'Y120Pumpline', end: 'M2', dir: true, disp: Disposition.Horizontal, type: 'Bs', name: '', flowControll: 'Y120'},
    {begin: '60', end: 'Y110', dir: true, disp: Disposition.Vertical, type: 'dM', name: 'Y110Pumpline', flowControll: 'Y110'},
    {begin: 'M1', end: 'Y110Pumpline', dir: true, disp: Disposition.Horizontal, type: 'sB', name: '', flowControll: 'Y110'},
    /****************     CLEAR PUMPS    ****************/
    {begin: 'Y122', end: 'M2', dir: true, disp: Disposition.Vertical, type: 'Ms', name: '', flowControll: 'M2'},
    {begin: 'M2', end: 'Y121', dir: true, disp: Disposition.Vertical, type: 'Ms', name: '', flowControll: 'M2'},

    {begin: 'Y112', end: 'M1', dir: true, disp: Disposition.Vertical, type: 'Ms', name: '', flowControll: 'M1'},
    {begin: 'M1', end: 'Y111', dir: true, disp: Disposition.Vertical, type: 'Ms', name: '', flowControll: 'M1'},

    {begin: 'XS5', end: 'Clear', dir: true, disp: Disposition.Vertical, type: 'Ms', name: '', flowControll: 'Y121 Y111'},
    {begin: 'Clear', end: 'Y1_', dir: true, disp: Disposition.Vertical, type: 'sM', name: '', flowControll: 'Y1_'},
    
    {begin: '15', end: 'Y122', dir: true, disp: Disposition.Vertical, type: 'dM', name: 'Y122line', flowControll: 'Y122'},
    {begin: 'Y122line', end: 'XS4', dir: false, disp: Disposition.Horizontal, type: 'Bm', name: '', flowControll: 'Y122'},
    {begin: '15', end: 'Y112', dir: true, disp: Disposition.Vertical, type: 'dM', name: 'Y112line', flowControll: 'Y112'},
    {begin: 'XS4', end: 'Y112line', dir: true, disp: Disposition.Horizontal, type: 'mB', name: '', flowControll: 'Y112'},
    {begin: 'XS4', end: 'Y112line', dir: true, disp: Disposition.Vertical, type: 'Ml', name: '', flowControll: 'Y122 Y112'},
    {begin: '30', end: 'XS4', dir: true, disp: Disposition.Vertical, type: 'dM', name: 'uXS4', flowControll: 'Y122 Y112'},
    {begin: 'uXS4', end: 'Tower', dir: false, disp: Disposition.Horizontal, type: 'Bs', name: 'ruXS4', flowControll: 'Y122 Y112'},
    
    {begin: '50', end: 'XS5', dir: true, disp: Disposition.Vertical, type: 'dM', name: 'XS5line', flowControll: 'Y121 Y111'},
    {begin: 'XS5line', end: 'Y111', dir: false, disp: Disposition.Horizontal, type: 'Bm', name: 'XS5Rline', flowControll: 'Y111'},
    {begin: 'Y111', end: 'XS5Rline', dir: true, disp: Disposition.Vertical, type: 'Ml', name: '', flowControll: 'Y111'},
    {begin: 'Y121', end: 'XS5line', dir: true, disp: Disposition.Horizontal, type: 'mB', name: 'XS5Lline', flowControll: 'Y121'},
    {begin: 'Y121', end: 'XS5Lline', dir: true, disp: Disposition.Vertical, type: 'Ml', name: '', flowControll: 'Y121'}, //mB

    {begin: '10', end: 'DP4', dir: true, disp: Disposition.Vertical, type: 'dM', name: 'DP4line', flowControll: 'DP4'},
    {begin: '10', end: 'DP3', dir: true, disp: Disposition.Vertical, type: 'dM', name: 'DP3line', flowControll: 'DP3'},
    {begin: 'DP4line', end: 'DP3line', dir: true, disp: Disposition.Horizontal, type: 'Bl', name: 'DP43line', flowControll: 'DP4 DP3'},
    {begin: 'Y2_', end: 'DP43line', dir: true, disp: Disposition.Vertical, type: 'Ml', name: '', flowControll: 'DP4 DP3'},
    {begin: 'Y1_', end: 'DP43line', dir: true, disp: Disposition.Vertical, type: 'Ml', name: '', flowControll: 'DP4 DP3'},
];
let flowMatrix =[
    'M0:M0line M0Yline dY220 dY210 dY120 dY110:Y220 Y210 Y120 Y110',
    'M4:dY222:Y222',
    'M3:',
    'M2 ',
    'M1 ',
    'DP4 ',
    'DP3 ',
    'Y222:'
]

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
            else this.addItem( new Valve(this.getPoint(obj.dXY), 30, obj.disp), obj.name, true, obj.flowControll);
        }
    }
    // createConnections(){
    //     this.connect('Y222', 'M4');
    //     this.connect('M4', 'Y221');
    //     this.connect('Y221', 'XS2');

    // }
}





// return;
// let number = 1;
//         if(number == 1){
//             this.name = 'drainageA';
//             for(let i = 0; i < LINES_COUNT1; i++) 
//                 this.createWidgets(basePoint.newPointMoved(DELTA_X * i, 0), i + 1);
//             this.createConnections(mineConnections);
//         }
//         else{
//             this.name = 'drainageB';
//             this.addItem(new MinePool( basePoint.newPointMoved(0, 450) , 950), 'minePool');
//             for(let i = LINES_COUNT1; i < LINES_COUNT1 + LINES_COUNT2; i++) 
//                 this.createWidgets(basePoint.newPointMoved(DELTA_X * i, 0), i + 1);
//         }
