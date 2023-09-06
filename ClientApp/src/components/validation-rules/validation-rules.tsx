import React, { useState, useCallback, useEffect, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

import * as Styled from './styles';

import { Modal } from '../modal';
import * as T from '../table';
import { Fetch } from '../../helpers/fetch';
import { Api } from '../../helpers/api';
import { AppStateType } from '../../store';

const Headings: string[] = ['Field', 'Mandatory', 'Type', 'Maximum Length'];

// const DESC: string[] = [
//   "* Length should be 4 characters long not less or more",
//   "** Length should be 3 characters long not less or more",
//   "Alpha = Characters from A-Z or a-z are allowed",
//   "Alphanumeric = Characters from A-Z or a-z and number 0-9",
// ];

export type rulesType = {
  field: string;
  mandatory: string;
  type: string;
  length: string;
  regex: string;
};

export const ValidationRules: React.FC = memo(() => {
  const [isValidationVisible, setIsValidationVisible] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rules, setRules] = useState<rulesType[] | null>(null);
  const [respMessage, setRespMessage] = useState('');
  const dataIngestionState = useSelector(
    (state: AppStateType) => state.dataIngestion
  );
  const mappingState = useSelector((state: AppStateType) => state.mapping);
  const appState = useSelector((state: AppStateType) => state.app);

  const { selectedDifId } = dataIngestionState;
  const { selectedMtId } = mappingState;
  const { currentNav } = appState;

  const getRules = useCallback(async () => {
    try {
      setIsValidationVisible(true);
      setIsLoading(true);
      let fileId =
        currentNav === '/data-ingestion' ? selectedDifId : selectedMtId;
      let response = await Fetch(
        `${Api}/Shared/ValidationRule/${fileId}`,
        'GET'
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      let json = await response.json();
      setIsLoading(false);
      setRules(json);
    } catch (error: any) {
      setIsLoading(false);
      setRules(null);
      setRespMessage(error.message);
    }
  }, [selectedDifId, selectedMtId, currentNav]);

  useEffect(() => {
    return () => {
      setIsLoading(false);
      setRules(null);
      setRespMessage('');
    };
  }, [setIsLoading, setRules, setRespMessage]);

  const handleClose = useCallback(() => {
    setIsValidationVisible(false);
    setIsLoading(false);
    setRules(null);
    setRespMessage('');
  }, [setIsLoading, setRules, setRespMessage, setIsValidationVisible]);

  const dataTable = useMemo(() => {
    return (
      <T.Table style={{ width: '100%' }}>
        <T.THead>
          <T.TRow
            borderBottom='1px solid #D9D9D9'
            borderTop='1px solid #D9D9D9'
            borderLeft='1px solid #D9D9D9'
          >
            {Headings.map((h) => (
              <T.TH
                key={h}
                borderRight='1px solid #D9D9D9'
                style={{
                  color: 'white',
                  backgroundColor: 'black',
                  padding: '8px 4px',
                  position: 'static',
                }}
              >
                {h}
              </T.TH>
            ))}
          </T.TRow>
        </T.THead>
        <T.TBody>
          {rules?.map((r, i) => (
            <T.TRow
              key={r.field + i}
              borderBottom='1px solid #D9D9D9'
              borderTop='1px solid #D9D9D9'
              borderLeft='1px solid #D9D9D9'
            >
              <Styled.TD borderRight='1px solid #D9D9D9'>{r.field}</Styled.TD>
              <Styled.TD borderRight='1px solid #D9D9D9'>
                {r.mandatory}
              </Styled.TD>
              <Styled.TD borderRight='1px solid #D9D9D9'>{r.type}</Styled.TD>
              <Styled.TD borderRight='1px solid #D9D9D9'>{r.length}</Styled.TD>
            </T.TRow>
          ))}
        </T.TBody>
      </T.Table>
    );
  }, [rules]);

  // const descriptions = useMemo(() => {
  //   return (
  //     <Styled.List listStyle="none" style={{ marginTop: "20px" }}>
  //       {DESC.map((d, i) => (
  //         <Styled.ListItem key={i}>{d}</Styled.ListItem>
  //       ))}
  //     </Styled.List>
  //   );
  // }, []);

  return (
    <Styled.Section>
      <Styled.SmallTitle>Validation rules to follow :</Styled.SmallTitle>
      <Styled.List listStyle='none'>
        <Styled.ListItem>
          Please check validation rules for correct data inputs and values.
        </Styled.ListItem>
        {(selectedDifId || selectedMtId) && (
          <Styled.ListItem>
            For more details{' '}
            <Styled.ClickHere onClick={getRules}>click here </Styled.ClickHere>
          </Styled.ListItem>
        )}
      </Styled.List>
      {isValidationVisible && (
        <Modal
          title='Validation'
          backDropBackgroundColor='rgba(0,0,0, 0.3)'
          width='90%'
          close={handleClose}
        >
          {isLoading && !respMessage ? (
            <span style={{ width: '100%', textAlign: 'center' }}>
              Loading...
            </span>
          ) : !isLoading && respMessage !== '' ? (
            <span style={{ width: '100%', textAlign: 'center' }}>
              {respMessage}
            </span>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              {dataTable}
              {/* {descriptions} */}
            </div>
          )}
        </Modal>
      )}
    </Styled.Section>
  );
});
