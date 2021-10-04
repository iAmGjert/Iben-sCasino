const sequelize = require('sequelize');
const { Sequelize } = require('sequelize');
const orm = new Sequelize('poker_database', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = orm.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sub: {
    type: 
    Sequelize.STRING,
    primaryKey: true,
    
  
  }, 
  name: {
    type: 
    Sequelize.STRING(255),
    allowNull: false,
  },
  picture: {
    type: 
    Sequelize.STRING(255),
    allowNull: false,
  },
  email: {
    type: 
    Sequelize.STRING(255),
    allowNull: false,
  },
  money: {
    type: Sequelize.INTEGER,
    defaultValue: 1000
  },

});

const Friends = orm.define('Friends', {
  friends: {
    type: 
    Sequelize.STRING(255),
  }
});

User.hasMany(Friends, { onDelete: 'CASCADE'});
Friends.belongsTo(User, {onDelete: 'CASCADE'});
//this is for the PokerGames table.  the userId points back to the user

const PokerGames = orm.define('PokerGames', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  deckId: {
    type: Sequelize.STRING(255)
  },
  userId: {
    type: Sequelize.STRING(255),
    
  },
  buyIn: {
    type: Sequelize.INTEGER,
    defaultValue: 50
  },

  moneyOnTable: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  bigBlind: {
    type: Sequelize.INTEGER,
    defaultValue: 10
  },

  hand: {
    type: Sequelize.STRING,
    defaultValue: '',
    get() {
      return this.getDataValue('hand').split(',');
    },
    set(val) {
      
      return this.setDataValue('hand', val.join(','));
    }

  },
  dealerHand: {
    type: Sequelize.STRING,
    defaultValue: '',
    get() {
      return this.getDataValue('dealerHand').split(',');
    },
    set(val) {
      
      return this.setDataValue('dealerHand', val.join(','));
    }
  },
  flop: {
    type: Sequelize.STRING,
    defaultValue: '',
    get() {
      return this.getDataValue('flop').split(',');
    },
    set(val) {
     
      return this.setDataValue('flop', val.join(','));
    }
  },
  takeHome: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  netEarnings: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }

});

User.hasMany(PokerGames, {foreignKey: {
  name: 'userId'
}});

User.hasMany(Friends);
Friends.belongsTo(User);


// Somehow use this to drop the database

User.sync()
  .then(() => {
  //       User.create(
  //         {
  //             sub: '37893',
  //             name: 'Maason Smith',
  //             picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvHH4XQ0CG0o5Msww62eqifaQ43TIxnBe3FQ&usqp=CAU',
  //             email: 'smithM292@gmail.com',
  //             money: 100,
              
  //         })
  //         User.create({
  //           sub: '38475',
  //           name: 'Eli Ricks',
  //           picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfUA-d1SWiTeLurM3CSzh5o9Gal6jj6uWiZA&usqp=CAU'  ,
  //           email: 'eRicks195@gmail.com',
  //           money: 60
            
  //       })
  //       User.create({
  //         sub: '29842',
  //         name: 'John Emery',
  //         picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2e4s_Oo_WEggvY6bcvOOBCAF4zKTXrrcNlg&usqp=CAU',
  //         email: 'johnJr215@gmail.com',
  //         money: 30
          
  //     })
  //     User.create({
  //       sub: '34387',
  //       name: 'Max Johnson',
  //       picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_r4IV6pUdB3mmLy4hgWrwoJmSqqMIdDElcQ&usqp=CAU',
  //       email: 'maxQB14@gmail.com',
  //       money: 50
        
  //   })
  //   User.create({
  //     sub: '29845',
  //     name: 'Avery Atkins',
  //     picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs2SVlmdrhn4NQpjj2OdPx1Rr1huqB5eXDuQ&usqp=CAU',
  //     email: 'aatkins18@gmail.com',
  //     money: 40
      
  // })
        
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


Friends.sync()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

PokerGames.sync()
  .then(() => {
    console.log('PokerGames.Sync');
  })
  .catch((err) => {
    console.log(err);
  });



exports.User = User;
exports.Friends = Friends;
exports.PokerGames = PokerGames;


