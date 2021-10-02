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
    defaultValue: 100
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



exports.User = User;
exports.Friends = Friends;


/* 
What we want from Google's response object:


_json: {
    sub: '103142624207000582841',
    name: 'Fake Name',
    given_name: 'Fake',
    family_name: 'Name',
    picture: 'https://lh3.googleusercontent.com/a/AATXAJy5P40GuxnnfVaZ-ui46btUz5Htfc7A88c6yGWQ=s96-c',
     email: 'tangney6@gmail.com',
    email_verified: true,
    locale: 'en'
  }

////////////////////////////////////////////////////////////////////////////////////////

full google response object:

{
  id: '103142624207000582841',
  displayName: 'Fake Name',
  name: { familyName: 'Name', givenName: 'Fake' },
  photos: [
    {
      value: 'https://lh3.googleusercontent.com/a/AATXAJy5P40GuxnnfVaZ-ui46btUz5Htfc7A88c6yGWQ=s96-c'
    }
  ],
  provider: 'google',
  _raw: '{\n' +
    '  "sub": "103142624207000582841",\n' +
    '  "name": "Fake Name",\n' +
    '  "given_name": "Fake",\n' +
    '  "family_name": "Name",\n' +
    '  "picture": "https://lh3.googleusercontent.com/a/AATXAJy5P40GuxnnfVaZ-ui46btUz5Htfc7A88c6yGWQ\\u003ds96-c",\n' +
    '  "locale": "en"\n' +
    '}',
  _json: {
    sub: '103142624207000582841',
    name: 'Fake Name',
    given_name: 'Fake',
    family_name: 'Name',
    picture: 'https://lh3.googleusercontent.com/a/AATXAJy5P40GuxnnfVaZ-ui46btUz5Htfc7A88c6yGWQ=s96-c',
     email: 'tangney6@gmail.com',
    email_verified: true,
    locale: 'en'
  }
}
  student_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    class: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    section: {
      type: DataTypes.STRING(50),
      allowNull:false
    },
    roll_number: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique:true
    }

*/