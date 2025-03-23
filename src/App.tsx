import { Provider } from 'react-redux';
import { CountryList, CountrySettings } from '@components';
import { HomeLayout } from '@layouts';
import { store } from '@store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div
        className="theme-dark"
        style={{ minHeight: '100vh', width: '760px' }}
      >
        <header>
          <CountrySettings />
        </header>
        <main>
          <HomeLayout>
            <CountryList />
          </HomeLayout>
        </main>
      </div>
    </Provider>
  );
}

export default App;
