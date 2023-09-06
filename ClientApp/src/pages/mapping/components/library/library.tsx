import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import * as Styled from '../common-styles';

import { setCurrentNav } from '../../../../store/app/actions';
//import { AppStateType } from "../../../../store";

import { SelectInput } from '../../../../components/select-input';
import { MappingTablesList } from './components/mapping-tables-list';

export const Library = () => {
  const dispatch = useDispatch();
  const [showPreview, setShowPreview] = useState(false);
  const [selectedCOF, setSelectCOF] = useState('');
  const [selectedDashBoard, setSelectedDashBoard] = useState('');

  //const dataMappingState = useSelector((state: AppStateType) => state.mapping);

  //const { classOfBusiness } = dataMappingState;

  useEffect(() => {
    dispatch(setCurrentNav('/mapping', 'Library'));
  }, [dispatch]);

  const handleCOFhange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (event.target.value === 'Select an item from list') {
        setShowPreview(false);
      } else {
        //setShowPreview(true);
        setSelectCOF(event.target.value);
      }
    },
    []
  );

  // const handleDashBoardChange = useCallback(
  //   (event: React.ChangeEvent<HTMLSelectElement>) => {
  //     if (event.target.value === "Select an item from list") {
  //       setShowPreview(false);
  //     } else {
  //       setShowPreview(true);
  //       setSelectedDashBoard(event.target.value);
  //     }
  //   },
  //   []
  // );

  const validateView = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    alert('Its just a placeholder (Mocked View)');
    return;
    // if (!selectedDashBoard && !selectedCOF) {
    //   event.preventDefault();
    // }
  };

  return (
    <Styled.Container>
      <Styled.Row style={{ borderRight: '1px solid #595959' }}>
        <Styled.RowContent>
          <SelectInput
            label='Class Of Business'
            ariaLabel='Select Class of Business'
            options={[
              'Select an item from list',
              'Shipping',
              'Operations',
              'Oil',
              'Crude',
            ]}
            onChange={handleCOFhange}
          />
          {/* <SelectInput
            label="Dashboard"
            options={[
              "Select an item from list",
              "Plan Weeklies",
              "Time Dimension",
              "ST_Weekly_Mapping",
              "Tax Rates",
              "Garance Extract WONA",
              "Garance Extract NA",
              "Scorecard Recon T2BF",
              "Scorecard Recon Mapping",
              "R1 Opex Scorecard",
              "Profit Center Distribution",
              "OCAT",
            ]}
            onChange={handleDashBoardChange}
          /> */}
          <Styled.Bottom justifyContent='flex-end'>
            <Styled.RouteLink
              onClick={validateView}
              to={`/mapping/view-list/${selectedCOF}/${selectedDashBoard}`}
            >
              VIEW
            </Styled.RouteLink>
          </Styled.Bottom>
        </Styled.RowContent>
      </Styled.Row>

      <Styled.Row>
        <Styled.RowContent>
          {showPreview ? <MappingTablesList /> : ''}
        </Styled.RowContent>
      </Styled.Row>
    </Styled.Container>
  );
};
