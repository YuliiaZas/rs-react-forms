import { FC } from 'react';
import { KeyValuePair } from '@utils';
import styles from './card-small.module.css';

interface CardSmallProps {
  cardTitle: string;
  listOfDetails: KeyValuePair[];
  isSelected?: boolean;
}

export const CardSmall: FC<CardSmallProps> = ({
  cardTitle,
  listOfDetails,
  isSelected,
}) => {
  return (
    <div className={styles.card + (isSelected ? ` ${styles.selected}` : '')}>
      <h3>{cardTitle}</h3>
      <p>
        {listOfDetails.map((item, i, arr) => {
          return (
            <span key={item.key}>
              <span>{item.key}: </span>
              <span className={styles.value}>{item.value}</span>
              {i !== arr.length - 1 && '; '}
            </span>
          );
        })}
        .
      </p>
    </div>
  );
};
