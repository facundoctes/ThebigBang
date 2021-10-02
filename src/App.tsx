import React, {useContext} from "react";
import Header from "./components/Header/Header";
import RoomList from "./components/RoomList/RoomList";
import Room from "./components/Room/Room";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import SingInForm from "./components/SignInForm/SingInForm";
import { socketContext } from "./Context/SocketContext";
import CircularProgress from '@material-ui/core/CircularProgress';

import "./App.css";

function App() {
  const {serverConnected} = useContext(socketContext);
  return (
    serverConnected ?
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/sign" component={SingInForm} />
          <Route path="/room/:roomId" component={Room} />
          <Route path="/">
            <>
              <Header />
              <RoomList />
            </>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
    : <CircularProgress color="secondary" />

  );
}

export default App;
