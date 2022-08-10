import { useState } from 'react'
import { AddButton, SearchBar } from '../../components'

const User = () => {

  const [users, setUsers] = useState([
    {      
      id: 0,
      name: 'Admin1',
      email: 'Admin1@esteticohome.my.id',
      is_active: 'yes'
    },
    {      
      id: 1,
      name: 'Admin2',
      email: 'Admin2@esteticohome.my.id',
      is_active: 'yes'
    },
    {      
      id: 2,
      name: 'Admin3',
      email: 'Admin3@esteticohome.my.id',
      is_active: 'yes'
    },
  ])

  return (
    <>
      <div className='flex sm:flex-row flex-col gap-5 sm:items-center items-start mb-6'>
        <SearchBar />
        <AddButton name='Add User' />
      </div>

      <div className='overflow-x-auto scrollbar-custom bg-white overflow-hidden'>
        <table className='sm:w-full w-max border border-black'>
          <thead>
            <tr className='text-center font-jakarta lg:text-base md:text-sm text-xs font-bold text-white bg-primary'>
            <th className='p-2'>No</th>
            <th className='p-2'>Name</th>
            <th className='p-2'>Email</th>
            <th className='p-2'>Is Active</th>
            </tr>
          </thead>
          <tbody>
            {users.map(function(user, index) {
            return (
            <tr className='border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal' key={index}>
              <td className='p-2'>{index + 1}</td>
              <td className='p-2'>{user.name}</td>
              <td className='p-2'>{user.email}</td>
              <td className='p-2'><img className='block m-auto' src={user.is_active == 'yes' ? '/assets/icons/IconVisible.svg' : '/assets/icons/IconInvisible.svg'} alt='' /></td>
            </tr>
            )})}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default User