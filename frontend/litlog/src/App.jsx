import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AppRouter from './routes/AppRouter';

function App(){
  return(
    <>
      <div className="app-container">
        <Header/>
        <main styles={{minHeight: '80vh'}}>
          <AppRouter />
        </main>
        <Footer/>
      </div>
    </>
  );

}
export default App;