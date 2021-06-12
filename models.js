
module.exports = (sequelize, DataTypes) => {

    const Vehicle = sequelize.define('Vehicle', {
        vehicleNumber: {
            type: DataTypes.STRING(10),
            primaryKey: true,
        },
    },
        {
            timestamps: false
        }
    );

    const Customer = sequelize.define('Customer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        customerName: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        nickName: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

    }, {
        timestamps: false,
    });

    const Material = sequelize.define('Material', {
        materialName: {
            type: DataTypes.STRING(10),
            primaryKey: true,
        },
    }, {
        timestamps: false,
    });

    const Operator = sequelize.define('Operator', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fullName: {
            type: DataTypes.STRING(20),
        },
        login: {
            type: DataTypes.STRING(15),
            allowNull: false,

        },
        password: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING(8),    /*Operator or Admin*/
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
        {
            // Other model options go here
            //timestamps: false,
        });

    const Order = sequelize.define('Order', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        serialNumber: { type: DataTypes.INTEGER },
        inDate: {
            type: DataTypes.DATE,
            allowNull: false,
            // defaultValue: Sequelize.NOW, 
        },
        tare: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gross: { type: DataTypes.INTEGER },
        net: { type: DataTypes.INTEGER },
        outDate: { type: DataTypes.DATE },
    }, {
        timestamps: false,
    });

    const TrainCar = sequelize.define('TrainCar', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        index: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tare: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gross: { type: DataTypes.INTEGER },
        net: { type: DataTypes.INTEGER },
        carNumber: {
            type: DataTypes.STRING(15),
            //allowNull: false,
        }
    }, {
        timestamps: false,
    });

    const Couple = sequelize.define('Couple', {
        CustomerId: {
            type: DataTypes.INTEGER,
            references: {
                model: Customer,
                key: 'id'
            }
        },
        vehicleNumber: {
            type: DataTypes.STRING(10),
            references: {
                model: Vehicle,
                key: 'vehicleNumber'
            }
        }
    }, {
        timestamps: false,
    });

    Order.belongsTo(Material, { foreignKey: 'materialName' });
    Material.hasMany(Order, { foreignKey: 'materialName' });

    Order.belongsTo(Customer, { foreignKey: 'CustomerId' });
    Customer.hasMany(Order, { foreignKey: 'CustomerId' });

    Order.belongsTo(Vehicle, { foreignKey: 'vehicleNumber' });
    Vehicle.hasMany(Order, { foreignKey: 'vehicleNumber' });

    Order.belongsTo(Operator, { foreignKey: 'inOperatorId', as: 'inOperator' });
    Order.belongsTo(Operator, { foreignKey: 'outOperatorId', as: 'outOperator' });
    Operator.hasMany(Order, { foreignKey: 'inOperatorId', as: 'inOperator' });
    Operator.hasMany(Order, { foreignKey: 'outOperatorId', as: 'outOperator' });

    TrainCar.belongsTo(Order, { foreignKey: 'orderId' });
    Order.hasMany(TrainCar, { foreignKey: 'orderId' });

    Vehicle.belongsToMany(Customer, { through: 'Couple', foreignKey: 'vehicleNumber' });
    Customer.belongsToMany(Vehicle, { through: 'Couple' });

    /**********************************************************************
                        BATCHER
    ***********************************************************************/
    const Chief = sequelize.define('Chief', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        // fullName: {
        //     primaryKey: true,
        //     type: DataTypes.STRING(20),
        // },
        name: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        fatherName: {
            type: DataTypes.STRING(15),
        }
    }, {
        timestamps: false
    });

    const Team = sequelize.define('Team', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
    }, {
        timestamps: false
    });

    const Shift = sequelize.define('Shift', {
        beginDate: {
            type: DataTypes.DATE,
            primaryKey: true,
            //allowNull: false,
            // defaultValue: Sequelize.NOW, 
        },
        endDate: { type: DataTypes.DATE },
        skips: { type: DataTypes.INTEGER },
        weight: { type: DataTypes.INTEGER },
        reserved: { type: DataTypes.BOOLEAN}
    }, {
        timestamps: false
    });

    const BatcherLine = sequelize.define('BatcherLine', {
        // id: {
        //     autoIncrement: true,
        //     primaryKey: true,
        //     type: DataTypes.INTEGER,
        // },
        time: {
            primaryKey: true,
            type: DataTypes.DATE,       // inDate: new moment().format("YYYY-MM-DD HH:mm:ss")
            //allowNull: false,
        },
        batcher: {
            type: DataTypes.ENUM,
            values: ['L Skip', 'R Skip'],
            allowNull: false
        },
        number: { type: DataTypes.INTEGER, allowNull: false },
        gross: { type: DataTypes.INTEGER, allowNull: false },
        tare: { type: DataTypes.INTEGER, allowNull: false },
        net: { type: DataTypes.INTEGER, allowNull: false },
    }, {
        timestamps: false
    });

    BatcherLine.belongsTo(Shift, {foreignKey: 'shiftId' });
    Shift.hasMany(BatcherLine, {foreignKey: 'shiftId'});
    
    return { Shift, BatcherLine, Vehicle, Customer, Material, Operator, Order, Couple, TrainCar };
};