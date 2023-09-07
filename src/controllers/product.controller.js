import CustomError from "../services/errors/custom_error.js";
import EErros from "../services/errors/enums.js";
import { generateProductCreationInfo } from "../services/errors/info.js";
import { ProductService } from "../services/index.js";

export const getProducts = async(req, res) => {
    let result = await ProductService.getAllPaginatedProducts(req)
    res.status(result.statusCode).json(result.response)
}

export const getProductWithId = async(req, res) => {
    try{
        let id = req.params.id
        let productById = await ProductService.getProductById(id)
        if(productById === null){
            return res.status(404).json({ status: 'error', error: 'Not Found'})
        }
        return res.status(201).json({ status: 'success', payload: productById })
    } catch(err){
        res.status(500).json({ status: 'error', error: err.message })
    }
}

export const addProduct = async(req, res, next) => {
    try{
        let newProduct = req.body
        if(!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.code || !newProduct.stock || !newProduct.category){
            CustomError.createError({
                name: 'All fields must be filled.',
                cause: generateProductCreationInfo(newProduct),
                message: 'Error trying to create a product.',
                code: EErros.PRODUCT_INCOMPLETE
            })
        }
        let productGenerated = await ProductService.createProduct(newProduct)
        const products = await ProductService.getAllProducts()
        req.io.emit('updatedProducts', products)
        res.status(201).json({ status: 'success', payload: productGenerated })
    } catch(err){
        next(err)
    }
}

export const updateProductWithId = async(req, res) => {
    try{
        let id = req.params.id
        let productToUpdate = req.body
        let productUpdated = await ProductService.updateProduct(id, productToUpdate)
        if (productUpdated === null){
            return res.status(404).json({ status: 'error', error: 'Not Found' })
        }
        const products = await ProductService.getAllPaginatedProducts()
        req.io.emit('updatedProducts', products)
        return res.status(201).json({ status: 'success', payload: productUpdated })
    } catch(err){
        res.status(500).json({ status: 'error', error: err.message })
    }
}

export const deleteProductWithId = async(req, res) => {
    try{
        let id = req.params.id
        let deletingProduct = await ProductService.deleteProduct(id)
        if(deletingProduct === null){
            return res.status(404).json({ status: 'error', error: 'Not Found'})
        }
        const products = await ProductService.getAllProducts()
        req.io.emit('updatedProducts', products)
        return res.status(201).json({ status: 'success', payload: deletingProduct })
    }catch(err){
        res.status(500).json({ status: 'error', error: err.message })
    }
}