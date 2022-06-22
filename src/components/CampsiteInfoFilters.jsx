import React from "react";
import '../App.css';

function CampsiteInfoFilters(props) {

    const {campsiteData, buttonState, updateButtonState} = props

    const handleClick = (button) => {
        let newButtonState = [...buttonState]
        for (let i = 0; i < newButtonState.length; i++) {
            if (newButtonState[i].type === button) {
                newButtonState[i].value = !newButtonState[i].value;
            }
            else{
                newButtonState[i].value = false;
            }
        }
        updateButtonState(newButtonState)
    }

    const buttons=() => {
        let lst=[]
        lst.push(<button className='campsites_products_button' key={0} onClick={() => handleClick("tents")}
        style={{
            color: buttonState[0].value ? "#fff" : "#000",
            backgroundColor: buttonState[0].value ? "#000" : "#fff"
        }}>Tents</button>)
        if (campsiteData.atributes[2].value) {
            lst.push(<button className='campsites_products_button' key={1} onClick={() => handleClick("bungalows")}
            style={{
                color: buttonState[1].value ? "#fff" : "#000",
                backgroundColor: buttonState[1].value ? "#000" : "#fff"
            }}>Bungalows</button>)
        }
        if (campsiteData.atributes[3].value) {
            lst.push(<button className='campsites_products_button' key={2} onClick={() => handleClick("campervans")}
            style={{
                color: buttonState[2].value ? "#fff" : "#000",
                backgroundColor: buttonState[2].value ? "#000" : "#fff"
            }}>Campervans</button>)
        }
        return lst
    }

    return (  
        <>
            <div className='campsite_products_options' style={{margin: "0 0 80px 0"}}>
                {buttons()}
            </div>
        </>
    );
}

export default CampsiteInfoFilters;