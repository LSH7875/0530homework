
const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            userid:{
                type:Sequelize.STRING(40),
                allowNull:false,
            },
            userpw:{
                type:Sequelize.STRING(),
                allowNull:false
            },
            username:{
                type:Sequelize.STRING(40),
                allowNull:false,
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            Modelname:'Join',
            tablename:'joins',
            charset:'utf8',
            collate:'utf8_general_ci'
        })
    }
}