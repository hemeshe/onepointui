import React, { useCallback, memo, FC, useEffect } from 'react';

import {
  accessOptions,
  isActiveOptions,
  profileTypeOptions,
} from '../../../../constants';

import * as T from '../../../../../../../components/table';

import * as Styled from './styles';

import { ProfilesPagesType, User } from '../../../../../../../types/admin';
import { Button } from '../../../../../../../components/button';

import { DateFormat } from '../../../../../../../components/date-format';

import { MultiSelectDropDown, Select } from '../../../multi-select-drop-down';

import { Headings } from '../../../../../components/headings';

import { useGetProfiles } from '../../../../hooks/useGetProfiles';
import { useProfilesAddTable } from '../../../../hooks/useProfilesAddTable';

type Props = {
  Data?: User[] | null;
};

export const UsersTable: FC<Props> = memo(({ Data }) => {
  const {
    handleSortClick,
    headings,
    profile,
    handleAddRow,
    handleRemoveAddRow,
    handleChange,
    handleLandingPageInputChange,
    handleHomePageInputChange,
    handleSubLandingPageInputChange,
    handleReportInputChange,
    adminState,
  } = useProfilesAddTable();

  const { getProfileTeams, profileTeams } = useGetProfiles();

  useEffect(() => {
    getProfileTeams();
  }, [getProfileTeams]);

  const getStatusLabel = useCallback((status: boolean) => {
    return status ? 'Active' : 'Inactive';
  }, []);

  const groupByLandingPages = useCallback((arr: ProfilesPagesType[]) => {
    let grouped = arr.reduce((accumulator, current) => {
      let key = current.homePageId || 'others';
      accumulator[key] = accumulator[key] || [];
      accumulator[key].push(current);
      return accumulator;
    }, Object.create(null));
    return Object.values(grouped).map((el: any) => ({
      parentName: el[0].homePageName,
      options: el,
    }));
  }, []);

  const groupBySubLandingPages = useCallback((arr: ProfilesPagesType[]) => {
    let grouped = arr.reduce((accumulator, current) => {
      let key = current.landingPageId || 'others';
      accumulator[key] = accumulator[key] || [];
      accumulator[key].push(current);
      return accumulator;
    }, Object.create(null));
    return Object.values(grouped).map((el: any) => ({
      parentName: el[0].landingPageName,
      options: el,
    }));
  }, []);

  const groupByReportDetails = useCallback((arr: ProfilesPagesType[]) => {
    let grouped = arr.reduce((accumulator, current) => {
      let key = current.subLandingPageId || 'others';
      accumulator[key] = accumulator[key] || [];
      accumulator[key].push(current);
      return accumulator;
    }, Object.create(null));
    return Object.values(grouped).map((el: any) => ({
      parentName: `${el[0].landingPageName} - ${el[0].subLandingPageName}`,
      options: el,
    }));
  }, []);

  return (
    <T.Table style={{ minHeight: 'auto' }} id='myTable'>
      <T.THead>
        <T.TRow borderBottom='1px solid #D9D9D9'>
          <Headings headings={headings} handleSortClick={handleSortClick} />
        </T.TRow>
      </T.THead>
      <T.TBody>
        <T.TRow>
          <T.TD colSpan={headings?.length}>
            {!profile && adminState.homePages && (
              <Button
                label='+ Add profile'
                primary
                size='block'
                onClick={handleAddRow}
              />
            )}
          </T.TD>
        </T.TRow>

        {profile && profile.homePages && (
          <T.TRow key={profile.id} borderBottom='1px solid #D9D9D9'>
            {/* <T.TD textAlign="center"></T.TD> */}
            <T.TD>
              <Select
                onChange={(e) => handleChange(e, 'profileType')}
                value={profile.profileType?.toUpperCase()}
                style={{ minWidth: '115px' }}
              >
                <Styled.Option value=''>select</Styled.Option>
                {profileTypeOptions.map((op) => (
                  <Styled.Option key={op.toString()} value={op.toUpperCase()}>
                    {op.toUpperCase()}
                  </Styled.Option>
                ))}
              </Select>
            </T.TD>
            <T.TD textAlign='center'>
              {profile && profile.profileType === 'EXISTING' ? (
                <Select
                  onChange={(e) => handleChange(e, 'profileName')}
                  value={profile.profileName}
                  style={{ minWidth: '150px' }}
                >
                  <Styled.Option value=''>select item</Styled.Option>
                  {profileTeams.map((op) => (
                    <Styled.Option key={op.teamName} value={op.teamName}>
                      {op.teamName}
                    </Styled.Option>
                  ))}
                </Select>
              ) : (
                <Styled.Input
                  value={profile.profileName ?? ''}
                  onChange={(e) => handleChange(e, 'profileName')}
                  name='profileName'
                  placeholder='Enter profile name'
                  style={{ minWidth: '150px' }}
                />
              )}
              {/* <Styled.Input
                value={profile.profileName ?? ''}
                onChange={(e) => handleChange(e, 'profileName')}
                name='profileName'
                placeholder='Enter profile name'
              /> */}
            </T.TD>
            <T.TD textAlign='center'>
              <MultiSelectDropDown
                options={profile.homePages?.map((el) => ({
                  pageId: el.homePageId,
                  pageName: el.homePageName,
                }))}
                items={[
                  {
                    parentName: '',
                    options: profile.homePages?.map((el) => ({
                      pageId: el.homePageId,
                      pageName: el.homePageName,
                    })),
                  },
                ]}
                onSelect={(e, op) =>
                  handleHomePageInputChange(
                    e,
                    profile.id,
                    'selectedHomePages',
                    op
                  )
                }
                selectedOptions={profile.selectedHomePages}
              />
            </T.TD>
            <T.TD textAlign='center'>
              <MultiSelectDropDown
                options={profile.landingPages?.map((el) => ({
                  pageId: el.landingPageId,
                  pageName: el.landingPageName,
                }))}
                items={groupByLandingPages(profile.landingPages ?? [])}
                onSelect={(e, op) =>
                  handleLandingPageInputChange(
                    e,
                    profile.id,
                    'selectedLandingPages',
                    op
                  )
                }
                selectedOptions={profile.selectedLandingPages}
              />
            </T.TD>
            <T.TD textAlign='center'>
              <MultiSelectDropDown
                options={profile.subLandingPages?.map((el) => ({
                  pageId: el.subLandingPageId,
                  pageName: el.subLandingPageName,
                }))}
                items={groupBySubLandingPages(profile.subLandingPages ?? [])}
                onSelect={(e, op) =>
                  handleSubLandingPageInputChange(
                    e,
                    profile.id,
                    'selectedSubLandingPages',
                    op
                  )
                }
                selectedOptions={profile.selectedSubLandingPages}
              />
            </T.TD>
            <T.TD textAlign='center'>
              <MultiSelectDropDown
                options={profile.reportDetails?.map((el) => ({
                  pageId: el.reportId,
                  pageName: el.reportName,
                }))}
                items={groupByReportDetails(profile.reportDetails ?? [])}
                onSelect={(e, op) =>
                  handleReportInputChange(
                    e,
                    profile.id,
                    'selectedReportPages',
                    op
                  )
                }
                selectedOptions={profile.selectedReportPages}
              />
            </T.TD>
            <T.TD>
              <Select
                onChange={(e) => handleChange(e, 'status')}
                value={profile.status?.toString()}
                style={{ minWidth: '100px' }}
              >
                {isActiveOptions.map((op) => (
                  <Styled.Option key={op} value={op}>
                    {op === 'true' ? 'Active' : 'Inactive'}
                  </Styled.Option>
                ))}
              </Select>
            </T.TD>

            <T.TD>
              <Select
                onChange={(e) => handleChange(e, 'access')}
                value={profile.access?.toUpperCase()}
                style={{ minWidth: '100px' }}
              >
                {accessOptions.map((op) => (
                  <Styled.Option key={op.toString()} value={op.toUpperCase()}>
                    {op.toUpperCase()}
                  </Styled.Option>
                ))}
              </Select>
            </T.TD>
            <T.TD>
              <Styled.RemoveAddInput onClick={() => handleRemoveAddRow()}>
                X
              </Styled.RemoveAddInput>
            </T.TD>
          </T.TRow>
        )}

        {Data?.map((u, i) => (
          <T.TRow key={i.toString()} borderBottom='1px solid #D9D9D9'>
            <T.TD>{'Existing'}</T.TD>
            <T.TD borderBottom='1px solid #D9D9D9'>{u.profileName}</T.TD>
            <T.TD>{u.homePageName}</T.TD>
            <T.TD>{u.landingPageName}</T.TD>
            <T.TD>{u.subLandingPageName}</T.TD>
            <T.TD>{u.reportName}</T.TD>
            <T.TD>{getStatusLabel(Boolean(u.status))}</T.TD>
            <T.TD>{u.access}</T.TD>
            <T.TD>{u.createdTs && <DateFormat date={u.createdTs} />}</T.TD>
            <T.TD>{u.modifiedTs && <DateFormat date={u.modifiedTs} />}</T.TD>
            <T.TD>{u.createdBy}</T.TD>
            <T.TD>{u.modifiedBy}</T.TD>

            {profile && <T.TD></T.TD>}
          </T.TRow>
        ))}
      </T.TBody>
    </T.Table>
  );
});
