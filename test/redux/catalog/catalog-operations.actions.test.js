import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios'
import {
    createCategory,
    createProduct,
    resetCatalogOperationsState,
    updateProduct
} from "../../../src/redux/catalog/catalog-operations.actions";
import CatalogOperationType from "../../../src/redux/catalog/catalog-operations.type";
import CatalogActionType from "../../../src/redux/catalog/catalog.types";

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
jest.mock('axios');

describe('product operation actions', () => {

    it('should create pending and success actions and fetching products on createProduct success', () => {

        const product = {
            name: 'nome',
            category_id: 'id'
        }

        const productsAfterCreation = [
            product
        ]

        const expectedActions = [
            { type: CatalogOperationType.CREATE_PRODUCT_PENDING },
            { type: CatalogOperationType.CREATE_PRODUCT_SUCCESS },
            { type: CatalogActionType.FETCH_CATEGORY_PRODUCTS_PENDING },
            { type: CatalogActionType.FETCH_CATEGORY_PRODUCTS_SUCCESS, payload: productsAfterCreation },
        ]
        axios.post.mockImplementation(() => Promise.resolve())
        axios.get.mockImplementation(() => Promise.resolve({ data: productsAfterCreation }))

        const store = mockStore({ user: { token: 'token' } })
        return store.dispatch(createProduct(product)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should create pending and success actions and fetching products on updatedProduct success', () => {
        const product = {
            name: 'nome',
            category_id: 'id'
        }
        const productAfterUpdate = [
            product
        ]
        const expectedActions = [
            { type: CatalogOperationType.UPDATE_PRODUCT_PENDING },
            { type: CatalogOperationType.UPDATE_PRODUCT_SUCCESS },
            { type: CatalogActionType.FETCH_CATEGORY_PRODUCTS_PENDING },
            { type: CatalogActionType.FETCH_CATEGORY_PRODUCTS_SUCCESS, payload: productAfterUpdate },
        ]
        axios.put.mockImplementation(() => Promise.resolve())
        axios.get.mockImplementation(() => Promise.resolve({ data: productAfterUpdate }))

        const store = mockStore({ user: { token: 'token' } })
        return store.dispatch(updateProduct(product)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should return reset action on resetProductOperationsState success', () => {
        expect(resetCatalogOperationsState()).toEqual({
            type: CatalogOperationType.RESET_STATE
        })
    })


    it('should create pending and success actions and fetching categories on createCategory success', () => {

        const category = {
            name: 'nome',
        }

        const categoriesAfterCreation = [
            category
        ]

        const expectedActions = [
            { type: CatalogOperationType.CREATE_CATEGORY_PENDING },
            { type: CatalogOperationType.CREATE_CATEGORY_SUCCESS },
            { type: CatalogActionType.FETCH_CATEGORIES_PENDING },
            { type: CatalogActionType.FETCH_CATEGORIES_SUCCESS, payload: categoriesAfterCreation },
        ]
        axios.post.mockImplementation(() => Promise.resolve())
        axios.get.mockImplementation(() => Promise.resolve({ data: categoriesAfterCreation }))

        const store = mockStore({ user: { token: 'token' } })
        return store.dispatch(createCategory(category)).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

})