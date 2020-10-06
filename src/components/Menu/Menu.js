import React, { Component } from "react";
import { Route, Link} from "react-router-dom";

const menus = [
  {
    name: "Trang chủ",
    to: "/",
    exact: true,
  },
  {
    name: "Quản lý sản phẩm",
    to: "/product-list",
    exact: false
  }
]

const MenuLink = ({lable, to, activeOnlyWhenExact}) =>{
  return (
    <Route 
      path={to}
      exact={activeOnlyWhenExact}
      children={({match}) => {
        var active = match ? "active" : "";
        return (
          <li className={active}>
            <Link to={to}>
              {lable}
            </Link>
          </li>
        )
      }}
    />
  );
}

class Menu extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          CALL API
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="/navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <ul className="nav navbar-nav">
              {this.showMenus(menus)}
            </ul>
          </div>
        </div>
      </nav>
    );
  }


  showMenus = (menus) => {
    var result = null;
    if(menus.length > 0){
      result = menus.map((menu, index) => {
        return (
          <MenuLink 
            key={index}
            lable={menu.name}
            to={menu.to}
            activeOnlyWhenExact={menu.exact}
          />
        );
      })
    }
    return result;
  }
}

export default Menu;
