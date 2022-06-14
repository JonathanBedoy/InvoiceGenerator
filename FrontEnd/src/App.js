// TODO: final testing
// TODO: logo based on user logging in (svg generated)
import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import HomePage from './containers/HomePage/HomePage'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import { useDispatch, useSelector } from 'react-redux'
import { populateStore } from './store/populateStore/populateStore'
import { BreakpointActions } from './store/breakpoints'
import LoginModal from './components/UI/Modal/LoginModal/LoginModal'

let initialRun = false
function App() {
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.user)

  // handle breakpoints
  function handleResize() {
    dispatch(BreakpointActions.setBreakpoint({ width: window.innerWidth }))
  }
  // handleResize();
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // const company = useSelector(state => state.company.company)
  useEffect(() => {
    if (userInfo.loggedIn) {
      dispatch(populateStore())
      handleResize()
      // dispatch(login('jbedoy', 'bedoy123'))
      initialRun = true
    }

    return () => {}
  }, [userInfo.userId, userInfo.loggedIn])

  return (
    <BrowserRouter>
      <LoginModal />
      {/* <Button onClick={()=>{dispatch(login('guest', 'password'))}} >login</Button> */}

      {/* <Button onClick={()=>{dispatch(callServe())}} >Call</Button> */}
      <div className='mb-5'>
        <HomePage />
      </div>
    </BrowserRouter>
  )
}

export default App
