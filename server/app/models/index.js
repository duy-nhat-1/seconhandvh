const config = require("../config/configdb");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("../models/user.model.js")(sequelize, Sequelize);
db.roles = require("../models/role.model.js")(sequelize, Sequelize);
db.buildings = require("../models/building.model.js")(sequelize, Sequelize);
db.categories = require("../models/categories.model.js")(sequelize, Sequelize);
db.posts = require("../models/post.model.js")(sequelize, Sequelize);
db.products = require("../models/product.model.js")(sequelize, Sequelize);

db.roles.hasMany(db.users, { foreignKey: "roleId", as: "users" });
db.users.belongsTo(db.roles, {
    foreignKey: "roleId",
    as: "role",
});

db.users.hasMany(db.posts, { foreignKey: "userId", as: "posts" });
db.posts.belongsTo(db.users, {
    foreignKey: "userId",
    as: "user",
});

db.categories.hasMany(db.products, { foreignKey: "categoryId", as: "categories" });
db.products.belongsTo(db.categories, {
    foreignKey: "categoryId",
    as: "category",
});

db.posts.hasMany(db.products, { foreignKey: "postId", as: "posts" });
db.products.belongsTo(db.posts, {
    foreignKey: "postId",
    as: "post",
});

module.exports = db;