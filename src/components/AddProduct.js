import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import Swal from 'sweetalert2';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [buying, setBuying] = useState('');
  const [selling, setSelling] = useState('');
  const [stock, setStock] = useState('');
  const [photo, setPhoto] = useState('');
  const [preview, setPreview] = useState('');

  const navigate = useNavigate();

  // const token = localStorage.getItem('token');

  const loadImage = (e) => {
    const image = e.target.files[0];

    setPreview(URL.createObjectURL(image));

    const size = 100000;
    const file = e.target.files[0];

    if (
      !file.type.startsWith('image/jpeg') &&
      !file.type.startsWith('image/png')
    ) {
      Swal.fire(
        'Failed',
        'Hanya format JPG and PNG yang bisa di upload',
        'error'
      );
      e.target.value = '';
      return;
    }

    if (file.size > size) {
      console.log(e.target, 'target', file.size, 'ini size');

      Swal.fire(
        'Failed',
        `Jangan upload lebih dari 100 KB </b> <br> Ukuran file yang di upload <b> ${Math.ceil(
          file.size / 1000
        )}  KB`,
        'error'
      );
      e.target.value = '';
      return;
    }

    setPhoto(image);
    console.log(e.target.files[0]);
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('buying_price', buying);
    formData.append('selling_price', selling);
    formData.append('stock', stock);
    formData.append('photo', photo);
    try {
      await axios.post(
        process.env.REACT_APP_BACKEND_API_HOST + '/products',
        formData,
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        }
      );
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Navigation />
      <div className="col-md-4 mt-4">
        <Link to={`/`} className="button btn btn-outline-dark">
          Back{' '}
        </Link>
      </div>

      <Form onSubmit={saveProduct}>
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
                required
              />
            </Form.Group>

            {preview ? (
              <figure className="card">
                <img src={preview} alt="preview" width={250} />
              </figure>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className="d-grid gap-2">
          <Button className="btn " variant="primary" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddProduct;
