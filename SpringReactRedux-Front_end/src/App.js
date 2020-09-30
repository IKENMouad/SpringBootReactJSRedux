import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Navbar from './components/Navbar';
import Task from './components/Task';
import AddTask from './components/AddTask';
import TaskDetails from './components/TaskDetails';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux'
import Footer from './components/Footer';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Task} />
          <Route exact path="/addTask" component={AddTask} />
          <Route exact path="/task/:id" component={TaskDetails} />
        </Switch>
        <Footer />
      </Router>
    </Provider>

  );
}

export default App;
