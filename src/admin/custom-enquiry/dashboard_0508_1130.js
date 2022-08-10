import { useState } from "react";
import { AddButton, MiniButtonWithIcon, SearchBar } from "../../components";
import { formatRupiah } from "../../utils";
import { uid } from "uid";
import TotalVisitor from "./TotalVisitor";
import TotalEnquiry from "./TotalEnquiry";
import VisitorChart from "./VisitorChart";
import CustomerActivity from "./CustomerActivity";
import AccessFrom from "./AccessFrom";
import VisitorChart from "./VisitorChart";


const Dashboard = () => {
  return (
    <>{/*
      <div className="grid grid-cols-3 grid-rows-4 gap-4">
        <div>
          <TotalVisitor />
        </div>
        <div>
          <TotalEnquiry />
          </div>
        <div className="row-span-2">
          <CustomerActivity />
        </div>
        <div className=" col-span-2">
          <Traffic />
        </div>
        <div className="col-span-2">Board Total</div>
        <div className="row-span-2"><AccessFrom /></div>
      </div>
  */}

      {/* marco 2*/}
      <div className="container-dashboard grid grid-cols-3 grid-rows-4 gap-4">
        <div class="visitor"><TotalVisitor /></div>
        <div class="enquiry"><TotalEnquiry /></div>
        <div class="fav_pattern"><TotalEnquiry /></div>
        <div class="fav_leg"><TotalEnquiry /></div>
        <div class="activity"><CustomerActivity /></div>
        <div class="chart"><VisitorChart /></div>
        <div class="board">Board</div>
        <div class="access"><AccessFrom /></div>
        
      </div>
    <hr />
      {/* marco 3 */}
      <div class="grid grid-cols-3 grid-rows-6 gap-4">
        <div class="bg-red-300"><TotalVisitor /></div>
        <div class="bg-red-300"><TotalEnquiry /></div>
        <div class="bg-lime-300 row-span-3"><CustomerActivity /></div>
        <div class="bg-red-300 col-span-2 row-span-2"><Chart /></div>
        <div class="bg-red-300 col-span-2">Board Total</div>
        <div class="bg-lime-300 row-span-3"><AccessFrom /></div>
      </div>
    </>
  );
};

export default Dashboard;
