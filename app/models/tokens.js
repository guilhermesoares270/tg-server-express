module.exports = (sequelize, DataTypes) => {
    const Tokens = sequelize.define('tokens', {
        user_id: DataTypes.INTEGER,
        token: DataTypes.STRING,
        type: DataTypes.STRING,
        is_revoked: DataTypes.BOOLEAN,
    });
    return Tokens;
};