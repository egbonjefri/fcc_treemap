import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = ()=>{
    return(
        <div className='navbar'>
            <ul className='nav-list'>
                            <li><Link to='/'>Kickstarter Pledges</Link></li>
                            <li><Link to='/videogames'>Video Game Sales</Link></li>
                            <li><Link to='/movies'>Movie Sales</Link></li>

                        </ul>

        </div>
    )
}



export default Navbar;
