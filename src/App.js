import {BrowserRouter,Redirect,Route,Switch} from 'react-router-dom';
import Main from './Main'
import Cities from './Cities'

function App() {

  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/scenicSpot" component={Main}/>
        {
          Cities.map((i,k)=><Route key={k} exact path={"/scenicSpot/"+i}><Main City={i}/></Route>)
        }
        <Redirect to="/scenicSpot"/>
      </Switch>
    </BrowserRouter>
  );

}

export default App;
