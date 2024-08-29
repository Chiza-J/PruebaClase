module.exports = (sequelize, Sequelize) => {
    const Empleado = sequelize.define('empleado', {
        idEmpleado: {
            autoIncrement: true,
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        primerNombre: {
            type: Sequelize.STRING(100)
        },
        segundoNombre: {
            type: Sequelize.STRING(100)
        },
        primerApellido: {
            type: Sequelize.STRING(100)
        },
        segundoApellido: {
            type: Sequelize.STRING(100)
        },
        NIT: {
            type: Sequelize.STRING(10)
        },
        salario: {
            type: Sequelize.NUMERIC
        },
        estatus: {
            type: Sequelize.NUMERIC
        },
        idDepartamento: {
            type: Sequelize.NUMERIC,
            
        }
    });

    return Empleado;
}
