import { useState } from 'react'
import { AddButton, MiniButtonWithIcon, SearchBar } from '../../components'
import { uid } from 'uid'

const Color = () => {

  const [colors, setColors] = useState([
    {      
      id: 0,
      image: '/assets/images/ColorMatteBlack.jpg',
      name: 'Gold Crome',
      material: 'Steel',
      uniquecode: 'C-001',
      visibility: 'visible'
    },
    {      
      id: 1,
      image: '/assets/images/ColorMatteBlack.jpg',
      name: 'Matte Black',
      material: 'Steel',
      uniquecode: 'C-002',
      visibility: 'visible'
    },
    {      
      id: 2,
      image: '/assets/images/ColorMatteBlack.jpg',
      name: 'Matte Bronze',
      material: 'Steel',
      uniquecode: 'C-003',
      visibility: 'visible'
    },
  ])
  const [isOpenFormColor, setIsOpenFormColor] = useState(false)
  const [formColor, setFormColor] = useState({
    name: '',
    material: '',
    image: '',
    visibility: ''
  })
  const [isColorUpdate, setIsColorUpdate] = useState({
    id: null,
    status: false
  })
  function handleChangeColor(e) {
    let data = {...formColor}
    if (e.target.value) {
      data[e.target.name] = e.target.value
    } else {
      data[e.target.name] = URL.createObjectURL(e.target.files[0])
    }
    setFormColor(data)
  }
  function handleSubmitColor(e) {
    e.preventDefault()
    alert('Data Successfully')
    setIsOpenFormColor(false)
    let data = [...colors]

    if( formColor.name === '' | 
        formColor.material === '' |
        formColor.image === '' |
        formColor.visibility === ''
    ) {
      setIsOpenFormColor(true)
      return false
    } 

    if (isColorUpdate.status) {
      data.forEach((color) => {
        if (color.id === isColorUpdate.id) {
          color.name = formColor.name
          color.material = formColor.material
          color.image = formColor.image
          color.visibility = formColor.visibility
        }
      })
    } else {
      data.push({ 
        id: uid(), 
        image: formColor.image,
        name: formColor.name,
        material: formColor.material,
        uniquecode: 'C-000',
        visibility: formColor.visibility 
      })
    }
    // menambah color
    setColors(data)
    setFormColor({
      name: '',
      material: '',
      image: '',
      visibility: ''
    })
    setIsColorUpdate({
      id: null,
      status: false
    })
  }
  function handleEditColor(id) {
    setIsOpenFormColor(true)
    let data = [...colors]
    let foundData = data.find((color) => color.id === id)

    setFormColor({
      name: foundData.name,
      material: foundData.material,
      image: foundData.image,
      visibility: foundData.visibility
    })
    setIsColorUpdate({
      id: id,
      status: true
    })
  }
  function handleCancelColor() {
    setIsOpenFormColor(false)
    setFormColor({
      name: '',
      material: '',
      image: '',
      visibility: ''
    })
  }
  function handleDeleteColor(id) {
    const answer = window.confirm('Are you sure to delete this color?')
    if(answer) {
      const filteredColors = colors.filter(function(color) {
        return color.id !== id
      })
      setColors(filteredColors)
    } else {
      alert('Cancelled')
    }
  }

  return (
    <div>
      <>
        <div className='flex sm:flex-row flex-col gap-5 sm:items-center items-start mb-6'>
          <SearchBar />
          <AddButton name='Add Color' action={() => setIsOpenFormColor(true)} />
        </div>

        <div className='overflow-x-auto scrollbar-custom bg-white overflow-hidden'>
          <table className='sm:w-full w-max border border-black'>
            <thead>
              <tr className='text-center font-jakarta lg:text-base md:text-sm text-xs font-bold text-white bg-primary'>
                <th className='p-2'>No</th>
                <th className='p-2'>Image</th>
                <th className='p-2'>Name</th>
                <th className='p-2'>Material</th>
                <th className='p-2'>Unique Code</th>
                <th className='p-2'>Visible</th>
                <th className='p-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {colors.map(function(color, index) {
              return (
                <tr className='border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal' key={index}>
                  <td className='p-2'>{index + 1}</td>
                  <td className='p-2'>
                    <div className='h-[25px] aspect-square overflow-hidden block m-auto'>
                      <img className='w-full h-full object-cover' src={color.image} alt='' />
                    </div>
                  </td>
                  <td className='p-2'>{color.name}</td>
                  <td className='p-2'>{color.material}</td>
                  <td className='p-2'>{color.uniquecode}</td>
                  <td className='p-2'><img className='block m-auto' src={color.visibility == 'visible' ? '/assets/icons/IconVisible.svg' : '/assets/icons/IconInvisible.svg'} alt='' /></td>
                  <td className='p-2'>
                    <div className='flex gap-1 flex-wrap justify-center'>
                      <MiniButtonWithIcon colorBorder='primary' colorBg='primary' colorText='white' action={() => handleEditColor(color.id)} img='/assets/icons/IconEdit.svg' name='Edit' />
                      <button className='flex items-center gap-1  bg-red-600 rounded-[5px] py-1 px-2 font-jakarta text-xs text-white' onClick={() => handleDeleteColor(color.id)}><img src='/assets/icons/IconClose.svg' name='Delete' />Delete</button>
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </>
      
      {/* FORM PATTERN */}
      <div className={'fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 ' + (isOpenFormColor === true ? 'opacity-100 visible' : 'opacity-0 invisible')}>
        <form className={'fixed h-auto xl:w-[35%] sm:w-[50%] w-[85%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 md:p-10 p-5 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom ' + (isOpenFormColor === true ? 'opacity-100 visible' : 'opacity-0 invisible')} onSubmit={handleSubmitColor}>
          <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Name*</span> 
            <input
              required
              type='text'
              value={formColor.name}
              name='name'
              placeholder='Input Leg Color Name'
              onChange={handleChangeColor}
              className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
            />
          </label>
          <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Material*</span> 
            <input
              required
              type='text'
              value={formColor.material}
              name='material'
              placeholder='Input Leg Material'
              onChange={handleChangeColor}
              className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
            />
          </label>
          <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Upload Image*</span> 
            <input
              required
              type='file'
              name='image'
              onChange={handleChangeColor}
              accept='image/*'
              className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
            />
          </label>
          <div className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Visibility*</span>
            <select
              required
              name='visibility'
              value={formColor.visibility}
              onChange={handleChangeColor}
              className='font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5'>
              <option value=''>Choose one</option>
              <option value='visible'>Visible</option>
              <option value='invisible'>Invisible</option>
            </select>
          </div>
          <div className='flex gap-3 justify-end'>
            <span className='flex items-center gap-2 border bg-red-600 rounded-[5px] py-1 px-4 font-jakarta text-xs text-white cursor-pointer' onClick={handleCancelColor}>
              <img src='/assets/icons/IconClose.svg' alt='' />
              <p>Cancel</p>
            </span> 
            <button className='flex items-center gap-2 border border-primary bg-primary rounded-[5px] py-1 px-4 font-jakarta text-xs text-white' type='submit'>
              <img className='scale-[65%]' src='/assets/icons/IconCheckWhite.svg' alt='' />
              <p>Save</p>
            </button>
          </div>
        </form>
      </div>
      {/* FORM PATTERN */}
    </div>
  )
}

export default Color