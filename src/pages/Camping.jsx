import React, {useState} from "react";
import '../App.css';
import { useParams, Navigate } from "react-router-dom";
import myData from '../data.json';
import {Container, Carousel, Row, Col} from 'react-bootstrap';
import {Link } from "react-router-dom";
// import useLocalStorage from 'react-use-localstorage';
// import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai';

import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from "moment";
import 'bootstrap-daterangepicker/daterangepicker.css'

function Camping() {

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



    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());

    // const [date1, setDate1] = useState(new Date());
    // const [date2, setDate2] = useState(new Date());

    const campsiteId = useParams().cId;
    const campingId = useParams().id;
    const campType = useParams().type;

    const camping= myData.campsites[campsiteId][campType][campingId];

    if (camping === undefined) {
        return <Navigate to="/error"/>
    }

    const title={
        "tents":"Tent Place",
        "bungalows": "Bungalow",
        "campervans": "Campervan Place"
    }

    const carouselItems= (item) => {
        if(item.images.length){
            let lst=[]
            for (let i = 0; i < item.images.length; i++) {
                lst.push(
                    <Carousel.Item key={i} interval={1000}>
                        <div className='campsite_carousel_item' style={{backgroundImage: `url(${item.images[i]})` }}></div>
                    </Carousel.Item>
                )
            }
            return lst
        }        
    }

    const DatePicker = () => {
        const range = {
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
        "Last 7 Days": [moment().subtract(6, "days"), moment()],
        "Last 30 Days": [moment().subtract(29, "days"), moment()],
        "This Month": [moment().startOf("month"), moment().endOf("month")],
        "Last Month": [
            moment()
            .subtract(1, "month")
            .startOf("month"),
            moment()
            .subtract(1, "month")
            .endOf("month")
        ],
        "Last Year": [
            moment()
            .subtract(1, "year")
            .startOf("year"),
            moment()
            .subtract(1, "year")
            .endOf("year")
        ]
        };

        const handleEvent = (event, picker) => {
        setFromDate(picker.startDate._d);
        setToDate(picker.endDate._d);
        };

        return ( 
            <>
                <DateRangePicker
                    // startDate={new Date()}
                    // endDate={new Date()}
                    ranges={range}
                    alwaysShowCalendars={true}
                    onEvent={handleEvent}
                >

                    <div className='calendar_request'>

                        <Row>
                            <Col md={6}>
                                <div className="from_date_div">
                                    <div style={{position: "absolute" , top: "50%", transform: "translate(0%, -50%)", paddingLeft: "12px"}}>
                                        <p style={{fontSize: "8pt", margin: "0px", fontWeight: "bold"}}>CHECK-OUT</p>
                                        {moment(fromDate).format("LL")}   
                                    </div>                                    
                                </div>


                            </Col>

                            <Col md={6} style={{padding: "0px"}}>

                                <div className="to_date_div">
                                    <div style={{position: "absolute" , top: "50%", transform: "translate(0%, -50%)", paddingLeft: "12px"}}>
                                    <p style={{fontSize: "8pt", margin: "0px", fontWeight: "bold"}}>CHECK-OUT</p>
                                    {moment(toDate).format("LL")}                                     
                                    </div>                                    
                                </div>

                            </Col>
                        </Row>

                    </div>
                </DateRangePicker>
            </>
        );
    }  

    const totalDays_calculator = () => {

        let totalDays = parseInt((toDate - fromDate) / (1000 * 3600 * 24), 10);

        if (totalDays <= 0){
            return [0, 0];
        }
        return [totalDays+1, (totalDays+1) * camping.price];
    }


    return ( 
        <>
            <Container style={{paddingBottom:"200px"}}>

                <h1 style={{ paddingTop: "35px", margin: "30px 0 30px 0", textAlign: "center"}}>{title[campType]} {("place" in camping)? " - " + camping.place : ""}</h1>

                {/* <button className='favButCar' onClick={()=> {handleFav(campType, campingId)}}
                    > {heartColor(JSON.parse(local)[campType].indexOf(`${campsiteId}_${campingId}`) !== -1 )}
                </button> */}

                <div className='carousel_container'>

                    


                    <Carousel fade>
                        {carouselItems(camping)}
                    </Carousel>
                </div>

                <div style={{marginTop: "25px"}}>
                    <Row>
                        <Col md={6} style={{textAlign: "justify", textJustify: "inter-word"}}>
                            <div style={{padding: "0% 10% 5% 10%"}}>
                                <p>{camping.description}</p>
                            </div>
                            
                        </Col>


                        <Col md={6}>
                            <div className="request_container">
                                <div style={{marginBottom: "15px"}}>
                                    <p style={{display: "inline", fontWeight: "bold", fontSize: "16pt"}}>€ {camping.price} </p> 
                                    <p style={{display: "inline", fontSize: "10pt"}}>/ night</p>                                 
                                </div>
                                <div>{DatePicker()}</div>


                                <div style={{textAlign: "center", margin: "20px 0 0 0"}}>
                                        <p>{camping.card_description}</p>
                                </div>

                                <Link to={"/request"}>
                                    <button className="request_button">Request</button>
                                </Link>

                        
                                <div className="request_info">
                                    <hr />
                                    
                                    <div>
                                        <p style={{float: "left", fontSize: "13pt"}}>Days</p>
                                        <p style={{float: "right", fontSize: "13pt"}}>{totalDays_calculator()[0]}</p> 
                                    </div>
                                    <div style={{clear: "both"}}></div>

                                    <div>
                                        <p style={{float: "left", fontWeight: "bold", fontSize: "15pt"}}>Total</p>
                                        <p style={{float: "right", fontWeight: "bold", fontSize: "15pt"}}>€ {totalDays_calculator()[1]}</p> 
                                    </div>
                                    <div style={{clear: "both"}}></div>                                       
                                </div>                               
                            </div>
                        </Col>
                    </Row>
                </div>


            </Container>
        </>
     );
}

export default Camping;