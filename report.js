// const datepicker = require('vuejs-datepicker');
// import datepicker from 'vuejs-datepicker/dist/vuejs-datepicker.js';
// import Vue from 'vue/dist/vue.js';

let options = {
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
    // header: 'Header of the Page', 
    // footer: 'Footer of the Page'
};

new Vue({
    el: '#report',
    data: {
        objectShift:
        {
            beginDate: '06/03/2021 12:34:12 PM',
            endDate: '06/03/2021 12:40:12 PM',
            skips: '10',
            weight: '498',
            datas: [
                { batcher: "L Skip", number: "3", gross: "10310", tare: "350", net: 9960, time: "2021-06-02 10:44:08" },
            ]
        },
        startDate: '',
        endDate: '',
        shifts: ['Тут будет текущая смена '],
        selectShifts: '',
    },
    methods: {
        close: function () {
            window.close();
        },
        print: function () {
            window.print()
        }
    },
})