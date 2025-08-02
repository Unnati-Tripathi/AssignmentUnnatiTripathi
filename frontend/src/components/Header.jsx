import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <header className='bg-white shadow-md'>
      <div className='container mx-auto flex justify-between items-center p-4'>
        <div className='text-2xl font-bold text-gray-800'>
          <Link to='/'>Task Manager</Link>
        </div>
        <ul className='flex items-center gap-4'>
          {user ? (
            <li>
              <button className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition' onClick={onLogout}>
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to='/login' className='text-gray-600 hover:text-gray-900 transition'>Login</Link>
              </li>
              <li>
                <Link to='/register' className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition'>Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;