import React from 'react';
import { getUncontrolledForms, getControlledForms } from '@store';
import { useAppSelector } from '@hooks';
import { PATH_VALUE } from '@utils';
import { CardsList } from '@lib';

export const FormsList: React.FC = () => {
  const uncontrolledForms = useAppSelector((state) =>
    getUncontrolledForms(state)
  );
  const controlledForms = useAppSelector((state) => getControlledForms(state));

  return (
    <div className="d-flex gap-3">
      <CardsList
        title={'Uncontrolled Forms'}
        path={PATH_VALUE.UNCONTROLLED}
        formsValue={uncontrolledForms}
      />
      <CardsList
        title={'Controlled Forms'}
        path={PATH_VALUE.CONTROLLED}
        formsValue={controlledForms}
      />
    </div>
  );
};
