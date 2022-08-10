import { Link, useParams } from 'react-router-dom'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { formatRupiah } from '../../utils'
import { Footer, Navbar } from '../../components'

const Cart = () => {
  const params = useParams()
  const footerRef = useRef()
  const [isCheckAll, setIsCheckAll] = useState(false)
  const [footerPosition, setFooterPosition] = useState(0)
  const [currentScrollY, setCurrentScrollY] = useState(0)

  const [summary, setSummary] = useState({
    subtotalPrice: 0,
    subtotalCount: 0,
    checkedCartList: [],
  })

  const [cartList, setCartList] = useState([
    {
      name: 'Dining Table',
      price: '1250000',
      image: '/assets/images/DummyNewProduct1.png',
      count: 1,
      color: 'Blue',
      isChecked: false,
    },
    {
      name: 'Black Parche Round Cafe Table',
      price: '1250000',
      image: '/assets/images/DummyNewProduct2.png',
      count: 1,
      color: 'Blue',
      isChecked: false,
    },
  ])

  const handleScroll = () => {
    setCurrentScrollY(window.scrollY)
    setFooterPosition(footerRef.current?.offsetTop)
  }

  const handleChecklistProduct = (index, value) => {
    let cartListTemp = [...cartList]
    cartListTemp[index].isChecked = value
    setCartList(cartListTemp)
    if(value == false) {
      setIsCheckAll(false)
    }
  }

  const handleCheckAllProduct = () => {
    let uncheckedCartList = cartList.filter((item) => item.isChecked == false)
    let resultCartList = [...cartList]
    if(uncheckedCartList.length == 0) {
      resultCartList.map((item, index) => {
        resultCartList[index].isChecked = false
      })
      setIsCheckAll(false)
    } else {
      resultCartList.map((item, index) => {
        resultCartList[index].isChecked = true
      })
      setIsCheckAll(true)
    }
    setCartList(resultCartList)
  }

  const handleProductCount = (index, value) => {
    let cartListTemp = [...cartList]
    if(parseInt(value)) {
      cartListTemp[index].count = parseInt(value)
      setCartList(cartListTemp)
    } else {
      cartListTemp[index].count = 0
      setCartList(cartListTemp)
    }
  }

  const increaseProductCount = (index) => {
    let cartListTemp = [...cartList]
    cartListTemp[index].count += 1
    setCartList(cartListTemp)
  }

  const decreaseProductCount = (index) => {
    let cartListTemp = [...cartList]
    if(cartListTemp[index].count > 1) {
      cartListTemp[index].count -= 1
      setCartList(cartListTemp)
    } else {
      const answer = window.confirm('Hapus produk?')
      if(answer) {
        cartListTemp[index].count = 0
        setCartList(cartListTemp)
      } else {
        alert('gak jadi')
      }
    }
  }

  const deleteProductCount = (index) => {
    const answer = window.confirm('Hapus produk?')
    if(answer) {
      let cartListTemp = [...cartList]
      cartListTemp[index].count = 0
      setCartList(cartListTemp)
    } else {
      alert('gak jadi')
    }
  }

  useEffect(() => {
    setCurrentScrollY(window.scrollY)
    setFooterPosition(footerRef.current?.offsetTop)
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    let subtotalCount = 0
    let subtotalPrice = 0
    const checkedCartList = cartList.filter((item) => item.isChecked)
    checkedCartList.map((item, index) => {
      subtotalCount += item.count
      subtotalPrice = subtotalPrice + (item.count * item.price)
    })
    setSummary(state => ({
      ...state,
      subtotalPrice: subtotalPrice,
      subtotalCount: subtotalCount,
      checkedCartList: checkedCartList,
    }))
  }, [cartList])

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <Navbar />
      <section className='pt-24 xl:px-20 lg:px-16 sm:px-10 px-4'>
        <span className='font-lato text-xs font-medium'>
          <span>
            <Link to='/'>{'<'} Back</Link>
          </span>
          <span> | Home {'>'} My Cart </span>
        </span>
        <div className='grid grid-cols-5'>
          <div className='col-span-5 sm:col-span-3'>
            <p className='font-jakarta text-2xl md:text-3xl lg:text-4xl text-black uppercase mt-12 mb-16'>My Cart</p>
            <div className='flex items-center'>
              <input
                type='checkbox'
                checked={isCheckAll}
                onChange={handleCheckAllProduct}
                className='mr-8 w-4 h-4 md:mr-12 lg:mr-16 lg:w-6 lg:h-6 border-black rounded-md'
              />
              <p className='font-jakarta text-2xl text-black'>Checkout All</p>
            </div>
            {cartList.map((item, index) => {
              return (
                <div key={index} className='flex my-12'>
                  <input
                    type='checkbox'
                    checked={item.isChecked}
                    className='mr-8 w-4 h-4 md:mr-12 lg:mr-16 lg:w-6 lg:h-6 border-black rounded-md'
                    onChange={(event) => handleChecklistProduct(index, event.target.checked)}
                  />
                  <div className='cart-shadow grid grid-cols-1 lg:grid-cols-3 w-full pt-7 pb-6 px-4 items-center'>
                    <img src={item.image} className='w-full h-auto lg:w-auto lg:h-28'/>
                    <div>
                      <p className='font-jakarta font-medium text-lg md:text-xl lg:text-2xl text-black'>{item.name}</p>
                      <p className='font-lato font-light text-base lg:text-lg text-black'>Variant: {item.color}</p>
                      <p className='font-lato font-normal text-base lg:text-lg text-black'>{`${formatRupiah(item.price)} x ${item.count}`}</p>
                    </div>
                    <div className='flex gap-x-4 self-end justify-end'>
                      <button onClick={() => deleteProductCount(index)}><img src='/assets/icons/IconTrash.svg'/></button>
                      <div className='h-6 w-[2px] bg-black'/>
                      <button onClick={() => increaseProductCount(index)}><img src='/assets/icons/IconPlus.svg' className='border-2 border-black'/></button>
                      <input
                        type='text'
                        inputMode='numeric'
                        value={item.count}
                        onChange={(event) => handleProductCount(index, event.target.value)}
                        className='border-2 border-black w-6 h-6 font-inter text-base text-black text-center'
                      />
                      <button onClick={() => decreaseProductCount(index)}><img src='/assets/icons/IconMinus.svg' className='border-2 border-black'/></button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {/* fixed until reach near footer */}
          <div className={(currentScrollY <= (footerPosition - 550)) ? 'col-span-5 sm:fixed sm:top-60 right-4 sm:right-10 lg:right-16 xl:right-20' : 'col-span-5 sm:col-span-2 sm:self-end sm:my-12 sm:justify-self-end'}>
            <div className='lg:w-[300px] xl:w-[400px] shadow-lg p-4 rounded-sm'>
              <p className='font-jakarta font-medium text-lg md:text-xl lg:text-2xl text-black'>Summary</p>
              <div className='flex justify-between my-4'>
                <p className='font-lato text-base text-black'>Subtotal Price ({summary.subtotalCount} Item)</p>
                <p>: {formatRupiah(summary.subtotalPrice)}</p>
              </div>
              <div className='w-full h-[1px] bg-black'/>
              <div className='flex justify-between mt-4'>
                <p className='font-lato text-base text-black'>Total Price</p>
                <p>: {formatRupiah(summary.subtotalPrice)}</p>
              </div>
            </div>
            {summary.subtotalCount > 0 ? (
              <Link
                to='/checkout'
                state={{ summary: summary }}
                className='block w-fit font-jakarta font-bold text-base text-white bg-primary rounded-xl py-2.5 px-6 mt-5'
              >
                <p>Checkout</p>
              </Link>
            ) : (
              <p className='w-fit font-jakarta font-bold text-base text-white bg-gray-300 rounded-xl py-2.5 px-6 mt-5'>Checkout</p>
            )}
          </div>
        </div>
      </section>
      <Footer footerRef={footerRef}/>
    </div>
  )
}

export default Cart