import { useState, useEffect } from 'react'
import { AddButton, MiniButtonWithIcon, SearchBar } from '../../components'
import { formatRupiah } from '../../utils'
import axios from 'axios'
import * as constants from '../../constants'
import ReactPaginate from "react-paginate";

const base_url = constants.base_url

const Edge = () => {

  const [edges, setEdges] = useState([])
  const [isOpenFormEdge, setIsOpenFormEdge] = useState(false)
  const [page, setPage] = useState(0)
  const [pages, setPages] = useState(0)
  const [rows, setRows] = useState(0)
  const [keyword, setKeyword] = useState("")
  const [limit, setLimit] = useState(5)
  const [query, setQuery] = useState("")
  const [formEdge, setFormEdge] = useState({
    name : ''
  })
  const [isEdgeUpdate, setIsEdgeUpdate] = useState({
    id: null,
    status: false
  })
  async function tableOfEdge() {
    const response = await axios.get(base_url+`/edges/get-edges?search_query=${keyword}&page=${page}&limit=${limit}`)
    console.log(response.data)
    setEdges(response.data.data.result)
    setPage(response.data.data.page);
    setPages(response.data.data.totalPage);
    setRows(response.data.data.totalRows);
  }
  useEffect(function() {
    tableOfEdge()
  }, [page, keyword])

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const caridong = async(e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  }
  function handleChangeEdge(e) {
    let data = {...formEdge}
    data[e.target.name] = e.target.value
    setFormEdge(data)
  }
  async function handleSubmitEdge(e) {
    e.preventDefault()
    setIsOpenFormEdge(false)
    let data = [...edges]

    if( formEdge.name === '' 
    ) {
      setIsOpenFormEdge(true)
      return false
    } 

    let newData = { 
      name : formEdge.name
    }

    if (isEdgeUpdate.status) {
      data.forEach((edge) => {
        if (edge.id === isEdgeUpdate.id) {
          edge.name = formEdge.name
        }
      })
      try {
        const response = await axios.put(base_url + '/edges/update-edges/' + isEdgeUpdate.id, newData)
        if(response.data.success) {
          alert(response.data.message)
        } else {
          alert(response.data.message)
        }
      } catch (err) {
        console.log("response", err) 
        alert('Maaf, data gagal diedit')
      }
    } else {
      try {
        const response = await axios.post(base_url+'/edges/add-edges', newData)
        console.log("response", response) 
        if(response.data.success) {
          alert(response.data.message)
        } else {
          alert(response.data.message)
        }
      } catch (err) {
        console.log("response", err) 
        alert('Maaf, data gagal diinput')
      }
    }
    tableOfEdge()
    setFormEdge({
      name : ''
    })
    setIsEdgeUpdate({
      id: null,
      status: false
    })
  }
  function handleEditEdge(id) {
    setIsOpenFormEdge(true)
    let data = [...edges]
    let foundData = data.find((edge) => edge.id === id)

    setFormEdge({
      name: foundData.name
    })
    setIsEdgeUpdate({
      id: id,
      status: true
    })
  }
  function handleCancelEdge() {
    setIsOpenFormEdge(false)
    setFormEdge({
      name : ''
    })
  }
  async function handleDeleteEdge(id) {
    const answer = window.confirm('Are you sure to delete this edge?')
    if(answer) {
      try {
        const response = await axios.delete(base_url + '/edges/delete-edges/' + id)
        console.log("response", response) 
        alert('Berhasil dihapus')
      } catch (err) {
        console.log("response", err) 
        alert('Maaf, data gagal dihapus')
      }
      tableOfEdge()
    } else {
      alert('Cancelled')
    }
  }

  return (
    <div>
      <>
        <div className='flex sm:flex-row flex-col gap-5 sm:items-center items-start mb-6'>
          <SearchBar value={query} actionChage={(e) => setQuery(e.target.value)} action={caridong} />
          <AddButton name='Add Edge' action={() => setIsOpenFormEdge(true)} />
        </div>

        <div className='overflow-x-auto scrollbar-custom bg-white overflow-hidden mb-3'>
          <table className='sm:w-full w-max border border-black'>
            <thead>
              <tr className='text-center font-jakarta lg:text-base md:text-sm text-xs font-bold text-white bg-primary'>
                <th className='p-2'>No</th>
                <th className='p-2'>Name</th>
                <th className='p-2'>Unique Code</th>
                <th className='p-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {edges.map(function(edge, index) {
              return (
                <tr className='border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal' key={index}>
                  <td className='p-2'>{index + 1}</td>
                  <td className='p-2'>{edge.name}</td>
                  <td className='p-2'>{edge.code}</td>
                  <td className='p-2'>
                    <div className='flex gap-1 flex-wrap justify-center'>
                      <MiniButtonWithIcon colorBorder='primary' colorBg='primary' colorText='white' action={() => handleEditEdge(edge.id)} img='/assets/icons/IconEdit.svg' name='Edit' />
                      <button className='flex items-center gap-1  bg-red-600 rounded-[5px] py-1 px-2 font-jakarta text-xs text-white' onClick={() => handleDeleteEdge(edge.id)}><img src='/assets/icons/IconClose.svg' name='Delete' />Delete</button>
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
      
      {/* FORM EDGE */}
      <div className={'fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 ' + (isOpenFormEdge === true ? 'opacity-100 visible' : 'opacity-0 invisible')}>
        <form className={'fixed h-auto xl:w-[35%] sm:w-[50%] w-[85%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 md:p-10 p-5 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom ' + (isOpenFormEdge === true ? 'opacity-100 visible' : 'opacity-0 invisible')} onSubmit={handleSubmitEdge}>
          <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Name*</span> 
            <input
              required
              type='text'
              value={formEdge.name}
              name='name'
              placeholder='Input Top Edge Name'
              onChange={handleChangeEdge}
              className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
            />
          </label>
          <div className='flex gap-3 justify-end'>
            <span className='flex items-center gap-2 border bg-red-600 rounded-[5px] py-1 px-4 font-jakarta text-xs text-white cursor-pointer' onClick={handleCancelEdge}>
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
      {/* FORM EDGE */}
    </div>
  )
}

export default Edge