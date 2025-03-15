import React from 'react';
import { CardSmall } from '@lib';
import { Link } from 'react-router';
import { UserInfo } from '@utils';
import { PATH_VALUE } from '@utils';

type CardsListProps = {
  title: string;
  path: PATH_VALUE;
  formsValue: UserInfo[];
  lastSavedFormId?: number | null;
};

export const CardsList: React.FC<CardsListProps> = ({
  title,
  path,
  formsValue,
  lastSavedFormId,
}) => {
  const getSearchParams = (index: number): string => {
    const params = new URLSearchParams({
      i: index.toString(),
    }).toString();
    return `${params ? '?' : ''}${params}`;
  };

  return (
    <div>
      <h2>{title}</h2>
      <ul className="list">
        {formsValue.map((formData, index) => {
          return (
            <li
              className={`card ${lastSavedFormId === index ? 'border-theme' : ''}`}
              key={index}
            >
              <Link to={`${path}${getSearchParams(index)}`} className="link">
                <CardSmall userInfo={formData} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
