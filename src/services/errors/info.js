export const generateProductCreationInfo = product => {
    return `Al crear un producto deben llenarse los siguientes espacios:
        - title: Must be a string (${product.title})
        - description: Must be a string (${product.description})
        - price: Must be a number (${product.price})
        - code: Must be a number and unique (${product.code})
        - stock: Must be a number (${product.stock})
        - category: Must be a string (${product.category})
    `
}

export const generateAddingProductInfo = () => {
    return `Make sure the IDs of the product and the cart are existent.`
}