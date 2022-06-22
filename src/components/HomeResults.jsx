import React from 'react';
import '../App.css';
import CampCard from './CampCard';

function HomeResults(props) {
    const campsites= props.data.campsites
    const filters = props.filters

    const handleFilter = (campsite) => {
        // console.log(filters)
        for (let i = 0; i < campsite.atributes.length; i++) {
            if(!campsite.atributes[i].value && filters.atributes[i].value){
                return false
            }
        }
        if( filters.environment && filters.environment !== campsite.environment ){
            return false
        }
        if( filters.location && filters.location !== campsite.location ){
            return false
        }
        if( filters.price && filters.price < campsite.price ){
            return false
        }
        if( filters.rating && filters.rating > campsite.rating ){
            return false
        }
        return true
    }

    const campsitesList= () => {
        let lst=[]
        for (let i = 0; i < campsites.length; i++) {
            if(handleFilter(campsites[i])){
                lst.push(<CampCard key={i} campsite={campsites[i]}/>)
            }
        }
        if (lst.length === 0){
            return (
                <div className='no_results'>
                    <h3>No results.</h3>
                </div>
            )
        }
        return lst
    }

    return (
        <>
            {campsitesList()}
        </>
    );
}

export default HomeResults;