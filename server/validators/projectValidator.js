import { body } from "express-validator";

const projectFieldsValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Project title is required")
    .isLength({ min: 3, max: 255 })
    .withMessage("Title must be between 3 and 255 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),

  body("github_url")
    .optional({ values: "falsy" })
    .isURL({
      require_protocol: true,
    })
    .withMessage("GitHub URL must be a valid URL"),

  body("live_url")
    .optional({ values: "falsy" })
    .isURL({
      require_protocol: true,
    })
    .withMessage("Live URL must be a valid URL"),

  body("featured")
    .optional()
    .isBoolean()
    .withMessage("Featured must be true or false"),
];

export const createProjectValidator = projectFieldsValidator;

export const updateProjectValidator = projectFieldsValidator;