import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {useState, useEffect} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function CardList () {
const [data,setData] = useState([]); //sets data to each person from the persons table in the database
const api = 'https://localhost:7283'; 

//navigate that connects the personId to the likedgenres page
const navigate= useNavigate();
//navigates the used to LikedGenres
const handleClick = (item) => {
    navigate(`/LikedGenres/${item.personId}`)
}

const Div = styled.div`
display:flex;
flex-wrap: wrap;
`;
const DivCard = styled.div`
display: flex;
flex-direction: column; 
margin: .3em;
padding: .1em;
width: 10em;
align-items: center;
border: #FFFFFF solid 1px;
border-radius: 5%;
background: #bb86fc;
color: #212121;
transition: transform .3s cubic-bezier(0.77,0.2,0.05,1.0);
&:hover {
    transform: scale(1.1);
}
`;

useEffect(() => {
    const fetchData = async () => {

        const result = await axios(api + '/api/Person',);
        setData(result.data);
    };
    fetchData();
}, [])
//renders the users 
return(
    <>
    <h1>Users</h1>
    <Div className="home">
        
        {data.map(item =>(
            <DivCard onClick={() => handleClick(item)} key = {item.personId}>
               <h1>{item.firstName}</h1>
               <p>Click To View</p>
               <h3>{item.email}</h3>   
            </DivCard>  
        ))}
        <Outlet />
    </Div>
    </>
)
}
