import { Router } from "express";
import createUser from "../services/users/createUser.js";
import deleteUserById from "../services/users/deleteUser.js";
import getUserById from "../services/users/getUserById.js";
import getUsers from "../services/users/getUsers.js";
import updateUserById from "../services/users/updateUser.js";
import jwtCheck from "../utils/jwtCheck.js";

const router = Router();

router.get("/", jwtCheck, (req, res) => {
  const users = getUsers();
  res.json(users);
});

router.get("/:id", jwtCheck, (req, res) => {
  const { id } = req.params;
  const user = getUserById(id);

  if (!user) {
    res.status(404).json({ message: `User with ID ${id} not found` });
  } else {
    res.status(200).json(user);
  }
});

router.post("/", jwtCheck, (req, res) => {
  const { name, password, username, image } = req.body;
  const newUser = createUser(name, password, username, image);
  res.status(201).json(newUser);
});

router.delete("/:id", jwtCheck, (req, res) => {
  const { id } = req.params;
  const user = deleteUserById(id);

  if (user) {
    res.status(200).send({ message: `User with ID ${id} succesfully deleted` });
  } else {
    res.status(404).json({ message: `User with ID ${id} not found` });
  }
});

router.put("/:id", jwtCheck, (req, res) => {
  const { id } = req.params;
  const { name, password, username, image } = req.body;
  const user = updateUserById(id, { name, password, username, image });

  if (user) {
    res
      .status(200)
      .send({ message: `User with id ${id} succesfully updated!` });
  } else {
    res.status(404).json({ message: `User with id ${id} not found!` });
  }
});

export default router;
