import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import success from '../../images/success.png';
import styles from './styles.module.css';
import { Success_verified_Msg } from './Success_verified_Msg';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
`;

export const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async (res, req) => {
      // res.setHeader('Content-Type', 'application/json');

      try {
        console.log('fetching_after');
        const url = `http://91.227.139.152/api/account/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url, {
          headers: { 'Content-Type': 'application/json' },
        });
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <>
      {validUrl ? (
        <Container>
          <div
            className={styles.verified_div_to_be_placed_DIV}
            style={{ lineHeight: '2.5rem' }}
          >
            <h1>Congratulations!</h1>
            <h2 style={{ fontWeight: 'normal' }}>
              You are verified successfully
              <img
                src={success}
                alt="success_img"
                className={styles.success_img}
              />
            </h2>

            {/* <p style={{ fontSize: '0.8rem' }}>
           Login now &#x2192; <Link to="/signin">click here</Link>
         </p> */}
          </div>
        </Container>
      ) : !validUrl ? (
        <>
          <Success_verified_Msg />
        </>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </>
  );
};

export default EmailVerify;
