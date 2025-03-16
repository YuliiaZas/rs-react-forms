import { FC } from 'react';
import { formLabel, TABLE_LABEL, UserInfo } from '@utils';

interface CardSmallProps {
  userInfo: UserInfo;
}

export const CardSmall: FC<CardSmallProps> = ({ userInfo }) => {
  return (
    <div>
      {Object.values(TABLE_LABEL).map((label, i, arr) => (
        <div
          className={`d-flex justify-space-between${i === arr.length - 1 ? '' : ' mb-2'}`}
          key={label}
        >
          {label === TABLE_LABEL.FILE ? (
            <img
              src={userInfo[label] as string}
              alt="picture"
              height={100}
              width={150}
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <>
              <span>{formLabel[label]}</span>
              <span>{userInfo[label]}</span>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
