import React, { Component } from "react";
import { Link } from "react-router-dom";
// import callAPI from "./../../utils/apiCaller";

class ProductItem extends Component {
  onDelete = (id) => {
    if (confirm("Bạn có muốn xóa sản phẩm này không?")) { //eslint-disable-line
      this.props.onDelete(id);
    }
  };

  render() {
    var { index, product } = this.props;
    var statusName = product.status ? "Còn hàng" : "Hết hàng";
    var statusClass = product.status ? "warning" : "default";

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>
          <span className={`label label-${statusClass}`}>{statusName}</span>
        </td>
        <td>
          <Link
            to={`/product/edit/${product.id}`}
            className="btn btn-warning mr-10"
          >
            Sửa
          </Link>
          <button
            type="button"
            className="btn btn-danger mr-10"
            onClick={() => this.onDelete(product.id)}
          >
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default ProductItem;
