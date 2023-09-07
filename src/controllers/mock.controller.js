import { generateProduct } from "../utils.js";

export const mockingProductsController = async(req, res) => {
    const mockProducts = [];
    for (let i = 1; i <= 100; i++) {
        mockProducts.push(generateProduct());
    }
    return res.status(200).json({ status: 'sucess', payload: mockProducts});
}