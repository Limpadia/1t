const fs = require ('fs');
const path = require ('path');




const { Sequelize, DataTypes, Op } = require('sequelize')

const sequelize = new Sequelize('app', 'root', 'pass',{
    host: 'localhost',
    dialect: 'mysql'
})

const Authors = sequelize.define('Authors', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    }
}, {
    timestamps: false
})

const Books = sequelize.define('Books', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    published: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    genre_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

const Genres = sequelize.define('Genres', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

sequelize.sync({force: false}).then(async () => {
    await Authors.create({first_name: 'Павел', last_name: 'Чехов', birthday: 1860-01-17})
    await Books.create({name: 'Чехов 3', published: '1866', author_id: 1, genre_id: 1})
    await Genres.create({name: 'Антиутопия'})
    await Authors.create({first_name: 'Лев', last_name: 'Толстой', birthday: 1910-11-20})
    await Books.create({name: 'Толстой: Возвращение', published: '1988', author_id: 2, genre_id: 2})
    await Genres.create({name: 'Киберпанк'})

    const authors = await Authors.findAll()
    console.log("All authors:", JSON.stringify(authors, null, 2));

    const book = await Books.findByPk(6);
    if (book === null) {
        console.log('Not found!');
    } else {
        console.log(book instanceof Books); 
    }
    console.log(book);

    const booksAll = await Books.findAll({
        where: {
            name: {
                [Op.like]: '%ов%'
            }
        }
    })
    console.log(booksAll);