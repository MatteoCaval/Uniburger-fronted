import CatalogActionType from "./catalog.types";
import axios from 'axios'
import Config from "../../config";

export const fetchCategories = () => {
    return (dispatch, getState) => {
        if (getState().catalog.categories.length) return
        dispatch(fetchCategoriesPending())
        axios.get(`${Config.API_BASE_URL}/catalog/categories`)
            .then(result => dispatch(fetchCategoriesSuccess(result.data)))
            .catch(error => dispatch(fetchCategoriesFailed(error.message)))
    }
}

export const fetchCategoriesSuccess = (categories) => {
    return {
        type: CatalogActionType.FETCH_CATEGORIES_SUCCESS,
        payload: categories
    }
}

export const fetchCategoriesFailed = (error) => {
    return {
        type: CatalogActionType.FETCH_CATEGORIES_FAILED,
        payload: error
    }
}

export const fetchCategoriesPending = () => {
    return {
        type: CatalogActionType.FETCH_CATEGORIES_PENDING
    }
}

export const fetchProductsForCategory = (categoryId) => {
    return (dispatch, getState) => {
        if (getState().catalog.products.filter(product => product.categoryId === categoryId).length) return
        dispatch(fetchProductForCategoryPending())
        axios.get(`${Config.API_BASE_URL}/catalog/products?categoryId=${categoryId}`)
            .then(result => dispatch(fetchProductForCategorySuccess(result.data)))
            .catch(error => dispatch(fetchProductForCategoryFailed(error.message)))
    }
}


export const fetchProductForCategorySuccess = (products) => {
    return {
        type: CatalogActionType.FETCH_CATEGORY_PRODUCTS_SUCCESS,
        payload: products
    }
}

export const fetchProductForCategoryFailed = (error) => {
    return {
        type: CatalogActionType.FETCH_CATEGORY_PRODUCTS_FAILED,
        payload: error
    }
}

export const fetchProductForCategoryPending = () => {
    return {
        type: CatalogActionType.FETCH_CATEGORY_PRODUCTS_PENDING
    }
}

export const fetchProductDetail = (productId) => {
    return dispatch => {
        dispatch(fetchProductPending())
        axios.get(`${Config.API_BASE_URL}/catalog/products/${productId}`)
            .then(result => dispatch(fetchProductSuccess(result.data)))
            .catch(error => dispatch(fetchProductFailed(error.message)))
    }
}

export const fetchProductSuccess = (product) => {
    return {
        type: CatalogActionType.FETCH_PRODUCT_SUCCESS,
        payload: product
    }
}

export const fetchProductFailed = error => {
    return {
        type: CatalogActionType.FETCH_PRODUCT_FAILED,
        payload: error
    }
}

export const fetchProductPending = () => {
    return {
        type: CatalogActionType.FETCH_PRODUCT_PENDING
    }
}

export const updateProduct = (updatedProduct) => {
    return dispatch => {
        dispatch(updateProductPending())
        axios.put(`${Config.API_BASE_URL}/catalog/products/${updatedProduct.productId}`, updatedProduct)
            .then(result => dispatch(updateProductSuccess()))
            .catch(error => dispatch(updateProductFailed(error.message)))
    }
}

export const updateProductSuccess = () => {
    return {
        type: CatalogActionType.UPDATE_PRODUCT_SUCCESS
    }
}

export const updateProductFailed = error => {
    return {
        type: CatalogActionType.UPDATE_PRODUCT_FAILED,
        payload: error
    }
}

export const updateProductPending = () => {
    return {
        type: CatalogActionType.UPDATE_PRODUCT_PENDING
    }
}