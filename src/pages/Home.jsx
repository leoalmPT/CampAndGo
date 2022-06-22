import React, { useState } from "react";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import myData from '../data.json';
import HomeResults from '../components/HomeResults.jsx';
import HomeFilters from '../components/HomeFilters.jsx';
import {Container, Row} from 'react-bootstrap';

function Home() {

  const [filters, updateFilters] = useState(myData.filters)

  return (
    <>
      <div className='banner'>
          <h1 className='banner_text'>Camp&Go</h1>
          <p className='banner_info_text'>Find campsites all across the country</p>
      </div>
      <Container style={{marginBottom: "80px"}}>
        <div style={{marginBottom: "80px"}}>
          <HomeFilters filters={filters} updateFilters={updateFilters}/>
        </div>
        <div style={{marginBottom: "30px"}}><h1>Campsites</h1></div>
        <Row>
          <HomeResults data={myData} filters={filters}/>
        </Row>
      </Container>
    </>  
  );
}

export default Home;