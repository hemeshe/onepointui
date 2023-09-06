import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as Styles from './styles';

import { Button } from '../../components/button';

import { AppStateType } from '../../store';
import { setCurrentPage } from '../../store/app/actions';
import { range } from '../../helpers/range';

type Props = {
  loadData: (PageNumber: number, PageSize: number) => void;
  pageData: any[];
  pageSize: number;
};

export const Pagination: React.FC<Props> = ({
  loadData,
  pageData,
  pageSize,
}) => {
  const dispatch = useDispatch();
  const appState = useSelector((state: AppStateType) => state.app);
  const { currentPage, pagination } = appState;

  const TotalCount =
    pagination && pagination.TotalCount ? pagination.TotalCount : '';

  const handlePageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { target } = e;
      const pageNumber = target.value;
      let pg = Number(pageNumber);
      dispatch(setCurrentPage(pg));
      loadData(pg, 20);
    },
    [dispatch, loadData]
  );

  const pagesCount: number = useMemo(
    () => Math.ceil(TotalCount / pageSize),
    [TotalCount, pageSize]
  );

  const pgnRange: number[] = useMemo(
    () => range(1, pagesCount, 1),
    [pagesCount]
  );

  const lastPage: number = useMemo(
    () => pgnRange[pgnRange.length - 1],
    [pgnRange]
  );

  const handlePagination = useCallback(
    (type) => {
      let pg;
      if (type === 'Next') {
        pg = currentPage + 1;
        dispatch(setCurrentPage(pg));
        loadData(pg, 20);
      }
      if (type === 'First') {
        pg = 1;
        dispatch(setCurrentPage(pg));
        loadData(pg, 20);
      }
      if (type === 'Last') {
        pg = Number(lastPage);
        dispatch(setCurrentPage(pg));
        loadData(pg, 20);
      } else if (type === 'Prev') {
        pg = currentPage - 1;
        dispatch(setCurrentPage(pg));
        loadData(pg, 20);
      }
    },
    [currentPage, loadData, dispatch, lastPage]
  );
  return (
    <Styles.Pagination>
      {!!(pageData && pageData.length) && (
        <React.Fragment>
          {currentPage > 1 && (
            <Button
              primary
              onClick={() => handlePagination('First')}
              label='First'
              disabled={currentPage === 1 ? true : false}
            />
          )}
          <Button
            primary
            onClick={() => handlePagination('Prev')}
            label=' < Prev'
            disabled={currentPage === 1 ? true : false}
          />
          <Styles.Select
            style={{ cursor: 'default', background: 'inherit', color: 'black' }}
            value={currentPage}
            onChange={handlePageChange}
            aria-label='Select Page'
          >
            {pgnRange?.map((tc) => (
              <Styles.Option key={tc}>{tc}</Styles.Option>
            ))}
          </Styles.Select>
          <Button
            primary
            onClick={() => handlePagination('Next')}
            label='Next > '
            disabled={currentPage === Number(lastPage) ? true : false}
          />
          <Button
            primary
            onClick={() => handlePagination('Last')}
            label='Last'
            disabled={currentPage === Number(lastPage) ? true : false}
          />
        </React.Fragment>
      )}
      <Styles.TotalCountDiv>
        Showing {pageData?.length} of {TotalCount} rows
      </Styles.TotalCountDiv>
    </Styles.Pagination>
  );
};
