module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("categrory", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        categoryName: {
            type: Sequelize.STRING
        },
    });

    return Category;
};