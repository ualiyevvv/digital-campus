const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const VerfCodes = sequelize.define('verfcode', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, allowNull: false},
    code: {type: DataTypes.STRING, allowNull: false},
    isActive: {type: DataTypes.BOOLEAN, defaultValue: true}
})

const Token = sequelize.define('token', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    refreshToken: {type: DataTypes.TEXT, allowNull: false},
})

const User = sequelize.define('user', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    email_confirmed: {type: DataTypes.DATE},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const ReqLog = sequelize.define('reqlog', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    resource: {type: DataTypes.STRING, allowNull: false},
    actor_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
})

const Notes = sequelize.define('explorer_note', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    resource: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.TEXT, allowNull: false},
})



const Location = sequelize.define('location', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT, allowNull: false},
    location_alias: {type: DataTypes.TEXT, allowNull: false},
    ways: {type: DataTypes.JSON},
    layout: {type: DataTypes.JSON},
})



// items: [{}] array of "stories"
/*  "story" element
    {
        img_src: {type: DataTypes.TEXT, allowNull: false},
        call_to_action: {text: '', href: ''},
    }
*/
const Highlights = sequelize.define('highlights', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    location_id: {type: DataTypes.STRING, allowNull: false},
    items: {type: DataTypes.JSON, allowNull: true},
    isArchive: {type: DataTypes.BOOLEAN, defaultValue: false},
    expiration_date: {type: DataTypes.DATE, allowNull: true},
})



User.hasMany(Notes)
Notes.belongsTo(User)

User.hasMany(Token)
Token.belongsTo(User)

User.hasMany(ReqLog, { foreignKey: 'actor_id', sourceKey: 'id' });
ReqLog.belongsTo(User, { foreignKey: 'actor_id', targetKey: 'id' });


module.exports = {
    User,
    VerfCodes,
    Token,
    ReqLog,
    Notes
}