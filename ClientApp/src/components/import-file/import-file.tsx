import React, { useCallback, useState } from "react";

import * as S from "./styles";

import { Row, Col } from "../grid";
import { Icon } from "../icon";

type Props = {
  close?: () => void;
  onSubmit: (f: File | null) => void;
};

export const ImportFile = ({ close, onSubmit }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [error, setError] = useState("");

  const handleFileChange = useCallback((event) => {
    let f = event.target.files[0],
      extension = f && f.name ? f.name.split(".").pop() : "";
    setError("");
    if (f && extension === "csv") {
      setFileName(f.name);
      setFile(f);
    } else if (f && extension !== "csv") {
      setFileName("");
      setError("Invalid file. Only Excel (.csv) format is allowed.");
    } else {
      setFileName("");
    }
  }, []);

  const removeFile = useCallback(() => {
    setFileName("");
  }, []);
  return (
    <S.Container>
      <S.Main>
        <Row>
          <Col size={4}>
            <S.Instruction borderRight>
              Only Excel (.csv) format is accepted.
            </S.Instruction>
          </Col>
          <Col size={4}>
            <S.Instruction borderRight>
              Max. File size is 100MB Min. File size is 50kb
            </S.Instruction>
          </Col>
          <Col size={4}>
            <S.Instruction>
              Only single file upload No bulk upload allowed
            </S.Instruction>
          </Col>
        </Row>

        <Row justifyContentCenter alignItemsCenter>
          <S.FileDragArea size={12} justifyContentCenter alignItemsCenter>
            <S.FileInput
              accept=".csv"
              type="file"
              onChange={handleFileChange}
            />
            <Icon type="uploadIcon" width="32" height="32" />
            {!file && (
              <S.FileDragDesc>
                Drag and Drop the file <br /> or <S.Browse>Browse</S.Browse> to
                choose a file
              </S.FileDragDesc>
            )}
          </S.FileDragArea>

          {file && fileName && (
            <S.FileOutputArea justifyContentSpaceBetween>
              <S.FileName justifyContentLeft size={10}>
                {fileName}
              </S.FileName>
              <S.FileRemove onClick={removeFile} justifyContentRight size={2}>
                X
              </S.FileRemove>
            </S.FileOutputArea>
          )}
          {error && (
            <S.FileOutputArea justifyContentCenter>
              <S.ErrorMessage justifyContentLeft size={10}>
                {error}
              </S.ErrorMessage>
              <S.FileRemove
                onClick={() => setError("")}
                justifyContentRight
                size={2}
              >
                X
              </S.FileRemove>
            </S.FileOutputArea>
          )}
        </Row>
      </S.Main>
      <S.Footer>
        <Row justifyContentCenter>
          <Col size={6} justifyContentCenter>
            <S.Button onClick={close}>Cancel</S.Button>
          </Col>
          <Col size={6} justifyContentCenter>
            <S.Button onClick={() => onSubmit(file)}>Submit</S.Button>
          </Col>
        </Row>
      </S.Footer>
    </S.Container>
  );
};
