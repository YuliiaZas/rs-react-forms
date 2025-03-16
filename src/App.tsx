import { Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { Header } from '@lib';
import { ControlledFormPage, HomePage, UncontrolledFormPage } from '@pages';
import { store } from '@store';
import { PATH_VALUE } from '@utils';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="theme-dark app-wrapper">
        <Header />
        <main>
          <Routes>
            <Route path={PATH_VALUE.HOME} element={<HomePage />}>
              <Route
                path={PATH_VALUE.UNCONTROLLED}
                element={<UncontrolledFormPage />}
              />
              <Route
                path={PATH_VALUE.CONTROLLED}
                element={<ControlledFormPage />}
              />
            </Route>
          </Routes>
        </main>
      </div>
    </Provider>
  );
}

export default App;
