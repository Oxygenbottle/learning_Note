import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const tabs = [
  {name: "关注", to:"/follow"},
  {name: "推荐", to:"/"},
  {name: "热榜", to:"/hot"},
  {name: "视频", to:"/zvideo"},
  
]

export default function index() {
  return (
    <div>
      <div className=' border-b border-gray-200'>
        <nav className=' -mb-px flex space-x-8 border-b aria-label="Tabs'>
          {
            tabs.map((item,index) => (
              <NavLink
                key={index}
                to={item.to}
                className={({isActive}) => "whitespace-nowrap py-4 px-4 border-b-2 font-medium text-base " + 
                (isActive?' border-blue-500 text-blue-600': 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300')} >
                  {item.name}
                </NavLink>
            ))
          }

        </nav>
        <Outlet />
      </div>
    </div>
  )
}
