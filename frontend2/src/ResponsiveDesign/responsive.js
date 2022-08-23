import { css } from 'styled-components';

export const mobile = (props) => {
  return css`
    /* @media only screen and (max-width: 380px) { */
    @media only screen and (max-width: 570px) {
      ${props}
    }
  `;
};

export const Mscreen = (props) => {
  return css`
    @media only screen and (max-width: 1024px) {
      ${props}
    }
  `;
};
