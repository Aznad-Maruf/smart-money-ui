import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Smart Money
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="messageDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Message
              </Link>
              <ul className="dropdown-menu" aria-labelledby="messageDropdown">
                <li>
                  <Link className="dropdown-item" to="/message/create">
                    Create Message
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/message/list">
                    Message List
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="categoryDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Category
              </Link>
              <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
                <li>
                  <Link className="dropdown-item" to="/category/create">
                    Create Category
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/category/list">
                    Category List
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="transactionDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Transaction
              </Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="transactionDropdown"
              >
                <li>
                  <Link className="dropdown-item" to="/transaction/create">
                    Create Transaction
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/transaction/list">
                    Transaction List
                  </Link>
                  <Link className="dropdown-item" to="/transaction/visualize">
                    Transaction Visualize
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
