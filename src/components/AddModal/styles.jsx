import { styled } from "styled-components";
import { MdClose } from "react-icons/md";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0, 0, 0, 0.1);
`;

export const Modal = styled.div`
  width: 250px;
  background-color: white;
  border-radius: 0.5rem;
  border: 1px solid rgb(0, 0, 0, 0.1);
  padding: 1rem;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CloseBtn = styled(MdClose)`
  font-size: 1.5rem;
  color: rgb(0, 0, 0, 0.7);
  cursor: pointer;
`;

export const Title = styled.p`
  margin: 0;
  font-size: 1.2rem;
`;

export const TabsNav = styled.ul`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 2rem;
  border: 1px solid rgb(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding-inline-start: 0px;
`;

export const Tab = styled.li`
  padding: 0.1rem 1rem;
  list-style: none;
  cursor: pointer;
  text-align: center;
  font-size: 0.8rem;

  &:first-child {
    border-right: 1px solid rgb(0, 0, 0, 0.1);
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }

  &:nth-child(2) {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }

  &.active {
    background-color: #42b5f5;
    color: white;
  }
`;

export const InputField = styled.input`
  border-radius: 0.5rem;
  padding: 0.4rem;
  width: 80%;
  border: 1px solid rgb(0, 0, 0, 0.1);

  &:focus-visible {
    outline: rgb(59, 130, 246) auto 1px;
  }

  &.error {
    border: 1px solid red;
  }
`;

export const CreateBtn = styled.button`
  border-radius: 0.5rem;
  padding: 0.4rem;
  width: 86%;
  color: white;
  border: none;
  background-color: #42b5f5;
  margin-top: 1rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
