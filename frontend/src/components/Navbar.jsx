import React, { useState, useEffect, useContext } from 'react'
import "./Navbar.scss";
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { faCat } from '@fortawesome/free-solid-svg-icons'
import { authContext } from '../providers/Authprovider'

export default function Navbar() {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const { auth, user, logout } = useContext(authContext);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const signLogInClick = (route) => {
    if (route === 'sign-up') {
      navigate('/sign-up')
    } else if (route === 'login') {
      navigate('/login')
    }
  }

  const showButton = () => {
    if (window.innerWidth <= 1145) {
      setButton(false);
    } else {
      setButton(true);
      setClick(false);
    }

  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        {auth && user &&
          <Link to={`/mypage/${user.id}`} className='nav-links' onClick={closeMobileMenu}>
            My Page
          </Link>
        }
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (

    <>
      <nav id="navbar">
        <div className="navbar-container">
          <Link to='/' className="navbar-logo" onClick={closeMobileMenu}>
            Find Me-Ow  <FontAwesomeIcon icon={faCat} />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-mean active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/about' className='nav-links' onClick={closeMobileMenu}>
                About
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/report-pet' className='nav-links' onClick={closeMobileMenu}>
                Report Cat
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/search-pet' className='nav-links' onClick={closeMobileMenu}>
                Search Cat
              </Link>
            </li>
            {auth && <li className='nav-item' id='usernamebox'>
              <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                 Hi! {user && user.username} <DownOutlined />
                </a>
              </Dropdown>
            </li>}
            {!auth && <li className='nav-item'>
              <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                Sign-up
              </Link>
            </li>}
            {!auth && <li className='nav-item'>
              <Link to='/login' className='nav-links-mobile' onClick={closeMobileMenu}>
                Login
              </Link>
            </li>}
            {auth && <li className='nav-item'>
              <Link to='/login' className='nav-links-mobile' onClick={() => logout()}>
                Log out
              </Link>
            </li>}

          </ul>

          {!auth && button && <Button onClick={() => signLogInClick('sign-up')} buttonStyle='btn--outline'>SIGN UP</Button>}&nbsp;&nbsp;
          {!auth && button && <Button onClick={() => signLogInClick('login')} buttonStyle='btn--outline'>LOGIN</Button>}
          {auth && button && <Button onClick={() => logout()} buttonStyle='btn--outline'>LOG OUT</Button>}
        </div>
      </nav>
    </>
  );
}


