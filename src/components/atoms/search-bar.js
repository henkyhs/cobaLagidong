const SearchBar = ({value, actionChage, action}) => {

  return (
    <div className='flex items-center gap-4 border border-black bg-white rounded-[5px] py-1 px-4'>
      <input
      type='text'
      placeholder='Search..'
      className='font-jakarta lg:text-base md:text-sm text-xs placeholder:text-black w-[90%] border-none outline-none'
      value={value}
      onChange={actionChage}
      />
      <img className='cursor-pointer' onClick={action} src='/assets/icons/IconSearch.svg' alt='' />
    </div>
  )
}

export default SearchBar