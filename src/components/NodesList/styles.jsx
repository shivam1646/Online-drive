import { styled, css } from "styled-components";

export const NodesListWrapper = styled.section`
  margin-top: 2rem;
  padding-right: 2rem;
  padding-left: 2rem;
  display: flex;
  flex-wrap: wrap;

  @media only screen and (max-width: 768px) {
    justify-content: center;
  }
`;

export const ContextMenu = styled.div`
  position: absolute;
  width: 150px;
  background-color: white;
  border: 1px solid rgb(0, 0, 0, 0.1);
  border-radius: 5px;
  box-sizing: border-box;
  ${({ top, left }) => css`
    top: ${top}px;
    left: ${left}px;
  `}
  ul {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    list-style: none;
  }
  ul li {
    padding: 0.5rem 1rem;
  }
  /* hover */
  ul li:hover {
    cursor: pointer;
    background-color: rgb(211, 211, 211, 0.5);
  }
`;

export const NodeDiv = styled.div`
  width: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin: 0.5rem 2rem;
  cursor: pointer;
  text-align: center;
  position: relative;

  &.add {
    margin: 0 2rem 1.5rem 2rem;
    justify-content: flex-start;
  }

  &.folder:hover {
    background-color: rgb(173, 216, 230, 0.5);
    border-radius: 0.3rem;
  }
`;

export const InputField = styled.input`
  border-radius: 0.5rem;
  padding: 0.4rem;
  width: 80%;
  border: 1px solid rgb(0, 0, 0, 0.1);
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;

  &:focus-visible {
    outline: rgb(59, 130, 246) auto 1px;
  }
`;

export const FileExt = styled.p`
  margin: 0;
  font-size: 0.8rem;
  bottom: 3.5rem;
  left: 2rem;
  position: absolute;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 2rem;
`;

export const NodeText = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 6rem;
  font-size: 0.8rem;
`;
