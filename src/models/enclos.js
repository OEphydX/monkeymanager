module.exports = (sequelize, DataTypes) => {
    var Enclos = sequelize.define('Enclos', {
      name: DataTypes.STRING
	  
    });
  
    return Enclos;
  };