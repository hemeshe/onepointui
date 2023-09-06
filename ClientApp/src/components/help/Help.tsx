import React from 'react';

import * as S from './styles';

export const Help = () => {
  return (
    <S.Help>
      <S.HelpCard>
        <S.HelpTitle>Help Section</S.HelpTitle>
        <S.HeplContent>
          <S.HelpDesc>
            For any kind of technical issues, please contact:{' '}
            {/* <S.StyledEmail href="mailto:Jesse.Escobedo@shell.com">
              Jesse.Escobedo@shell.com
            </S.StyledEmail> */}
          </S.HelpDesc>
          <S.HelpDesc>
            For access permission, please fill this{' '}
            <S.StyledEmail style={{ textDecoration: 'underline' }} href=''>
              Form
            </S.StyledEmail>{' '}
            and for any security issues contact:{' '}
            {/* <S.StyledEmail href="mailto:Jesse.Escobedo@shell.com">
              Jesse.Escobedo@shell.com
            </S.StyledEmail> */}
          </S.HelpDesc>
          <S.HelpDesc>
            For any details regarding data, content & project team, please
            contact:{' '}
            {/* <S.StyledEmail href="mailto:Jesse.Escobedo@shell.com">
              Jesse.Escobedo@shell.com
            </S.StyledEmail> */}
          </S.HelpDesc>
        </S.HeplContent>
      </S.HelpCard>
    </S.Help>
  );
};
