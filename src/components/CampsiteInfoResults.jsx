import React from "react";
import '../App.css';
import {Row} from 'react-bootstrap';
import CampingCard from "./CampingCard";

function CampsiteInfoResults(props) {

    const {campsiteData, buttonState} = props

    const choosenButton=()=>{
        for (let i = 0; i < buttonState.length; i++) {
            if (buttonState[i].value) {
                return buttonState[i].type
            }
        }
        return null
    }

    const cardList= () => {
        if (choosenButton() === null){
            return null
        }
        const info= campsiteData[choosenButton()]
        let lst=[]
        for (let i = 0; i < info.length; i++) {
            lst.push(<CampingCard key={i} type={choosenButton()} info={info[i]} campsiteId={campsiteData.id}/>)
        }
        return lst
    }

    return (
        <>
            <Row>
                {cardList()}
            </Row>
        </>
    );
}

export default CampsiteInfoResults;