const DetailEdge = () => {

  return (
    <>
      <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 items-center gap-3 mb-3'>
        <span>Scale X*</span> 
        <input
          required
          type='text'
          value=''
          name='scale x'
          placeholder='Input the scale x'
          onChange=''
          className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
        />
        <span className='text-xs font-normal'>*Skala 0-10, contoh  (“0.5”)</span> 
      </label>
      <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 items-center gap-3 mb-3'>
        <span>Scale Y*</span> 
        <input
          required
          type='text'
          value=''
          name='scale y'
          placeholder='Input the scale y'
          onChange=''
          className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
        />
        <span className='text-xs font-normal'>*Skala 0-10, contoh  (“0.5”)</span> 
      </label>
      <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 items-center gap-3 mb-3'>
        <span>Scale Z*</span> 
        <input
          required
          type='text'
          value=''
          name='scale z'
          placeholder='Input the scale z'
          onChange=''
          className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
        />
        <span className='text-xs font-normal'>*Skala 0-10, contoh  (“0.5”)</span> 
      </label>
    </>
  )
}

export default DetailEdge