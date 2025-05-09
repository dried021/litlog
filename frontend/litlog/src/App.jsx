import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AppRouter from './routes/AppRouter';
import './styles/common.css';


function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-container">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}
export default App;