import * as Types from "./../constants/Actiontypes";
import callAPI from "./../utils/apiCaller";


export const actFetchProductsRequest = () => {
    return (dispatch) => {
        return callAPI('products', 'GET', null).then(response => {
            dispatch(actFetchProducts(response.data));
        });
    }
}

export const actDeleteProductRequest = (id) => {
    return (dispatch) => {
        return callAPI(`products/${id}`, 'DELETE', null).then(response => {
            dispatch(actDeleteProduct(id))
        })
    }
}

export const actAddProductRequest = (product) => {
    return (dispatch) => {
        return callAPI('products', 'POST', product).then(response => {
            dispatch(actAddProduct(response.data));
        })
    }
}

export const actFetchProducts = (products) => {
    return {
        type: Types.FETCH_PRODUCT,
        products
    }
}

export const actAddProduct = (product) => {
    return {
        type: Types.ADD_PRODUCT,
        product
    }
}

export const actDeleteProduct = (id) => {
    return {
        type: Types.DELETE_PRODUCT,
        id
    }
}