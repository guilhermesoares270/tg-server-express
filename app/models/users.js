module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        cpf: DataTypes.STRING,
        password: DataTypes.STRING,
        enterprise_id: DataTypes.INTEGER,
        enterprise_cnpj: DataTypes.STRING,
    });
    return User;
};