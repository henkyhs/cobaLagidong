import { BrowserRouter, Route, Routes } from 'react-router-dom'

import USP from '../../pages/usp'
import FAQ from '../../pages/faq'
import Cart from '../../pages/cart'
import Home from '../../pages/home'
import About from '../../pages/about'
import Login from '../../pages/login'
import Terms from '../../pages/terms'
import Invoice from '../../pages/invoice'
import Product from '../../pages/product'
import Checkout from '../../pages/checkout'
import Register from '../../pages/register'
import NotFound from '../../pages/not-found'
import ContactUs from '../../pages/contact-us'
import UserProfile from '../../pages/user-profile'
import ProductDetail from '../../pages/product-detail'
import CustomEnquiry from '../../pages/custom-enquiry'
import PrivacyPolicy from '../../pages/privacy-policy'
import AdminCustomEnquiry from '../../admin/custom-enquiry'
import CatalogSearch from '../../pages/catalog-search'
import KnowledgeBase from '../../pages/knowledge-base'
import TransactionDetail from '../../pages/transaction-detail'

const RootRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/about-us' element={<About />} />
        <Route path='/invoice' element={<Invoice />} />
        <Route path='/products' element={<Product />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/register' element={<Register />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/unique-selling-point' element={<USP />} />
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/custom-enquiry' element={<CustomEnquiry />} />
        <Route path='/knowledge-base' element={<KnowledgeBase />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/admin-custom-enquiry' element={<AdminCustomEnquiry />} />
        <Route path='/catalog-search/' element={<CatalogSearch />} />
        <Route path='/products/:productName' element={<ProductDetail />} />
        <Route path='/transaction-detail' element={<TransactionDetail />} />
        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default RootRoutes