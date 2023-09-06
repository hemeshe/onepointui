import styled from "styled-components/macro";

export const Container = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
`;

export const StyledNoAccessContainer = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
  height: 100%;
`;

export const StyledNoAccess = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: 1281px) {
  }
`;

export const Main = styled.div`
  height: auto;
  border: 2px solid #dd1d21;
  padding: 0 0 0 30px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-width: 600px;
  min-height: 200px;
  justify-content: center;

  * {
    flex-shrink: 0;
    width: 100%;
    max-width: 100%;
  }

  @media (min-width: 576px) {
    width: 60%;
  }

  @media (min-width: 768px) {
    width: 60%;
  }

  @media (min-width: 992px) {
    width: 60%;
  }
  @media (min-width: 1200px) {
    width: 60%;
  }
`;

// export const Row = styled.

export const Left = styled.div`
  flex: 0 0 auto;
  width: 100%;
  justify-content: center;
  align-items: center;

  img,
  svg {
    vertical-align: middle;
  }

  @media (min-width: 576px) {
    flex: 0 0 auto;
    width: 16.666667%;
  }

  @media (min-width: 768px) {
    flex: 0 0 auto;
    width: 16.666667%;
  }

  @media (min-width: 992px) {
    flex: 0 0 auto;
    width: 16.666667%;
  }

  @media (min-width: 1200px) {
    flex: 0 0 auto;
    width: 16.666667%;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  padding: 4px;
  width: 150px;

  @media (max-width: 768px) {
  }

  svg,
  img {
    vertical-align: middle;
    max-width: 100%;
    height: 100%;
  }
`;

export const RightContainer = styled.div`
  flex: 0 0 auto;
  width: 100%;

  @media (min-width: 576px) {
    flex: 0 0 auto;
    width: 83.333333%;
  }

  @media (min-width: 768px) {
    flex: 0 0 auto;
    width: 83.333333%;
  }

  @media (min-width: 992px) {
    flex: 0 0 auto;
    width: 83.333333%;
  }

  @media (min-width: 1200px) {
    flex: 0 0 auto;
    width: 83.333333%;
  }
`;

export const Right = styled.div`
  flex: 0 0 auto;
  width: 100%;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 0 0 15px;
`;

export const PermissionTitle = styled.div`
  font-family: Futura Medium;
  font-style: normal;
  font-weight: 800;
  font-size: 1.5rem;
  width: 100%;
  padding-bottom: 10px;
  margin-top: -10px;

  display: flex;
  align-items: center;

  /* black */

  color: #000000;

  @media (max-width: 768px) {
  }
`;

export const PermissionPara = styled.div`
  font-family: Futura Medium;
  font-style: normal;
  font-weight: 800;
  font-size: 1rem;
  line-height: 1.5rem;
  display: block;
  letter-spacing: 0.5px;

  /* dark-blue */

  color: #000000;
  width: 100%;

  @media (max-width: 768px) {
  }
`;

export const Bottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const StyledClose = styled.button`
  outline: none;
  border: none;
  width: 100px;
  height: 40px;
  left: 624px;
  top: 613px;
  cursor: pointer;
  letter-spacing: 2px;
  /* dark-blue */

  background: #003c88;
  border-radius: 2px;
  font-family: Futura Medium;
  font-style: normal;
  font-weight: 800;
  font-size: 1.1rem;
  line-height: 1.5rem;

  /* white */

  color: #ffffff;
`;

export const ReqLink = styled.a`
  display: inline;
  color: #003c88;
`;
