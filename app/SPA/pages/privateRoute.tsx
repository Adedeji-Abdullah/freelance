
import { Navigate, Outlet } from 'react-router-dom'

const privateRoute = () => {
//    const [isAuthenticated, setIsAuthenticated] = useState("")

  const isAuthenticated = !!localStorage.getItem('token')

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}


export default privateRoute