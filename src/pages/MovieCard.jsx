import React from 'react'
import styled from 'styled-components'
const CardListContainer = styled.div`
display:flex;
flex-direction:column;
flex-wrap:wrap;
justify-content: center;
align-items:center;
padding:0.5em;
box-sizing:border-box;
box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
`;
const CardImage = styled.img`
display:flex;
flex-direction:column;
width:22em;
border: 1px solid #444;
transition: transform .5s cubic-bezier(0.77,0.2,0.05,1.0);
&hover{
    transform: scale(1.5);
};
`;
const Title = styled.h1`
color: #bb86fc;
font-size: 1.2em;
max-width: 13em;
display:flex;
text-align: center;
`;
//Creates the shell for how each movie in the movies page is supposed to be displayed with styled components
export default function MovieCard(props) {
  return (
    <CardListContainer>
        
        <CardImage src = {props.poster} className="Film-logo" />
        <Title>{props.Title}</Title>
    </CardListContainer>
  )
}
