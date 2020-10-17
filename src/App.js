import React from 'react';
import SignIn from './components/SignIn/';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import SignUp from './components/SignUp/';
import { Provider } from 'react-redux';
import { store } from './redux/store/configureStore';
import { PrivateRoute } from './components/helpers/PrivateRoute';
import Home from './components/Home/';
import Groups from './components/Groups/';
import Header from './components/Header/';
import Group from './components/Group';
import MyAlert from './components/helpers/MyAlert';
import Friends from './components/Friends';
import Tasks from './components/Tasks';



const routesWithHeader = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path='/home' component={Home} />
        <Route path='/tasks' component={Tasks} />
        <Route exact path='/groups' component={Groups} />
        <Route path='/groups/:id' render={({ match }) => {
          const { params: { id } } = match;
          return <Group groupId={id} />
        }} />
        <Route exact path='/friends' component={Friends} />
        <Redirect to="/home" />
      </Switch>
    </>
  )
}
function App() {

  return (
    <Provider store={store}>
      <Router>
        <MyAlert />
        <Switch>
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
          <PrivateRoute path='/' component={routesWithHeader} />
        </Switch>
      </Router>
    </Provider>

  );
}

export default App;
