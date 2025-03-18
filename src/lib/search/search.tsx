import { FC, useState } from 'react';
import './search.css';

interface SearchProps {
  initialSearchValue: string;
  placeholder?: string;
  updateSearchValue: (value: string) => void;
}

export const Search: FC<SearchProps> = ({
  initialSearchValue,
  placeholder = 'Type value',
  updateSearchValue,
}) => {
  const [currentValue, setCurrentValue] = useState<string>(initialSearchValue);

  const handleChange = (value: string) => {
    setCurrentValue(value);
    updateSearchValue(currentValue);
  };

  return (
    <div className="search-wrapper d-flex">
      <div className="input-with-icons">
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={currentValue}
          onChange={(e) => handleChange(e.target.value)}
        />
        <i className="icon-search icon-left"></i>
        <i
          className={`icon-close pointer icon-right ${currentValue ? '' : 'invisible'}`}
          title="Clear"
          onClick={() => handleChange('')}
        ></i>
      </div>
    </div>
  );
};
