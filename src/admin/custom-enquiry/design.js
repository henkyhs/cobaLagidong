import { useState } from 'react'
import { AddButton, MiniButtonWithIcon, SearchBar } from '../../components'
import { uid } from 'uid'

const Design = () => {

  const [designs, setDesigns] = useState([
    {      
      id: 0,
      name: 'Zorro',
      price: 1100000,
      material: 1,
      typeoftop: 1,
      file_two_d: '/assets/images/ColorMatteBlack.jpg',
      file_three_d: '/assets/images/ColorMatteBlack.jpg',
      uniquecode: 'D-001',
      visibility: 'visible'
    },
    {      
      id: 1,
      name: 'Cavallo',
      price: 1100000,
      material: 1,
      typeoftop: 1,
      file_two_d: '/assets/images/ColorMatteBlack.jpg',
      file_three_d: '/assets/images/ColorMatteBlack.jpg',
      uniquecode: 'D-002',
      visibility: 'visible'
    },
    {      
      id: 2,
      name: 'Vee',
      price: 1100000,
      material: 2,
      typeoftop: 1,
      file_two_d: '/assets/images/ColorMatteBlack.jpg',
      file_three_d: '/assets/images/ColorMatteBlack.jpg',
      uniquecode: 'D-003',
      visibility: 'visible'
    }
  ])
  const [isOpenFormDesign, setIsOpenFormDesign] = useState(false)
  const [formDesign, setFormDesign] = useState({
    name: '',
    material: '',
    file_two_d: '',
    file_three_d: '',
    price: '',
    typeoftop: '',
    visibility: ''
  })
  const [isDesignUpdate, setIsDesignUpdate] = useState({
    id: null,
    status: false
  })
  function handleChangeDesign(e) {
    let data = {...formDesign}
    if (e.target.value) {
      data[e.target.name] = e.target.value
    } else {
      data[e.target.name] = URL.createObjectURL(e.target.files[0])
    }
    setFormDesign(data)
  }
  function handleSubmitDesign(e) {
    e.preventDefault()
    alert('Data Successfully')
    setIsOpenFormDesign(false)
    let data = [...designs]

    if( formDesign.name === '' | 
        formDesign.material === '' |
        formDesign.file_two_d === '' |
        formDesign.file_three_d === '' |
        formDesign.price === '' |
        formDesign.typeoftop === '' |
        formDesign.visibility === ''
    ) {
      setIsOpenFormDesign(true)
      return false
    } 

    if (isDesignUpdate.status) {
      data.forEach((design) => {
        if (design.id === isDesignUpdate.id) {
          design.name = formDesign.name
          design.material = formDesign.material
          design.file_two_d = formDesign.file_two_d
          design.file_three_d = formDesign.file_three_d
          design.price = formDesign.price
          design.typeoftop = formDesign.typeoftop
          design.visibility = formDesign.visibility
        }
      })
    } else {
      data.push({ 
        id: uid(), 
        name: formDesign.name,
        material: formDesign.material,
        file_two_d: formDesign.file_two_d,
        file_three_d: formDesign.file_three_d,
        price: formDesign.price,
        typeoftop: formDesign.typeoftop,
        uniquecode: 'D-000',
        visibility: formDesign.visibility 
      })
    }
    // menambah design
    setDesigns(data)
    setFormDesign({
      name: '',
      material: '',
      file_two_d: '',
      file_three_d: '',
      price: '',
      typeoftop: '',
      visibility: ''
    })
    setIsDesignUpdate({
      id: null,
      status: false
    })
  }
  function handleEditDesign(id) {
    setIsOpenFormDesign(true)
    let data = [...designs]
    let foundData = data.find((design) => design.id === id)

    setFormDesign({
      name: foundData.name,
      material: foundData.material,
      file_two_d: foundData.file_two_d,
      file_three_d: foundData.file_three_d,
      price: foundData.price,
      typeoftop: foundData.typeoftop,
      visibility: foundData.visibility
    })
    setIsDesignUpdate({
      id: id,
      status: true
    })
  }
  function handleCancelDesign() {
    setIsOpenFormDesign(false)
    setFormDesign({
      name: '',
      material: '',
      file_two_d: '',
      file_three_d: '',
      price: '',
      typeoftop: '',
      visibility: ''
    })
  }
  function handleDeleteDesign(id) {
    const answer = window.confirm('Are you sure to delete this design?')
    if(answer) {
      const filteredDesigns = designs.filter(function(design) {
        return design.id !== id
      })
      setDesigns(filteredDesigns)
    } else {
      alert('Cancelled')
    }
  }

  return (
    <div>
      <>
        <div className='flex sm:flex-row flex-col gap-5 sm:items-center items-start mb-6'>
          <SearchBar />
          <AddButton name='Add Design' action={() => setIsOpenFormDesign(true)} />
        </div>

        <div className='overflow-x-auto scrollbar-custom bg-white overflow-hidden'>
          <table className='sm:w-full w-max border border-black'>
            <thead>
              <tr className='text-center font-jakarta lg:text-base md:text-sm text-xs font-bold text-white bg-primary'>
                <th className='p-2'>No</th>
                <th className='p-2'>Image</th>
                <th className='p-2'>Name</th>
                <th className='p-2'>Price</th>
                <th className='p-2'>Unique Code</th>
                <th className='p-2'>Visible</th>
                <th className='p-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {designs.map(function(design, index) {
              return (
                <tr className='border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal' key={index}>
                  <td className='p-2'>{index + 1}</td>
                  <td className='p-2'>
                    <div className='h-[25px] aspect-square overflow-hidden block m-auto'>
                      <img className='w-full h-full object-cover' src={design.file_two_d} alt='' />
                    </div>
                  </td>
                  <td className='p-2'>{design.name}</td>
                  <td className='p-2'>{design.price}</td>
                  <td className='p-2'>{design.uniquecode}</td>
                  <td className='p-2'><img className='block m-auto' src={design.visibility == 'visible' ? '/assets/icons/IconVisible.svg' : '/assets/icons/IconInvisible.svg'} alt='' /></td>
                  <td className='p-2'>
                    <div className='flex gap-1 flex-wrap justify-center'>
                      <MiniButtonWithIcon colorBorder='primary' colorBg='primary' colorText='white' action={() => handleEditDesign(design.id)} img='/assets/icons/IconEdit.svg' name='Edit' />
                      <button className='flex items-center gap-1  bg-red-600 rounded-[5px] py-1 px-2 font-jakarta text-xs text-white' onClick={() => handleDeleteDesign(design.id)}><img src='/assets/icons/IconClose.svg' name='Delete' />Delete</button>
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </>
      
      {/* FORM PATTERN */}
      <div className={'fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 ' + (isOpenFormDesign === true ? 'opacity-100 visible' : 'opacity-0 invisible')}>
        <form className={'fixed h-auto xl:w-[35%] sm:w-[50%] w-[85%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 md:p-10 p-5 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom ' + (isOpenFormDesign === true ? 'opacity-100 visible' : 'opacity-0 invisible')} onSubmit={handleSubmitDesign}>
          <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Name*</span> 
            <input
              required
              type='text'
              value={formDesign.name}
              name='name'
              placeholder='Input Leg Design Name'
              onChange={handleChangeDesign}
              className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
            />
          </label>
          <div className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Material*</span>
            <select
              required
              name='material'
              value={formDesign.material}
              onChange={handleChangeDesign}
              className='font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5'>
              <option value=''>Choose material</option>
              <option value={1}>Steel</option>
              <option value={2}>Marble</option>
            </select>
          </div>
          <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Upload 2D Image*</span> 
            <input
              required
              type='file'
              name='file_two_d'
              onChange={handleChangeDesign}
              accept='image/*'
              className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
            />
          </label>
          <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Upload 3D Image*</span> 
            <input
              required
              type='file'
              name='file_three_d'
              onChange={handleChangeDesign}
              accept='image/*'
              className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
            />
          </label>
          <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Price*</span> 
            <input
              required
              type='text'
              value={formDesign.price}
              name='price'
              placeholder='Input Leg Design Price'
              onChange={handleChangeDesign}
              className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
            />
          </label>
          <div className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Type of Top*</span>
            <select
              required
              name='typeoftop'
              value={formDesign.typeoftop}
              onChange={handleChangeDesign}
              className='font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5'>
              <option value=''>Choose one</option>
              <option value={1}>Have corner</option>
              <option value={0}>No corner</option>
            </select>
          </div>
          <div className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Visibility*</span>
            <select
              required
              name='visibility'
              value={formDesign.visibility}
              onChange={handleChangeDesign}
              className='font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5'>
              <option value=''>Choose one</option>
              <option value='visible'>Visible</option>
              <option value='invisible'>Invisible</option>
            </select>
          </div>
          <div className='flex gap-3 justify-end'>
            <span className='flex items-center gap-2 border bg-red-600 rounded-[5px] py-1 px-4 font-jakarta text-xs text-white cursor-pointer' onClick={handleCancelDesign}>
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

export default Design