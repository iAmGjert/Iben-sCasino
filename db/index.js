const Sequelize = require('Sequelize');
const orm = new Sequelize('pokerDatabase', '/*username*/', '/*password*/', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = orm.define('User', {
  sub: Sequelize.NUMBER,
  name: Sequelize.STRING,
  picture: Sequelize.STRING,
  email: Sequelize.STRING,
});

const Friends = orm.define('Friends', {
  friends: Sequelize.STRING,
});

User.hasMany(Friends);
Friends.belongsTo(User);


// Somehow use this to drop the database
User.sync()
  .then(() => {
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


*/