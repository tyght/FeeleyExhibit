module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define('Blog', {
        title: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        pictures: DataTypes.TEXT,
        content: DataTypes.TEXT,
        category: DataTypes.STRING,     
        status: DataTypes.STRING,
    })
    return Blog
}