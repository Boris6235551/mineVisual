
// https://qna.habr.com/q/761201

// const datepicker = require('vuejs-datepicker');
// import datepicker from 'vuejs-datepicker/dist/vuejs-datepicker.js';
//import Vue from 'vue/dist/vue.js';
//var Vue = require("vue/dist/vue.js");

const moment = require('moment');
const ipcAdmin = require('electron').ipcRenderer;
const { connectDB, getShift, getShifts, getShiftBatchers } =require('../BatcherWatcher/DB/db') 
 
var options = {
    silent: false,
    printBackground: true,
    color: false,
    margin: {
        marginType: 'printableArea'
    },
    landscape: false,
    pagesPerSheet: 1,
    collate: false,
    copies: 1,
};

function getEmptyShift(){
    return {
        beginDate: '', 
        endDate: '',
        skips: 0,
        weight: 0, 
        datas: []
    }; 
}
/*{beginDate: '06/03/2021 12:34:12 PM', endDate: '06/03/2021 12:40:12 PM',
    skips: '10', weight: '498',
    datas: [{ batcher: "L Skip", number: "3", gross: "10310", tare: "350", 
                net: 9960, time: "2021-06-02 10:44:08" },]
}*/

let report = new Vue({
    el: '#report',
    data: {
        objectShift: getEmptyShift() ,
        startDate: new moment().format('YYYY-MM-DD'),    //"2021-06-16"
        endDate: new moment().format('YYYY-MM-DD'),
        shifts: ['no shifts found'],    // all shifts from period
        selectShifts: 'no shifts found',
        datePrintingReport: { year: new Date().getFullYear(), day: new Date().getDate(), month: new Date().getMonth() + 1 }
    },
    methods: {
        selectShiftChange: async function(){
            console.log('selectShiftChange: async function', this.selectShifts)
            this.setShiftParams(this.selectShifts);
        },
        checkAndSetPeriod: async function(){
            let fm = moment(this.startDate).hour(0).minute(0).second(0);
            let tm = moment(this.endDate).hour(23).minute(59).second(59);
            if(tm.isBefore(fm)) {
                tm = moment(this.startDate).hour(23).minute(59).second(59);
                this.endDate = tm.format('YYYY-MM-DD');
            }
console.log(`checkAndSetPeriod fm=${fm.format('YYYY-MM-DD HH:mm:ss')}; tm=${tm.format('YYYY-MM-DD HH:mm:ss')}`);
            if(await connectDB(true)){
                let shifts = await getShifts(fm.format("YYYY-MM-DD HH:mm:ss"), tm.format("YYYY-MM-DD HH:mm:ss"));
                console.log(`checkAndSetPeriod shifts = `,JSON.stringify(shifts))
//{"beginDate":"2021-06-02T19:23:35.000Z","endDate":"2021-06-03T01:49:48.000Z","skips":4,"weight":39590,"reserved":1}
                if(shifts.length){
                    this.shifts = shifts.map( (shift) => {
                        let m = new moment(shift.beginDate).format("YYYY-MM-DD HH:mm:ss")
                        console.log('checkAndSetPeriod new moment(shift)', m)
                        return m;
                    } );
                    this.selectShifts = this.shifts[0]; // begin date
                    this.setShiftParams(this.shifts[0], shifts[0]);
                }   
                else {
                    this.shifts = ['no shifts found'];
                    this.selectShifts = 'no shifts found';
                }             
            }
        },
        setShiftParams: async function(sBeginDate, shift = null){
            this.objectShift = getEmptyShift();
            if(shift == null) {
                shift = await getShift(sBeginDate);
            }
            if(shift != null){
                let datas = await getShiftBatchers(sBeginDate);
                datas = datas.map( (d) => {
                    return { ...d, time: new moment(d.time).format("YYYY-MM-DD HH:mm:ss") };
                });
                let endDate = (shift.endDate != null) ? (new moment(shift.endDate).format("YYYY-MM-DD HH:mm:ss")) : (''); 
                this.objectShift = {...shift, beginDate: sBeginDate, endDate: endDate, datas: datas}; 
            }
        },
        close: function () {
            window.close();
        },
        print: function () {
            window.print();
        },
        fromDateChange: function(e){    // startDate = "2021-06-16"; type string
            this.checkAndSetPeriod();
            console.log(`event = ${e}; startDate = ${JSON.stringify(this.startDate)}; endDate = ${this.endDate}}`)
        },
        tillDateChange: function(){
            this.checkAndSetPeriod();
        }
    },
});
//# sourceMappingURL=report.js.map

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
