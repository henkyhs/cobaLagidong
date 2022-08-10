const ScaleDimension = ({valueScaleX, valueScaleY, valueScaleZ, valuePositionX, valuePositionY, valuePositionZ, action}) => {

  return (
    <>
      <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 items-center gap-3 mb-2'>
        <span>Scale X*</span> 
        <input
          required
          type='text'
          value={valueScaleX}
          name='scale x'
          placeholder='Input the scale x'
          onChange={action}
          className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
        />
        <span className='text-xs font-normal'>*Skala 0-10, contoh  (“0.5”)</span> 
      </label>
      <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 items-center gap-3 mb-2'>
        <span>Scale Y*</span> 
        <input
          required
          type='text'
          value={valueScaleY}
          name='scale y'
          placeholder='Input the scale y'
          onChange={action}
          className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
        />
        <span className='text-xs font-normal'>*Skala 0-10, contoh  (“0.5”)</span> 
      </label>
      <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 items-center gap-3 mb-2'>
        <span>Scale Z*</span> 
        <input
          required
          type='text'
          value={valueScaleZ}
          name='scale z'
          placeholder='Input the scale z'
          onChange={action}
          className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
        />
        <span className='text-xs font-normal'>*Skala 0-10, contoh  (“0.5”)</span> 
      </label>
      <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 items-center gap-3 mb-2'>
        <span>Position X*</span> 
        <input
          required
          type='text'
          value={valuePositionX}
          name='position x'
          placeholder='Input the position x'
          onChange={action}
          className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
        />
        <span className='text-xs font-normal'>*Skala 0-10, contoh  (“0.5”)</span> 
      </label>
      <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 items-center gap-3 mb-2'>
        <span>Position Y*</span> 
        <input
          required
          type='text'
          value={valuePositionY}
          name='position y'
          placeholder='Input the position y'
          onChange={action}
          className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
        />
        <span className='text-xs font-normal'>*Skala 0-10, contoh  (“0.5”)</span> 
      </label>
      <label className='font-jakarta lg:text-base md:text-sm text-xs font-bold grid grid-cols-3 items-center gap-3 mb-2'>
        <span>Position Z*</span> 
        <input
          required
          type='text'
          value={valuePositionZ}
          name='position z'
          placeholder='Input the position z'
          onChange={action}
          className='font-jakarta md:text-sm text-xs font-light placeholder:text-black border border-black rounded-[5px] p-1'
        />
        <span className='text-xs font-normal'>*Skala 0-10, contoh  (“0.5”)</span> 
      </label>
    </>
  )
}

export default ScaleDimension