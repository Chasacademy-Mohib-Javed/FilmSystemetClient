import React from 'react';
import styled from 'styled-components';
import {Route, 
        createBrowserRouter,
        createRoutesFromElements,
        RouterProvider} from 'react-router-dom';


//Pages
import CardList from './pages/Home';
import RootLayout from './layouts/RootLayout';
import LikedGenres from './pages/LikedGenres';
import Movies from './pages/Movies';
import AddRating from './pages/AddRating'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element= {<CardList />}/>
      <Route path="LikedGenres/:personId" element={<LikedGenres/>}/>
      <Route path="movies" element={<Movies/>}/>
          <Route path="movies/AddRating/:movieId" element={<AddRating/>}/>
    </Route>
  )
)
function App() {
  return (
        <RouterProvider router={router} />
  );
}
export default App;