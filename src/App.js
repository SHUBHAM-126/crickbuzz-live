import Footer from './components/Footer';
import Header from './components/Header';
import Recent from './components/Recent';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <>
      <Header />
      <div className='px-4 md:px-10'>
        <div className='md:flex max-w-6xl mx-auto divide-y md:divide-y-0 md:divide-x divide-slate-700/60 py-7'>
          <div className='md:w-2/3 md:pr-5'>
            <Recent />
          </div>
          <div className='md:w-1/3 md:pl-5'>
            <Sidebar />
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default App;
