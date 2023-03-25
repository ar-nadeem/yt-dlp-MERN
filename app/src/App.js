import './App.css';
import Header from './components/Header';
import Search from './components/Search';
function App() {
  return (
    <div className="App">
      <Header visible="true" textCenter="YT-DLP" textLeft="Video Downloader" textRight="ArNadeem" />
      <div className="py-10">
        <Search />
      </div>
    </div>
  );
}

export default App;
