import Footer from './components/Footer';
import Header from './components/Header';
import Recent from './components/Recent';
import Sidebar from './components/Sidebar';
import Live from './components/Live';
import Upcoming from './components/Upcoming'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageNotFound from './components/PageNotFound';
import Match from './components/Match/Match';

function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
      <div className='px-4 md:px-10'>
        <div className='md:flex max-w-6xl mx-auto divide-y md:divide-y-0 md:divide-x divide-slate-700/60 py-7'>
          <div className='md:w-2/3 md:pr-5'>
            <Routes>
              <Route path='/' element={<Live/>} />
              <Route path='/recent' element={<Recent />}/>
              <Route path='/upcoming' element={<Upcoming/>} />
              <Route path='match/:id' element={<Match/>}/>
              <Route path='*' element={<PageNotFound/>}/>
            </Routes>
          </div>
          <div className='md:w-1/3 md:pl-5'>
            <Sidebar />
          </div>
        </div>
      </div>
      <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
