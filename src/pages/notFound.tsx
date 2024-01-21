import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='flex__center w-[100vw] h-[100vh]'>
        <p>Page not found! <span className='text-primary underline'><Link to="/">Go to homepage</Link></span></p>      
    </div>
  )
}

export default NotFound;
