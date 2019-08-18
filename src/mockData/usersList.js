const USERS_NUMBER = 10;
const TEMPLATE = {
  fullName: 'User ', // Instead of Second Name we use "number" in order to automatically generate list of users, for same reason we use const First name.
  imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO5hVKP3zB2XTgLGtLvDbczF3ZDWbjD5ki9uxZGkUD7AIhRr-n',
  email: '@email.com',
};

const usersList = [];
const usersInfo = {};
for (let i = 0; i < USERS_NUMBER; i++) {
  const newUser = {
    id: `${ i }`,
    fullName: `${ TEMPLATE.fullName } ${ i + 1 }`,
    imageUrl: TEMPLATE.imageUrl,
    email: `user${ i + 1 }${ TEMPLATE.email }`,
  };

  // With such structure easy work on client (for update case, no need each time iterate through entire array to find element to update)
  usersList.push(newUser.id);
  usersInfo[newUser.id] = newUser;
}

// Get only short information about user
export const getUsers = () => ({ list: usersList, info: usersInfo });

// Get full information about user
export const getUser = (id) => {
  const foundUser = usersInfo[id];

  // Add missed information
  const intId = Number.parseInt(id);
  foundUser.birthday = `${ intId + 1 }/${ intId + 1 }/${ 1900 + intId }`;
  foundUser.address = `Israel, Tel-Aviv, Igal Alon ${ id + 1 }`;
  return foundUser;
};