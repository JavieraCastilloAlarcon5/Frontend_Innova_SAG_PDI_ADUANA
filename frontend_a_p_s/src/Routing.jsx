import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Informacion from './Pages/informacion'
import Auth from './components/auth'
import CarnetDetalle from './components/carnet'

function Routing(){
    return (
        <>

            <Routes>
                <Route path={'/informacion'} element={<Informacion />}/>
                <Route path={'/'} element={<Auth />}/>
                <Route path="/documentos/:type/:id" element={<CarnetDetalle />} />
            </Routes>

        </>
    )
}

export default Routing