module.exports = (sequelize, Sequelize) => {
    const Building = sequelize.define("building", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
    });

    return Building;
};