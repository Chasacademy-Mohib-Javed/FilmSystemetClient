import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {useState, useEffect,} from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';


export default function LikedGenres(){
    let { personId } = useParams(); //hook that returns the key/value pair from personId so that the navigation works properly in react router. This is so that the correct information and person is displayed when clicking on them on the webpage
    const [data,setData] = useState([]); //sets the data of the endpoint GetRatings to show what the person has rated a movie
    const[genre,setGenre] = useState([]); //sets the state of genre to what genres the person likes
    const[allGenres,setAllGenres] = useState([]); //gets a list of all genres and set the state to them
    const[name,setName] = useState([]); //sets the state of name from the persons endpoint in the database
    const [fkPersonId, setFkPersonId] = useState(""); //sets fkpersonId to the personId useParams when posting a new genre that the person likes
    const api = 'https://localhost:7283';

    // a function that contains each call to make the use of useEffect smarter and easier to deal with if you want to add new data fetches
    const Calls = () =>{
        const fetchData = async () => {
            const result = await axios( `${api}/api/GetRatings/?personId=${personId}`);
            setData(result.data);
        };
        fetchData();
        const fetchGenre = async () => {
            const res = await axios(`${api}/api/PersonGenre/?id=${personId}`);
            setGenre(res.data);
        };
        fetchGenre();
        const fetchAllGenres = async () => {
            const result = await axios(`${api}/api/GetGenres/`);
            setAllGenres(result.data);
        }
        fetchAllGenres();
        const fetchName = async () => {
            const result = await axios (`${api}/api/Person/{id}?PersonId=${personId}`);
            setName(result.data);
        }
        fetchName();
    };
    useEffect(() => {
        Calls();
    }, []);

const DivCard = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    font-size: 1.5em;
    width: 15em;
    max-width: 340px;
    align-items: start;
    padding: 1em;
    margin: .5em;
    border: #444 solid 3px;
    border-radius: .2em;
    background: #bb86fc;
    color: #212121;
`;
const P = styled.p`
border: solid 3px black;
width:38px;
display:flex;
justify-content: center;
border-radius: 50%;
background: #1a1a1a;
color: #ffff;
transition: transform .5s cubic-bezier(0.77,0.2,0.05,1.0);
&:hover {
    transform: scale(1.5);
}
`;

const Div = styled.div`
display:flex;
flex-wrap: wrap;
gap:10px;

`;
const Button = styled.button`
height: 3em;
width: 10em;
display:flex;
align-items: center;
justify-content: center;
background: #9b5de7;
font-size: .8rem;
font-weight: 650;
transition: transform .4s cubic-bezier(0.77,0.2,0.05,1.0);
padding: .2em;
border-radius: .5em;
&:hover {
    transform: scale(1.1);
    background: #444;
    color: #bb86fc;
}
box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
`;
const ButtonDiv = styled.div`
display:flex;
width:15em;
justify-content: center;
padding: .1em;
`;
const H1 = styled.h1`
font-size:2.5em;
background:red;
width: 250px;
text-align:center;
background:#bb86fc;
color: #212121;
border-radius: 0.2em;
`;

//Creates a post request to add new liked genres to an individual
const PostGenre = async(e) => {
    setFkPersonId(personId);
    const selectedGenreId = e.target.value;
      await axios.post(`${api}/api/Person/toGenre/?personId=${personId}&GenreId=${selectedGenreId}`);
      Calls();
};
    return(
        <>
        <Div>
        <NavLink to="/"><Button>Go Back</Button></NavLink>
        </Div>
        <Div>
        {name.map(nam =>(<H1>{nam.firstName}</H1>))}
        </Div>
       <Div>
        <DivCard className="add_genres">
            <h2>Add New Genres</h2>
            {allGenres.map((genres) =>{
                if(!genre.find((gen) => gen.genreId === genres.genreId)) {
                    return (
                        <ButtonDiv key={genres.genreId}>
                            <Button value={genres.genreId}onClick={(e) => {PostGenre(e)}}>{genres.title}</Button>
                        </ButtonDiv>
                    )
                }
            })}
        </DivCard>
        <DivCard className="movies">
            <h2>Movies</h2>
            {data.map(rating =>(
                
                <div key={rating.ratingId}>
                    <p>{rating.name} </p> 
                    <P>{rating.ratings}</P>
                </div>
                
            ))}
        </DivCard>
        <DivCard className="info">
            <h2>Liked Genres</h2>
             {genre.map(gen =>(
                <div>
                    <h3>{gen.title}</h3>
                </div>
               ))}  
            <Outlet />
        </DivCard>
        </Div>
        </>
    )
}