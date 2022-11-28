import React from 'react';
import styled from '@emotion/styled';
interface ModalBodyProps {
  onOk: () => void;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  okText: string;
  cancelText: string;
  loading?: boolean;
  okDisabled?: boolean;
  maxWidth?: number;
}
const ModalBody = ({
  onSubmit,
  onOk,
  onClose,
  title,
  cancelText,
  okText,
  children,
}: ModalBodyProps) => {
  return (
    <ModalBodyWrap onSubmit={onSubmit}>
      <Title>{title}</Title>
      <Close onClick={onClose} />
      {children}
      <hr />
      <ModalButtonWrap>
        <Button onClick={onClose}>{cancelText}</Button>
        <Button type="submit" onClick={onOk}>
          {okText}
        </Button>
      </ModalButtonWrap>
    </ModalBodyWrap>
  );
};

const ModalBodyWrap = styled.form<{ maxWidth?: number }>`
  color: #2c3137;
  font-size: 14px;
  ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth}px;`}
  min-width: 408px;
  padding: 30px 36px 20px 36px;
  border-radius: 8px;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.2);
  border: solid 1px #f0f0f0;
  background-color: #fff;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 20px;
  letter-spacing: -1.14px;
  margin-bottom: 20px;
`;

const ModalButtonWrap = styled.div`
  display: flex;
  justify-content: end;

  button[type='submit'] {
    margin-left: 8px;
  }
`;

const Close = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
  width: 24px;
  height: 24px;
  opacity: 0.3;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  &:before,
  &:after {
    position: absolute;
    left: 11px;
    content: '';
    height: 24px;
    width: 2px;
    background-color: #333;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

export const Button = styled.button`
  background: white;
  border: 1px solid #bbb;
  color: #333;
  width: 60px;
  height: 40px;
  border-radius: 4px;
  
  cursor: pointer;
`;

export default ModalBody;
