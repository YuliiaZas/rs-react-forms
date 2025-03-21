import { ReactNode, useEffect, useState } from 'react';
import { DropdownItem } from '@utils';
import styles from './dropdown.module.css';

interface DropdownProps {
  items: DropdownItem[];
  selectedItem: string;
  selectOption: (value: string) => void;
  children?: ReactNode;
  positionedRigth?: boolean;
}

export const Dropdown = ({
  items,
  selectedItem,
  selectOption,
  children,
  positionedRigth = false,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log('single', styles.dropdown);
      if (
        isOpen &&
        event.target instanceof Element &&
        !event.target.closest(`.${styles.dropdown}`)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectItem = (value: string) => {
    selectOption(value);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={toggleDropdown} className={styles.dropdownButton}>
        {children || 'Select'}
      </button>
      {isOpen && (
        <div className={`${styles.box} ${positionedRigth ? styles.right : ''}`}>
          {items.map((item) => (
            <div
              key={item.value}
              className={`mb-1 pointer state ${item.value === selectedItem ? 'active' : ''}`}
              onClick={() => handleSelectItem(item.value)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
