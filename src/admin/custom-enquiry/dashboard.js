import { useState } from "react";
import { AddButton, MiniButtonWithIcon, SearchBar } from "../../components";
import { formatRupiah } from "../../utils";
import { uid } from "uid";
import TotalVisitor from "./TotalVisitor";
import TotalEnquiry from "./TotalEnquiry";
import VisitorChart from "./VisitorChart";
import CustomerActivity from "./CustomerActivity";
import BoardTotal from "./BoardTotal";
import AccessFrom from "./AccessFrom";
import FavPattern from "./FavPattern";
import FavLeg from "./FavLeg";

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 mb-6 w-full xl:grid-cols-2 2xl:grid-cols-4">
        <div>
          <TotalVisitor />
        </div>
        <div>
          <TotalEnquiry />
        </div>
        <div>
          <FavPattern />
        </div>
        <div>
          <FavLeg />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-6 w-full xl:grid-cols-2 2xl:grid-cols-3">
        <div className="bg-white shadow-lg shadow-gray-200 rounded-md p-4 bg-gradient-to-r from-dark-800 to-dark-900 2xl:col-span-2">
          <VisitorChart />
        </div>
        <CustomerActivity />
      </div>
      <div  className="grid grid-cols-1 gap-4 mb-6 w-full xl:grid-cols-2 2xl:grid-cols-2">
        <div className="mb-4 h-full bg-white rounded-md shadow-lg shadow-gray-200">
          <BoardTotal />
        </div>
        <div className="bg-white shadow-lg shadow-gray-200 rounded-md p-4 mb-4 xl:mb-0">
          <div>
            <AccessFrom />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
