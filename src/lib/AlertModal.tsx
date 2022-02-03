import React from 'react';
import styled from '@emotion/styled';
import { GrCircleAlert } from 'react-icons/gr';

const InfoModal = styled.div<{ visible: boolean }>`
  pointer-events: none;
  display: flex;
  background: ${(props) =>
    props.visible ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0)'};
  position: fixed;
  z-index: 150;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: background 0.5s;
  content: '';
  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    place-items: center;
    gap: 0.25rem;
    position: fixed;
    z-index: 300;
    top: 50%;
    left: 50%;
    padding: 1rem;
    border-radius: 0.5rem;
    background: white;
    font-size: 1.25rem;
    font-weight: bold;
    transform: translate(-50%, -50%);
    opacity: ${(props) => (props.visible ? 1 : 0)};
    transition: opacity 0.5s;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.5);
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
        <GrCircleAlert className="icon" />
        {text}
      </div>
    </InfoModal>
  );
};

export default React.memo(AlertModal);
