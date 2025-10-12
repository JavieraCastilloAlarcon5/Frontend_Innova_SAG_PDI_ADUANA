import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Informacion from './Pages/informacion'
import Auth from './components/auth'

function Routing(){
    return (
        <>

            <Routes>
                <Route path={'/informacion'} element={<Informacion />}/>
                <Route path={'/'} element={<Auth />}/>
            </Routes>

        </>
    )
}

export default Routing