import bcrypt from 'bcrypt'
import { fakerES as faker } from '@faker-js/faker'

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

export const generateProduct = () => {
    return {
        _id: faker.string.uuid(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        code: faker.string.uuid(),
        stock: faker.number.int({ min: 10000, max: 1000000 }),
        category: faker.commerce.department(),
        status: true,
        thumbnail: []
    }
}