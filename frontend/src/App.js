import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Container from './components/Container'
import Home, {CreateNewProject} from './pages/Home'

import {BrowserRouter as Router, Route} from 'react-router-dom'
import ProjectDetail from './pages/ProjectDetail';
import NetworkIssue from './ErrorHandling/NetworkIssue'
import LoginView from './pages/Login';
import Logout from './pages/Logout';
import Landing from './pages/Landing'

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Container>
        <Route path={'/'} exact component={Landing} />
        <Route path={'/logout'} exact component={Logout} />
        <Route path={'/app'} component={AppLayer} />
        <Route path={'/login'} component={LoginView} />
        </Container>
      </Router>
    </div>
  );
}

function AppLayer() {
  return <div>
    <Route path={'/app'} exact component={Home} />
    <Route path={'/app/createNew'} exact component={Home} />
    <Route path={'/app/createNew'} exact component={CreateNewProject} />
    <Route path={'/app/project/:project_id'} component={ProjectDetail} />
  </div>
}

export default App;
