import { PATH_VALUE } from '@utils';
import { NavLink } from 'react-router';
import style from './header.module.css';

export const Header = () => {
  const title = {
    [PATH_VALUE.HOME]: 'Home',
    [PATH_VALUE.UNCONTROLLED]: 'Uncontrolled Form',
    [PATH_VALUE.CONTROLLED]: 'Controlled Form',
  };

  return (
    <header className="mb-3">
      <nav>
        <ul className={`d-flex gap-3 p-0 ${style.list}`}>
          {Object.values(PATH_VALUE).map((path) => (
            <li key={path} className={style['list-item']}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `${style.link} ${isActive ? style.active : ''}`
                }
              >
                {title[path]}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
