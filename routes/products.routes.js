import {Router} from "express";
import {
    createProduct,
    deleteProductById,
    getAllProducts,
    getProductById,
    updateProductById
} from "../controllers/products.controller.js";
import {check} from "express-validator";
import {validateErrors, validateJWT} from "../middlewares/index.js";
import {isAdminRole} from "../middlewares/validate-roles.js";
import {categoryExistById, ProductExistById} from "../helpers/db-validators.js";

const productsRoutes = Router();

/**
 * {{url}}/api/products/
 * View All Products
 * public
 * Method: GET
 */
productsRoutes.get('/',getAllProducts);

/**
 * {{url}}/api/products
 * View one product for id
 * public
 * Method: GET
 */
productsRoutes.get('/:id',[
    check('id','No is a ID of mongo').isMongoId(),
    check('id').custom(ProductExistById),
    validateErrors
],getProductById);

/**
 * {{url}}/api/products
 * Create one product
 * Any user with token
 * Method: POST
 */
productsRoutes.post('/',[
    validateJWT,
    isAdminRole,
    check('data.name','The name is required').not().isEmpty(),
    check('data.category','The category is required').not().isEmpty(),
    check('data.category','No id mongoose').isMongoId(),
    check('data.category').custom( categoryExistById ),
    validateErrors
],createProduct);

/**
 * {{url}}/api/products
 * Update one product
 * Any user with token
 * Method: PUT
 */
productsRoutes.put('/:id',[
    validateJWT,
    check('id','No id mongoose').isMongoId(),
    check('id').custom(ProductExistById),
    validateErrors
],updateProductById);

/**
 * {{url}}/api/products
 * Update one product
 * User with role ADMIN_ROLE
 * Method: DELETE
 */
productsRoutes.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id','No id mongoose').isMongoId(),
    check('id').custom(ProductExistById),
    validateErrors
],deleteProductById);

export default productsRoutes;
