import { useEffect } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('userInfo')
        navigate('/login')
    }

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))

        if (!userInfo) {
            navigate('/login')
            return
        }
    }, [])

    return (
        <>
            <nav className="navbar navbar-expand-md">
                <div className="container">
                    <Link className="navbar-brand mx-4" to="#">StoryTelling...</Link>
                    <div className="nav justify-content-end p-2" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="#">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">Contact</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/create">Create</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/list">Stories</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/insights">Insights</Link>
                            </li>
                            {localStorage.getItem('userInfo') && <button className='btn btn-md btn-dark mx-4' onClick={handleLogout}>Logout</button>}
                        </ul>
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
    )
}

export default Header