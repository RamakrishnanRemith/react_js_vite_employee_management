import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css";

function Home() {
  const [adminCount, setAdminCount] = useState();
  const [employeeCount, setEmployeeCount] = useState();
  const [salary, setSalary] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8081/adminCount")
      .then((res) => {
        setAdminCount(res.data[0].admin);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8081/employeeCount")
      .then((res) => {
        setEmployeeCount(res.data[0].employee);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8081/salary")
      .then((res) => {
        setSalary(res.data[0].sumOfSalary);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div>
        <ul class="box-info">
          <li>
            <i class="col-sm-12 col-lg-4 order-sm-2"></i>

            <h3>0</h3>
            <p>New Order</p>
          </li>
          <li>
            <i class="bx bxs-group"></i>
            <span class="text">
              <h3>{adminCount}</h3>
              <p>Visitors</p>
            </span>
          </li>
          <li>
            <i class="bx bxs-dollar-circle"></i>
            <span class="text">
              <h3>$0</h3>
              <p>Total Sales</p>
            </span>
          </li>
        </ul>
      </div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="box-info">
          <div className="bx bxs-calendar-check">
            <h4>Admin</h4>
          </div>
          <hr />
          <div className="">
            <h5>Total: {adminCount}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Employee</h4>
          </div>
          <hr />
          <div className="">
            <h5>Total:{employeeCount}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Salary</h4>
          </div>
          <hr />
          <div className="">
            <h5>Total:{salary}</h5>
          </div>
        </div>
      </div>

      {/* List of admin  */}
      <div className="mt-4 px-5 pt-3">
        <h3>List of Admins</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Admin</td>
              <td>Admin</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
