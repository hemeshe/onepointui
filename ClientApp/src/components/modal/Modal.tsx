import React from "react";

import * as Styled from "./styles";

import { Icon } from "../../components/icon";

export type Props = {
  title?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
  close?: () => void;
  backDropBackgroundColor?: string;
  justifyContent?: string;
  width?: string;
};

export const Modal = ({
  title,
  backgroundColor,
  children,
  close,
  backDropBackgroundColor,
}: Props) => {
  return (
    <Styled.Modal backDropBackgroundColor={backDropBackgroundColor}>
      <Styled.ModalContent backgroundColor={backgroundColor}>
        {title && (
          <Styled.ModalHeader>
            <Styled.ModalHeaderTitle>{title}</Styled.ModalHeaderTitle>
            {close && (
              <Styled.CloseButton onClick={close}>
                <Icon type="closeIcon" width="22" height="22" />
              </Styled.CloseButton>
            )}
          </Styled.ModalHeader>
        )}
        <Styled.ModalBody>{children && children}</Styled.ModalBody>
      </Styled.ModalContent>
    </Styled.Modal>
  );
};
