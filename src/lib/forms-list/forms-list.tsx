import React from 'react';
import { getUncontrolledForms, getControlledForms } from '@store';
import { useAppSelector } from '@hooks';
import { CardSmall } from '@lib';
import { Link } from 'react-router';
import { PATH_VALUE } from '@utils';

export const FormsList: React.FC = () => {
  const uncontrolledForms = useAppSelector((state) =>
    getUncontrolledForms(state)
  );
  const controlledForms = useAppSelector((state) => getControlledForms(state));

  const getSearchParams = (index: number): string => {
    const params = new URLSearchParams({
      i: index.toString(),
    }).toString();
    return `${params ? '?' : ''}${params}`;
  };

  return (
    <div>
      <h2>Uncontrolled Forms</h2>
      {uncontrolledForms.map((formData, index) => {
        return (
          <Link
            to={`${PATH_VALUE.UNCONTROLLED}${getSearchParams(index)}`}
            key={index}
          >
            <CardSmall userInfo={formData} />
          </Link>
        );
      })}

      <h2>Controlled Forms</h2>
      {controlledForms.map((formData, index) => {
        return (
          <Link
            to={`${PATH_VALUE.CONTROLLED}${getSearchParams(index)}`}
            key={index}
          >
            <CardSmall userInfo={formData} />
          </Link>
        );
      })}
    </div>
  );
};
