import { ReactNode, useEffect, useState } from 'react';
import { DropdownItem } from '@utils';
import styles from './dropdown.module.css';

type DropdownItemsSelect = Record<string, boolean>;

interface DropdownMultipleProps {
  items: DropdownItem[];
  selectedItems: DropdownItemsSelect;
  selectOptions: (value: DropdownItemsSelect) => void;
  showAll?: boolean;
  allTitle?: string;
  positionedRigth?: boolean;
  children?: ReactNode;
}

export const DropdownMultiple = ({
  items,
  selectedItems,
  selectOptions,
  showAll = true,
  allTitle = 'All',
  positionedRigth = false,
  children,
}: DropdownMultipleProps) => {
  const allId = 'all';
  const [initialItemsState, setInitialItemsState] =
    useState<DropdownItemsSelect | null>(null);
  const [currentItemsState, setCurrentItemsState] =
    useState<DropdownItemsSelect>({});

  const [allChecked, setAllChecked] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (items.length) {
      const newState = items.reduce(
        (acc, item) => ({
          ...acc,
          [item.value]: !!selectedItems[item.value],
        }),
        {}
      );
      setInitialItemsState(newState);
      setCurrentItemsState(newState);
    }
  }, [items, selectedItems]);

  useEffect(() => {
    if (!showAll) return;
    setAllChecked(items.every((item) => currentItemsState[item.value]));
    setIsSubmitDisabled(!items.some((item) => currentItemsState[item.value]));
  }, [currentItemsState, items, showAll]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log('multiple', styles.dropdown);
      if (
        isOpen &&
        event.target instanceof Element &&
        !event.target.closest(`.${styles.dropdown}`)
      ) {
        setIsOpen(false);
        if (initialItemsState) setCurrentItemsState(initialItemsState);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [initialItemsState, isOpen]);

  const handleSelectAll = () => {
    const newState = items.reduce(
      (acc, item) => ({
        ...acc,
        [item.value]: !allChecked,
      }),
      {}
    );
    setCurrentItemsState(newState);
  };

  const handleSubmit = () => {
    selectOptions(currentItemsState);
    setIsOpen(false);
  };

  const reset = () => {
    if (initialItemsState) setCurrentItemsState(initialItemsState);
  };

  const handleSelectItem = (value: string) => {
    const newState = {
      ...currentItemsState,
      [value]: !currentItemsState[value],
    };
    setCurrentItemsState(newState);
    setAllChecked(false);
    setIsSubmitDisabled(!Object.values(newState).some((value) => value));
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) reset();
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={toggleDropdown} className={styles.dropdownButton}>
        {children || 'Select'}
      </button>
      {isOpen && (
        <div className={`${styles.box} ${positionedRigth ? styles.right : ''}`}>
          {showAll && (
            <div className="mb-1">
              <input
                type="checkbox"
                id={allId}
                checked={allChecked}
                className="d-none"
                onChange={handleSelectAll}
              />
              <label
                htmlFor={allId}
                className="d-flex align-center gap-1 pointer"
              >
                <i
                  className={`icon-checkbox${allChecked ? '-checked' : ''}`}
                ></i>
                {allTitle}
              </label>
            </div>
          )}
          {items.map((item) => (
            <div key={item.value} className="mb-1">
              <input
                type="checkbox"
                id={item.value}
                checked={currentItemsState[item.value]}
                className="d-none"
                onChange={() => handleSelectItem(item.value)}
              />
              <label
                htmlFor={item.value}
                className="d-flex align-center gap-1 pointer"
              >
                <i
                  className={`icon-checkbox${currentItemsState[item.value] ? '-checked' : ''}`}
                ></i>
                {item.label}
              </label>
            </div>
          ))}
          <div className={styles.dropdownActions}>
            <button
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
              className={styles.dropdownSubmit}
              title={isSubmitDisabled ? 'Select at least one option' : ''}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
