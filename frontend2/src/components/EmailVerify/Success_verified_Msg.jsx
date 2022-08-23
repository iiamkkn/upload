import React from 'react';
import styled from 'styled-components';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import success from '../../images/tick.png';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
`;

export const Success_verified_Msg = () => {
  return (
    <>
      <Navbar />
      <Container>
        <div
          className={styles.verified_div_to_be_placed_DIV}
          style={{ lineHeight: '2.5rem' }}
        >
          <h1>Congratulations!</h1>
          <h2 style={{ fontWeight: 'normal' }}>
            Your Account verification is completed.
            <img
              src={success}
              alt="success_img"
              className={styles.success_img}
            />
          </h2>

          <p style={{ fontSize: '0.8rem' }}>
            Try to Login now &#x2192; <Link to="/signin">click here</Link>
          </p>
        </div>

        {/* <div className={styles.container}>
          <h1>Email verified successfully</h1>
          <img src={success} alt="success_img" className={styles.success_img} />

          <Link to="/signin">
            <button className={styles.green_btn}>Login</button>
          </Link>
        </div> */}
      </Container>

      <Footer />
    </>
  );
};
