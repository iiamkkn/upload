import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from '../../ResponsiveDesign/responsive';

const Container = styled.div`
  height: 20px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  font-family: arial;
  ${mobile({ height: '13px' })}
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
  font-family: arial;
  cursor: context-menu;
`;

const Right = styled.div`
  display: flex;
  text-align: right;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
  font-family: arial;
  &:hover {
    text-decoration: underline;
  }
`;

const SendLink = styled.b`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const Announcement = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <Container>
      {/* <Center>
        {userInfo && !userInfo.isVerified && (
          <>
            Please verify your your account.{'  '}
            <Link to="" style={{ color: 'white', textDecoration: 'none' }}>
              <SendLink>Send verification</SendLink> code now.
            </Link>
          </>
        )}
      </Center> */}
      {/* <Right>Register</Right> */}
      {/* <Right>Sign in</Right> */}
    </Container>
  );
};

export default Announcement;
