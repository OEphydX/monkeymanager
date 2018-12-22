module.exports = (sequelize, DataTypes) => {
    var Monkey = sequelize.define('Monkey', {
      name: DataTypes.STRING,
	  weight: DataTypes.STRING,
	  color: DataTypes.STRING,
	  nomenclos: DataTypes.STRING
    });
  
    return Monkey;
  };