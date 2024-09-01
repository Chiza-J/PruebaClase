module.exports = (sequelize, Sequelize) => {
    const Departamento = sequelize.define('departamento', {
        idDepartamento: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        descripcion: {
            type: Sequelize.STRING(80)
        }
    });

    Departamento.associate = models => {
        Departamento.hasMany(models.Empleado, { 
            foreignKey: 'idDepartamento',  // Define la clave foránea aquí también
            as: 'empleados'  // Alias opcional para la relación
        });
    }

    return Departamento;
}
