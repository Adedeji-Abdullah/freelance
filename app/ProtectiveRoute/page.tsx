
import { Navigate, Outlet } from 'react-router-dom'

const page = () => {
//    const [isAuthenticated, setIsAuthenticated] = useState("")

  const isAuthenticated = !!localStorage.getItem('token')

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}


export default page