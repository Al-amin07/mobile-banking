import  { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css'
import useAuth from '../../Hooks/useAuth';
import UserRole from '../role/UserRole/UserRole';
import AgentRole from '../role/AgentRole/AgentRole';

const Sidebar = () => {


  const navigate = useNavigate();
  const { user,setUser, setToken, role, setRole} = useAuth();
    const [isSideNavOpen, setIsSideNavOpen] = useState(false)
    const handleLogout = () => {
      localStorage.setItem('token', '')
      setUser(null)
      setToken(null)
      setRole(null)
      navigate('/login')
    }
    // if(isLoading) return <div className=' h-[300px] flex items-center justify-center'><span className="loading loading-spinner loading-lg"></span></div>
    return (
        <>
          {/*  <!-- Component: Side navigation menu with content separator --> */}
          {/*  <!-- Mobile trigger --> */}
          <button
            title="Side navigation"
            type="button"
            className={`visible fixed left-6 top-6 z-40 order-10 block h-10 w-10 self-center rounded bg-white opacity-100 lg:hidden ${
              isSideNavOpen
                ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
                : ""
            }`}
            aria-haspopup="menu"
            aria-label="Side navigation"
            aria-expanded={isSideNavOpen ? " true" : "false"}
            aria-controls="nav-menu-2"
            onClick={() => setIsSideNavOpen(!isSideNavOpen)}
          >
            <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
              <span
                aria-hidden="true"
                className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-300"
              ></span>
              <span
                aria-hidden="true"
                className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
              ></span>
              <span
                aria-hidden="true"
                className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
              ></span>
            </div>
          </button>
    
          {/*  <!-- Side Navigation --> */}
          <aside
            id="nav-menu-2"
            aria-label="Side navigation"
            className={`fixed top-0 bottom-0 left-0 z-40 flex w-72 flex-col border-r border-r-slate-200 bg-white transition-transform lg:translate-x-0 ${
              isSideNavOpen ? "translate-x-0" : " -translate-x-full"
            }`}
          >
            <a
              aria-label="WindUI logo"
              className="flex items-center gap-2 whitespace-nowrap p-6 text-xl font-medium focus:outline-none"
              href="javascript:void(0)"
            >
           
              {
                user ? user.name : 'Good Morning'
              }
            </a>
            <nav
              aria-label="side navigation"
              className="flex-1 divide-y divide-slate-100 overflow-auto"
            >
              <div>
                <ul className="flex flex-col gap-4 px-5">
                        <li><NavLink className={'rounded-md text-left inline-block w-full px-5 border py-3 font-medium'} to={'/'}>Home</NavLink></li>
                        <li><NavLink className={'rounded-md text-left inline-block w-full px-5 border py-3 font-medium'} to={'/register'}>Registration</NavLink></li>
                        <li><NavLink className={'rounded-md text-left inline-block w-full px-5 border py-3 font-medium'} to={'/login'}>Login</NavLink></li>
                     
                        {
                          role === 'user' && <UserRole />
                        }
                        {
                          role === 'agent' && <AgentRole />
                        }
                      
                </ul>
              </div>
              
            </nav>
            <footer className="border-t border-slate-200 p-3">
             <button onClick={handleLogout} className='bg-base-200 py-3 px-5 rounded-lg font-medium w-full text-left'>Log Out</button>
            </footer>
          </aside>
    
          {/*  <!-- Backdrop --> */}
          <div
            className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors sm:hidden ${
              isSideNavOpen ? "block" : "hidden"
            }`}
            onClick={() => setIsSideNavOpen(false)}
          ></div>
          {/*  <!-- End Side navigation menu with content separator --> */}
        </>
      )
};

export default Sidebar;