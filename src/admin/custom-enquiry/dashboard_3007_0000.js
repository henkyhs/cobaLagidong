import { useState } from 'react'
import { AddButton, MiniButtonWithIcon, SearchBar } from '../../components'
import { formatRupiah } from '../../utils'
import { uid } from 'uid'

const Dashboard = () => {

  return (
    <>
      <h1 className="font-jakarta lg:text-3xl md:text-2xl text-xl font-semibold mb-12">
        Hi, DW !
      </h1>
      <h2 className="font-jakarta lg:text-2xl md:text-xl text-lg font-bold mb-8">
        DASHBOARD
      </h2>
      <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10 gap-x-5">
        <div className="cart-shadow p-5 bg-white rounded-[5px] font-jakarta lg:text-base md:text-sm text-xs font-bold">
          <div className="flex justify-between items-center mb-5">
            <p>Top Pattern</p>
            <img
              className="h-[37px] stroke-cyan-500"
              src="/assets/icons/IconAdminTopPattern_green.svg"
              alt=""
            />
          </div>
          <ul>
            <li>
              <span>3</span>
              <span className="text-[#8A8787] font-normal">
                &nbsp;Pattern
              </span>
            </li>
          </ul>
        </div>
        <div className="cart-shadow p-5 bg-white rounded-[5px] font-jakarta lg:text-base md:text-sm text-xs font-bold">
          <div className="flex justify-between items-center mb-5">
            <p>Top Shape</p>
            <img
              className="h-[37px]"
              src="/assets/icons/IconAdminTopShape_green.svg"
              alt=""
            />
          </div>
          <ul>
            <li>
              <span>3</span>
              <span className="text-[#8A8787] font-normal">
                &nbsp;Shape
              </span>
            </li>
          </ul>
        </div>
        <div className="cart-shadow p-5 bg-white rounded-[5px] font-jakarta lg:text-base md:text-sm text-xs font-bold">
          <div className="flex justify-between items-center mb-5">
            <p>Top Dimension</p>
            <img
              className="h-[37px]"
              src="/assets/icons/IconAdminTopDimension_green.svg"
              alt=""
            />
          </div>
          <ul>
            <li className="flex justify-between items-center">
              <span className="text-[#8A8787] font-normal">User</span>
              <span>3</span>
            </li>
          </ul>
        </div>
        <div className="cart-shadow p-5 bg-white rounded-[5px] font-jakarta lg:text-base md:text-sm text-xs font-bold">
          <div className="flex justify-between items-center mb-5">
            <p>Top Edge</p>
            <img
              className="h-[37px]"
              src="/assets/icons/IconAdminTopEdge_green.svg"
              alt=""
            />
          </div>
          <ul>
            <li className="flex justify-between items-center">
              <span className="text-[#8A8787] font-normal">Category</span>
              <span>3</span>
            </li>
          </ul>
        </div>
        <div className="cart-shadow p-5 bg-white rounded-[5px] font-jakarta lg:text-base md:text-sm text-xs font-bold">
          <div className="flex justify-between items-center mb-5">
            <p>Leg Design</p>
            <img
              className="h-[37px]"
              src="/assets/icons/IconDasLeg_green.svg"
              alt=""
            />
          </div>
          <ul>
            <li className="flex justify-between items-center">
              <span className="text-[#8A8787] font-normal">Category</span>
              <span>3</span>
            </li>
          </ul>
        </div>
        <div className="cart-shadow p-5 bg-white rounded-[5px] font-jakarta lg:text-base md:text-sm text-xs font-bold">
          <div className="flex justify-between items-center mb-5">
            <p>Leg Material</p>
            <img
              className="h-[37px]"
              src="/assets/icons/IconAdminLegMaterial_green.svg"
              alt=""
            />
          </div>
          <ul>
            <li className="flex justify-between items-center">
              <span className="text-[#8A8787] font-normal">Category</span>
              <span>3</span>
            </li>
          </ul>
        </div>
        <div className="cart-shadow p-5 bg-white rounded-[5px] font-jakarta lg:text-base md:text-sm text-xs font-bold">
          <div className="flex justify-between items-center mb-5">
            <p>Leg Color</p>
            <img
              className="h-[37px]"
              src="/assets/icons/IconAdminLegColor_green.svg"
              alt=""
            />
          </div>
          <ul>
            <li className="flex justify-between items-center">
              <span className="text-[#8A8787] font-normal">Category</span>
              <span>3</span>
            </li>
          </ul>
        </div>
        <div className="cart-shadow p-5 bg-white rounded-[5px] font-jakarta lg:text-base md:text-sm text-xs font-bold">
          <div className="flex justify-between items-center mb-5">
            <p>Pattern Category</p>
            <img
              className="h-[37px]"
              src="/assets/icons/IconDasCategory_green.svg"
              alt=""
            />
          </div>
          <ul>
            <li className="flex justify-between items-center">
              <span className="text-[#8A8787] font-normal">Category</span>
              <span>3</span>
            </li>
          </ul>
        </div>
        <div className="cart-shadow p-5 bg-white rounded-[5px] font-jakarta lg:text-base md:text-sm text-xs font-bold">
          <div className="flex justify-between items-center mb-5">
            <p>User</p>
            <img
              className="h-[37px]"
              src="/assets/icons/IconDasUser_green.svg"
              alt=""
            />
          </div>
          <ul>
            <li className="flex justify-between items-center">
              <span className="text-[#8A8787] font-normal">User</span>
              <span>3</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Dashboard