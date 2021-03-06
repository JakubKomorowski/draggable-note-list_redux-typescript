import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const StyledMainUl = styled.ul`
  width: 900px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  -webkit-box-shadow: 1px 2px 12px -1px rgba(0, 0, 0, 0.2);
  box-shadow: 1px 2px 12px -1px rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 5px;
  background-color: white;
`;

export const StyledMainLi = styled.li`
  width: 300px;
`;

export const StyledDroppableCol = styled.div`
  background-color: white;
  height: 550px;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0 20px;
  overflow: auto;
`;

export const StyledTitle = styled.h3`
  margin: 10px 0 0 20px;
  color: gray;
`;

export const StyledCircle = styled.div`
  width: 150vh;
  height: 150vh;
  position: absolute;
  background-color: #bdb2ff;
  top: -75vh;
  left: -75vh;
  border-radius: 50%;
  z-index: -1;
`;
