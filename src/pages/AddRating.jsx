import React from 'react'
import axios from 'axios';
import {useState,useEffect} from 'react'
import {Outlet,useParams, NavLink} from 'react-router-dom'
import styled from 'styled-components';


export default function AddRating() {
let {movieId} = useParams();
const [rating,setRating] = useState({}); //Sets The rating from the ratings table in the database
const [data,setData] = useState([]); //Sets the state to the data you get from TMDB_GET_INFO
    
const api = 'https://localhost:7283';
const POSTER_PREFIX = 'https://image.tmdb.org/t/p/original';

//Styled Components
 const Select = styled.select`
 width: 200px;
 background: #212121;
 color: #bb86fc;
 font-size: 1.2em;
 `;
 const SelectDiv = styled.div`
 display:flex;
 justify-content:center;
 `;
 const Img = styled.img`
 width:300px;
 border: solid 1px black;
 `;
 const Div = styled.div`
 display:flex;
 align-content: center;
 justify-content: center;
 `;
 const DivContainer = styled.div`
 background:#212121;
 border-radius: .3em;
 padding: .9em;
 box-shadow: rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset;
 `;
 const P = styled.p`
 max-width: 600px;
 color: #bb86fc;
 `;
 const H1 = styled.h1`
  color: #bb86fc;
 `;
 const H3 = styled.h3`
 color: #bb86fc;
 `;
 const Button = styled.button`
 height: 3em;
 width: 8em;
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
    //Fetches Data from TMDB based on the movieId of the element selected
    useEffect (() => {
        const TMDB_GET_INFO = `https://api.themoviedb.org/3/movie/${movieId}?api_key=<<API-KEY>>&language=en-US`
        const fetchData = async () => {
            const result = await axios(TMDB_GET_INFO,);
            setRating(result.data);
        };
        fetchData();
        const fetchPerson = async () => {
            const result = await axios(`${api}/api/person`)
            setData(result.data);
        }
        fetchPerson();
    },[]);
    //Sends a post request to the Database to save a movie based on the person that wants to add it
    const PostMovie = async(e) => {

        console.log(rating.original_title);
        const personId = e.target.value;
          await axios.post(`${api}/api/AddMovie/?personId=${personId}&movieName=${rating.original_title}`);
    };
    //Posts a rating to the Database based on the person that's added the movie
    const PostRating = async(e) => {
            const val = parseInt(e.target.value);
          await axios.post(`${api}/api/GiveRating/?Name=${rating.original_title}&rating=${val}`);
          console.log(val);
          console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    };
  return (
    //Containers for ratings,persons and movies when you've selected one from the vast OPTIONS !!!
    <DivContainer>
        <label>
            <SelectDiv>
                <form>
                <Select required defaultValue="" onChange={(e) =>{ PostMovie(e)}}>
                    <option hidden disabled value="">Select a user</option>   
                        {data.map(item =>
                        <option key={item.personId} value={item.personId}>{item.firstName}</option>
                        )}
                </Select>
                </form>
                <form>
                <Select required defaultValue="" onChange={(e) =>{ PostRating(e)}}>
                    <option hidden disabled value="">Rate</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </Select>
                </form>
            </SelectDiv>
        </label>
    <div>
            <Div className="title">
                <H1>{rating.original_title}</H1>
            </Div>
            <Div className="postercard">
                <Img src={POSTER_PREFIX + rating.poster_path}></Img>
            </Div>
            <Div className="overview">
                <P>{rating.overview}</P>
            </Div>
            <Div>
                <H3>Rating: {(rating.vote_average)}</H3>
            </Div>
            <Div>
                <NavLink to="/movies"><Button>Go Back</Button></NavLink>
            </Div>
            
    </div>
    </DivContainer>
    
  )
}
