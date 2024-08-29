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

    return Departamento;
}
