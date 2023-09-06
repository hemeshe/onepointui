import React, { memo, useCallback } from 'react';

import * as T from '../../../../../components/table';
import * as Styled from './styles';

import { accessOptions, isActiveOptions } from '../../constants';

import { User } from '../../../../../types/admin';

import { DateFormat } from '../../../../../components/date-format';
import { Select } from '../../components/multi-select-drop-down';

import { timeFormat } from '../../../../../helpers/time-format';
import { Headings } from '../../../components/headings';

import {
  useProfilesEditTable,
  headingsType,
} from '../../hooks/useProfilesEditTable';

type Props = {
  headings?: headingsType[];
  Data?: User[];
};

export const UsersTable = memo(({ Data }: Props) => {
  const {
    handleHomeInputChange,
    handleLandingInputChange,
    handleSubLandingInputChange,
    handleReportInputChange,
    handleStatusInputChange,
    handleAccessInputChange,
    handleRowSelect,
    handleSortClick,
    history,
    currentSubNavChild,
    headings,
  } = useProfilesEditTable();

  const getStatusLabel = useCallback((status: boolean) => {
    return status ? 'Active' : 'Inactive';
  }, []);

  return (
    <T.Table style={{ minHeight: 'auto' }} id='myTable'>
      <T.THead>
        <T.TRow borderBottom='1px solid #D9D9D9'>
          {currentSubNavChild === 'Edit' && <T.TH></T.TH>}
          <Headings headings={headings} handleSortClick={handleSortClick} />
        </T.TRow>
      </T.THead>
      <T.TBody>
        {Data?.map((u, i) => (
          <T.TRow key={i.toString()} borderBottom='1px solid #D9D9D9'>
            {currentSubNavChild === 'Edit' && (
              <T.TD textAlign='center'>
                <Styled.Checkbox
                  type='checkbox'
                  onChange={(e) => handleRowSelect(e, u)}
                />
              </T.TD>
            )}
            {/* <T.TD>{d.id}</T.TD> */}
            <T.TD>{'Existing'}</T.TD>
            <T.TD borderBottom='1px solid #D9D9D9'>{u.profileName}</T.TD>
            <T.TD>
              {u.IsEditable ? (
                <Select
                  onChange={(e) => handleHomeInputChange(e, u)}
                  style={{ minWidth: '200px' }}
                  value={
                    u.homePages?.find(
                      (hm) => hm.homePageName === u.homePageName
                    )?.homePageId
                  }
                >
                  <Styled.Option value=''>select</Styled.Option>
                  {u.homePages?.map((op) => (
                    <Styled.Option key={op.homePageId} value={op.homePageId}>
                      {op.homePageName}
                    </Styled.Option>
                  ))}
                </Select>
              ) : (
                u.homePageName
              )}
            </T.TD>
            <T.TD>
              {u.IsEditable ? (
                <Select
                  onChange={(e) => handleLandingInputChange(e, u)}
                  style={{ minWidth: '200px' }}
                  value={
                    u.landingPages?.find(
                      (hm) => hm.landingPageId === u.landingPageId
                    )?.landingPageId
                  }
                >
                  <Styled.Option value=''>select</Styled.Option>
                  {u.landingPages?.map((op) => (
                    <Styled.Option
                      key={op.landingPageId}
                      value={op.landingPageId}
                    >
                      {op.landingPageName}
                    </Styled.Option>
                  ))}
                </Select>
              ) : (
                u.landingPageName
              )}
            </T.TD>
            <T.TD>
              {u.IsEditable ? (
                <Select
                  onChange={(e) => handleSubLandingInputChange(e, u)}
                  style={{ minWidth: '200px' }}
                  value={
                    u.subLandingPages?.find(
                      (hm) => hm.subLandingPageId === u.subLandingPageId
                    )?.subLandingPageId
                  }
                >
                  <Styled.Option value=''>select</Styled.Option>
                  {u.subLandingPages?.map((op) => (
                    <Styled.Option
                      key={op.subLandingPageId}
                      value={op.subLandingPageId}
                    >
                      {op.subLandingPageName}
                    </Styled.Option>
                  ))}
                </Select>
              ) : (
                u.subLandingPageName
              )}
            </T.TD>
            <T.TD>
              {u.IsEditable ? (
                <Select
                  onChange={(e) => handleReportInputChange(e, u)}
                  style={{ minWidth: '200px' }}
                  value={
                    u.reportDetails?.find((hm) => hm.reportId === u.reportId)
                      ?.reportId
                  }
                >
                  <Styled.Option value=''>select</Styled.Option>
                  {u.reportDetails?.map((op) => (
                    <Styled.Option key={op.reportId} value={op.reportId}>
                      {op.reportName}
                    </Styled.Option>
                  ))}
                </Select>
              ) : (
                u.reportName
              )}
            </T.TD>
            <T.TD>
              {u.IsEditable ? (
                <Select
                  onChange={(e) => handleStatusInputChange(e, u)}
                  value={u.status?.toString()}
                  style={{ minWidth: '100px' }}
                >
                  {isActiveOptions.map((op) => (
                    <Styled.Option key={op} value={op}>
                      {op === 'true' ? 'Active' : 'Inactive'}
                    </Styled.Option>
                  ))}
                </Select>
              ) : (
                getStatusLabel(Boolean(u.status))
              )}
            </T.TD>

            <T.TD>
              {u.IsEditable ? (
                <Select
                  onChange={(e) => handleAccessInputChange(e, u)}
                  value={u.access?.toUpperCase()}
                  style={{ minWidth: '100px' }}
                >
                  {accessOptions.map((op) => (
                    <Styled.Option key={op.toString()} value={op.toUpperCase()}>
                      {op.toUpperCase()}
                    </Styled.Option>
                  ))}
                </Select>
              ) : (
                u.access
              )}
            </T.TD>

            <T.TD>
              {u.createdTs && (
                <React.Fragment>
                  {history.location.pathname ===
                    '/power-bi-drls/profiles/history' && (
                    <span style={{ padding: '0 5px', display: 'block' }}>
                      {timeFormat(u.createdTs)}
                    </span>
                  )}
                  <DateFormat date={u.createdTs} />
                </React.Fragment>
              )}
            </T.TD>
            <T.TD>
              {u.modifiedTs && (
                <React.Fragment>
                  {history.location.pathname ===
                    '/power-bi-drls/profiles/history' && (
                    <span style={{ padding: '0 5px', display: 'block' }}>
                      {timeFormat(u.modifiedTs)}
                    </span>
                  )}
                  <DateFormat date={u.modifiedTs} />
                </React.Fragment>
              )}
            </T.TD>
            <T.TD>{u.createdBy}</T.TD>
            <T.TD>{u.modifiedBy}</T.TD>
          </T.TRow>
        ))}
      </T.TBody>
    </T.Table>
  );
});
