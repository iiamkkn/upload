import { Send } from '@material-ui/icons';
import styled from 'styled-components';
import { mobile } from '../../ResponsiveDesign/responsive';
import axios from 'axios';
import styles from '../Singup/styles.module.css';
import { useState } from 'react';

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* margin-bottom: 1rem; */
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  ${mobile({ fontSize: '50px' })}
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({
    fontSize: '18px',
    textAlign: 'center',
  })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({
    width: '80%',
  })}
`;

const Input = styled.input`
  /* border: none;
  flex: 8;
  padding-left: 20px; */
  outline: none;
  border: 1px solid #ddd;
  width: 370px;
  padding: 15px;
  border-radius: 4px;
  background-color: #ffffff;
  font-size: 14px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: #000;
  color: white;
  cursor: pointer;
  padding: 9px 15px;
  position: relative;
  top: 6px;
  border-radius: 3px;
  &:hover {
    background-color: #323131;
  }
`;

const NewsLetter = () => {
  // const userSignin = useSelector((state) => state.userSignin);
  // const { userInfo } = userSignin;
  const [data, setData] = useState({
    // name: '',
    // lastName: '',
    email: '',
    // password: '',
    // username: '',
  });
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://91.227.139.152/api/account/newsletter/subscribe';
      const { data: res } = await axios.post(url, data);
      setMsg(res.message);
      setError('');
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg('');
      }
    }
  };

  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}
  return (
    <>
      <Container>
        <Title>{lang === 'EN' ? 'Newsletter' : 'Hírlevél'}</Title>
        <Desc>
          {lang === 'EN'
            ? 'Get timely updates from your favorite products.'
            : 'Időszerű frissítéseket kaphat kedvenc termékeiről.'}
        </Desc>
        <div>
          {' '}
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              placeholder={lang === 'EN' ? 'Your Email' : 'Az email címed'}
              onChange={handleChange}
              value={data.email}
              required
            />
            <Button type="submit">
              <Send />
            </Button>
          </form>
        </div>

        {error && <div className={styles.error_msg}>{error}</div>}
        {msg && <div className={styles.success_msg}>{msg}</div>}
      </Container>
    </>
  );
};

export default NewsLetter;
