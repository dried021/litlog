import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AppRouter from './routes/AppRouter';
import UserProvider from './pages/Auth/UserProvider'; // 경로는 실제 UserProvider 위치로 맞춰줘
import './styles/common.css';

function App() {
  return (
    <UserProvider>
      <div className="app-container">
        <Header />
        <main className="main-container">
          <AppRouter />
        </main>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
