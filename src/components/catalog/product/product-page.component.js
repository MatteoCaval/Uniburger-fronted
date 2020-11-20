import React, { useEffect, useState } from "react";

import "./product-page.style.scss";

import { Button, CardMedia, Grid, Typography } from "@material-ui/core";
import { fetchProductDetail } from "../../../redux/catalog/catalog.actions";
import { connect } from "react-redux";
import QuantityPicker from "../../custom/quantity-picker.component"
import AddToCartIcon from "@material-ui/icons/AddShoppingCart"
import { addToCart } from "../../../redux/cart/cart.actions";
import { AdminConstrained, ConsumerConstrained } from "../../common/constrained-containers.component";
import { Link as RouterLink, withRouter } from 'react-router-dom'
import { deleteProduct, resetCatalogOperationsState } from "../../../redux/catalog/catalog-operations.actions";
import Link from "@material-ui/core/Link";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const ProductPage = ({ history, match, fetchProductDetail, addToCart, product, deleteProduct, resetCatalogOperationsState, productDeletionCompleted }) => {

    if (productDeletionCompleted) {
        history.push(`/${product.categoryId}`)
        resetCatalogOperationsState()
    }

    const productId = match.params.productId
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        fetchProductDetail(productId)
    }, [fetchProductDetail])

    return (
        product ? (
            <main>
                <Grid container>
                    <Grid item xs={12} sm={4}>
                        <Typography>
                            <Link component={RouterLink} className="page-title" variant="h2" to={`/${product.categoryId}`}>
                            <ArrowBackIosIcon/>{product.categoryName}
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography className="page-title" variant='h1'>{product.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    </Grid>
                </Grid>

                <Grid container className='prod-details' spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <div className='center-container'>
                            <CardMedia
                                className='media'
                                image={product.image}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>

                        <div className='side-container'>
                            <Typography variant='h3' color='textPrimary'>
                                {product.price}€
                            </Typography>
                        </div>
                        <div className="info-container">
                            <p>{product.description}</p>
                            <div className="ingredients-container">
                                <Typography className='ingredients' variant='h3' color='textPrimary'>
                                    Ingredienti:
                                </Typography>
                                <ul>
                                    {
                                        product.ingredients.map((ingredient, index) =>
                                            <li key={index}>{ingredient}</li>
                                        )
                                    }
                                </ul>
                            </div>
                            <ConsumerConstrained>
                                <div className='add-to-cart-container'>
                                    <QuantityPicker
                                        quantity={quantity}
                                        onQuantityIncremented={() => setQuantity(quantity + 1)}
                                        onQuantityDecremented={() => setQuantity(quantity - 1)} />
                                    <Button
                                        className="add-button"
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => addToCart(productId, quantity)}
                                        startIcon={<AddToCartIcon />}
                                    >Add to cart</Button>
                                </div>
                            </ConsumerConstrained>
                        </div>
                        <AdminConstrained>
                            <div className='admin-commands'>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => deleteProduct(product.id)}
                                >Remove</Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    component={RouterLink}
                                    to={`${productId}/edit`}
                                >Edit</Button>
                            </div>
                        </AdminConstrained>
                    </Grid>
                </Grid>
            </main>
        ) : <p>Product not found</p>
    )
}

const mapStateToProps = state => {
    return {
        product: state.catalog.productDetails,
        productDeletionCompleted: state.catalogOperations.completed
    }
}


export default withRouter(connect(mapStateToProps, {
    fetchProductDetail,
    addToCart,
    deleteProduct,
    resetCatalogOperationsState

})(ProductPage))