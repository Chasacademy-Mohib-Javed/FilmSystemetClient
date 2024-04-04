import styled from 'styled-components';
import { NavLink, Outlet} from 'react-router-dom';



const HeaderContainer = styled.header` 
display:flex;
background: #212121;
height: 10vh;
color: #bb86fc;
justify-content: space-between;
align-items:center;
font-size: 2em;
gap: 10px;
margin: 0;
`;
const MainContainer = styled.main`
display:flex;
background: #121212;
flex-direction: column;
justify-content: center;
align-items: center;
align-content: center;
min-height: 100vh;
padding: 0;
margin: 0;
`;
const NavContainer = styled.div`
background:black;
display:flex;
flex-direction:row;
gap:5px;
`;
const Nav = styled.div`
display:flex;
flex-direction:row;
gap: 10px;
background:#bb86fc;
color: #212121;
padding: .1em;
border-radius:3%;

`;

export default function RootLayout() {
  return (
        <div className="root-layout">
            <HeaderContainer>
                <NavLink to="/"><h2>Film Client</h2></NavLink>
                    <NavContainer>
                        <Nav className="root-nav">    
                            <NavLink to="/">Home</NavLink>
                        </Nav>
                        <Nav>
                            <NavLink to="movies">Movies</NavLink>
                         </Nav>
                    </NavContainer>
            </HeaderContainer>
            <MainContainer>
                <Outlet />
            </MainContainer>
        </div>
  )
}
