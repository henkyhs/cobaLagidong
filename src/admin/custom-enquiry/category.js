import { useState } from 'react'
import { AddButton, MiniButtonWithIcon, SearchBar } from '../../components'

const Category = () => {

  const [categories, setCategories] = useState([
    {
      id: 0,
      name: 'Bianco/White',
      visibility: 'visible'
    },
    {
      id: 1,
      name: 'Grigio/Grey',
      visibility: 'invisible'
    },
    {
      id: 2,
      name: 'Nero/Hitam',
      visibility: 'visible'
    },
    {
      id: 3,
      name: 'Crema/Krem',
      visibility: 'visible'
    }
  ])

  return (
    <>
      <div className='flex sm:flex-row flex-col gap-5 sm:items-center items-start mb-6'>
        <SearchBar />
        <AddButton name='Add Category' />
      </div>

      <div className='overflow-x-auto scrollbar-custom bg-white overflow-hidden'>
        <table className='sm:w-full w-max border border-black'>
          <thead>
            <tr className='text-center font-jakarta lg:text-base md:text-sm text-xs font-bold text-white bg-primary'>
            <th className='p-2'>No</th>
            <th className='p-2'>Name</th>
            <th className='p-2'>Visibility</th>
            <th className='p-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(function(category, index) {
            return (
            <tr className='border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal' key={index}>
              <td className='p-2'>{index + 1}</td>
              <td className='p-2'>{category.name}</td>
              <td className='p-2'><img className='block m-auto' src={category.visibility == 'visible' ? '/assets/icons/IconVisible.svg' : '/assets/icons/IconInvisible.svg'} alt='' /></td>
              <td className='p-2'>
                <div className='flex gap-1 flex-wrap justify-center'>
                  <MiniButtonWithIcon colorBorder='primary' colorBg='primary' colorText='white' img='/assets/icons/IconEdit.svg' name='Edit' />
                  <MiniButtonWithIcon colorBorder='primary' colorBg='white' colorText='primary' img='/assets/icons/IconClosePrimary.svg' name='Delete' />
                </div>
              </td>
            </tr>
            )})}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Category