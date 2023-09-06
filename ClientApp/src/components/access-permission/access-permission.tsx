import React from 'react';

import * as S from './styles';

export const HelpContent = () => (
  <S.HeplContent>
    <S.HelpDesc>
      For Portal Admin rights, please raise a request email to:
      <br />
      {/* <S.StyledEmail href="TSMI-Portal@shell.com">
        TSMI-Portal@shell.com
      </S.StyledEmail> */}
    </S.HelpDesc>
    <S.HelpDesc>
      For any details regarding data and/or content, please contact{' '}
      {/* <S.StyledEmail href="mailto:Jesse.Escobedo@shell.com">
        Jesse.Escobedo@shell.com
      </S.StyledEmail> */}
    </S.HelpDesc>
  </S.HeplContent>
);

export const AccessPermission = () => {
  return (
    <S.Help>
      <S.HelpCard>
        <S.Title>Access/Permission</S.Title>
        <HelpContent />
      </S.HelpCard>
    </S.Help>
  );
};
