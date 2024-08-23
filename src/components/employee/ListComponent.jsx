import React, { useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import {
  deleteEmployee,
  retrieveEmployee,
} from "../../service/EmployeeService";

import PageTitle from "../PageTitle";
const ListComponent = () => {
  const [employee, setEmployee] = useState([]);
  const navigator = useNavigate();

  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      console.log("useEffect ended");
      list();
    }
  }, []);

  function list() {
    retrieveEmployee()
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }

  function form() {
    console.log("form --->");
    navigator("/form");
  }

  const update = (id) => {
    console.log(`update id=${id}`);
    navigator(`/form/${id}`);
  };

  // function update() {
  //   console.log("form --->");
  //   navigator("/form");
  // }

  const deleteOne = (id) => {
    console.log(`deleteOne id=${id}`);
    deleteEmployee(id)
      .then((response) => {
        list();
      })
      .catch((error) => {
        console.error(`[deleteOne::id=${id}] catch error=${error}`);
      })
      .finally(() => {});

    navigator(`/list`);
  };

  const data = [
    {
      id: 1,
      firstName: "이",
      lastName: "상빈",
      email: "sangbinlee9@gmail.com",
    },
    {
      id: 2,
      firstName: "이",
      lastName: "상빈2",
      email: "sangbinlee92@gmail.com",
    },
    {
      id: 3,
      firstName: "이",
      lastName: "상빈3",
      email: "sangbinlee93@gmail.com",
    },
    {
      id: 4,
      firstName: "이",
      lastName: "상빈4",
      email: "sangbinlee94@gmail.com",
    },
    {
      id: 5,
      firstName: "이",
      lastName: "상빈5",
      email: "sangbinlee95@gmail.com",
    },
  ];

  return (
    <>
      <PageTitle title="list" />
      <div className="container">
        <h2>사용자 목록</h2>

        <button type="button" className="btn btn-primary" onClick={form}>
          등록
        </button>
        <div>
          <input name="keyword" type="text" placeholder="검색어를 입력해주세요"></input>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>email</th>
              <th>role</th>
              <th>update</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((emp) => (
              <tr key={emp.id}>
                <th scope="row">{emp.id}</th>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
                <td>
                  <div className="row g-3">
                    <div className="col-auto">
                      <button
                        type="button"
                        className="btn btn-info mx-1"
                        onClick={() => update(emp.id)}
                      >
                        update
                      </button>
                    </div>
                    <div className="col-auto">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteOne(emp.id)}
                      >
                        delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* <h2>employee list 2</h2>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((emp) => (
              <tr key={emp.id}>
                <th scope="row">{emp.id}</th>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.email}</td>
              </tr>
            ))}
          </tbody>
        </table> */}

        {/* <h2>employee list 3</h2>
        <table className="table">
          <tbody>
            <tr>
              <td className="table-primary">primary</td>
              <td className="table-secondary">secondary</td>
              <td className="table-success">success</td>
              <td className="table-danger">danger</td>
              <td className="table-warning">warning</td>
              <td className="table-info">info</td>
              <td className="table-light">light</td>
              <td className="table-dark">dark</td>
            </tr>
          </tbody>
        </table> */}
      </div>
    </>
  );
};

export default ListComponent;
