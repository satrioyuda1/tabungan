import React from "react";

import "../styles/inputdata.css";

const TotalMoney = props => {
  return (
    <div className="totalMoney">
      <div className="description">
        Total Pemasukan
        <div className="rupiah">{props.pemasukan}</div>
      </div>
      <div className="description">
        Total Pengeluaran
        <div className="rupiah">{props.pengeluaran}</div>
      </div>
      <div className="description">
        Total Uang
        <div className="rupiah">{props.totalUang}</div>
      </div>
    </div>
  );
};

export default TotalMoney;
