import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../container/Container'
import LogoutBtn from './LogoutBtn'
function Header() {
  const isLoggedIn = useSelector(state=>state.auth.status)
const navigate = useNavigate()
const navItems = [
  {
    name: 'Home',
    slug: "/",
    active: true
  }, 
  {
    name: "Login",
    slug: "/login",
    active: !isLoggedIn,
},
{
    name: "Signup",
    slug: "/signup",
    active: !isLoggedIn,
},
{
    name: "All Posts",
    slug: "/all-posts",
    active: isLoggedIn,
},
{
    name: "Add Post",
    slug: "/add-post",
    active: isLoggedIn,
},
]
return (
 <header className='py-3 bg-dark text-light d-flex justify-content-between align-items-center '>
  <Container>
    <nav className='d-flex justify-content-between align-items-center'>
 <ul className='d-flex list-unstyled m-0 p-0 '> 
{navItems.map((item)=>{
return item.active ? (<li key={item.slug}>
  <button className=' inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full ' onClick={()=>navigate(item.slug)}>{item.name}</button>
</li>) : null
})}

{isLoggedIn && (<li><LogoutBtn/></li>)}

 </ul>

    </nav>
  </Container>
   </header>
  )
}

export default Header