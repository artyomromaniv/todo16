import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useAppDispatch, useAppSelector} from './store'
import {RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from "../features/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {logoutTC, meTC} from "../login/auth-reducer";
import {CircularProgress} from "@mui/material";


function App() {
   const dispatch = useAppDispatch()
   const status = useAppSelector<RequestStatusType>((state) => state.app.status)
   const isInitialized = useAppSelector<boolean>((state) => state.auth.isInitialized)
   const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

   useEffect(() => {
      dispatch(meTC())
   }, [])

   if (!isInitialized) {
      return <div
         style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
         <CircularProgress/>
      </div>
   }
   const logoutHandler = () => {
      dispatch(logoutTC())
   }

   return (
      <div className="App">
         <ErrorSnackbar/>
         <AppBar position="static">
            <Toolbar>
               <IconButton edge="start" color="inherit" aria-label="menu">
                  <Menu/>
               </IconButton>
               <Typography variant="h6">
                  News
               </Typography>
               {isLoggedIn && <Button onClick={logoutHandler} color="inherit">Log out</Button>}
            </Toolbar>
            {status === 'loading' && <LinearProgress/>}
         </AppBar>
         <Container fixed>

            <Routes>
               <Route path={'/'} element={<TodolistsList/>}/>
               <Route path={'/login'} element={<Login/>}/>
               <Route path={'/404'} element={<h1>Page not Found 404</h1>}/>
               <Route path={'*'} element={<Navigate to={'/404'}/>}/>
            </Routes>

         </Container>

      </div>
   )
}

export default App
