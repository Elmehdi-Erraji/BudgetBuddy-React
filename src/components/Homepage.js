import React from "react";
import Expenses from "./Depenses";
import ExpenseList from "./DepensesList";
import Create from "./Create";

function Homepage({ expenses }) {
    
  return (
    <div>
      <div className="row mt-3">
        <div className="col-sm">
          <Expenses />
        </div>
      </div>
      <h3 className="mt-3">Expenses</h3>
      <div className="row mt-3">
        <div className="col-sm">
          <ExpenseList expenses={expenses} />
        </div>
      </div>
     
    </div>
  );
}
export default Homepage;
