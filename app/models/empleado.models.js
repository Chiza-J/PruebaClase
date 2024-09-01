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
        idDepartamento: {  // Aquí se define el campo de clave foránea
            type: Sequelize.INTEGER,
            references: {
                model: 'departamentos', // Nombre de la tabla a la que hace referencia
                key: 'idDepartamento'
            }
        }
    });

    Empleado.associate = models => {
        Empleado.belongsTo(models.Departamento, { 
            foreignKey: 'idDepartamento',  // Asegura que la clave foránea esté definida
            as: 'departamento'  // Alias opcional para la relación
        });
    }

    return Empleado;
}
