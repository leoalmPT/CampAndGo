import React, {useState} from "react";
import '../App.css';
import myData from '../data.json';
import CampCard from '../components/CampCard.jsx';
import CampingCard from '../components/CampingCard.jsx';
import {Container, Row} from 'react-bootstrap';

function Favourites() {

    const favState_={
        campsites: true,
        tents: false,
        bungalows: false,
        campervans: false,
        lastButton: "campsites"
    } 

    const [favState, setFavState] = useState(favState_)
    const [local, setLocal] = useState(localStorage.getItem('fav'));

    const handleClick = (button) => {
        let newFavState = {...favState}
        newFavState[newFavState.lastButton] = false
        newFavState.lastButton=button
        newFavState[button] = true
        setFavState(newFavState)
    }

    const campsitesList= () => {
        let lst=[]
        let favLocal= JSON.parse(local);
        favLocal.campsites.forEach(id => {
            lst.push(<CampCard key={id} campsite={myData.campsites[id]}/>)
        });
        return lst
    }

    const campingList= () => {
        let lst=[]
        let info=[]
        let type_= favState.lastButton
        let favLocal= JSON.parse(local);
        favLocal[type_].forEach(ids => {
            info= ids.split("_")
            lst.push(<CampingCard key={ids} type={type_} info={myData.campsites[info[0]][type_][info[1]]} campsiteId={info[0]}/>)
        });
        return lst
    }

    const favList = () => {
        var lst;
        if (favState.lastButton === "campsites"){
            lst = campsitesList()
        } else lst = campingList()
        if (lst.length === 0){
            return (
                <div className='no_results'>
                    <h3 style={{textAlign: 'center'}}>No results. Try to add some items in homepage.</h3>
                </div>
            )
        }
        return lst;
    }

    return (  
        <>
            <h1 style={{margin: "30px 0 30px 0", textAlign: "center"}}>Your favourites</h1>
            <div style={{textAlign:"center", marginTop:"20px"}}>
                <button className='favButton' onClick={()=> handleClick("campsites")}
                style={{backgroundColor: favState.campsites ? "#000" : "#fff",
                color: favState.campsites ? "#fff" : "#000" }}>Campsites</button>
                <button className='favButton' onClick={()=> handleClick("tents")}
                style={{backgroundColor: favState.tents ? "#000" : "#fff",
                color: favState.tents ? "#fff" : "#000"}}>Tents</button>
                <button className='favButton' onClick={()=> handleClick("bungalows")}
                style={{backgroundColor: favState.bungalows ? "#000" : "#fff",
                color: favState.bungalows ? "#fff" : "#000"}}>Bungalows</button>
                <button className='favButton' onClick={()=> handleClick("campervans")}
                style={{backgroundColor: favState.campervans ? "#000" : "#fff",
                color: favState.campervans ? "#fff" : "#000"}}>Campervans</button>
            </div>
            <Container>
                <Row style={{marginTop: "30px"}} onClick={()=>{setLocal(localStorage.getItem("fav"))}}>
                    {favList()}
                </Row>  
            </Container>          
        </>
    );
}

export default Favourites;