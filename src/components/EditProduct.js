import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const [name, setName] = useState('');
  const [buying, setBuying] = useState('');
  const [selling, setSelling] = useState('');
  const [stock, setStock] = useState('');
  const [photo, setPhoto] = useState('');
  const [preview, setPreview] = useState('');

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    const response = await axios.get(
      process.env.REACT_APP_BACKEND_API_HOST + `/products/${id}`
    );
    setName(response.data.data.name);
    setBuying(response.data.data.buying_price);
    setSelling(response.data.data.selling_price);
    setStock(response.data.data.stock);
    setPhoto(response.data.data.photo);
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setPhoto(image);
    setPreview(URL.createObjectURL(image));
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('buying_price', buying);
    formData.append('selling_price', selling);
    formData.append('stock', stock);
    formData.append('photo', photo);
    try {
      await axios.put(
        process.env.REACT_APP_BACKEND_API_HOST + `/products/${id}`,
        formData,
        {
          headers: { 'Content-type': 'multipart/form-data' },
        }
      );
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="col-md-4 mt-4">
        <Link to={`/`} className="button btn btn-outline-dark">
          Back{' '}
        </Link>
      </div>

      <Form onSubmit={updateProduct}>
        <div className="row mt-4">
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Buying Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter buying price"
                value={buying}
                onChange={(e) => setBuying(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Selling Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter selling price"
                value={selling}
                onChange={(e) => setSelling(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type="file"
                className="file-input"
                placeholder="Upload photo"
                onChange={loadImage}
                alt="upload"
                required
              />
            </Form.Group>

            {preview ? (
              <figure className="card">
                <img src={preview} alt="preview" width={250} />
              </figure>
            ) : (
              <figure className="card">
                <img src={photo} alt="preview" width={250} />
              </figure>
            )}
          </div>
        </div>

        <div className="d-grid gap-2">
          <Button className="btn " variant="primary" type="submit">
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditProduct;
