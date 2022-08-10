import { useState } from 'react'
import { SearchBar } from '../../components'

const Customer = () => {

  const [isOpenDetailCustomProduct, setIsOpenDetailCustomPorduct] = useState(false)

  return (
    <div>
      <>
        <div className='mb-6 sm:w-[250px]'>
          <SearchBar />
        </div>

        <div className='overflow-x-auto scrollbar-custom bg-white overflow-hidden'>
          <table className='sm:w-full w-max border border-black'>
            <thead>
              <tr className='text-center font-jakarta lg:text-base md:text-sm text-xs font-bold text-white bg-primary'>
                <th className='p-2'>No</th>
                <th className='p-2'>Phone</th>
                <th className='p-2'>Last Activity</th>
                <th className='p-2'>Activity Status</th>
                <th className='p-2'>Custom Product</th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal'>
                <td className='p-2'>1</td>
                <td className='p-2'>+6287845643110</td>
                <td className='p-2'>03-08-2022;13:50</td>
                <td className='p-2'><span className='px-3 bg-[#05625E] text-white rounded-lg'>Enquiry</span></td>
                <td className='p-2 underline cursor-pointer' onClick={() => setIsOpenDetailCustomPorduct(true)}>S01-E01-DM04-P12-M01-DS02-C02</td>
              </tr>
              <tr className='border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal'>
                <td className='p-2'>2</td>
                <td className='p-2'>+6287845643110</td>
                <td className='p-2'>03-08-2022;13:50</td>
                <td className='p-2'><span className='px-3 bg-[#05625E] text-white rounded-lg'>Enquiry</span></td>
                <td className='p-2 underline cursor-pointer' onClick={() => setIsOpenDetailCustomPorduct(true)}>S01-E01-DM04-P12-M01-DS02-C02</td>
              </tr>
              <tr className='border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal'>
                <td className='p-2'>3</td>
                <td className='p-2'>+6287845643110</td>
                <td className='p-2'>03-08-2022;13:50</td>
                <td className='p-2'><span className='px-3 bg-[#05625E] text-white rounded-lg'>Enquiry</span></td>
                <td className='p-2 underline cursor-pointer' onClick={() => setIsOpenDetailCustomPorduct(true)}>S01-E01-DM04-P12-M01-DS02-C02</td>
              </tr>
              <tr className='border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal'>
                <td className='p-2'>4</td>
                <td className='p-2'>+6287845643110</td>
                <td className='p-2'>03-08-2022;13:50</td>
                <td className='p-2'><span className='px-3 bg-[#05625E] text-white rounded-lg'>Enquiry</span></td>
                <td className='p-2 underline cursor-pointer' onClick={() => setIsOpenDetailCustomPorduct(true)}>S01-E01-DM04-P12-M01-DS02-C02</td>
              </tr>
              <tr className='border-b border-b-black text-center font-jakarta lg:text-base md:text-sm text-xs font-normal'>
                <td className='p-2'>5</td>
                <td className='p-2'>+6287845643110</td>
                <td className='p-2'>03-08-2022;13:50</td>
                <td className='p-2'><span className='px-3 bg-[#05625E] text-white rounded-lg'>Enquiry</span></td>
                <td className='p-2 underline cursor-pointer' onClick={() => setIsOpenDetailCustomPorduct(true)}>S01-E01-DM04-P12-M01-DS02-C02</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>

      {/* DETAIL CUSTOM PRODUCT */}
      <div className={'fixed h-[100%] w-[100%] top-0 left-0 backdrop-blur-md z-[7] transition-all duration-500 ' + (isOpenDetailCustomProduct === true ? 'opacity-100 visible' : 'opacity-0 invisible')}>
        <div className={'fixed h-auto xl:w-[35%] sm:w-[50%] w-[85%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 md:p-10 p-5 bg-white rounded-[5px] cart-shadow transition-all duration-500 overflow-auto scrollbar-custom ' + (isOpenDetailCustomProduct === true ? 'opacity-100 visible' : 'opacity-0 invisible')}>
          <div className='h-[85px] aspect-square overflow-hidden block m-auto'>
            <img className='w-full h-full object-cover' src='' alt='' />
          </div>
        </div>
      </div>
      {/* DETAIL CUSTOM PRODUCT */}
    </div>
  )
}

export default Customer