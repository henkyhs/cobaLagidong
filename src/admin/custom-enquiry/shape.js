import { useState, useEffect } from 'react'
import { AddButton, MiniButtonWithIcon, SearchBar } from '../../components'
import { uid } from 'uid'
import ScaleDimension from './shape-scale-dimension'
import DetailEdge from './shape-detail-edge'
import axios from 'axios'
import * as constants from '../../constants'
import ReactPaginate from "react-paginate";

const base_url = constants.base_url

const Shape = () => {
 
  const [shapes, setShapes] = useState([])
  const [isOpenFormShape, setIsOpenFormShape] = useState(false)
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(5);
  const [query, setQuery] = useState("");

  const [formShape, setFormShape] = useState({
    name: '',
    type: '',
    is_visible: ''
  })
  const [isShapeUpdate, setIsShapeUpdate] = useState({
    id: null,
    status: false
  })  

  useEffect(function() {
    async function tableOfShape() {
      const response = await axios.get(base_url+`/top/get-top?search_query=${keyword}&page=${page}&limit=${limit}`)
      // console.log(response.data)
      setShapes(response.data.data.result)
      setPage(response.data.data.page);
      setPages(response.data.data.totalPage);
      setRows(response.data.data.totalRows);
    }
    tableOfShape()
  }, [page, keyword, formShape])

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const caridong = async(e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  }

  function handleChangeShape(e) {
    let data = {...formShape}
    data[e.target.name] = e.target.value
    setFormShape(data)
  }
  async function handleSubmitShape(e) {
    e.preventDefault()
    setIsOpenFormShape(false)
    let data = [...shapes]

    if( formShape.name === '' | 
        formShape.type === '' |
        formShape.is_visible === ''
    ) {
      setIsOpenFormShape(true)
      return false
    } 

    let newData = { 
      name: formShape.name,
      type: formShape.type,
      is_visible: formShape.is_visible
    }

    if (isShapeUpdate.status) {
      data.forEach((shape) => {
        if (shape.id === isShapeUpdate.id) {
          shape.name = formShape.name
          shape.type = formShape.type
          shape.is_visible = formShape.is_visible
        }
      })
      try {
        const response = await axios.put(base_url + '/top/update-top/' + isShapeUpdate.id, newData)
        if(response.data.success) {
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
      } catch (err) {
        console.log("response", err) 
        alert('Maaf, data gagal diedit')
      }
    } else {
      try {
        const response = await axios.post(base_url+'/top/add-top', newData)
        console.log("response", response) 
        alert('Berhasil disimpan')
      } catch (err) {
        console.log("response", err) 
        alert('Maaf, data gagal diinput')
      }
      // await axios.post(base_url+'/top/add-top', newData).then((response) => {
      //   alert('berhasil disimpan')
      // })
    }
    setFormShape({
      name: '',
      type: '',
      is_visible: ''
    })
    setIsShapeUpdate({
      id: null,
      status: false
    })
  }
  function handleEditShape(id) {
    setIsOpenFormShape(true)
    let data = [...shapes]
    let foundData = data.find((shape) => shape.id === id)

    setFormShape({
      name: foundData.name,
      type: foundData.type,
      is_visible: foundData.is_visible
    })
    setIsShapeUpdate({
      id: id,
      status: true
    })
  }
  function handleCancelShape() {
    setIsOpenFormShape(false)
    setFormShape({
      name: '',
      type: '',
      is_visible: ''
    })
  }
  async function handleDeleteShape(id) {
    const answer = window.confirm('Are you sure to delete this shape?')
    if(answer) {
      try {
        const response = await axios.delete(base_url + '/top/delete-top/' + id)
        console.log("response", response) 
        alert('Berhasil dihapus')
      } catch (err) {
        console.log("response", err) 
        alert('Maaf, data gagal dihapus')
      }
      const response = await axios.get(base_url+`/top/get-top?search_query=${keyword}&page=${page}&limit=${limit}`)
      setShapes(response.data.data.result)
      setPage(response.data.data.page);
      setPages(response.data.data.totalPage);
      setRows(response.data.data.totalRows);
    } else {
      alert('Cancelled')
    }
  }

  // EDGE
  const [isOpenDetailEdge, setIsOpenDetailEdge] = useState(false)
  const [isOpenFormDetailEdge, setIsOpenFormDetailEdge] = useState(false)
  const [selectedTabScaleEdge, setSelectedTabScaleEdge] = useState()  
  const [edges, setEdges] = useState([])
  const [selectedShape, setSelectedShape] = useState()
  function handleDetailEdge(id) {
    setIsOpenDetailEdge(true)
    let data = [...shapes]
    let foundData = data.find((shape) => shape.id === id)
    setSelectedShape(foundData.name)

    const tableOfEdge = async () => {
      const response = await axios.get(base_url+'/topthreed/get-by-top/' + id)
      setEdges(response.data.data)
    }
    tableOfEdge()
  }
  function handleCancelDetailEdge() {
    setIsOpenDetailEdge(false)
    setEdges([])
  } 
  // mulai
  const [formEdge, setFormEdge] = useState({
    id_master_top: '',
    Edge: {
      name: ''
    },
    three_d_file: '',
    is_visible: ''
  })
  const [isEdgeUpdate, setIsEdgeUpdate] = useState({
    id: null,
    status: false
  })  
  // useEffect(function() {
  //   async function tableOfEdge() {
  //     const response = await axios.get(base_url+'/top')
  //     setEdges(response.data.data)
  //   }
  //   tableOfEdge()
  // }, [])
  function handleChangeEdge(e) {
    let data = {...formEdge}
    if (e.target.value) {
      data[e.target.name] = e.target.value
    } else {
      data[e.target.name] = URL.createObjectURL(e.target.files[0])
    }
    setFormEdge(data)
  }
  function handleSubmitEdge(e) {
    e.preventDefault()
    alert('Data Successfully')
    setIsOpenFormDetailEdge(false)
    let data = [...edges]

    if( formEdge.id_master_top === '' | 
        formEdge.Edge.name === '' |
        formEdge.three_d_file === '' |
        formEdge.is_visible === ''
    ) {
      setIsOpenFormDetailEdge(true)
      return false
    } 

    if (isEdgeUpdate.status) {
      data.forEach((edge) => {
        if (edge.id === isEdgeUpdate.id) {
          edge.id_master_top = formEdge.id_master_top
          edge.Edge.name = formEdge.Edge.name
          edge.three_d_file = formEdge.three_d_file
          edge.is_visible = formEdge.is_visible
        }
      })

      axios.put(base_url+`/top/${isEdgeUpdate.id}`, {
        id_master_top: formEdge.id_master_top,
        Edge: {
          name: formEdge.Edge.name
        },
        three_d_file: formEdge.three_d_file,
        is_visible: formEdge.is_visible
      }).then((response) => {
        alert('berhasil diedit')
      })
    } else {
      let newData = { 
        id: uid(),
        id_master_top: formEdge.id_master_top,
        id_master_edge: uid(),
        is_visible: formEdge.is_visible,
        three_d_file: formEdge.three_d_file,
        createdAt: null,
        updatedAt: null,
        Edge: {
          id: uid(),
          name: formEdge.Edge.name,
          code: null,
          createdAt: "",
          updatedAt: ""
        }
      }
      data.push(newData)
      axios.post(base_url+'/top', newData).then((response) => {
        alert('berhasil disimpan')
      })
    }
    // menambah edge
    setEdges(data)
    setFormEdge({
      id_master_top: '',
      Edge: {
        name: ''
      },
      three_d_file: '',
      is_visible: ''
    })
    setIsEdgeUpdate({
      id: null,
      status: false
    })
  }
  function handleEditEdge(id) {
    setIsOpenFormDetailEdge(true)
    let data = [...edges]
    let foundData = data.find((edge) => edge.id === id)

    setFormEdge({
      id_master_top: foundData.id_master_top,
      Edge: {
        name: foundData.Edge.name
      },
      three_d_file: foundData.three_d_file,
      is_visible: foundData.is_visible
    })
    setIsEdgeUpdate({
      id: id,
      status: true
    })
  }
  function handleCancelEdge() {
    setIsOpenFormDetailEdge(false)
    setFormEdge({
      id_master_top: '',
      Edge: {
        name: ''
      },
      three_d_file: '',
      is_visible: ''
    })
  }
  function handleDeleteEdge(id) {
    const answer = window.confirm('Are you sure to delete this edge?')
    if(answer) {
      const filteredEdges = edges.filter(function(edge) {
        return edge.id !== id
      })
      axios.delete(base_url+`/top/${id}`).then((response) => {
        alert('berhasil dihapus')
      })
      setEdges(filteredEdges)
    } else {
      alert('Cancelled')
    }
  }

  // DIMENSION
  const [isOpenFormScaleDimension, setIsOpenFormScaleDimension] = useState(false)
  const [selectedTabScaleDimension, setSelectedTabScaleDimension] = useState()
  const [dimensions, setDimensions] = useState([])
  const [selectedType, setSelectedType] = useState()
  function handleScaleDimension(id, type) {
    setIsOpenFormScaleDimension(true)
    let data = [...shapes]
    let foundData = data.find((shape) => shape.id === id)
    setSelectedShape(foundData.name)
    setSelectedType(type)

    const tableOfEdge = async () => {
      const response = await axios.get(base_url+'/topthreed/get-by-top/' + id)
      setEdges(response.data.data)
    }
    tableOfEdge()

    const tableOfDimension = async () => {
      const response = await axios.get(base_url+'/seaters/get-by-type/' + id)
      setDimensions(response.data.data)
    }
    tableOfDimension()
  }

  const [selectedThreeD, setSelectedThreeD] = useState()
  function handleTabScaleDimension(id, three_d_file) {
    setSelectedTabScaleEdge(id)
    setSelectedThreeD(three_d_file)
  }
  function handleCancelScaleDimension() {
    setIsOpenFormScaleDimension(false)
    setEdges([])
    setSelectedTabScaleEdge()
    setSelectedThreeD()
    setDimensions([])
  }

  const [scaleTX, setScaleTX] = useState(1)
  const [scaleTY, setScaleTY] = useState(1)
  const [scaleTZ, setScaleTZ] = useState(1)
  const [positionTX, setPositionTX] = useState(1)
  const [positionTY, setPositionTY] = useState(1)
  const [positionTZ, setPositionTZ] = useState(1)
  function handleTabFormScaleDimension(id) {
    setSelectedTabScaleDimension(id)
    
    const tableOfScaleT = async () => {
      const response = await axios.get(base_url+'/topscale/get-top-scale-by-seaters-top/' + id + '/' + selectedType)
      setScaleTX(response.data.data.scale_x)
      setScaleTY(response.data.data.scale_y)
      setScaleTZ(response.data.data.scale_z)
    }
    tableOfScaleT()

    const tableOfPositionT = async () => {
      const response = await axios.get(base_url+'/topposition/get-top-position-by-seaters-top/' + id + '/' + selectedType)
      setPositionTX(response.data.data.position_x)
      setPositionTY(response.data.data.position_y)
      setPositionTZ(response.data.data.position_z)
    }
    tableOfPositionT()
  }

  return (
    <div>
      <>
        <div className='flex sm:flex-row flex-col gap-5 sm:items-center items-start mb-6'>
          <SearchBar value={query} actionChage={(e) => setQuery(e.target.value)} action={caridong} />
          <AddButton name='Add Shape' action={() => setIsOpenFormShape(true)} />
        </div>

        <div className='overflow-x-auto scrollbar-custom bg-white overflow-hidden mb-3'>
          <table className='sm:w-full w-max border border-black'>
            <thead>
              <tr className='text-center font-jakarta lg:text-base md:text-sm text-xs font-bold text-white bg-primary'>
                <th className='p-2'>No</th>
                <th className='p-2'>Name</th>
                <th className='p-2'>Have Corner</th>
                <th className='p-2'>Unique Code</th>
                <th className='p-2'>Visibility</th>
                <th className='p-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {shapes.map(function(shape, index) {
              return (
                <tr className='border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal' key={index}>
                  <td className='p-2'>{index + 1}</td>
                  <td className='p-2'>{shape.name}</td>
                  <td className='p-2'>{shape.type == 0 ? 'No' : 'Yes'}</td>
                  <td className='p-2'>{shape.code}</td>
                  <td className='p-2'><img className='block m-auto' src={shape.is_visible == 1 ? '/assets/icons/IconVisible.svg' : '/assets/icons/IconInvisible.svg'} alt='' /></td>
                  <td className='p-2'>
                    <div className='flex gap-1 flex-wrap justify-center'>
                      <MiniButtonWithIcon colorBorder='black' colorBg='black' colorText='white' action={() => handleDetailEdge(shape.id)} cssImg='scale-[60%]' img='/assets/icons/IconEdge.svg' name='Edge' />
                      <MiniButtonWithIcon colorBorder='black' colorBg='black' colorText='white' action={() => handleScaleDimension(shape.id, shape.type)} cssImg='scale-[55%]' img='/assets/icons/IconScale.svg' name='Scale' />
                      <MiniButtonWithIcon colorBorder='primary' colorBg='primary' colorText='white' action={() => handleEditShape(shape.id)} img='/assets/icons/IconEdit.svg' name='Edit' />
                      <MiniButtonWithIcon colorBorder='primary' colorBg='white' colorText='primary' action={() => handleDeleteShape(shape.id)} img='/assets/icons/IconClosePrimary.svg' name='Delete' />
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>

        <p>
          Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
        </p>
        <nav
          key={rows}
          role="navigation"
          aria-label="pagination"
        >
          <ReactPaginate
            previousLabel={"< Prev"}
            nextLabel={"Next >"}
            breakLabel={"..."}
            pageCount={pages}
            pageRangeDisplayed={2}
            onPageChange={changePage}
            containerClassName={"flex items-center justify-center"}
            pageClassName={"px-2 py-1 border border-white ml-[-1px]"}
            activeClassName={"px-2 py-1 border border-white ml-[-1px] bg-primary text-white"}
            pageLinkClassName={"page-link"}
            previousClassName={"px-2 py-1 border border-white rounded-l-lg bg-primary text-white"} 
            nextClassName={"px-2 py-1 border border-white ml-[-1px] rounded-r-lg bg-primary text-white"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
          />
        </nav>
      </>
      
      {/* FORM SHAPE */}
      <div className={'fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 ' + (isOpenFormShape === true ? 'opacity-100 visible' : 'opacity-0 invisible')}>
        <form className={'fixed h-auto xl:w-[35%] sm:w-[50%] w-[85%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 md:p-10 p-5 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom ' + (isOpenFormShape === true ? 'opacity-100 visible' : 'opacity-0 invisible')} onSubmit={handleSubmitShape} method='post'>
          <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Name*</span> 
            <input
              required
              type='text'
              value={formShape.name}
              name='name'
              placeholder='Input the name'
              onChange={handleChangeShape}
              className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
            />
          </label>
          <div className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Have a corner ?*</span>
            <select
              required
              name='type'
              value={formShape.type}
              onChange={handleChangeShape}
              className='font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5'>
              <option value=''>Choose one</option>
              <option value={1}>yes</option>
              <option value={0}>no</option>
            </select>
          </div>
          <div className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Visibility*</span>
            <select
              required
              name='is_visible'
              value={formShape.is_visible}
              onChange={handleChangeShape}
              className='font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5'>
              <option value=''>Choose one</option>
              <option value={1}>visible</option>
              <option value={0}>invisible</option>
            </select>
          </div>
          <div className='flex gap-3 justify-end'>
            <span className='flex items-center gap-2 border border-primary rounded-[5px] py-1 px-4 font-jakarta text-xs text-primary cursor-pointer' onClick={handleCancelShape}>
              <img src='/assets/icons/IconClosePrimary.svg' alt='' />
              <p>Cancel</p>
            </span> 
            <button className='flex items-center gap-2 border border-primary bg-primary rounded-[5px] py-1 px-4 font-jakarta text-xs text-white' type='submit'>
              <img className='scale-[65%]' src='/assets/icons/IconCheckWhite.svg' alt='' />
              <p>Save</p>
            </button>
          </div>
        </form>
      </div>
      {/* FORM SHAPE */}

      {/* FORM SHAPE: SCALE DIMENSION */}
      <div className={'fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 ' + (isOpenFormScaleDimension === true ? 'opacity-100 visible' : 'opacity-0 invisible')}>
        <form className={'fixed h-auto xl:w-[60%] sm:w-[75%] w-[95%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 md:p-10 p-5 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom ' + (isOpenFormScaleDimension === true ? 'opacity-100 visible' : 'opacity-0 invisible')} onSubmit=''>
          <div className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Name*</span> 
            <span>{selectedShape}</span>
          </div>
          <div className='h-[100px] aspect-square overflow-hidden block m-auto mb-3'>
            <img className='w-full h-full object-cover' src={selectedThreeD} alt={selectedThreeD} />
          </div>
          <ul className='flex gap-3 justify-center font-jakarta md:text-sm text-xs mb-3'>
            {edges.map(function(edge, index) {
            const three_d_file = edge.three_d_file
                  edge = edge.Edge;  
            return (
              <li className={'px-4 py-1 rounded-[30px] cursor-pointer ' + (selectedTabScaleEdge == edge.id ? 'bg-black text-white' : 'bg-[#FFF3E5]')} onClick={() => handleTabScaleDimension(edge.id, three_d_file)} key={index}>{edge.name}</li>
            )})}
          </ul>
          {selectedTabScaleEdge && (
            <>
              <ul className='flex gap-3 justify-center font-jakarta md:text-sm text-xs mb-3'>
                {dimensions.map(function(dimension, index) { 
                return (
                  <li className={'px-4 py-1 rounded-[30px] cursor-pointer ' + (selectedTabScaleDimension == dimension.id ? 'bg-black text-white' : 'bg-[#FFF3E5]')} onClick={() => handleTabFormScaleDimension(dimension.id)} key={index}>{dimension.name}</li>
                )})}
              </ul>
              {selectedTabScaleDimension && (
                <ScaleDimension valueScaleX={scaleTX} valueScaleY={scaleTY} valueScaleZ={scaleTZ} valuePositionX={positionTX} valuePositionY={positionTY} valuePositionZ={positionTZ} action='' />
              )}
            </>
          )}
          <div className='flex gap-3 justify-end'>
            <span className='flex items-center gap-2 border border-primary rounded-[5px] py-1 px-4 font-jakarta text-xs text-primary cursor-pointer' onClick={handleCancelScaleDimension}>
              <img src='/assets/icons/IconClosePrimary.svg' alt='' />
              <p>Cancel</p>
            </span> 
            <button className='flex items-center gap-2 border border-primary bg-primary rounded-[5px] py-1 px-4 font-jakarta text-xs text-white' type='submit'>
              <img className='scale-[65%]' src='/assets/icons/IconCheckWhite.svg' alt='' />
              <p>Save</p>
            </button>
          </div>
        </form>
      </div>
      {/* FORM SHAPE: SCALE DIMENSION */}

      {/* FORM SHAPE: DETAIL EDGE */}
      <div className={'fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 ' + (isOpenDetailEdge === true ? 'opacity-100 visible' : 'opacity-0 invisible')}>
        <div className={'fixed h-[80%] xl:w-[35%] sm:w-[50%] w-[85%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 md:p-10 p-5 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom ' + (isOpenDetailEdge === true ? 'opacity-100 visible' : 'opacity-0 invisible')}>
          <div className='flex justify-between items-center mb-5'>
            <p className='font-jakarta lg:text-2xl md:text-xl text-lg font-bold'>{selectedShape}</p>
            <img className='cursor-pointer' onClick={handleCancelDetailEdge} src='/assets/icons/IconCloseBlack.svg' />
          </div>
          <AddButton name='Add Edge' action={() => setIsOpenFormDetailEdge(true)}  />
          <div className='overflow-x-auto scrollbar-custom bg-white overflow-hidden mt-3'>
            <table className='sm:w-full w-max border border-black'>
              <thead>
                <tr className='text-center font-jakarta lg:text-base md:text-sm text-xs font-bold text-white bg-primary'>
                  <th className='p-2'>Name</th>
                  <th className='p-2'>Visibility</th>
                  <th className='p-2'>Action</th>
                </tr>
              </thead>
              <tbody>
                {edges.map(function(edge, index) {
                  const is_visible = edge.is_visible
                        // idEdge = edge.id
                        edge = edge.Edge;  
                return (
                  <tr className='border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal bg-[#DBD3D3]' key={index}>
                    <td className='p-2'>{edge.name}</td>
                    <td className='p-2'><img className='block m-auto' src={is_visible == 1 ? '/assets/icons/IconVisible.svg' : '/assets/icons/IconInvisible.svg'} alt='' /></td>
                    <td className='p-2'>
                      <div className='flex gap-1 flex-wrap justify-center'>
                        <MiniButtonWithIcon colorBorder='primary' colorBg='primary' colorText='white' action={() => handleEditEdge(edge.id)} img='/assets/icons/IconEdit.svg' name='Edit' />
                        <MiniButtonWithIcon colorBorder='primary' colorBg='white' colorText='primary' action={() => handleDeleteEdge(edge.id)} img='/assets/icons/IconClosePrimary.svg' name='Delete' />
                      </div>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* FORM SHAPE: DETAIL EDGE */}

      {/* FORM SHAPE: DETAIL EDGE-FORM EDGE */}
      <div className={'fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 ' + (isOpenFormDetailEdge === true ? 'opacity-100 visible' : 'opacity-0 invisible')}>
        <form className={'fixed h-auto xl:w-[35%] sm:w-[50%] w-[85%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 md:p-10 p-5 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom ' + (isOpenFormDetailEdge === true ? 'opacity-100 visible' : 'opacity-0 invisible')} onSubmit={handleSubmitEdge} method='post'>
          <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Name*</span> 
            <input
              required
              type='text'
              value={formEdge.id_master_top}
              name='id_master_top'
              placeholder='Input the id_master_top'
              onChange={handleChangeEdge}
              className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
            />
          </label>
          <div className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Edge*</span>
            <select
              required
              name='name'
              value={formEdge.Edge.name}
              onChange={handleChangeEdge}
              className='font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5'>
              <option value=''>Choose one</option>
              <option value='Slim'>slim</option>
              <option value='Normal'>normal</option>
              <option value='Beveled'>beveled</option>
            </select>
          </div>
          <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Upload GLTF*</span> 
            <input
              required
              type='file'
              name='three_d_file'
              onChange={handleChangeEdge}
              accept='image/* '
              className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
            />
          </label>
          <div className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Visibility*</span>
            <select
              required
              name='is_visible'
              value={formEdge.is_visible}
              onChange={handleChangeEdge}
              className='font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5'>
              <option value=''>Choose one</option>
              <option value={1}>visible</option>
              <option value={0}>invisible</option>
            </select>
          </div>
          <div className='flex gap-3 justify-end'>
            <span className='flex items-center gap-2 border border-primary rounded-[5px] py-1 px-4 font-jakarta text-xs text-primary cursor-pointer' onClick={handleCancelEdge}>
              <img src='/assets/icons/IconClosePrimary.svg' alt='' />
              <p>Cancel</p>
            </span> 
            <button className='flex items-center gap-2 border border-primary bg-primary rounded-[5px] py-1 px-4 font-jakarta text-xs text-white' type='submit'>
              <img className='scale-[65%]' src='/assets/icons/IconCheckWhite.svg' alt='' />
              <p>Save</p>
            </button>
          </div>
        </form>
      </div>
      {/* FORM SHAPE: DETAIL EDGE-FORM EDGE */}
    </div>
  )
}

export default Shape