import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Header from './components/HoC/Header'
import Footer from './components/HoC/Footer'

import HomeScreen from './components/screens/HomeScreen'
import LoginScreen from './components/screens/LoginScreen'
import RegisterScreen from './components/screens/RegisterScreen'
import TheatreList from './components/screens/TheatreList'
import TheatreInfo from './components/screens/TheatreInfo'
import ScreenSeats from './components/screens/ScreenSeats'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/theatrelist' component={TheatreList} />
          <Route path='/theatre/:id' component={TheatreInfo} />
          <Route path='/theatres/:theatreId/show/:screenId' component={ScreenSeats} exact/>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
