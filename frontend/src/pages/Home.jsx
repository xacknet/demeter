import { useEffect, useState } from 'react';

import Map from 'components/Map';
import NavBar from 'components/NavBar';
import SideBar from 'components/SideBar';

import CurrentlySelected from 'components/CurrentlySelected';
import Seasons from 'components/Seasons';
import Timeline from 'components/Timeline';

import PlotType from 'components/PlotType';
import BigCurrentlySelected from 'components/BigCurrentlySelected';

const HomePage = () => {
  const [sideBarPage, setSideBarPage] = useState('map');
  const [currentPlot, setCurrentPlot] = useState({});
  const [plots, setPlotOptions] = useState([]);
  const [draw, setDraw] = useState(null);

  useEffect(async () => {
    const response = await fetch('https://demeter-api-iowa.herokuapp.com/data/earth', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);

    setPlotOptions(data);
  }, [])

  return (
    <div>
      <NavBar />
      <SideBar setSideBarPage={setSideBarPage}/>
      <Map currentPlot={currentPlot} draw={draw} sideBarPage={sideBarPage} setDraw={setDraw}/>
      <Timeline />
      <CurrentlySelected currentPlot={currentPlot}/>
      <Seasons />
      <PlotType draw={draw} plots={plots} setCurrentPlot={setCurrentPlot}/>
      <BigCurrentlySelected currentPlot={currentPlot}/>
    </div>
  )
}

export default HomePage;