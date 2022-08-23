import React, { useEffect, useReducer, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getError } from '../../utils';

import { Helmet } from 'react-helmet-async';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/LoadingBox/MessageBox';

import '../CSS/ProductEditScreen.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

import { useSelector } from 'react-redux';
import OnlyLoading from '../../components/LoadingBox/OnlyLoading';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import parse from 'html-react-parser';
// import NewsLetter from '../../components/NewsLetter/NewsLetter';
import { toast } from 'react-toastify';
import { AxiosInstance } from '../../api/AxiosInstance';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};
export default function ProductEditScreen() {
  const params = useParams(); // /product/:id
  const { id: productId } = params;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const [name, setName] = useState('');
  const [Hname, setHName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [Hdescription, setHDescription] = useState('');
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [Productsaved, setProductsaved] = useState('');
  const [ProductIMGsaved, setProductIMGsaved] = useState('');
  const [ProductDELIMGsaved, setProductDELIMGsaved] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await AxiosInstance.get(`/api/products/${productId}`);
        setName(data.name);
        setHName(data.Hname);
        setSlug(data.slug);
        setPrice(data.price);
        setImage(data.image);
        setImages(data.images);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setBrand(data.brand);
        setDescription(data.description);
        setHDescription(data.Hdescription);
        setSize(data.size);
        setColor(data.color);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [productId]);

  // const [cat, setCat] = useState([]);
  const handleColor = (e) => {
    setColor(e.target.value.split(','));
  };
  const handleSize = (e) => {
    setSize(e.target.value.split(','));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await AxiosInstance.put(
        `/api/products/${productId}`,
        {
          _id: productId,
          name,
          Hname,
          slug,
          price,
          image,
          images,
          category,
          brand,
          countInStock,
          description,
          Hdescription,
          size,
          color,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      if (lang === 'EN') {
        setProductsaved(`Product is <b>saved </b>successfully.`);
      }
      if (lang === 'HU') {
        setProductsaved(`A termék az <b>mentett </b>sikeresen.`);
      }

      Navigate('/admin/products');
    } catch (err) {
      getError(err);
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  const uploadFileHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await AxiosInstance.post(
        '/api/upload/image',
        bodyFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'UPLOAD_SUCCESS' });

      if (forImages) {
        setImages([...images, data.secure_url]);
      } else {
        setImage(data.secure_url);
      }
      setProductIMGsaved(
        'Image uploaded successfully. Click to save the product.'
      );
      // setImage(data.secure_url);
    } catch (err) {
      alert(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };
  const deleteFileHandler = async (fileName, f) => {
    // console.log(fileName, f);
    // console.log(images);
    // console.log(images.filter((x) => x !== fileName));
    setImages(images.filter((x) => x !== fileName));
    setProductDELIMGsaved(
      'Image removed successfully. Click to save the product.'
    );
  };
  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await AxiosInstance.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <Navbar />

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <center>
          <div className="container_width">
            <Helmet>
              {/* <title>Edit Product ${productId}</title> */}
              <title>
                {lang === 'EN' ? 'Editing' : 'Szerkesztés'} {name}
              </title>
            </Helmet>
            <br />
            <div className="editproductTITLEcolor">
              <div className="editproducth1">
                <h1>{lang === 'EN' ? 'Edit Product' : 'Szerkesztése'}</h1>
              </div>

              <div className="editproductlink">
                <Link to={`/product/${productId}`}>
                  {lang === 'EN' ? 'view product' : 'Kilátás'}
                </Link>
              </div>
            </div>

            <form onSubmit={submitHandler}>
              <div className="contField_borderDIV">
                <div className="contFieldProductEdit">
                  {lang === 'EN' && (
                    <>
                      <div className="box" controlId="name">
                        <input
                          className="input"
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Product Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />

                        <label for="name">Product Name</label>
                      </div>
                    </>
                    // ) : (
                    //   <>
                    //     <div className="box" controlId="Hname">
                    //       <input
                    //         className="input"
                    //         type="text"
                    //         name="Hname"
                    //         id="Hname"
                    //         placeholder="Termék név"
                    //         value={Hname}
                    //         onChange={(e) => setHName(e.target.value)}
                    //         required
                    //       />
                    //       <label for="Hname">Termék név</label>
                    //     </div>
                    //   </>
                  )}
                  {lang === 'HU' && (
                    <>
                      <div className="box" controlId="name">
                        <input
                          className="input"
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Termék név"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />

                        <label for="name">Termék név</label>
                      </div>
                    </>
                  )}

                  {/* <div className="box" controlId="slug">
                    <input
                      className="input"
                      type="text"
                      name="slug"
                      id="slug"
                      placeholder="Product slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      required
                    />
                    <label for="slug">Product slug</label>
                  </div> */}

                  <div className="box" controlId="price">
                    <input
                      className="input"
                      type="number"
                      name="price"
                      id="price"
                      placeholder="Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                    <label for="price">{lang === 'EN' ? 'Price' : 'Ár'}</label>
                  </div>

                  <div className="box" controlId="category">
                    {/* <input
                      className="input"
                      type="text"
                      name="category"
                      id="category"
                      placeholder="Category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    /> */}
                    <select
                      className="input"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories.map((category) => (
                        <option key={category}>
                          <option value="newest">{category}</option>
                        </option>
                      ))}
                    </select>
                    <label for="category">
                      {lang === 'EN'
                        ? 'Choose from Categories'
                        : 'Válasszon a kategóriák közül'}
                    </label>
                  </div>

                  <div className="box" controlId="brand">
                    <input
                      className="input"
                      type="text"
                      name="brand"
                      id="brand"
                      placeholder="Brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      required
                    />
                    <label for="brand">
                      {lang === 'EN' ? 'Brand' : 'Márka'}
                    </label>
                  </div>

                  <div className="box" controlId="countInStock">
                    <input
                      className="input"
                      type="text"
                      name="countInStock"
                      id="countInStock"
                      placeholder="Count In Stock"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                      required
                    />
                    <label for="countInStock">
                      {lang === 'EN' ? 'Count In Stock' : 'Számlál Raktáron'}
                    </label>
                  </div>
                  {lang === 'EN' ? (
                    <>
                      <div className="box" controlId="description">
                        <textarea
                          className="input"
                          type="text"
                          name="description"
                          id="description"
                          placeholder="Product Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                        <label for="description">Product Description</label>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="box" controlId="description">
                        <textarea
                          className="input"
                          type="text"
                          name="description"
                          id="description"
                          placeholder="Termékleírás"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                        <label for="description">Termékleírás</label>
                      </div>
                    </>
                  )}

                  <div className="box" controlId="size">
                    <input
                      className="input"
                      type="text"
                      name="size"
                      id="size"
                      placeholder="Product Size"
                      value={size}
                      // onChange={(e) => setSize(e.target.value)}
                      onChange={handleSize}
                      required
                    />
                    <label for="size">
                      {lang === 'EN' ? 'Product Size' : 'Termék méret'}
                    </label>
                  </div>

                  <div className="box" controlId="color">
                    <input
                      className="input"
                      type="text"
                      name="color"
                      id="color"
                      placeholder="Red, Green"
                      value={color}
                      // onChange={(e) => setColor(e.target.value)}
                      onChange={handleColor}
                      required
                    />
                    <label for="color">
                      {lang === 'EN' ? 'Product Color' : 'Termék színe'}
                    </label>
                  </div>
                </div>
              </div>
              <div className="primary_uploadBTN_container">
                <div className="product_primary_img" controlId="imageFile">
                  <img
                    className="product_primary_imgDIV"
                    src={image}
                    alt="Primary_Picture"
                    onChange={(e) => setImage(e.target.value)}
                    name="image"
                    id="image"
                    value={image}
                  />
                </div>
                {/* {ProductIMGsaved ? ProductIMGsaved : ''} */}
                {loadingUpload ? (
                  <center>
                    <OnlyLoading></OnlyLoading>
                  </center>
                ) : (
                  <div>
                    <div className="additionalImage_upload-button">
                      <label controlId="imageFile">
                        <input type="file" onChange={uploadFileHandler} />
                        <i className="bx bx-upload"></i>
                      </label>
                      <span>
                        {lang === 'EN'
                          ? 'Upload Primary Image'
                          : 'Elsődleges kép feltöltése'}
                      </span>{' '}
                      {/* {loadingUpload && (
                        <center>
                          <OnlyLoading></OnlyLoading>
                        </center>
                      )} */}
                    </div>
                  </div>
                )}
              </div>
              {/* Additional Images  */}
              <div className="addition_uploadBTN_main_container">
                {images.length === 0 && (
                  <MessageBox>
                    {lang === 'EN' ? 'No image' : 'Nincs kép'}
                  </MessageBox>
                )}{' '}
                <ul>
                  {/* <div className="product_Additional_images"> */}
                  <div className="Product_additionalImage_container">
                    {images.map((x) => (
                      <li key={x} className="product_Additional_images_block">
                        {/* {x} */}

                        <img
                          className="product_Additional_imagesDIV"
                          src={x}
                          alt="Additional_images"
                        />
                        <Tippy content="Remove This Image" placement="top">
                          <button
                            onClick={() => deleteFileHandler(x)}
                            className="additionalImage_cancelBTN"
                          >
                            {/* <i className="fa-regular fa-trash-can"></i> */}
                            <i className="fa fa-times-circle"></i>
                          </button>
                        </Tippy>
                      </li>
                    ))}
                  </div>
                </ul>
                {/* {ProductDELIMGsaved ? ProductDELIMGsaved : ''}
                {ProductIMGsaved ? ProductIMGsaved : ''} */}
                {loadingUpload ? (
                  <center>
                    <OnlyLoading></OnlyLoading>
                  </center>
                ) : (
                  <div className="upload-button">
                    <label controlId="additionalImage">
                      <input
                        type="file"
                        onChange={(e) => uploadFileHandler(e, true)}
                      />
                      <i className="bx bx-upload"></i>
                    </label>
                    <span>
                      {lang === 'EN'
                        ? 'Add more images'
                        : 'További képek hozzáadása'}
                    </span>{' '}
                  </div>
                )}
                {/* {loadingUpload && (
                  <center>
                    <OnlyLoading></OnlyLoading>
                  </center>
                )} */}
              </div>
              <div className="product_save_btn">
                <button disabled={loadingUpdate} type="submit">
                  {loadingUpdate ? (
                    <OnlyLoading></OnlyLoading>
                  ) : (
                    <>{lang === 'EN' ? 'Save' : 'Megment'}</>
                  )}
                </button>
                {/* {loadingUpdate && (
                  <center>
                    <OnlyLoading></OnlyLoading>
                  </center>
                )} */}
              </div>

              {loadingUpdate ? (
                ''
              ) : (
                <div className="product_Productsaved">
                  {parse(Productsaved)}
                </div>
              )}
            </form>
          </div>
        </center>
      )}
      {/* <NewsLetter /> */}
      <Footer />
    </>
  );
}
