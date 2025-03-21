import { Provider } from 'react-redux';
import { CountryList, Header } from '@lib';
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
        <Header />
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
