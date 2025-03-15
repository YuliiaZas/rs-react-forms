import { FC } from 'react';
import { formLabel, TABLE_LABEL, UserInfo } from '@utils';

interface CardSmallProps {
  userInfo: UserInfo;
}

export const CardSmall: FC<CardSmallProps> = ({ userInfo }) => {
  return (
    <div>
      {Object.values(TABLE_LABEL).map((label) => (
        <div className="d-flex" key={label}>
          <span>{formLabel[label]}</span>
          <span>{userInfo[label]}</span>
        </div>
      ))}
    </div>
  );
};
