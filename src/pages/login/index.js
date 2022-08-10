import { Link, useNavigate } from 'react-router-dom'
import { LOGIN } from '../../config/redux/action'
import { useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux/es/exports'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showSectionOTP, setShowSectionOTP] = useState(false)
  const [otpNumber, setOTPNumber] = useState({
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
    otp5: '',
    otp6: '',
    value: '',
  })

  const handleInsertOTP = (event, otpIndex) => {
    setOTPNumber(otpNumber => ({ ...otpNumber, [otpIndex]: event.target.value }))
  }

  const handleOTPSubmit = async () => {
    //dispatch redux (just like setState, but using global state instead)
    await dispatch({
      type: LOGIN,
      user: {
        username: 'test',
        phoneNumber: phoneNumber,
      }
    })

    //push route to home
    navigate('/')
  }

  const handleInsertFocus = (element) => {
    if(element.key === 'Delete' || element.key === 'Backspace') {
      const prev = element.target.tabIndex - 2
      if(prev > -1) {
        element.target.form.elements[prev].focus()
      }
    } else if ((element.keyCode >= 48 && element.keyCode <= 57) || (element.keyCode >= 65 && element.keyCode <= 90) || (element.keyCode >= 96 && element.keyCode <= 105) || element.keyCode === 39) {
      const next = element.target.tabIndex
      if(next < 6) {
        element.target.form.elements[next].focus()
      }
    } else if(element.keyCode === 13) {
      handleOTPSubmit()
    }
  }

  const SectionInsertNumber = () => {
    return(
      <div>
        <img src='/assets/images/ILAuth.png' className='hidden sm:block absolute right-0 h-full w-auto object-cover rounded-r-lg -z-10'/>
        <div className='w-full sm:w-fit flex flex-col items-center py-12 px-10'>
          <img src='/assets/icons/IconLogo.svg' />
          <p className='font-jakarta font-bold text-base my-5'>Login</p>
          <p className='font-jakarta text-xs self-start mb-2' >No. Handphone</p>
          <input
            type='tel'
            placeholder='Masukkan No. Handphone'
            onChange={(event) => setPhoneNumber(event.target.value)}
            className='w-full sm:w-56 border border-[#d9d9d9] rounded-md py-2.5 pl-2 text-xs focus:outline-none'
          />
          <button onClick={() => setShowSectionOTP(!showSectionOTP)} className='bg-primary rounded-md text-white py-2 px-7 font-bold mt-2.5 mb-5 text-xs'>Login</button>
          <span className='font-lato text-xs'>Belum punya akun Estetico Home?{' '}
            <a href='/register' className='font-bold text-primary hover:cursor-pointer'>Daftar</a>
          </span>
        </div>
      </div>
    )
  }

  const SectionInsertOTP = () => {
    return(
      <div className='w-full flex flex-col items-center py-12 px-10'>
        <img src='/assets/icons/IconLogo.svg' />
        <p className='font-jakarta font-bold text-base my-5'>Masukkan Kode OTP</p>
        <p className='font-lato text-xs text-black mt-4 mb-10'>Masukkan kode OTP yang dikirim ke Handphone anda</p>
        <form className='flex font-inter font-medium text-3xl md:text-4xl lg:text-5xl' autoComplete='off'>
          <input
            name='otp1'
            type='text'
            tabIndex='1'
            maxLength='1'
            autoComplete='off'
            inputMode='numeric'
            value={otpNumber.otp1}
            onKeyUp={(element) => handleInsertFocus(element)}
            onChange={(event) => handleInsertOTP(event, 'otp1')}
            className='border w-12 h-16 md:w-12 md:h-16 lg:w-16 lg:h-20 mx-1 md:mx-2.5 border-black text-center'
          />
          <input
            name='otp2'
            type='text'
            tabIndex='2'
            maxLength='1'
            autoComplete='off'
            inputMode='numeric'
            value={otpNumber.otp2}
            onKeyUp={(element) => handleInsertFocus(element)}
            onChange={(event) => handleInsertOTP(event, 'otp2')}
            className='border w-12 h-16 md:w-12 md:h-16 lg:w-16 lg:h-20 mx-1 md:mx-2.5 border-black text-center'
          />
          <input
            name='otp3'
            type='text'
            tabIndex='3'
            maxLength='1'
            autoComplete='off'
            inputMode='numeric'
            value={otpNumber.otp3}
            onKeyUp={(element) => handleInsertFocus(element)}
            onChange={(event) => handleInsertOTP(event, 'otp3')}
            className='border w-12 h-16 md:w-12 md:h-16 lg:w-16 lg:h-20 mx-1 md:mx-2.5 border-black text-center'
          />
          <input
            name='otp4'
            type='text'
            tabIndex='4'
            maxLength='1'
            autoComplete='off'
            inputMode='numeric'
            value={otpNumber.otp4}
            onKeyUp={(element) => handleInsertFocus(element)}
            onChange={(event) => handleInsertOTP(event, 'otp4')}
            className='border w-12 h-16 md:w-12 md:h-16 lg:w-16 lg:h-20 mx-1 md:mx-2.5 border-black text-center'
          />
          <input
            name='otp5'
            type='text'
            tabIndex='5'
            maxLength='1'
            autoComplete='off'
            inputMode='numeric'
            value={otpNumber.otp5}
            onKeyUp={(element) => handleInsertFocus(element)}
            onChange={(event) => handleInsertOTP(event, 'otp5')}
            className='border w-12 h-16 md:w-12 md:h-16 lg:w-16 lg:h-20 mx-1 md:mx-2.5 border-black text-center'
          />
          <input
            name='otp6'
            type='text'
            tabIndex='6'
            maxLength='1'
            autoComplete='off'
            inputMode='numeric'
            value={otpNumber.otp6}
            onKeyUp={(element) => handleInsertFocus(element)}
            onChange={(event) => handleInsertOTP(event, 'otp6')}
            className='border w-12 h-16 md:w-12 md:h-16 lg:w-16 lg:h-20 mx-1 md:mx-2.5 border-black text-center'
          />
        </form>
        <button onClick={handleOTPSubmit} className='bg-primary py-2 px-4 mt-7 rounded-[10px] text-xs text-white'>Submit</button>
      </div>
    )
  }

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='w-full h-[100vh] flex justify-center sm:items-center'>
      <div className='w-full sm:w-[567px] sm:h-[410px] relative rounded-lg shadow-lg'>
        {showSectionOTP ? (
          SectionInsertOTP()
        ) : (
          SectionInsertNumber()
        )}
      </div>
    </div>
  )
}

export default Login