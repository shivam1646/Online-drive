import styled from "styled-components";
import { FaArrowCircleUp, FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";

export const Header = styled.header`
  height: 6vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgb(0, 0, 0, 0.1);

  @media only screen and (max-width: 768px) {
    justify-content: center;
  }
`;

export const NavBox = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

export const BackBtn = styled(FaArrowCircleUp)`
  font-size: 1.4rem;
  color: rgb(0, 0, 0, 0.7);
  cursor: pointer;
  margin-right: 1rem;

  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid rgb(0, 0, 0, 0.1);
  border-radius: 0.5rem;

  &:focus-within {
    outline: rgb(59, 130, 246) auto 1px;
  }
`;

export const SearchIcon = styled(FaSearch)`
  color: rgb(0, 0, 0, 0.5);
`;

export const SearchInput = styled.input`
  border: none;
  margin-left: 0.2rem;

  &:focus-visible {
    outline: none;
  }
`;

export const Breadcrumb = styled.p`
  text-decoration: underline;
  opacity: 0.5;
  cursor: pointer;

  &.active {
    text-decoration: none;
    opacity: 1;
    pointer-events: none;
  }
`;

export const Separator = styled.span`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  opacity: 0.3;
`;

export const CloseBtn = styled(MdClose)`
  font-size: 1.5rem;
  color: rgb(0, 0, 0, 0.7);
  cursor: pointer;
`;
