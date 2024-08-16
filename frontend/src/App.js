import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import bg from './img/bg.png'
import { MainLayout } from './styles/Layouts'
// import Orb from './Components/Orb/Orb'
import Navigation from './Components/Navigation/Navigation'
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income'
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';
import SignupPage from './Components/SignUpLogin/signUp';
import LoginPage from './Components/SignUpLogin/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  const [active, setActive] = useState(1)
  // const [signup, setSignup] = useState(true)
  // const [login, setLogin] = useState(false)

  // const global = useGlobalContext()
  // console.log(global);\

  // const {totalExpenses,incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />
      case 2:
        return <Dashboard />
      case 3:
        return <Income />
      case 4:
        return <Expenses />
      default:
        return <Dashboard />
    }
  }

  // const orbMemo = useMemo(() => {
  //   return <Orb />
  // },[])

  return (
    <AppStyled bg={bg} className="App">
      {/* {orbMemo} */}
      {/* removing orb as animation in css is used in it of no use */}
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
        <MainLayout>
          <Navigation active={active} setActive={setActive} />
          <main>
            <Routes>
              <Route path='/' element={displayData()} />
            </Routes>
          </main>
        </MainLayout>
      </BrowserRouter>
      {/* // )
      } */}
    </AppStyled>
  );
}

const AppStyled = styled.div
  `
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
