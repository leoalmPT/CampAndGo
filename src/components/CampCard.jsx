import React from 'react';
import '../App.css';
import {Card, Col } from 'react-bootstrap';
import {Link , useNavigate} from "react-router-dom";
import { FaSwimmer, FaPaw, FaHome, FaCaravan } from "react-icons/fa";
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';
import { MdLocationOn } from "react-icons/md";
import myData from '../data.json'
import useLocalStorage from 'react-use-localstorage';

function CampCard(props) {
    const {campsite}= props
    const filters = myData.filters

    const [local, setLocal] = useLocalStorage('fav');   

    const handleFav=(item, value)=>{
        let newLocal = JSON.parse(localStorage.getItem('fav'));
        if(newLocal[item].indexOf(value) === -1){
          newLocal[item].push(value)
        }else{
          newLocal[item].splice(newLocal[item].indexOf(value), 1)
        }
        setLocal(JSON.stringify(newLocal))
    }

    const iconsMap= {
        "pool": <FaSwimmer key={0} size={"30"} color={filters.atributes[0]["color"]} style={{marginRight: "15"}}/>,
        "animals": <FaPaw key={1} size={"30"} color={filters.atributes[1]["color"]} style={{marginRight: "15"}}/>,
        "bungalow": <FaHome key={2} size={"30"} color={filters.atributes[2]["color"]} style={{marginRight: "15"}}/>,
        "campervan":<FaCaravan key={3} size={"30"} color={filters.atributes[3]["color"]} style={{marginRight: "15"}}/>,
    }

    const icons= (campsite) => {
        let lst=[]
        for (let i = 0; i < campsite.atributes.length; i++) {
            if(campsite.atributes[i].value){
                lst.push(iconsMap[campsite.atributes[i].type])
            }
        }
        return lst
    }

    const heartColor= (value) => {
        if (value){
            return <AiFillHeart size={"32"} color={"#fc7d9d"}/>
        }
        return <AiOutlineHeart size={"30"}/>

    }

    const navigate = useNavigate();

    const cardWithInfo= (campsite) => {
        return (
            <Col lg={4} md={6} sm={12} key={campsite.id}>
                <Card  className='campsites_card' style={{marginBottom: "80px"}}>
                    <Card.Body style={{backgroundColor: "#fdfdfd", borderRadius: "10px 10px 10px 10px", padding: "0 0 0 0"}}>
                        <button className='favourites_button' onClick={()=> {handleFav("campsites", campsite.id)}}
                            > {heartColor(JSON.parse(local).campsites.indexOf(campsite.id) !== -1 )}
                        </button>
                        <div className='card_img' style={{backgroundImage: `url(${campsite.images[0]})`}}
                            onClick={()=> navigate(`/campsite/${campsite.id}`)}>
                        </div>

                        <div style={{padding: "15px 15px 15px 15px"}}>
                            <Card.Title style={{height: "50px", fontWeight: "bold"}}>{campsite.name}</Card.Title>
                            <Card.Text>
                                <MdLocationOn size={"30"}/> {campsite.location}
                                <br/>
                                Environment: {campsite.environment}
                                <br/>
                                Price: {campsite.price}€ <span style={{fontSize: 12}}>/night</span>
                                <br/>
                                {icons(campsite)}
                            </Card.Text>
                            <Link to={`/campsite/${campsite.id}`}>
                                <button className='campsites_card_button'>See campsite</button>
                            </Link>                     
                        </div>

                    </Card.Body>
                </Card> 
            </Col>
        )
    }


    return ( 
        <>
            {cardWithInfo(campsite)}
        </>
     );
}

export default CampCard;