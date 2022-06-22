import React, {useState} from "react";
import '../App.css';
import { useParams, Navigate } from "react-router-dom";
import myData from '../data.json';
import CampsiteInfoResults from "../components/CampsiteInfoResults";
import CampsiteInfoFilters from "../components/CampsiteInfoFilters";
import {Carousel, Container} from 'react-bootstrap';
// import useLocalStorage from 'react-use-localstorage';
// import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';

function CampsiteInfo() {
    let campsiteId = useParams().id;
    const campsiteData= myData.campsites[campsiteId];

    // const [local, setLocal] = useLocalStorage('fav');   

    // const handleFav=(item, value)=>{
    //     let newLocal = JSON.parse(localStorage.getItem('fav'));
    //     if(newLocal[item].indexOf(value) === -1){
    //       newLocal[item].push(value)
    //     }else{
    //       newLocal[item].splice(newLocal[item].indexOf(value), 1)
    //     }
    //     setLocal(JSON.stringify(newLocal))
    // }

    // const heartColor= (value) => {
    //     if (value){
    //         return <AiFillHeart size={"32"} color={"#fc7d9d"}/>
    //     }
    //     return <AiOutlineHeart size={"30"}/>
    // }



    let buttonState_ = [
        {"type": "tents", "value": false},
        {"type": "bungalows", "value": false},
        {"type": "campervans", "value": false},
    ]

    const [buttonState, updateButtonState] = useState(buttonState_)

    if (campsiteData === undefined) {
        return <Navigate to="/error"/>
    }

    const carouselItems= (campsite) => {
        if(campsite.images.length){
            let lst=[]
            for (let i = 0; i < campsite.images.length; i++) {
                lst.push(
                    <Carousel.Item key={i} interval={1000}>
                        <div className='campsite_carousel_item' style={{backgroundImage: `url(${campsite.images[i]})` }}></div>
                    </Carousel.Item>
                )
            }
            return lst
        }        
    }

    return (
        <>         
            <Container>
                <div className='carousel_container' style={{marginTop: "50px"}}>
                    <Carousel fade>
                        {carouselItems(campsiteData)}
                    </Carousel>
                </div>   

                <div style={{textAlign: "center"}}>
                    <h1>{campsiteData.name}</h1>
                    <div style={{textAlign: "justify", textJustify: "inter-word", padding: "20px 30% 20px 30%", fontSize: "13pt"}}>
                        {campsiteData.description}                    
                    </div>
                </div>


                <div style={{margin: "30px 0 80px 0"}}>
                    <CampsiteInfoFilters campsiteData={campsiteData} buttonState={buttonState} updateButtonState={updateButtonState}/>
                    <CampsiteInfoResults campsiteData={campsiteData} buttonState={buttonState}/>
                </div>
            </Container>
        </>
    );
}

export default CampsiteInfo;