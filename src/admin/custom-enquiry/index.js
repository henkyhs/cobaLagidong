import { useLayoutEffect, useState } from "react";
import Dashboard from "./dashboard";
import Shape from "./shape";
import Edge from "./edge";
import Dimension from "./dimension";
import Pattern from "./pattern";
import User from "./user";
import Category from "./category";
import Material from "./material";
import Design from "./design";
import Color from "./color";
import DefaultCustomTable from "./DefaultCustomTable";
import AdvancedSettings from "./AdvancedSettings";
import Customer from "./customer";
import { createPopper, detectOverflow } from "@popperjs/core";

const popcorn = document.querySelector("#popcorn");
const tooltip = document.querySelector("#tooltip");
createPopper(popcorn, tooltip);

const AdminCustomEnquiry = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isSideBar, setIsSideBar] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="relative min-h-screen bg-[#FFF3E5]">
      <section className="fixed z-[6] top-0 left-0 h-[50px] w-full flex justify-between items-center px-5 bg-primary text-white">
        <div className="flex items-center gap-5 lg:text-base md:text-sm text-xs">
          <img
            className={
              "w-6 ml-[-4px] cursor-pointer " +
              (isSideBar === true ? "" : "rotate-180")
            }
            src="/assets/icons/IconArrowWhiteCircle.svg"
            alt=""
            onClick={() => setIsSideBar(!isSideBar)}
          />
          <div>
            <h2 className="font-jakarta md:text-sm text-xs font-bold">
              {selectedTab == 0 && "DASHBOARD"}
              {selectedTab == 1 && "TOP PATTERN"}
              {selectedTab == 2 && "TOP SHAPE"}
              {selectedTab == 3 && "TOP DIMENSION"}
              {selectedTab == 4 && "TOP EDGE"}
              {selectedTab == 5 && "LEG DESIGN"}
              {selectedTab == 6 && "LEG COLOR"}
              {selectedTab == 7 && "LEG MATERIAL"}
              {selectedTab == 8 && "PATTERN CATEGORY"}
              {selectedTab == 9 && "USER"}
              {selectedTab == 10 && "DEFAULT CUSTOM TABLE"}
              {selectedTab == 11 && "CUSTOMER"}
              {selectedTab == 12 && "ADVANCE SETTINGS"}
            </h2>
            <p className="font-jakarta text-xs">Dashboard/MenuActive</p>
          </div>
        </div>
        <div>
          <div className="flex gap-5 items-center">
            <img
              className="h-[30px] cursor-pointer"
              src="/assets/icons/IconNotifWhite.svg"
              alt=""
            />
            <div className="flex gap-3 items-center cursor-pointer">
              <div className="h-[30px] aspect-square rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="/assets/images/DummyBlankProfile.jpg"
                  alt=""
                />
              </div>
              <p className="font-jakarta lg:text-base md:text-sm text-xs">DW</p>
            </div>
          </div>
        </div>
      </section>
      {/* side bar section*/}
      <section className="fixed z-[5] top-[50px] flex-shrink min-h-screen w-auto bg-primary font-jakarta text-white sm:scroll-auto ">
        <ul>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (selectedTab == 0 ? "font-bold bg-[#05625E]" : "font-light")
            }
            onClick={() => setSelectedTab(0)}
          >
            <img
              className="w-4"
              src="/assets/icons/IconAdminDashboard.svg"
              alt="Dashboard"
              title="Dashboard"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Dashboard
            </span>
          </li>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (selectedTab == 1 ? "font-bold bg-[#05625E]" : "font-light")
            }
            onClick={() => setSelectedTab(1)}
          >
            <img
              className="w-4"
              src="/assets/icons/IconAdminTopPattern.svg"
              alt="Top Pattern"
              title="Top Pattern"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Top Pattern
            </span>
          </li>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (selectedTab == 2 ? "font-bold bg-[#05625E]" : "font-light")
            }
            onClick={() => setSelectedTab(2)}
          >
            <img
              className="w-4"
              src="/assets/icons/IconAdminTopShape.svg"
              alt="Top Shape"
              title="Top Shape"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Top Shape
            </span>
          </li>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (selectedTab == 3 ? "font-bold bg-[#05625E]" : "font-light")
            }
            onClick={() => setSelectedTab(3)}
          >
            <img
              className="w-4"
              src="/assets/icons/IconAdminTopDimension.svg"
              alt="Top Dimension"
              title="Top Dimension"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Top Dimension
            </span>
          </li>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (selectedTab == 4 ? "font-bold bg-[#05625E]" : "font-light")
            }
            onClick={() => setSelectedTab(4)}
          >
            <img
              className="w-4"
              src="/assets/icons/IconAdminTopEdge.svg"
              alt="Top Edge"
              title="Top Edge"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Top Edge
            </span>
          </li>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (selectedTab == 5 ? "font-bold bg-[#05625E]" : "font-light")
            }
            onClick={() => setSelectedTab(5)}
          >
            <img
              className="w-4"
              src="/assets/icons/IconDasLeg_white.svg"
              alt="Leg Design"
              title="Leg Design"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Leg Design
            </span>
          </li>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (selectedTab == 6 ? "font-bold bg-[#05625E]" : "font-light")
            }
            onClick={() => setSelectedTab(6)}
          >
            <img
              className="w-4"
              src="/assets/icons/IconAdminLegColor.svg"
              alt="Leg Color"
              title="Leg Color"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Leg Color
            </span>
          </li>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (selectedTab == 7 ? "font-bold bg-[#05625E]" : "font-light")
            }
            onClick={() => setSelectedTab(7)}
          >
            <img
              className="w-4"
              src="/assets/icons/IconAdminLegMaterial.svg"
              alt="Leg Material"
              title="Leg Material"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Leg Material
            </span>
          </li>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (selectedTab == 8 ? "font-bold bg-[#05625E]" : "font-light")
            }
            onClick={() => setSelectedTab(8)}
          >
            <img
              className="w-4"
              src="/assets/icons/IconAdminCategory.svg"
              alt="Pattern Category"
              title="Pattern Category"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Pattern Category
            </span>
          </li>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (selectedTab == 9 ? "font-bold bg-[#05625E]" : "font-light")
            }
            onClick={() => setSelectedTab(9)}
          >
            <img
              className="w-4"
              src="/assets/icons/IconAdminUser.svg"
              alt="User"
              title="User"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              User
            </span>
          </li>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (selectedTab == 10 ? "font-bold bg-[#05625E]" : "font-light")
            }
            onClick={() => setSelectedTab(10)}
          >
            <img
              className="w-4"
              src="/assets/icons/Icon_Admin__DCT.svg"
              alt="Custom Table Default"
              title="Custom Table Default"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Custom Table Default
            </span>
          </li>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (selectedTab == 11 ? "font-bold bg-[#05625E]" : "font-light")
            }
            onClick={() => setSelectedTab(11)}
          >
            <img
              className="w-4"
              src="/assets/icons/Icon_Admin__Customer.svg"
              alt="Customer"
              title="Customer"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Customer
            </span>
          </li>
          <li
            className={
              "flex items-center gap-3 lg:text-base md:text-sm text-xs px-5 py-1 h-[40px] cursor-pointer " +
              (selectedTab == 12 ? "font-bold bg-[#05625E]" : "font-light ")
            }
            onClick={() => setSelectedTab(12)}
          >
            <img
              className="w-4"
              src="/assets/icons/Icon_Admin__Setting.svg"
              alt="Advanced Settings"
              title="Advanced Settings"
              data-bs-toggle="tooltip"
            />
            <span className={isSideBar === true ? "revert" : "hidden"}>
              Advanced Settings
            </span>
          </li>
        </ul>
      </section>
      <section
        className={
          "top-[50px] h-full relative p-5 bg-[#FFF3E5] " +
          (isSideBar === true
            ? "lg:ml-[230px] md:ml-[183px] ml-[55px]"
            : "ml-[55px]")
        }
      >
        {selectedTab == 0 && <Dashboard />}

        {/* <div className="w-full cart-shadow p-5 bg-white rounded-[5px]"> */}
        {selectedTab == 1 && (
          <>
            <Pattern />
          </>
        )}
        {selectedTab == 2 && (
          <>
            <Shape />
          </>
        )}
        {selectedTab == 3 && (
          <>
            <Dimension />
          </>
        )}
        {selectedTab == 4 && (
          <>
            <Edge />
          </>
        )}
        {selectedTab == 5 && (
          <>
            <Design />
          </>
        )}
        {selectedTab == 6 && (
          <>
            <Color />
          </>
        )}
        {selectedTab == 7 && (
          <>
            <Material />
          </>
        )}
        {selectedTab == 8 && (
          <>
            <Category />
          </>
        )}
        {selectedTab == 9 && (
          <>
            <User />
          </>
        )}
        {selectedTab == 10 && (
          <>
            <DefaultCustomTable />
          </>
        )}
        {selectedTab == 11 && (
          <>
            <Customer />
          </>
        )}
        {selectedTab == 12 && (
          <>
            <AdvancedSettings />
          </>
        )}
        {/* </div> */}
      </section>
    </div>
  );
};

export default AdminCustomEnquiry;
