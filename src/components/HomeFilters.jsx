import React from 'react'
import '../App.css';
import { Col, Row, Form } from 'react-bootstrap';
import { FaSwimmer, FaPaw, FaHome, FaCaravan  } from "react-icons/fa";

function HomeFilters(props) {
    const filters = props.filters

    const filtersStyle = {
        width: "100%",
        borderRadius: "10px 10px 10px 10px",
        height: "70px",
        transform: "translate(0, -50%)",
        borderStyle: "none",
        backgroundColor: "#fff",
        color: "#000",
        boxShadow: "0 0px 8px rgba(0,0,0,.6)",
        marginBottom: "6px"
    }

    const maxPrice= () => {
        return (
            <Form.Select style={filtersStyle}>
                <option defaultValue>Max Price</option>
                <option>50 €</option>
                <option>100 €</option>
                <option>150 €</option>
                <option>200 €</option>
                <option>250 €</option>
                <option>300 €</option>
                <option>350 €</option>
                <option>400 €</option>
            </Form.Select>
        )
    }

    const cities=()=>{
        const cidades = ["Aveiro", "Beja", "Braga", "Bragança", "Castelo Branco", "Coimbra", "Évora", "Faro", "Guarda", "Leiria", "Lisboa", "Portalegre", "Porto", "Santarém", "Setúbal", "Viana do Castelo", "Vila Real", "Viseu"];
        let lst=[]
        for (let i = 0; i < cidades.length; i++) {
            lst.push(<option key={i} value={cidades[i]} >{cidades[i]}</option>)
        }
        return (
              <Form.Select style={filtersStyle}  onChange={(e) => updateCity(e.target.value)} >
                <option defaultValue >Location</option>
                {lst}
              </Form.Select>                 
        )
    }

    const environments=()=>{
        return(
            <Form.Select style={filtersStyle} onChange={(e) => updateEnvironment(e.target.value)}>
              <option defaultValue>Environment</option>
              <option value={"Mountain"}>Mountain</option>
              <option value={"Beach"}>Beach</option>
              <option value={"Forest"}>Forest</option>
              <option value={"Desert"}>Desert</option>
            </Form.Select>  
        )
    }

    const rating=()=>{
        return(
            <Form.Select style={filtersStyle} onChange={(e) => updateRating(e.target.value)}>
              <option defaultValue>Rating</option>
              <option value={1}>1+ star</option>
              <option value={2}>2+ star</option>
              <option value={3}>3+ star</option>
              <option value={4}>4+ star</option>
              <option value={5}>5+ star</option>
            </Form.Select>  
        )
    }

    const updateAtributes= (idx) => { 
        let newFilters = {...filters}
        newFilters.atributes[idx].value = !newFilters.atributes[idx].value
        props.updateFilters(newFilters)
    }

    const updateCity=(city)=>{
        let newFilters = {...filters}
        if (city === "Location") {
            city = null
        }
        newFilters.location = city
        // console.log(newFilters)
        props.updateFilters(newFilters)
    }

    const updateEnvironment=(env)=>{
        let newFilters = {...filters}
        if (env === "Environment") {
            env = null
        }
        newFilters.environment = env
        props.updateFilters(newFilters)
    }

    const updateRating=(rating)=>{
        let newFilters = {...filters}
        if (rating === "Rating") {
            rating = null
        }
        newFilters.rating = rating
        props.updateFilters(newFilters)
    }

    const iconsMap= {
        "Pool": <FaSwimmer key={0} size={"30"} style={{marginRight: "15"}}/>,
        "Animals": <FaPaw key={1} size={"30"} style={{marginRight: "15"}}/>,
        "Bungalow": <FaHome key={2} size={"30"} style={{marginRight: "15"}}/>,
        "Campervan":<FaCaravan key={3} size={"30"} style={{marginRight: "15"}}/>,
    }

    return (  
        <>
            <Row>
                <Col md={3} style={{paddingLeft: "3px", paddingRight: "3px"}}>{rating()}</Col>
                <Col md={3} style={{paddingLeft: "3px", paddingRight: "3px"}}>{maxPrice()}</Col>
                <Col md={3} style={{paddingLeft: "3px", paddingRight: "3px"}}>{cities()}</Col>
                <Col md={3} style={{paddingLeft: "3px", paddingRight: "3px"}}>{environments()}</Col>
            </Row>
            <Row>
                <Col md={2}></Col>
                {filters.atributes.map(filter => (
                    <Col md={2} key={filter.id} style={{paddingLeft: "3px", paddingRight: "3px"}}>
                        <button className='filters' style={
                                {color: filter.value ? "#fff" : filter.color,
                                backgroundColor: filter.value? filter.color : "#fff"}
                            } 
                            onClick={() => updateAtributes(filter.id)}>
                            {iconsMap[filter.type]} {filter.type}
                        </button>
                    </Col>
                ))}
                <Col md={2}></Col>
            </Row>
            
        </>
    );
}

export default HomeFilters;