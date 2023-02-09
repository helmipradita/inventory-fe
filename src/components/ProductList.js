import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/src/modal';
import Navigation from './Navigation';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    getProducts();
  }, [page, keyword]);

  const getProducts = async () => {
    const response = await axios.get(
      process.env.REACT_APP_BACKEND_API_HOST +
        `/products/all?search=${keyword}&page=${page}&limit=${limit}`
    );
    setProducts(response.data.data);
    setPage(response.data.pagination.page);
    setPages(response.data.pagination.totalPage);
    setRows(response.data.pagination.totalRows);
    console.log(response);
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(
        process.env.REACT_APP_BACKEND_API_HOST + `/products/${productId}`
      );
      getProducts();
      window.location.reload();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

  return (
    <div className="container">
      <Navigation />
      {token && (
        <div className="col-md-4 mt-4 mb-4">
          <Link to={`/add`} className="button btn btn-success">
            Add Product
          </Link>
        </div>
      )}

      <div className="row">
        <form onSubmit={searchData}>
          <div className="field has-addons">
            <div className="control">
              <input
                type="text"
                className="input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find something"
                id=""
              />
            </div>

            <div className="control">
              <button type="submit" className="btn btn-info">
                Search
              </button>
            </div>
          </div>
        </form>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Buying Price</th>
              <th>Selling Price</th>
              <th>Stock</th>
              <th>Photo</th>
              {token && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{product.key}</td>
                <td>{product.name}</td>
                <td>{product.buying_price}</td>
                <td>{product.selling_price}</td>
                <td>{product.stock}</td>
                <td>
                  <img
                    src={product.photo}
                    alt="photo"
                    width={100}
                    data-bs-toggle="modal"
                    data-bs-target="#photoExample"
                    className="cursor-pointer"
                  />

                  {/* modal photo */}
                  <div
                    className="modal fade"
                    id="photoExample"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 class="modal-title">{product.name}</h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <img
                            src={product.photo}
                            alt="photoModal"
                            className="d-block w-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                {token && (
                  <td>
                    {' '}
                    <Link
                      className="btn btn-primary"
                      to={`/edit/${product.id}`}
                    >
                      Edit
                    </Link>{' '}
                    <Button
                      className="btn "
                      variant="danger"
                      type="submit"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteExample"
                    >
                      Delete
                    </Button>
                    {/* modal delete */}
                    <div
                      className="modal fade"
                      id="deleteExample"
                      tabIndex="-1"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 class="modal-title">
                              Anda yakin ingin menghapus data ini?
                            </h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body" align="center">
                            <h5></h5>
                            <p>{product.name}</p>
                            <img
                              src={product.photo}
                              alt="photoModal"
                              className="d-block w-100 mb-4"
                            />
                            <Button
                              className="btn "
                              variant="danger"
                              type="submit"
                              onClick={() => deleteProduct(product.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
        <p>
          Total Data: {rows} Page: {rows ? page + 1 : 0} of {pages}
        </p>

        <nav
          className="pagination is-centered"
          key={rows}
          role="navigation"
          aria-label="pagination"
        >
          <ReactPaginate
            previousLabel={'< Prev'}
            nextLabel={'Next >'}
            pageCount={pages}
            onPageChange={changePage}
            containerClassName={'pagination-list'}
            pageLinkClassName={'pagination-link'}
            previousLinkClassName={'pagination-previous'}
            nextLinkClassName={'pagination-next'}
            activeClassName={'pagination-link is-current'}
            disabledLinkClassName={'pagination-link is-disabled'}
          />
        </nav>
      </div>
    </div>
  );
};

export default ProductList;
