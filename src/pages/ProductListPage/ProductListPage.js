import React, { Component } from "react";
import ProductList from "./../../components/ProductList/ProductList";
import ProductItem from "./../../components/ProductItems/ProductItem";
import { connect } from "react-redux";
// import callAPI from "./../../utils/apiCaller"
import { Link } from "react-router-dom";
import { actFetchProductsRequest, actDeleteProductRequest } from "./../../actions/index";

class ProductListPage extends Component {
  
  componentDidMount() {
    this.props.fetchAllProducts();
  }

  onDelete = (id) => {
    this.props.deleteProduct(id);
    
  }
  
  render() {
      var {products} = this.props;
      
      
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <Link to="/product/add" className="btn btn-info mb-10">
          Thêm sản phẩm
        </Link>
        <ProductList >
            {this.showProductItem(products)}
        </ProductList>
      </div>
    );
  }
  showProductItem = (products) => {
    var result = null;
    if(products.length > 0){
        result = products.map((product, index) => {
            return(
                <ProductItem 
                    key={index}
                    index={index}
                    product={product}
                    onDelete={this.onDelete}
                />
            )
        })
    }

    return result;
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProducts: () => {
      dispatch(actFetchProductsRequest())
    },
    deleteProduct: (id) => {
      dispatch(actDeleteProductRequest(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
