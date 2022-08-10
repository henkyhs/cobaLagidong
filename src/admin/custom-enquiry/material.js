import { useState } from 'react'
import { AddButton, MiniButtonWithIcon, SearchBar } from '../../components'
import { uid } from 'uid'

const Material = () => {

  const [materials, setMaterials] = useState([
    {      
      id: 0,
      name: 'Steel',
      uniquecode: 'M-001',
      visibility: 'visible'
    },
    {      
      id: 0,
      name: 'Stainless Steel',
      uniquecode: 'M-002',
      visibility: 'visible'
    }
  ])
  const [isOpenFormMaterial, setIsOpenFormMaterial] = useState(false)
  const [formMaterial, setFormMaterial] = useState({
    name: '',
    visibility: ''
  })
  const [isMaterialUpdate, setIsMaterialUpdate] = useState({
    id: null,
    status: false
  })
  function handleChangeMaterial(e) {
    let data = {...formMaterial}
    data[e.target.name] = e.target.value
    setFormMaterial(data)
  }
  function handleSubmitMaterial(e) {
    e.preventDefault()
    alert('Data Successfully')
    setIsOpenFormMaterial(false)
    let data = [...materials]

    if( formMaterial.name === '' | 
        formMaterial.visibility === ''
    ) {
      setIsOpenFormMaterial(true)
      return false
    } 

    if (isMaterialUpdate.status) {
      data.forEach((material) => {
        if (material.id === isMaterialUpdate.id) {
          material.name = formMaterial.name
          material.visibility = formMaterial.visibility
        }
      })
    } else {
      data.push({ 
        id: uid(), 
        name: formMaterial.name,
        uniquecode: 'P-000',
        visibility: formMaterial.visibility 
      })
    }
    // menambah material
    setMaterials(data)
    setFormMaterial({
      name: '',
      visibility: ''
    })
    setIsMaterialUpdate({
      id: null,
      status: false
    })
  }
  function handleEditMaterial(id) {
    setIsOpenFormMaterial(true)
    let data = [...materials]
    let foundData = data.find((material) => material.id === id)

    setFormMaterial({
      name: foundData.name,
      visibility: foundData.visibility
    })
    setIsMaterialUpdate({
      id: id,
      status: true
    })
  }
  function handleCancelMaterial() {
    setIsOpenFormMaterial(false)
    setFormMaterial({
      name: '',
      visibility: ''
    })
  }
  function handleDeleteMaterial(id) {
    const answer = window.confirm('Are you sure to delete this material?')
    if(answer) {
      const filteredMaterials = materials.filter(function(material) {
        return material.id !== id
      })
      setMaterials(filteredMaterials)
    } else {
      alert('Cancelled')
    }
  }

  return (
    <div>
      <>
        <div className='flex sm:flex-row flex-col gap-5 sm:items-center items-start mb-6'>
          <SearchBar />
          <AddButton name='Add Material' action={() => setIsOpenFormMaterial(true)} />
        </div>

        <div className='overflow-x-auto scrollbar-custom bg-white overflow-hidden'>
          <table className='sm:w-full w-max border border-black'>
            <thead>
              <tr className='text-center font-jakarta lg:text-base md:text-sm text-xs font-bold text-white bg-primary'>
                <th className='p-2'>No</th>
                <th className='p-2'>Name</th>
                <th className='p-2'>Unique Code</th>
                <th className='p-2'>Visible</th>
                <th className='p-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {materials.map(function(material, index) {
              return (
                <tr className='border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal' key={index}>
                  <td className='p-2'>{index + 1}</td>
                  <td className='p-2'>{material.name}</td>
                  <td className='p-2'>{material.uniquecode}</td>
                  <td className='p-2'><img className='block m-auto' src={material.visibility == 'visible' ? '/assets/icons/IconVisible.svg' : '/assets/icons/IconInvisible.svg'} alt='' /></td>
                  <td className='p-2'>
                    <div className='flex gap-1 flex-wrap justify-center'>
                      <MiniButtonWithIcon colorBorder='primary' colorBg='primary' colorText='white' action={() => handleEditMaterial(material.id)} img='/assets/icons/IconEdit.svg' name='Edit' />
                      <button className='flex items-center gap-1  bg-red-600 rounded-[5px] py-1 px-2 font-jakarta text-xs text-white' onClick={() => handleDeleteMaterial(material.id)}><img src='/assets/icons/IconClose.svg' name='Delete' />Delete</button>
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </>
      
      {/* FORM PATTERN */}
      <div className={'fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 ' + (isOpenFormMaterial === true ? 'opacity-100 visible' : 'opacity-0 invisible')}>
        <form className={'fixed h-auto xl:w-[35%] sm:w-[50%] w-[85%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 md:p-10 p-5 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom ' + (isOpenFormMaterial === true ? 'opacity-100 visible' : 'opacity-0 invisible')} onSubmit={handleSubmitMaterial}>
          <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Name*</span> 
            <input
              required
              type='text'
              value={formMaterial.name}
              name='name'
              placeholder='Input Leg Material Name'
              onChange={handleChangeMaterial}
              className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
            />
          </label>
          <div className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Visibility*</span>
            <select
              required
              name='visibility'
              value={formMaterial.visibility}
              onChange={handleChangeMaterial}
              className='font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5'>
              <option value=''>Choose one</option>
              <option value='visible'>Visible</option>
              <option value='invisible'>Invisible</option>
            </select>
          </div>
          <div className='flex gap-3 justify-end'>
            <span className='flex items-center gap-2 border bg-red-600 rounded-[5px] py-1 px-4 font-jakarta text-xs text-white cursor-pointer' onClick={handleCancelMaterial}>
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

export default Material