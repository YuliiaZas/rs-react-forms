import { PATH_VALUE } from '@utils';
import { NavLink } from 'react-router';

export const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to={PATH_VALUE.HOME}>Home</NavLink>
          </li>
          <li>
            <NavLink to={PATH_VALUE.UNCONTROLLED}>Uncontrolled Form</NavLink>
          </li>
          <li>
            <NavLink to={PATH_VALUE.CONTROLLED}>Controlled Form</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
