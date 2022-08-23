// import React, { useContext, useEffect, useState } from 'react';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { useNavigate } from 'react-router-dom';
// import { Store } from '../Store.js';
import CheckoutSteps from '../../components/Checkout/CheckoutSteps';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../actions/cartActions';

import '../CSS/others.css';

export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!userInfo) {
    // window.location.reload();
    navigate('/signin?redirect=/shipping');
  }

  // useEffect(() => {
  //   if (cart.cartItems.length === 0) {
  //     navigate('/cart');
  //   }
  //   if (!shippingAddress.address) {
  //     // if (!shippingAddress) {
  //     navigate('/shipping');
  //   }
  // }, [shippingAddress, navigate, cart]);
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    navigate('/payment');
  };
  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}
  return (
    <div>
      <Helmet>
        <title>{lang === 'EN' ? 'Shipping Address' : 'szállítási cím'}</title>
      </Helmet>
      <Navbar />

      <div>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <form onSubmit={submitHandler}>
          <div className="main-shippingAddress-container">
            <h1>{lang === 'EN' ? 'Shipping Address' : 'szállítási cím'}</h1>

            <div className="contField">
              <div className="box">
                <input
                  className="input"
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <label htmlFor="fullName">
                  {lang === 'EN' ? 'Full Name' : 'Teljes név'}
                </label>
              </div>

              <div className="box">
                <input
                  className="input"
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <label htmlFor="address">
                  {lang === 'EN' ? 'Address' : 'Cím'}
                </label>
              </div>

              <div className="box">
                <input
                  className="input"
                  type="text"
                  name="city"
                  id="city"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <label htmlFor="city">{lang === 'EN' ? 'City' : 'Város'}</label>
              </div>

              <div className="box">
                <input
                  className="input"
                  type="number"
                  name="postalCode"
                  id="postalCode"
                  placeholder="Enter postal code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
                <label htmlFor="postalCode">
                  {lang === 'EN' ? 'Postal Code' : 'Irányítószám'}
                </label>
              </div>

              <div className="box">
                <input
                  className="input"
                  type="text"
                  name="country"
                  id="country"
                  placeholder="Enter country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
                <label htmlFor="country">
                  {lang === 'EN' ? 'Country' : 'Ország'}
                </label>
              </div>
            </div>

            <label />
            <div>
              <button className="ContineBTN" type="submit">
                {lang === 'EN' ? 'Continue' : 'Folytatni'}
                <i className="bx bx-right-arrow-alt"></i>
              </button>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
