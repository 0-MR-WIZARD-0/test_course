import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
        <h1>Page not found</h1>
        <h3>Go to the: <Link to="/"> Home Page </Link></h3>
    </div>
  )
}

export default NotFound