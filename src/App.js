import './App.scss';
import CharacterList from './components/CharacterList/CharacterList';
import { Route, BrowserRouter as Router, Link, Routes, useLocation } from 'react-router-dom';
import HouseList from './components/HouseList/HouseList';
import House from './components/house/house';
import Character from './components/character/character';

const Location = () => {
  const location = useLocation()
  console.log(location.pathname)
  return <div>
    {location.pathname.split("/").filter(p => p).map((l, i) => {
      return i === 0 ? <Link  key={i} to={l}>{l}</Link> : <><span>{">"}</span><Link  key={i} to={l}>{l}</Link></>
    })}
  </div>
}

function App() {
  const items = ["houses", "characters"]
  const List = () => {
    return (
      <ul className="paths">
        {
          items.map((item, index) => <li key={`item-${index}`}>
            <Link to={`/${item}`}>{item}</Link>
          </li>)
        }
      </ul>
    )
  }

  return (
    <div className="App">
      <Router>
        <h1><Link to={"/"}> Game Of Thrones</Link></h1>
        <Location />
        <Routes>
          <Route path={"/"} element={<List />} />
          <Route path={"/characters"} element={<CharacterList />}></Route>
          <Route path={"/houses"} element={<HouseList />}></Route>
          <Route path={"/houses/:id"} element={<House />}></Route>
          <Route path={"/characters/:id"} element={<Character />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
