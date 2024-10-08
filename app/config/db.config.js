const env = require('./env.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    

    pool: {
        max: env.pool.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle,
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Departamento = require('../models/departamento.models.js')(sequelize, Sequelize);
db.Empleado = require('../models/empleado.models.js')(sequelize, Sequelize);
db.Cliente = require('../models/cliente.models.js')(sequelize, Sequelize);
db.Proveedor = require('../models/proveedor.models.js')(sequelize, Sequelize);
db.Producto = require('../models/producto.models.js')(sequelize, Sequelize);
db.Factura = require('../models/factura.models.js')(sequelize, Sequelize);
db.FacturaDetalle = require('../models/detalleFactura.models.js')(sequelize, Sequelize);

module.exports = db;
