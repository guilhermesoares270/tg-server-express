// import { Sequelize } from "sequelize";
const Sequelize = require('sequelize');
require('dotenv').config();

const uri = process.env.DEV_DATABASE_URL ?? '';

// create sequelize instance
const sequelize = new Sequelize(
    uri,
    {
        // define: {
        //     created_at: "created_at",
        //     updated_at: "updated_at"
        // }
        define: {
            timestamps: true,
        }
    }
);

module.exports = sequelize;