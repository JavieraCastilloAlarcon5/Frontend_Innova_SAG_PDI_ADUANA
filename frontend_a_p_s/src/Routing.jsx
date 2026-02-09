import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Informacion from './Pages/informacion'
import Auth from './components/auth'
import CarnetDetalle from './components/carnet'
import RequireAuth from './components/requireAuth'

function Routing(){
    return (
        <>

            <Routes>
                <Route path={'/'} element={<Auth />}/>
                {/* rutas protegidas son las que estan aca abajo */}
                <Route element={<RequireAuth />}>
                    <Route path={'/informacion'} element={<Informacion />}/>
                    <Route path="/documentos/:type/:id" element={<CarnetDetalle />} />
                </Route>
            </Routes>

        </>
    )
}

export default Routing