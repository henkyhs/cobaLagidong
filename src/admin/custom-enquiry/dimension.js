import { useState } from 'react'
import { AddButton, MiniButtonWithIcon, SearchBar } from '../../components'
import { uid } from 'uid'

const Dimension = () => {

  const [dimensions, setDimensions] = useState([
    {
      id: 0,
      name: '4 Seater',
      length: 150,
      width: 90,
      diameter: 0,
      typeoftop: 1,
      uniquecode: 'DM-001',
      visibility: 'visible'
    },
    {
      id: 1,
      name: '6 Seater',
      length: 180,
      width: 90,
      diameter: 0,
      typeoftop: 1,
      uniquecode: 'DM-001',
      visibility: 'visible'
    },
    {
      id: 2,
      name: '2 Seater',
      length: 0,
      width: 0,
      diameter: 80,
      typeoftop: 0,
      uniquecode: 'DM-001',
      visibility: 'visible'
    }
  ])
  const [isOpenFormDimension, setIsOpenFormDimension] = useState(false)
  const [formDimension, setFormDimension] = useState({
    name: '',
    length: '',
    width: '',
    diameter: '',
    typeoftop: '',
    visibility: ''
  })
  const [isDimensionUpdate, setIsDimensionUpdate] = useState({
    id: null,
    status: false
  })
  function handleChangeDimension(e) {
    let data = {...formDimension}
    data[e.target.name] = e.target.value
    setFormDimension(data)
  }
  function handleSubmitDimension(e) {
    e.preventDefault()
    alert('Data Successfully')
    setIsOpenFormDimension(false)
    let data = [...dimensions]

    if( formDimension.name === '' |  
        formDimension.length === '' |
        formDimension.width === '' |
        formDimension.diameter === '' |
        formDimension.typeoftop === '' |
        formDimension.visibility === ''
    ) {
      setIsOpenFormDimension(true)
      return false
    } 

    if (isDimensionUpdate.status) {
      data.forEach((dimension) => {
        if (dimension.id === isDimensionUpdate.id) {
          dimension.name = formDimension.name
          dimension.length = formDimension.length
          dimension.width = formDimension.width
          dimension.diameter = formDimension.diameter
          dimension.typeoftop = formDimension.typeoftop
          dimension.visibility = formDimension.visibility
        }
      })
    } else {
      data.push({ 
        id: uid(), 
        name: formDimension.name,
        length: formDimension.length,
        width: formDimension.width,
        diameter: formDimension.diameter,
        uniquecode: 'P-000',
        typeoftop: formDimension.typeoftop,
        visibility: formDimension.visibility 
      })
    }
    // menambah dimension
    setDimensions(data)
    setFormDimension({
      name: '',
      length: '',
      width: '',
      diameter: '',
      typeoftop: '',
      visibility: ''
    })
    setIsDimensionUpdate({
      id: null,
      status: false
    })
  }
  function handleEditDimension(id) {
    setIsOpenFormDimension(true)
    let data = [...dimensions]
    let foundData = data.find((dimension) => dimension.id === id)

    setFormDimension({
      name: foundData.name,
      length: foundData.length,
      width: foundData.width,
      diameter: foundData.diameter,
      typeoftop: foundData.typeoftop,
      visibility: foundData.visibility
    })
    setIsDimensionUpdate({
      id: id,
      status: true
    })
  }
  function handleCancelDimension() {
    setIsOpenFormDimension(false)
    setFormDimension({
      name: '',
      length: '',
      width: '',
      diameter: '',
      typeoftop: '',
      visibility: ''
    })
  }
  function handleDeleteDimension(id) {
    const answer = window.confirm('Are you sure to delete this dimension?')
    if(answer) {
      const filteredDimensions = dimensions.filter(function(dimension) {
        return dimension.id !== id
      })
      setDimensions(filteredDimensions)
    } else {
      alert('Cancelled')
    }
  }

  return (
    <div>
      <>
        <div className='flex sm:flex-row flex-col gap-5 sm:items-center items-start mb-6'>
          <SearchBar />
          <AddButton name='Add Dimension' action={() => setIsOpenFormDimension(true)} />
        </div>

        <div className='overflow-x-auto scrollbar-custom bg-white overflow-hidden'>
          <table className='sm:w-full w-max border border-black'>
            <thead>
              <tr className='text-center font-jakarta lg:text-base md:text-sm text-xs font-bold text-white bg-primary'>
                <th className='p-2'>No</th>
                <th className='p-2'>Name</th>
                <th className='p-2'>Length</th>
                <th className='p-2'>Width</th>
                <th className='p-2'>Diameter</th>
                <th className='p-2'>Type of Top</th>
                <th className='p-2'>Unique Code</th>
                <th className='p-2'>Visibility</th>
                <th className='p-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {dimensions.map(function(dimension, index) {
              return (
                <tr className='border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal' key={index}>
                  <td className='p-2'>{index + 1}</td>
                  <td className='p-2'>{dimension.name}</td>
                  <td className='p-2'>{dimension.length}</td>
                  <td className='p-2'>{dimension.width}</td>
                  <td className='p-2'>{dimension.diameter}</td>
                  <td className='p-2'>{dimension.typeoftop == 0 ? 'No Corner' : 'Have Corner'}</td>
                  <td className='p-2'>{dimension.uniquecode}</td>
                  <td className='p-2'><img className='block m-auto' src={dimension.visibility == 'visible' ? '/assets/icons/IconVisible.svg' : '/assets/icons/IconInvisible.svg'} alt='' /></td>
                  <td className='p-2'>
                    <div className='flex gap-1 flex-wrap justify-center'>
                      <MiniButtonWithIcon colorBorder='primary' colorBg='primary' colorText='white' action={() => handleEditDimension(dimension.id)} img='/assets/icons/IconEdit.svg' name='Edit' />
                      <button className='flex items-center gap-1  bg-red-600 rounded-[5px] py-1 px-2 font-jakarta text-xs text-white' onClick={() => handleDeleteDimension(dimension.id)}><img src='/assets/icons/IconClose.svg' name='Delete' />Delete</button>
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </>
      
      {/* FORM PATTERN */}
      <div className={'fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 ' + (isOpenFormDimension === true ? 'opacity-100 visible' : 'opacity-0 invisible')}>
        <form className={'fixed h-auto xl:w-[35%] sm:w-[50%] w-[85%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 md:p-10 p-5 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom ' + (isOpenFormDimension === true ? 'opacity-100 visible' : 'opacity-0 invisible')} onSubmit={handleSubmitDimension}>
          <p className='font-jakarta md:text-sm text-xs font-bold mb-3'>Note: If <span className='text-primary underline'>type of top</span> is <span className='text-primary underline'>have corner</span>, please set <span className='text-primary underline'>diameter</span> is <span className='text-primary underline'>0</span>. And if <span className='text-primary underline'>type of top</span> is <span className='text-primary underline'>no corner</span>, please set <span className='text-primary underline'>length</span> and <span className='text-primary underline'>width</span> is <span className='text-primary underline'>0</span></p>
          <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Name*</span> 
            <input
              required
              type='text'
              value={formDimension.name}
              name='name'
              placeholder='Input Top Name'
              onChange={handleChangeDimension}
              className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
            />
          </label>
          <div className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Type of Top*</span>
            <select
              required
              name='typeoftop'
              value={formDimension.typeoftop}
              onChange={handleChangeDimension}
              className='font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5'>
              <option value=''>Choose one</option>
              <option value={1}>Have corner</option>
              <option value={0}>No corner</option>
            </select>
          </div>
          <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3 relative'>
            <span>Length*</span> 
            <input
              required
              type='text'
              value={formDimension.length}
              name='length'
              placeholder='Input the length'
              onChange={handleChangeDimension}
              className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
            />
            <span className='absolute inset-y-0 right-0 flex items-center px-4 font-bold text-white bg-slate-700 rounded-tr-lg rounded-br-lg'>cm</span>
          </label>
          <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3 relative'>
            <span>Width*</span> 
            <input
              required
              type='text'
              value={formDimension.width}
              name='width'
              placeholder='Input the width'
              onChange={handleChangeDimension}
              className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
            />
            <span className='absolute inset-y-0 right-0 flex items-center px-4 font-bold text-white bg-slate-700 rounded-tr-lg rounded-br-lg'>cm</span>
          </label>
          <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3 relative'>
            <span>Diameter*</span> 
            <input
              required
              type='text'
              value={formDimension.diameter}
              name='diameter'
              placeholder='Input the diameter'
              onChange={handleChangeDimension}
              className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
            />
            <span className='absolute inset-y-0 right-0 flex items-center px-4 font-bold text-white bg-slate-700 rounded-tr-lg rounded-br-lg'>cm</span>
          </label>
          <div className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Visibility*</span>
            <select
              required
              name='visibility'
              value={formDimension.visibility}
              onChange={handleChangeDimension}
              className='font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5'>
              <option value=''>Choose one</option>
              <option value='visible'>visible</option>
              <option value='invisible'>invisible</option>
            </select>
          </div>
          <div className='flex gap-3 justify-end'>
          <span className='flex items-center gap-2 border bg-red-600 rounded-[5px] py-1 px-4 font-jakarta text-xs text-white cursor-pointer'  onClick={handleCancelDimension}>
              <img src='/assets/icons/IconClose.svg' alt='Cancel' />
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

export default Dimension