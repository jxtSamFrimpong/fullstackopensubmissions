const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.addColumn('blogs', 'year', {
            type: DataTypes.INTEGER,
            validate: {
                customValidator(value) {
                    if (value === undefined || value === null || value < 1991 || value > new Date().getFullYear()) {
                        throw new Error(`year can't be null, less than 1991, or greater than current year ${new Date().getFullYear()}`);
                    }
                }
            }
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.removeColumn('blogs', 'year')
    },
}