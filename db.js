const { Sequelize, DataTypes, Op } = require("sequelize");
const moment = require("moment");


let sequelize = null;
let db = {};
let serialNumberOffset = 0;

async function db_connect(/*dbParams,*/ showOkMessage = false) {
    let database = 'gtc_db';
    let username = 'myuser';
    let password = '1234';
    // let password = 'Z12x34c56V78';
    // TODO try to reconnect if(sequelize != null) sequelize.close();
    sequelize = new Sequelize(database, username, password, {
        host: 'localhost',  //dbParams.host,    /*get outside*/
        port: 3306,         //dbParams.port,    /*get outside*/
        dialect: 'mysql',
        logging: false
        /* 
        disable logging or provide a custom logging function; 
        default: console.log
        logging: false
        */
    });
    try {
        await sequelize.authenticate();
        db = require('./models')(sequelize, DataTypes);
        await sequelize.sync();
        await getSerialNumberOffset();
        console.log('function db_connect serialNumberOffset', serialNumberOffset)
        if (showOkMessage) console.log(`function db_connect Connection to the Database was established successfully!`); //showMessage(DB_CONNECT_OK_MESSAGE, false);
        return true;
    } catch (error) {
        console.log(error);
        //errorDbConnect();
        console.log('Database connection error!\n'); //showMessage(DB_CONNECT_ERR_MESSAGE);
        //showMessage(`${DB_CONNECT_ERR_MESSAGE}host = ${dbParams.host}\nport = ${dbParams.port}`);
        // mainWindow.webContents.on('dom-ready', () => {
        //     mainWindow.webContents.send('db_connect', db_connect);  // Send order to Bill window
        // })
        return false;
    }
}

async function createOperator(operator) {
    if (sequelize == null) return false;
    operators = await db.Operator.findAll({ where: { login: operator.login, active: true } });
    operators = operators.map((operator) => { return operator.dataValues });
    if (operators.length == 0) {
        await db.Operator.create(operator);
        return true;
    }
    // else showMessage(`Error! \nOperator with login ${operator.login} already exist!`);
    return false;
}

async function deactivateOperator(whereObj) {
    try {
        await db.Operator.update({ active: false }, {
            where: whereObj
        });
        return true;
    }
    catch (error) { console.error(error); }
    return false;
}

async function getOperators(whereObj = null) {
    let operators;
    try {
        if (whereObj == null)
            operators = await db.Operator.findAll();
        else
            operators = await db.Operator.findAll({
                where: whereObj
            });
        operators = operators.map((operator) => { return operator.dataValues });
        console.log('%%%%  getOperators  %%%%', operators)
        return operators;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}

/*
inDate: "2020-11-04 00:16:49"
tare: 1000
materialName: "40-60mm"
customerName: "A Customer"
vehicleNumber: "A-123"
inOperatorId: 1

gross: null
id: null
inOperator: undefined
net: null
outDate: null
outOperator: ""
*/

async function createMarkerOrder(serialNumber) {
    let markOrder = {
        inDate: new moment().format("YYYY-MM-DD HH:mm:ss"),
        tare: serialNumber,
        //vehicleNumber: "unknown"
    }
    let mark = await db.Order.create(markOrder);
    serialNumberOffset = mark.dataValues.tare - mark.dataValues.id - 1;
    console.log('mark serialNumberOffset = ', serialNumberOffset)
}

async function getSerialNumberOffset() {
    let orders = await db.Order.findAll({
        where: { materialName: { [Op.eq]: null } },
        order: [['inDate', 'DESC']],
        attributes: ['tare', 'id'],
    });
    if (orders.length == 0) {
        serialNumberOffset = 0;
        return 0;
    }
    //console.log(orders)
    serialNumberOffset = orders[0].dataValues.tare - orders[0].dataValues.id - 1;
    return serialNumberOffset;
}

async function updateOrder(orderId, updateParams) {
    if (sequelize == null) return false;
    await db.Order.update(updateParams, {
        where: { id: orderId }
    });
    return true;
}

async function changeOrderVehicle(orderId, customerId, newVehicleNumber) {
    if (sequelize == null) return false;
    let v = db.Vehicle.findOrCreate({ where: { vehicleNumber: newVehicleNumber }, defaults: { vehicleNumber: newVehicleNumber } });
    let o = db.Order.update({ vehicleNumber: newVehicleNumber }, {
        where: { id: orderId }
    });
    let c = db.Couple.findOrCreate({
        where: { vehicleNumber: newVehicleNumber, CustomerId: customerId },  /*c[0].id*/
        defaults: { vehicleNumber: newVehicleNumber, CustomerId: customerId }  /*c[0].id*/
    });
    await Promise.all([v, c, o]);
}

async function getBatchersInfo(_shiftId){
    let batchers = await db.BatcherLine.findAll({
        where: {shiftId: _shiftId},
        raw: true
    });
    let res = {skips: 0, weight: 0};
    if(batchers == null || batchers.length == 0) return res;
    for(let i = 0; i < batchers.length; i++){
        res.skips += 1;
        res.weight += batchers[i].net;
    }
    return res;
}

async function getClosedShift(beginDate, reserv = false /*endDate reserved*/){
    let whereObj = {};
    if(reserv) whereObj = { beginDate: {[Op.eq]: beginDate}, reserved: {[Op.eq]: true} };
    else whereObj = { beginDate: {[Op.eq]: beginDate}, endDate: {[Op.ne]: null} ,reserved: {[Op.ne]: true} };
    let shift = await db.Shift.findOne({
        where: whereObj,
        raw: true
    });
    console.log(`db getClosedShift=${JSON.stringify(shift)}`);
    return shift;
}

async function checkAndWriteShift(shift, reserv = false) {
    const objectIndex = 0;
    const createdIndex = 1;
    let res = [];   // [{"batcher": "L Skip", "number": "33", "gross": "10390", "tare": "370", "net": 10020, "time": "2021-06-02 12:19:46"}]
    let prArr = [];
    const [s, sCreated] = await db.Shift.findOrCreate({   // "begitDate": "2021-06-02 10:37:43"
        where: { beginDate: shift.beginDate },
        defaults: { beginDate: shift.beginDate },
        raw: true
    });
    if (sCreated) console.log(`Created element ${JSON.stringify(s)}`)
    else  console.log(`Parse element ${JSON.stringify(s)}`)
    for (let i = 0; i < shift.datas.length; i++) {
        //console.log( `set new value  ${JSON.stringify({...shift.datas[i], shiftId: s.beginDate})}` );
        let pAr = db.BatcherLine.findOrCreate({
            where: { ...shift.datas[i], shiftId: s.beginDate }, //
            default: { ...shift.datas[i], shiftId: s.beginDate },
            raw: true
        });
        prArr.push(pAr);
    }
    prArr = await Promise.all(prArr);
    if (prArr.length) {
        prArr.forEach((p) => {
            //console.log(p[0])
            if (p[createdIndex]) res.push(p[objectIndex]);
        });
        console.log(`NEW ELEMENTS: \n ${JSON.stringify(res, null, 4)}`)
    }
    let bInfo = await getBatchersInfo(s.beginDate);     // {skips: ..., weight: ...}
    console.log(`DB function checkAndWriteShift: current butcher info: ${JSON.stringify(bInfo)}`)
    if((s.endDate == null && shift.hasOwnProperty("endDate")) || (reserv && s.reserved != true)) {
        if(reserv)console.log('Reserv close procedure'); else console.log('Closed shift procedure')
        await db.Shift.update(
            {endDate: shift.endDate, skips: bInfo.skips, weight: bInfo.weight, reserved: reserv},
            {where: {beginDate: s.beginDate}}
        );
    }
    else {
        console.log('Shift is not closed yet.')
    }
    return res;
}

async function getShifts(from, till){
    let shifts = await db.Shift.findAll({
        where: {beginDate: { [Op.between]: [from, till] }},
        raw: true
    });
    console.log(`db getShifts(from, till)=${JSON.stringify(shifts)}`);
    return shift;
}

async function getShiftBatchers(beginDate/*Shift.beginDate*/){
    let batchers = await db.BatcherLine.findAll({
        where: {shiftId: beginDate},
        order: [['number', 'ASC']], //'DESC'
        raw: true
    });
    console.log(`getShiftBatchers(Shift.beginDate):\n${JSON.stringify(batchers)}`);
    return batchers;
}

async function createOrder(ord) {        // TODO try cach & message
    if (sequelize == null) return false;
    //console.log(JSON.stringify(db) )
    let v = db.Vehicle.findOrCreate({ where: { vehicleNumber: ord.vehicleNumber }, defaults: { vehicleNumber: ord.vehicleNumber } });
    //let c = db.Customer.findOrCreate({ where: { customerName: ord.customerName }, defaults: { customerName: ord.customerName } });

    let c = db.Customer.findOne({ where: { id: ord.CustomerId } }); //customerName: customerName

    let m = db.Material.findOrCreate({ where: { materialName: ord.materialName }, defaults: { materialName: ord.materialName } });
    [v, c, m] = await Promise.all([v, c, m]);
    let cp = await db.Couple.findOrCreate({
        where: { vehicleNumber: v[0].vehicleNumber, CustomerId: c.id },  /*c[0].id*/
        defaults: { vehicleNumber: v[0].vehicleNumber, CustomerId: c.id }  /*c[0].id*/
    });
    let o = { ...ord, CustomerId: c.id }   /*c[0].id*/
    //console.log(JSON.stringify(o, null, 4))
    let created = await db.Order.create(o);
    //console.log('offfffffoffffffffffffofffffff', serialNumberOffset)
    await created.update({ serialNumber: created.dataValues.id + serialNumberOffset })
    console.log('ggggggggggggg', JSON.stringify(created));
    // console.log('v', JSON.stringify(v[0].vehicleNumber) )
    // console.log('v', JSON.stringify(v[1]) )
    // console.log('c', JSON.stringify(c[0].id) )
    // console.log('c', JSON.stringify(c[1]) )
    // console.log('m', JSON.stringify(m[0].materialName) )
    // console.log('m', JSON.stringify(m[1]) )
    // console.log('cp', JSON.stringify(cp[0]) )
    return created.id;
}

async function createTrainCars(cars, orderId) {
    let promises = [];
    for (let i = 0; i < cars.length; i++) {
        let car = { ...cars[i], orderId: orderId };
        promises.push(db.TrainCar.create(car));
    }
    await Promise.all(promises);

}

async function updateTrainCars(cars, orderId) {
    let promises = [];
    for (let i = 0; i < cars.length; i++) {
        // let dbCar = db.TrainCar.findOne({ where: {orderId: orderId, index: cars[i].index } });

        let dbCar = db.TrainCar.update({ gross: cars[i].gross, net: cars[i].net }, {
            where: { orderId: orderId, index: cars[i].index }
        });
        promises.push(dbCar);
    }
    await Promise.all(promises);

}

async function getTrainCars(id){
    let cars = await db.TrainCar.findAll({
        where: {orderId: id},
        // limit: null,
        order: [['index', 'ASC']],
        raw: true
    });
    return cars;
}

//{ dateBegin, dateEnd, inOrders = false }
async function getOrders(params) {
    if (sequelize == null) return false;
    let whereObj = {};
    let sort = [];
    //let limit = null;
    if (params.inOrders) whereObj = { gross: { [Op.eq]: null }, materialName: { [Op.ne]: null } };
    else {
        whereObj = { gross: { [Op.ne]: null, } };
        if (params.hasOwnProperty('from')) {
            //console.log('uuuuuuuuuuuuuu', params.from, 'ssssssss', params.to)
            whereObj.outDate = { [Op.between]: [params.from, params.to] };
            console.log(whereObj.outDate)
            if (params.hasOwnProperty('material'))
                whereObj.materialName = { [Op.eq]: params.material };
            else if (params.hasOwnProperty('customer'))
                whereObj.CustomerId = { [Op.eq]: params.customer };
        }
        if (params.hasOwnProperty('sort')) sort = params.sort;
        //if(params.hasOwnProperty('limit')) limit = params.limit;
    }
    let orders = await db.Order.findAll({
        where: whereObj,
        // limit: null,
        order: sort,
        include: [
            { model: db.Customer, attributes: ['customerName'] },
            { model: db.Operator, as: 'inOperator', attributes: ['fullName'] },
            { model: db.Operator, as: 'outOperator', attributes: ['fullName'] }
        ]
    });
    //console.log(JSON.stringify(orders, null, 4))
    orders = orders.map((order) => {
        let opName = order.inOperator.dataValues.fullName;
        let cName = order.Customer.customerName;
        let or = {
            ...order.dataValues, inOperatorName: opName, customerName: cName,
            outOperatorName: (order.outOperator == null) ? ('') : (order.outOperator.dataValues.fullName),
            inDate: moment(order.dataValues.inDate).format("YYYY-MM-DD HH:mm:ss"),
            outDate: (params.inOrders) ? ('') : (moment(order.dataValues.outDate).format("YYYY-MM-DD HH:mm:ss")),
        };
        delete or.inOperator;
        delete or.outOperator;
        delete or.Customer;
        return or;
    });
    // console.log(JSON.stringify(orders, null, 4))
    return orders
}

async function getLastFinishedOrederId() {
    if (sequelize == null) return [];
    let ord = await db.Order.findOne({
        where: {
            gross: { [Op.ne]: null },
        },
        order: [['outDate', 'DESC']],
        attributes: ['id']
    });
    console.log('getLast', (ord == null) ? ('not created yet') : (ord.id));
    return ord == null ? null : ord.id;
}


async function getVehicles(inOnly = false) {
    let query = '';
    let inquery = 'SELECT distinct Orders.vehicleNumber FROM Orders where Orders.gross is null and Orders.vehicleNumber is not null';
    if (inOnly) query = inquery;
    else {
        query += 'SELECT distinct Vehicles.vehicleNumber FROM Vehicles ';
        query += `WHERE vehicleNumber NOT IN(${inquery})`;
    }
    const [results, metadata] = await sequelize.query(query);
    let nums = results.map(res => res.vehicleNumber);
    console.log("numbers", nums)
    return nums;
}

async function getCustomers(withNickName = false) {
    let whereObj = {};
    if (withNickName) whereObj = {
        nickName: { [Op.ne]: null },
    };
    let customers = await db.Customer.findAll({
        where: whereObj,
        attributes: ['id', 'customerName', 'nickName'],
        order: [['nickName', 'DESC']],
        distinct: true,
        raw: true
    })
    console.log(JSON.stringify(customers, null, 4))
    return customers;
}

//customer Name or Number
async function getCustomerId(nameOrNumber, byNumber = false) {
    let whereObj = {};
    if (byNumber) whereObj = { where: { nickName: nameOrNumber } };
    else whereObj = { where: { customerName: nameOrNumber } };
    let cust = await db.Customer.findOne(whereObj);
    if (cust != null) return cust.dataValues.id;
    return null;
}

async function addCustomer(customer) {
    let id = await getCustomerId(customer.customerName);
    if (id != null) return null;     // customer already exists
    let c = db.Customer.create(customer);
    return c;
}

async function changeCustomerNickName(id, nickName = null) {
    let c = db.Customer.update({ nickName: nickName }, {
        where: { id: id }
    });
    return c;
}

module.exports = {
    connectDB: db_connect,

    checkAndWriteShift: checkAndWriteShift,
    getClosedShift: getClosedShift,
    getShifts: getShifts,
    getShiftBatchers: getShiftBatchers,

    createOperator: createOperator,
    getOperators: getOperators,
    deactivateOperator: deactivateOperator,

    createOrder: createOrder,
    getOrders: getOrders,
    updateOrder: updateOrder,
    getLastFinishedOrederId: getLastFinishedOrederId,
    changeOrderVehicle: changeOrderVehicle,

    getVehicles: getVehicles,
    getCustomers: getCustomers,
    getCustomerId: getCustomerId,
    addCustomer: addCustomer,
    changeCustomerNickName: changeCustomerNickName,

    createMarkerOrder: createMarkerOrder,
    getSerialNumberOffset: getSerialNumberOffset,
    createTrainCars: createTrainCars,
    updateTrainCars: updateTrainCars,
    getTrainCars: getTrainCars
};