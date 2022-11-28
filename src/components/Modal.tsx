import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { keyframes } from '@emotion/react';

export interface ModalProps {
  visible: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

interface ModalContainerProps {
  children: React.ReactNode;
}

const ModalContainer = ({ children }: ModalContainerProps) => {
  const [el, setEl] = useState(document.createElement('div'));

  let modalRoot = document.getElementById('rview-modal');
  if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.id = 'rview-modal';
    document.body.append(modalRoot);
  }
  useEffect(() => {
    modalRoot?.appendChild(el);
    return () => {
      modalRoot?.removeChild(el);
    };
  }, []);

  return ReactDOM.createPortal(children, el);
};

const Modal = ({ visible, children, onClose }: ModalProps) => {
  return visible ? (
    <ModalContainer>
      <Container onClick={onClose}>
        <ContentsWrapper onClick={(e) => e.stopPropagation()}>{children}</ContentsWrapper>
      </Container>
    </ModalContainer>
  ) : null;
};

const Container = styled.div`
  overflow: scroll;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s;
  background: rgba(0, 0, 0, 0.3);
`;

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`;

const ContentsWrapper = styled.div`
  position: fixed;
  top: 100px;
  padding-bottom: 24px;
  animation: ${bounce} 1s ease;
`;

export default Modal;
