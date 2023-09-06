import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as Styled from '../common-styles';

import { setCurrentNav } from '../../../../store/app/actions';
import {
  setCommentarySelects,
  setCommentarySelectsError,
  setCsvTemplate,
  togglePreview,
} from '../../../../store/commentary/actions';

import { AppStateType } from '../../../../store';

import { TablePreview } from '../table-preview';
import { RecentComments } from '../recent-comments';
//import { Instructions } from "../instructions";

import { NoAccess } from '../../../../hocs/with-write-access';

import { CommentaryForm } from '../commentary-form';
import { Instructions } from '../instructions';
import { ListType } from '../../../../store/commentary/types';

export const Add = () => {
  const dispatch = useDispatch();

  const appState = useSelector((state: AppStateType) => state.app);

  const commentaryState = useSelector(
    (state: AppStateType) => state.commentary
  );

  const {
    showPreview,
    commentaryPreviewList,
    classOfBusiness,
    subSection1,
    subSection2,
    dashBoard,
    year,
    month,
    report,
    reportError,
  } = commentaryState;

  const { userAccess } = appState;

  useEffect(() => {
    dispatch(setCurrentNav('/commentary', 'Add'));

    return () => {
      const blank: ListType = {
        id: '',
        name: '',
      };
      dispatch(setCsvTemplate([]));
      dispatch(setCommentarySelects(blank, blank, blank, blank, '', '', blank));
      dispatch(togglePreview(false, []));
    };
  }, [dispatch]);

  const validateView = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!classOfBusiness?.id) {
      event.preventDefault();
      dispatch(setCommentarySelectsError('required'));
    }
    if (!subSection1?.id) {
      event.preventDefault();
      dispatch(setCommentarySelectsError(undefined, 'required'));
    }
    if (!subSection2?.id) {
      event.preventDefault();
      dispatch(setCommentarySelectsError(undefined, undefined, 'required'));
    }
    if (!dashBoard?.id) {
      event.preventDefault();
      dispatch(
        setCommentarySelectsError(undefined, undefined, undefined, 'required')
      );
    }
    if (!year) {
      event.preventDefault();
      dispatch(
        setCommentarySelectsError(
          undefined,
          undefined,
          undefined,
          undefined,
          'required'
        )
      );
    }
    if (!month) {
      event.preventDefault();
      dispatch(
        setCommentarySelectsError(
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          'required'
        )
      );
    }
    if (!report?.id) {
      event.preventDefault();
      dispatch(
        setCommentarySelectsError(
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          'required'
        )
      );
    }
  };
  if (userAccess === 'READ') {
    return <NoAccess />;
  }
  return (
    <Styled.Container>
      <Styled.Row style={{ borderRight: '1px solid #595959' }}>
        <Styled.RowContent>
          <CommentaryForm />
          <TablePreview
            label='List of reports/pages which have commentary section for visualization'
            list={commentaryPreviewList}
            showPreview={Boolean(showPreview)}
            hasError={Boolean(reportError)}
          />
          <Styled.Bottom>
            <Styled.RouteLink
              onClick={validateView}
              to={`/commentary/add-comment/${classOfBusiness?.id}/${classOfBusiness?.name}/${subSection1?.id}/${subSection1?.name}/${subSection2?.id}/${subSection2?.name}/${dashBoard?.id}/${dashBoard?.name}/${year}/${month}/${report?.id}/${report?.name}`}
            >
              ADD
            </Styled.RouteLink>
          </Styled.Bottom>
        </Styled.RowContent>
      </Styled.Row>

      <Styled.Row>
        <Styled.RowContent>
          {showPreview ? <Instructions /> : <RecentComments />}
        </Styled.RowContent>
      </Styled.Row>
    </Styled.Container>
  );
};

// const WriteAccessProtected = WithWriteAccess(Add);

// export { WriteAccessProtected as Add}
