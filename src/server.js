const express = require('express');
const cors = require('cors');
const app = express();
const { Sequelize, Model, DataTypes } = require('sequelize');
const port = 8000;

app.use(express.json(), cors())

const sequelize = new Sequelize('test', 'root', '303000', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3301,
    logging: false
});


class Post extends Model {};

Post.init({
    name: {
        type: DataTypes.STRING,
        get(){
            const rawValue = this.getDataValue('name');
            return rawValue ? 'name :' + rawValue: null
        }
    },
    cep: {
        type: DataTypes.STRING,
        get(){
            const rawValue = this.getDataValue('name');
            return rawValue ? 'name :' + rawValue: null
        }
    },    
    cpf: {
        type: DataTypes.STRING,
        get(){
            const rawValue = this.getDataValue('name');
            return rawValue ? 'name :' + rawValue: null
        }
    } }, {
        sequelize,
        modelName: 'testing',
        tableName: 'ajax_post'
    }
);
Post.sync();

try{
    sequelize.authenticate();
    console.log('\nBanco de Dados conectado!\n');
} catch(err){
    console.error('\nUnable to connect to the database' + err + '\n');
};

const data = [];
let index = 0;

app.get('/', (req, res) => {
    return res.send(data)
}).post('/', (req, res) => {
    data.push(req.body)
    console.log(data[index])
    Post.create({
        name: data[index].Nome,
        cep: data[index].CEP,
        cpf: data[index].CPF
    })
    index += 1
    return res.json(data)
}).listen(port, () => {
    console.log("Servidor rodando na porta " + port + "\n")
});
