module.exports = (sequelize, DataTypes) => {
    const Tokens = sequelize.define('enterprises', {
        razao_social: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        contract_address: DataTypes.STRING,
        phone: DataTypes.STRING,
        cep: DataTypes.STRING,
    });
    return Tokens;
};