import { useState, useEffect } from 'react'
import { AddButton, MiniButtonWithIcon, SearchBar } from '../../components'
import { formatRupiah } from '../../utils'
import axios from 'axios'
import * as constants from '../../constants'
import ReactPaginate from "react-paginate";

const base_url = constants.base_url

const Pattern = () => {

  const [patterns, setPatterns] = useState([])
  const [isOpenFormPattern, setIsOpenFormPattern] = useState(false)
  const [page, setPage] = useState(0)
  const [pages, setPages] = useState(0)
  const [rows, setRows] = useState(0)
  const [keyword, setKeyword] = useState("")
  const [limit, setLimit] = useState(5)
  const [query, setQuery] = useState("")
  const [formPattern, setFormPattern] = useState({
    name : '',
    id_kategori : '',
    panjang : '',
    lebar : '',
    harga_per_meter : '',
    is_visible : '',
    texture : ''
  })
  const [isPatternUpdate, setIsPatternUpdate] = useState({
    id: null,
    status: false
  })
  async function tableOfPattern() {
    const response = await axios.get(base_url+`/texture/get-texture?search_query=${keyword}&page=${page}&limit=${limit}`)
    console.log(response.data)
    setPatterns(response.data.data.result)
    setPage(response.data.data.page);
    setPages(response.data.data.totalPage);
    setRows(response.data.data.totalRows);
  }
  useEffect(function() {
    tableOfPattern()
  }, [page, keyword])

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const caridong = async(e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  }
  function handleChangePattern(e) {
    let data = {...formPattern}
    if (e.target.value) {
      data[e.target.name] = e.target.value
      if(e.target.files) {
        // console.log("Files", e.target.files)
        data[e.target.name] = e.target.files[0]
      }
    } 
    setFormPattern(data)
  }
  async function handleSubmitPattern(e) {
    e.preventDefault()
    setIsOpenFormPattern(false)
    let data = [...patterns]

    if( formPattern.name === '' |
        formPattern.id_kategori === '' |
        formPattern.panjang === '' |
        formPattern.lebar === '' |
        formPattern.harga_per_meter === '' |
        formPattern.is_visible === '' |
        formPattern.texture === ''
    ) {
      setIsOpenFormPattern(true)
      return false
    } 

    let newData = { 
      name : formPattern.name,
      id_kategori : formPattern.id_kategori,
      panjang : formPattern.panjang,
      lebar : formPattern.lebar,
      harga_per_meter : formPattern.harga_per_meter,
      is_visible : formPattern.is_visible,
      texture : formPattern.texture
    }

    const createFormData = (body) => {
      const data = new FormData();
      Object.keys(body).forEach(key => {
        data.append(key, body[key]);
      });
      console.log("DATA TO SEND :", data.get("name"))
      return data;
    }

    if (isPatternUpdate.status) {
      data.forEach((pattern) => {
        if (pattern.id === isPatternUpdate.id) {
          pattern.name = formPattern.name
          pattern.id_kategori = formPattern.id_kategori
          pattern.panjang = formPattern.panjang
          pattern.lebar = formPattern.lebar
          pattern.harga_per_meter = formPattern.harga_per_meter
          pattern.is_visible = formPattern.is_visible
          pattern.texture = formPattern.texture
        }
      })
      try {
        newData = createFormData(newData);
        const response = await axios.put(base_url + '/texture/update-texture/' + isPatternUpdate.id, newData, {
          headers: {
            "Content-type": "multipart/form-data"
          },
        })
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
        newData = createFormData(newData);
        //console.log("DATA TO SEND :", newData)
        const response = await axios.post(base_url+'/texture/add-texture', newData, {
          headers: {
            "Content-type": "multipart/form-data"
          },
        })
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
    tableOfPattern()
    setFormPattern({
      name : '',
      id_kategori : '',
      panjang : '',
      lebar : '',
      harga_per_meter : '',
      is_visible : '',
      texture : ''
    })
    setIsPatternUpdate({
      id: null,
      status: false
    })
  }
  function handleEditPattern(id) {
    setIsOpenFormPattern(true)
    let data = [...patterns]
    let foundData = data.find((pattern) => pattern.id === id)

    setFormPattern({
      name: foundData.name,
      id_kategori : foundData.id_kategori,
      panjang : foundData.panjang,
      lebar : foundData.lebar,
      harga_per_meter : foundData.harga_per_meter,
      is_visible: foundData.is_visible,
      texture : foundData.texture
    })
    setIsPatternUpdate({
      id: id,
      status: true
    })
  }
  function handleCancelPattern() {
    setIsOpenFormPattern(false)
    setFormPattern({
      name : '',
      id_kategori : '',
      panjang : '',
      lebar : '',
      harga_per_meter : '',
      is_visible : '',
      texture : ''
    })
  }
  async function handleDeletePattern(id) {
    const answer = window.confirm('Are you sure to delete this pattern?')
    if(answer) {
      try {
        const response = await axios.delete(base_url + '/texture/delete-texture/' + id)
        console.log("response", response) 
        alert('Berhasil dihapus')
      } catch (err) {
        console.log("response", err) 
        alert('Maaf, data gagal dihapus')
      }
      tableOfPattern()
    } else {
      alert('Cancelled')
    }
  }

  return (
    <div>
      <>
        <div className='flex sm:flex-row flex-col gap-5 sm:items-center items-start mb-6'>
          <SearchBar value={query} actionChage={(e) => setQuery(e.target.value)} action={caridong} />
          <AddButton name='Add Pattern' action={() => setIsOpenFormPattern(true)} />
        </div>

        <div className='overflow-x-auto scrollbar-custom bg-white overflow-hidden mb-3'>
          <table className='sm:w-full w-max border border-black'>
            <thead>
              <tr className='text-center font-jakarta lg:text-base md:text-sm text-xs font-bold text-white bg-primary'>
                <th className='p-2'>No</th>
                <th className='p-2'>Texture</th>
                <th className='p-2'>Name</th>
                <th className='p-2'>Length</th>
                <th className='p-2'>Width</th>
                <th className='p-2'>Price</th>
                <th className='p-2'>Unique Code</th>
                <th className='p-2'>Visible</th>
                <th className='p-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {patterns.map(function(pattern, index) {
              return (
                <tr className='border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal' key={index}>
                  <td className='p-2'>{index + 1}</td>
                  <td className='p-2'>
                    <div className='h-[25px] aspect-square overflow-hidden block m-auto'>
                      <img className='w-full h-full object-cover' src={'assets/img/2D/texture/'+pattern.texture} alt='' />
                    </div>
                  </td>
                  <td className='p-2'>{pattern.name}</td>
                  <td className='p-2'>{pattern.panjang}</td>
                  <td className='p-2'>{pattern.lebar}</td>
                  <td className='p-2'>{formatRupiah(pattern.harga_per_meter)}</td>
                  <td className='p-2'>{pattern.code}</td>
                  <td className='p-2'><img className='block m-auto' src={pattern.is_visible == 1 ? '/assets/icons/IconVisible.svg' : '/assets/icons/IconInvisible.svg'} alt='' /></td>
                  <td className='p-2'>
                    <div className='flex gap-1 flex-wrap justify-center'>
                      <MiniButtonWithIcon colorBorder='primary' colorBg='primary' colorText='white' action={() => handleEditPattern(pattern.id)} img='/assets/icons/IconEdit.svg' name='Edit' />
                      <button className='flex items-center gap-1  bg-red-600 rounded-[5px] py-1 px-2 font-jakarta text-xs text-white' onClick={() => handleDeletePattern(pattern.id)}><img src='/assets/icons/IconClose.svg' name='Delete' />Delete</button>
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
      
      {/* FORM PATTERN */}
      <div className={'fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 ' + (isOpenFormPattern === true ? 'opacity-100 visible' : 'opacity-0 invisible')}>
        <form className={'fixed h-auto xl:w-[35%] sm:w-[50%] w-[85%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 md:p-10 p-5 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom ' + (isOpenFormPattern === true ? 'opacity-100 visible' : 'opacity-0 invisible')} onSubmit={handleSubmitPattern}>
          <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Name*</span> 
            <input
              required
              type='text'
              value={formPattern.name}
              name='name'
              placeholder='Input Pattern Name'
              onChange={handleChangePattern}
              className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
            />
          </label>
          <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Price (/m)*</span> 
            <input
              required
              type='number'
              value={formPattern.harga_per_meter}
              name='harga_per_meter'
              placeholder='Input the price/m'
              onChange={handleChangePattern}
              className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
            />
            <span className='absolute inset-y-0 right-0 flex items-center px-2 font-bold text-white bg-slate-700  rounded-tr-lg rounded-br-lg'>
              <select className='bg-slate-700 absolute inset-y-0 right-0 flex items-center px-2'>
                <option value="IDR">IDR</option>
                <option value="USD">USD</option>
              </select>
            </span>
          </label>
          <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3 relative'>
            <span>Length*</span> 
            <input
              required
              type='number'
              value={formPattern.panjang}
              name='panjang'
              placeholder='Input the length'
              onChange={handleChangePattern}
              className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
            />
            <span className='absolute inset-y-0 right-0 flex items-center px-4 font-bold text-white bg-slate-700  rounded-tr-lg rounded-br-lg'>cm</span> 
          </label>
          <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3 relative'>
            <span>Width*</span> 
            <input
              required
              type='number'
              value={formPattern.lebar}
              name='lebar'
              placeholder='Input the width'
              onChange={handleChangePattern}
              className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
            />
            <span className='absolute inset-y-0 right-0 flex items-center px-4 font-bold text-white bg-slate-700 rounded-tr-lg rounded-br-lg'>cm</span> 
          </label>
          <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Texture*</span> 
            <input
              required
              type='file'
              name='texture'
              onChange={handleChangePattern}
              accept='image/*'
              className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
            />
          </label>
          <div className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Category*</span>
            <select
              required
              name='id_kategori'
              value={formPattern.id_kategori}
              onChange={handleChangePattern}
              className='font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5'>
              <option value=''>Choose one</option>
              <option value={1}>Bianco / White</option>
              <option value={2}>Crema / Krem</option>
              <option value={3}>Grigio / Grey</option>
              <option value={4}>Nero / Hitam</option>
            </select>
          </div>
          <div className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-2 gap-3 mb-3'>
            <span>Visibility*</span>
            <select
              required
              name='is_visible'
              value={formPattern.is_visible}
              onChange={handleChangePattern}
              className='font-jakarta md:text-sm text-xs font-light text-black border border-black rounded-[5px] py-1 pr-5'>
              <option value=''>Choose one</option>
              <option value={1}>visible</option>
              <option value={0}>invisible</option>
            </select>
          </div>
          <div className='flex gap-3 justify-end'>
            <span className='flex items-center gap-2 border bg-red-600 rounded-[5px] py-1 px-4 font-jakarta text-xs text-white cursor-pointer' onClick={handleCancelPattern}>
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

export default Pattern