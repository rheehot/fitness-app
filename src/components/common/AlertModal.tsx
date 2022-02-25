import React from 'react';
import styled from '@emotion/styled';
import { BsExclamationCircle } from 'react-icons/bs';

const InfoModal = styled.div<{ visible: boolean }>`
  display: flex;
  position: fixed;
  z-index: 150;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) =>
    props.visible ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0)'};
  transition: background 0.5s;
  pointer-events: none;
  .text {
    display: flex;
    flex-direction: column;
    place-items: center;
    gap: 0.25rem;
    position: fixed;
    width: 80%;
    max-width: 320px;
    z-index: 300;
    top: 50%;
    left: 50%;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid ${(props) => props.theme.border_main};
    background: ${(props) => props.theme.background_main};
    font-size: 1.125rem;
    font-weight: bold;
    transform: translate(-50%, -50%);
    opacity: ${(props) => (props.visible ? 1 : 0)};
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
    transition: opacity 0.5s;
    .icon {
      font-size: 2.5rem;
    }
  }
`;

type AlertModalProps = {
  visible: boolean;
  text: string;
};

const AlertModal = ({ visible, text }: AlertModalProps) => {
  return (
    <InfoModal visible={visible}>
      <div className="text">
        <BsExclamationCircle className="icon" />
        {text}
      </div>
    </InfoModal>
  );
};

export default AlertModal;
