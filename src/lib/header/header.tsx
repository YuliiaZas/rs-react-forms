import { PATH_VALUE } from '@utils';
import { NavLink, useLocation, useSearchParams } from 'react-router';
import style from './header.module.css';

export const Header = () => {
  const title = {
    [PATH_VALUE.HOME]: 'Home',
    [PATH_VALUE.UNCONTROLLED]: 'Uncontrolled Form',
    [PATH_VALUE.CONTROLLED]: 'Controlled Form',
  };
  const [searchParams] = useSearchParams();
  const location = useLocation();
  console.log(location.pathname, location.search, searchParams.toString());

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
