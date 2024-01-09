import { Router } from "express";
import getCategories from "../services/categories/getCategories.js";
import getCategoryById from "../services/categories/getCategoryById.js";
import deleteCategoryById from "../services/categories/deleteCategory.js";
import updateCategoryById from "../services/categories/updateCategory.js";
import createCategory from "../services/categories/createCategory.js";
import jwtCheck from "../utils/jwtCheck.js";

const router = Router();

router.get("/", jwtCheck, (req, res) => {
  const categories = getCategories();
  res.json(categories);
});

router.get("/:id", jwtCheck, (req, res) => {
  const { id } = req.params;
  const category = getCategoryById(id);

  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).json({ message: `Category with id${id} not found!` });
  }
});

router.delete("/:id", jwtCheck, (req, res) => {
  const { id } = req.params;
  const category = deleteCategoryById(id);

  if (category) {
    res
      .status(200)
      .send({ message: `Category with id ${id} succesfully deleted` });
  } else {
    res.status(404).json({ message: `Category wirh id${id} not found` });
  }
});

router.post("/", jwtCheck, (req, res) => {
  const { name } = req.body;
  const newCategory = createCategory(name);
  res.status(201).json(newCategory);
});

router.put("/:id", jwtCheck, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = updateCategoryById(id, { name });

  if (category) {
    res
      .status(200)
      .send({ message: `Category with id${id} succesfully updated` });
  } else {
    res.status(404).json({ message: `Category with id${id} not found` });
  }
});
export default router;
