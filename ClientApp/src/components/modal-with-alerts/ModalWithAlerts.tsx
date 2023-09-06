import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Modal } from "../../components/modal";
import { InProgress } from "../../components/in-progress";
import { Acknowledgement } from "../../components/acknowledgement";
import { NoAccess as NoAccessComponent } from "../../components/no-access";
import { Loading } from "../../components/loading";

import { AppStateType } from "../../store";

import {
  finishLoading,
  closeModal,
  setNoAccess,
} from "../../store/app/actions";

export const ModalWithAlerts = () => {
  const appState = useSelector((state: AppStateType) => state.app);
  const dispatch = useDispatch();
  const {
    NoAccess,
    isUploading,
    success,
    error,
    message,
    showModal,
    isLoading,
    fileUploadSuccess,
  } = appState;

  const handleNoAccessClose = useCallback(() => {
    dispatch(closeModal());
    dispatch(setNoAccess(false));
  }, [dispatch]);
  return (
    <React.Fragment>
      {showModal && (
        <Modal
          title={
            isLoading
              ? "Loading..."
              : isUploading
              ? "In Progress..."
              : fileUploadSuccess
              ? "Acknowledgment"
              : success
              ? "Success"
              : error
              ? "Error"
              : NoAccess
              ? ""
              : ""
          }
          backDropBackgroundColor="rgba(0,0,0, 0.3)"
          width="50%"
        >
          {isUploading ? (
            <InProgress close={() => dispatch(finishLoading())} />
          ) : isLoading ? (
            <Loading close={() => dispatch(finishLoading())} />
          ) : fileUploadSuccess ? (
            <Acknowledgement
              close={() => dispatch(finishLoading())}
              message={message ?? "Request Successfull"}
            />
          ) : success ? (
            <Acknowledgement
              close={() => dispatch(finishLoading())}
              message={message ?? "Request Successfull"}
            />
          ) : error ? (
            <Acknowledgement
              close={() => dispatch(closeModal())}
              message={message ?? "Some Error"}
            />
          ) : NoAccess ? (
            <Acknowledgement
              close={handleNoAccessClose}
              message={<NoAccessComponent />}
            />
          ) : (
            ""
          )}
        </Modal>
      )}
    </React.Fragment>
  );
};
