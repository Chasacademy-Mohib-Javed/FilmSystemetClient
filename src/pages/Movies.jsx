//Imports
import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {useState,useEffect} from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
//Pages
import MovieCard from './MovieCard';

const CardListContainer = styled.div`
display:flex;
flex-direction:column;
flex-wrap:wrap;
padding: 1em;
height: 50vh;
width: 25em;
box-sizing:border-box;


`;
const MainContainer = styled.main`
display:flex;
flex-wrap: wrap;
flex-direction: row;
place-content: center;
align-items: start;
align-content: start;
min-height: 100vh;
padding: 0;
margin: 0;
`;
const Input = styled.input`
 color: #8707ff;
 border: 2px solid #8707ff;
 border-radius: 10px;
 padding: 10px 25px;
 background: transparent;
 max-width: 190px;
 text-align: center;
 &.input:active
    box-shadow: 2px 2px 15px #8707ff inset;
 
`;
const Button = styled.button`


  border: none;
  outline: none;
  background-color: #bb86fc;
  padding: 10px 20px;
  font-size: 12px;
  font-weight: 700;
  color: #212121;
  border-radius: 5px;
  transition: all ease 0.1s;
  box-shadow: 0px 5px 0px 0px #a29bfe;


&:active {
  transform: translateY(5px);
  box-shadow: 0px 0px 0px 0px #a29bfe;
}
`;
const ButtonDiv = styled.div`
display:flex;
gap: 5px;


`;

export default function Movies() {
    const [data,setData] = useState({results:[]}); //sets the state of the data to the api endpoints results
    const [page,setPage] = useState(1); //gets the total pages from the external api and displays them
    const [search,setSearch] = useState(""); //sets the state of the searchbar to a blank string until something gets written in
    const [movieSearch,setMovieSearch] = useState({results:[]}); //sets the state and displays the movie you've searched for based on the input in the searchbar
    const TMDB_GET_MOVIES = 'https://api.themoviedb.org/3/discover/movie?api_key=<<API-KEY>>&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate'; //API endpoint to retrieve movies 
    const POSTER_PREFIX = 'https://image.tmdb.org/t/p/original'; // a prefix to get the first part of what's needed for a posterpath to display the image for a specific film
    const TMDB_GET_MOVIE_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=<<API-KEY>>&language=en-US&query=${search}&page=1&include_adult=false` //API endpoint to display searchresults based on the state of search
    //gets data for the movie page to display movies from TMDB
    useEffect (() => {
        const fetchData = async () => {
            const result = await axios(TMDB_GET_MOVIES + '&page=' + page)
            setData(result.data);
        };
        fetchData();
    },[page]);
    //fetches data from the moviesearch endpoint
    useEffect (() => {
        const fetchMovie = async () => {
            const result = await axios(TMDB_GET_MOVIE_SEARCH)
            setMovieSearch(result.data)
        };
        fetchMovie();
    },[search]);
    //Gives possibility to go to next page in movies tab
    const nextPage = () => {
        setPage((prevState) => prevState + 1);
    }
    //Gives possibility to go to previous page in movies tab
    const prevPage = () => {
        setPage((prevState) => prevState - 1);
    }

    const navigate= useNavigate(); //react-router to navigate to the AddRating page
    const handleClick = (movie) => {
        navigate(`/movies/AddRating/${movie.id}`)
    }
    //renders everything
  return (
    <>
    Page {data.page} of {data.total_pages}
    <ButtonDiv>
    <Button onClick = {prevPage}>Prev Page</Button>
    <Button onClick = {nextPage}>Next Page</Button>
    </ButtonDiv>
    <br />
    <Input type="text" placeholder="Search Movie" className="search" onChange={(e)=> setSearch(e.target.value)}/>
    <Outlet />
    <MainContainer>
        {movieSearch.results.filter((mov) => mov.original_title.toLowerCase().includes(search.toLowerCase())).map((mov) =>
         <CardListContainer onClick={() => handleClick(mov)} key= {mov.id}>
         <MovieCard key={mov.id} Title = {mov.original_title} poster={POSTER_PREFIX + mov.poster_path} />
         </CardListContainer>
    )}
        {data.results.map(movie =>
         <CardListContainer onClick={() => handleClick(movie)} key = {movie.id}>   
            <MovieCard key={movie.id} Title = {movie.title} poster={POSTER_PREFIX + movie.poster_path} />
        </CardListContainer>

        )}
    </MainContainer>
    </>     
  )
}
// onClick={() => handleClick(movie)} key = {movie.id}
