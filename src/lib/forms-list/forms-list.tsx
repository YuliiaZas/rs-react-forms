import React from 'react';
import {
  getUncontrolledForms,
  getControlledForms,
  getLastSavedForm,
  resetLastSavedForm,
} from '@store';
import { useAppDispatch, useAppSelector } from '@hooks';
import { FORM_TYPE, PATH_VALUE } from '@utils';
import { CardsList } from '@lib';

export const FormsList: React.FC = () => {
  const dispatch = useAppDispatch();

  const uncontrolledForms = useAppSelector((state) =>
    getUncontrolledForms(state)
  );
  const controlledForms = useAppSelector((state) => getControlledForms(state));
  const lastSavedForm = useAppSelector((state) => getLastSavedForm(state));

  setTimeout(() => {
    dispatch(resetLastSavedForm());
  }, 1500);

  return (
    <div className="d-flex gap-3">
      <CardsList
        title={'Uncontrolled Forms'}
        path={PATH_VALUE.UNCONTROLLED}
        formsValue={uncontrolledForms}
        lastSavedFormId={
          lastSavedForm?.type === FORM_TYPE.UNCONTROLLED
            ? lastSavedForm?.id
            : null
        }
      />
      <CardsList
        title={'Controlled Forms'}
        path={PATH_VALUE.CONTROLLED}
        formsValue={controlledForms}
        lastSavedFormId={
          lastSavedForm?.type === FORM_TYPE.CONTROLLED
            ? lastSavedForm?.id
            : null
        }
      />
    </div>
  );
};
