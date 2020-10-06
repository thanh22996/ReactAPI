import React, { Component } from "react";
import callAPI from "./../../utils/apiCaller"
import { Link } from "react-router-dom";
import { actAddProductRequest } from "./../../actions/index";
import {connect} from "react-redux";

class ProductActionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      txtName: "",
      txtPrice: "",
      chkbStatus: false,
    };
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    // console.log(target.checked);
    
    var value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  }

  onSave = (event) => {
    event.preventDefault();
    var {id, txtName, txtPrice,chkbStatus} = this.state;
    var { history } = this.props;
    var product = {
      id: '',
      name: txtName,
      price: txtPrice,
      status: chkbStatus
    }
    if(id){
      callAPI(`products/${id}`, 'PUT', {
        name: txtName,
        price: txtPrice,
        status: chkbStatus
      }).then(response => {
        history.goBack();
      })
    }else{
      this.props.onAddProduct(product);
      history.goBack();
    }
  }

  componentDidMount() {
    var {match} = this.props;
    if(match){
      var id = match.params.id;
      // console.log(id);
      callAPI(`products/${id}`, 'GET', null).then(response => {
        var data = response.data;
        this.setState({
          id: data.id,
          txtName: data.name,
          txtPrice: data.price,
          chkbStatus: data.status
        });
        
      });
    }
  }
  

  render() {
    var { txtName, txtPrice, chkbStatus } = this.state;
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <form onSubmit={this.onSave}>
          <div className="form-group">
            <label>Tên Sản Phẩm</label>
            <input
              type="text"
              className="form-control"
              name="txtName"
              value={txtName}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Giá Sản Phẩm</label>
            <input
              type="text"
              className="form-control"
              name="txtPrice"
              value={txtPrice}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Trạn thái</label>
          </div>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                name="chkbStatus"
                value={chkbStatus}
                onChange={this.onChange}
                checked={chkbStatus}
              />
              Còn hàng
            </label>
          </div>

          <button type="submit" className="btn btn-primary mr-10">
            Submit
          </button>
          <Link to="/product-list" className="btn btn-danger" >Hủy bỏ</Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddProduct : (product) => {
      dispatch(actAddProductRequest(product));
    }
  }
}

export default connect(null, mapDispatchToProps)(ProductActionPage);
