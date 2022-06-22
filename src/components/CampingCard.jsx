import React from "react";
import '../App.css';
import { Row, Col, Card} from 'react-bootstrap';
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import {Link , useNavigate} from "react-router-dom";
import useLocalStorage from 'react-use-localstorage';

function CampingCard(props) {

    const {info, type, campsiteId} = props

    const [local, setLocal] = useLocalStorage('fav');   

    const handleFav=(item, value)=>{
        let newLocal = JSON.parse(localStorage.getItem('fav'));    
        let obj= `${campsiteId}_${value}`;
        if(newLocal[item].indexOf(obj) === -1){
          newLocal[item].push(obj)
        }else{
          newLocal[item].splice(newLocal[item].indexOf(obj), 1)
        }
        setLocal(JSON.stringify(newLocal))
    }

    const heartColor= (value) => {
        if (value){
            return <AiFillHeart size={"32"} color={"#fc7d9d"}/>
        }
        return <AiOutlineHeart size={"30"}/>

    }

    const navigate = useNavigate();

    const cardWithInfo= (info) => {
        return (
            <Col lg={4} md={6} sm={12} key={info.id}>
                <Card  className='campsites_card'>
                    <Card.Body style={{backgroundColor: "#fdfdfd", borderRadius: "10px 10px 10px 10px", padding: "0 0 0 0"}}>
                        <button className='favourites_button' onClick={()=> {handleFav(type, info.id)}}
                                > {heartColor(JSON.parse(local)[type].indexOf(`${campsiteId}_${info.id}`) !== -1 )}
                        </button>
                        <div className='card_img' style={{backgroundImage: `url(${info.images[0]})`}}
                            onClick={()=>navigate(`/camping/${campsiteId}/${type}/${info.id}`)}>  
                        </div>
                        
                        <div style={{padding: "15px", position: "relative"}}>

                            <div style={{margin: "10px 0 20px 0"}}>
                                {info.card_description}
                            </div>

                            <Row>
                                <Col>
                                    <Link to={`/camping/${campsiteId}/${type}/${info.id}`}>
                                        <button className='campsites_card_button'>See more</button>
                                    </Link>
                                </Col>

                                <Col style={{margin: "auto", textAlign: "right"}}>
                                    <p style={{display: "inline", fontWeight: "bold", fontSize: "16pt"}}>€ {info.price}</p> 
                                    <p style={{display: "inline", fontSize: "10pt"}}>/ night</p> 
                                </Col>
                            </Row>
                        </div>

                    </Card.Body>
                </Card>
            </Col>
        )
    }

    return ( 
        <>
            {cardWithInfo(info)}
        </>
     );
}

export default CampingCard;