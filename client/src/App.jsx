import './App.css';
import { Switch, BrowserRouter, Route} from 'react-router-dom';
import PetTable from './components/PetTable';
import PetForm from './components/PetForm';
import PetDetail from './components/PetDetail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <h1>Pet Shelter</h1>
        <Switch>
          <Route path="/pets/new">
            <PetForm />
          </Route>
          <Route path="/pets/:id/edit">
            <PetForm />
          </Route>
          <Route path="/pets/:id">
            <PetDetail />
          </Route>
          <Route path="/">
            <PetTable />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
