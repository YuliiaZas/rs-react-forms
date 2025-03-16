import { PATH_VALUE } from '@utils';
import { NavLink, useLocation, useSearchParams } from 'react-router';
import style from './header.module.css';

export const Header = () => {
  const title = {
    [PATH_VALUE.HOME]: 'Home',
    [PATH_VALUE.UNCONTROLLED]: 'Uncontrolled Form',
    [PATH_VALUE.CONTROLLED]: 'Controlled Form',
  };

  const state = {
    add: 'Add ',
    edit: 'Edit ',
  };

  const [searchParams] = useSearchParams();
  const location = useLocation();

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
                {path === PATH_VALUE.HOME
                  ? title[path]
                  : location.pathname === path && searchParams.get('i')
                    ? state.edit + title[path]
                    : state.add + title[path]}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
