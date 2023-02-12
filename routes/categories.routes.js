import {Router} from "express";
import {check} from "express-validator";

import {validateErrors} from "../middlewares/index.js";
import {validateJWT} from "../middlewares/index.js";
import {
    createCategory, deleteCategoryById,
    getAllCategory,
    getCategoryById,
    updateCategoryById
} from "../controllers/categories.controller.js";
import {categoryExistById} from "../helpers/db-validators.js";
import {isAdminRole} from "../middlewares/validate-roles.js";

const categoriesRoutes = Router();

/**
 * {{url}}/api/categories
 * View All Categories
 * public
 * Method: GET
 */
categoriesRoutes.get('/' , getAllCategory)

/**
 * {{url}}/api/categories
 * View one Category for id
 * public
 * Method: GET
 */
categoriesRoutes.get('/:id' ,
    [
        check('id','No is a ID of mongo').isMongoId(),
        check('id').custom(categoryExistById),
        validateErrors
    ],
    getCategoryById)

/**
 * {{url}}/api/categories
 * Create one Category
 * Any user with token
 * Method: POST
 */
categoriesRoutes.post('/' ,[
    validateJWT,
    check('name','The name of category is requerid').not().isEmpty(),
    validateErrors
],createCategory)

/**
 * {{url}}/api/categories
 * Update one Category
 * Any user with token
 * Method: PUT
 */
categoriesRoutes.put('/:id' ,[
    validateJWT,
    check('name','The name is required').not().isEmpty(),
    check('id').custom(categoryExistById),
    validateErrors
], updateCategoryById)

/**
 * {{url}}/api/categories
 * Update one Category
 * User with role ADMIN_ROLE
 * Method: DELETE
 */
categoriesRoutes.delete('/:id' ,[
    validateJWT,
    isAdminRole,
    check('id','No is a ID of mongo').isMongoId(),
    check('id').custom(categoryExistById),
    validateErrors
], deleteCategoryById)


export default categoriesRoutes;
