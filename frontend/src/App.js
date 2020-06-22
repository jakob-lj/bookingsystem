import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Container from './components/Container'
import Home from './pages/Home'

import {BrowserRouter as Router, Route} from 'react-router-dom'
import ProjectDetail from './pages/ProjectDetail';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Container>
        <Route path={'/'} exact component={Home} />
        <Route path={'/project/:project_id'} component={ProjectDetail} />
        </Container>
      </Router>
    </div>
  );
}

export default App;
