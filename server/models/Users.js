

module.exports = (sequelize,DataTypes) =>{
  const Users = sequelize.define("Users",{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.BIGINT ,
        defaultValue: '20000'
      },
  })
}