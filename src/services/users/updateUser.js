import userData from "../../data/users.json" assert { type: "json" };

const updateUserById = (id, updatedUser) => {
  const userIndex = userData.users.findIndex(user => user.id === id);

  if (userIndex === -1) {
    //als id niet is gevonden en er dus geen index is
    return null;
  }

  const { username, name, password, image } = updatedUser;

  userData.users[userIndex] = {
    ...userData.users[userIndex],
    username: username || userData.users[userIndex].username,
    name: name || userData.users[userIndex].name,
    password: password || userData.users[userIndex].password,
    image: image || userData.users[userIndex].image,
  };
  return userData.users[userIndex];
};

export default updateUserById;
