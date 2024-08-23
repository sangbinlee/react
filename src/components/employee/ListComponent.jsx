import React, { useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import {
  deleteEmployee,
  retrieveEmployee,
} from "../../service/EmployeeService";
import PageTitle from "../PageTitle";

import Pagination from "react-bootstrap/Pagination";
import Toast from "react-bootstrap/Toast";
const ListComponent = () => {


  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const [show, setShow] = useState(false);

  const navigator = useNavigate();

  const [msg, setMsg] = useState("");

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

  const [showA, setShowA] = useState(false);

  const toggleShowA = () => setShowA(!showA);

  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  const size = 5;
  const page = 1;
  const [state, setState] = useState({
    data: [],
    limit: size,
    activePage: page,
    totalPages: 0,
  });

  const [search, setSearch] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  });




  const [pageInfo, setPageInfo] = useState({
    pages: [],
  });

  const [employee, setEmployee] = useState([]);

  function list(pageNumber) {
    // let firstName='';
    // let email='';
    retrieveEmployee(firstName, email, role, state.limit, pageNumber)
      .then((response) => {
        console.log("response", JSON.stringify(response));
        console.log(
          "totalElements",
          JSON.stringify(response.data.totalElements)
        );
        // setEmployee(response.data.content);
        setState((prev) => ({
          ...prev,
          data: response.data.content,
          totalPages: response.data.totalPages,
        }));

        state.data.map((_, index) => {
          console.log("index", index);
          console.log("state.activePage", state.activePage);
          console.log("state.limit", state.limit);
        });

        // pageInfo.pages = [];
        let numArr = [];
        for (let i = 0; i < response.data.totalPages; i++) {
          // numArr[i] = parseInt(num[i]);
          numArr[i] = i;
        }

        setPageInfo((prev) => ({
          ...prev,
          pages: numArr,
        }));
      })
      .catch((error) => {
        console.error("error", error);
        console.error("error", JSON.stringify(error));
        console.error("error.message", JSON.stringify(error.message));
        setMsg(error.message);
        // alert(error);
        setShowA(true);
      });
  }

  const isMounted = useRef(false);
  useEffect(() => {
    // console.log("useEffect ended");
    if (!isMounted.current) {
      isMounted.current = true;
      console.log("useEffect ended");
      list(1);
    }
  }, [state.limit]);

  const handlePageChange = (pageNumber) => {
    console.clear();
    console.log("pageNumber", pageNumber);
    setState((prev) => ({
      ...prev,
      // , data: [],
      activePage: pageNumber,
    }));

    list(pageNumber);
  };

  const goPage = (pageNumber) => {
    console.log("[goPage ] pageNumber", pageNumber);
    console.log("[goPage ] state.totalPages", state.totalPages);
    console.clear();
    if (pageNumber === 0 || pageNumber > state.totalPages) {
      console.log("[stop] pageNumber", pageNumber);
      return;
    }
    console.log("22 pageNumber", pageNumber);
    setState((prev) => ({
      ...prev,
      // , data: [],
      activePage: pageNumber,
    }));

    list(pageNumber);
  };
 
  const onChangeSelect = (value) => {
    const newSelection = new Set(selection);
    if (newSelection.has(value)) {
      newSelection.delete(value);
    } else {
      newSelection.add(value);
    }
    setSelection(newSelection);
    // updateSelection 함수 호출
    updateSelection([...newSelection]);
  };


  const getAbledItems = (items) => {
    return items.filter(({ disabled }) => !disabled);
  };

  const [itemKey, setItemKey] = useState(0);
  const [selection, setSelection] = useState([]);
  const [selectable, setSelectable] = useState(true);
  // const [isSelectedAll, setIsSelectedAll] = useState(true);


  const onChangeSelectAll = (e) => {
    if (e.target.checked) {
      // checked가 true인 경우 전체 선택
      const allCheckedSelection = new Set(
        // 활성화된 행의 배열을 순회하며 itemKey로 요소에 접근해 데이터를 저장
        getAbledItems(state.data).map((item) => item[itemKey])
      );
      console.log("allCheckedSelection", allCheckedSelection);
      debugger;
      setSelection(allCheckedSelection);
    } else {
      // checked가 false인 경우 전체 선택 해제
      setSelection(new Set());
    }
  };
  // 전체 선택 상태 여부
  const isSelectedAll = () => {
    return selection.size === getAbledItems(state.data).length;
  };

  return (
    <>
      <PageTitle title="list" />
      <div className="container">
        {/* test */}
        {/* toast */}
        <Toast show={showA} onClose={toggleShowA} delay={5000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            {/* <small>11 mins ago</small> */}
            <small>{msg}</small>
          </Toast.Header>
          <Toast.Body>{msg}</Toast.Body>
        </Toast>
        {/* test */}
        <h2>사용자 검색</h2>
        <div>
          <input
            name="keyword"
            type="text"
            placeholder="검색어를 입력해주세요"
          ></input>
        </div>
        <form>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              firstName
            </label>
            <input
              type="text"
              // className="form-control"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              id="firstName"
              name="firstName"
              // onChange={handleFirstName}
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              placeholder="enter firstName"
            />
            <div className="invalid-feedback">{errors.firstName}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              lastName
            </label>
            <input
              type="text"
              // className="form-control"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              id="lastName"
              // onChange={handleLastName}
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              placeholder="enter lastName"
            />
            <div className="invalid-feedback">{errors.lastName}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              // className="form-control"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              // onChange={handleEmail}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="enter email"
            />
            <div className="invalid-feedback">{errors.email}</div>
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              role
            </label>
            <select
              name="role"
              className={`form-select ${errors.role ? "is-invalid" : ""}`}
              // className="form-select"
              aria-label=".form-select-lg example"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              // onChange={handleRoles}
            >
              <option value="">Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <div className="invalid-feedback">{errors.role}</div>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handlePageChange(state.activePage)}
          >
            검색
          </button>
        </form>
        <Table striped bordered hover>
          <thead>
            <tr>
              {selectable && (
                <th>
                  <input
                    type="checkbox"
                    checked={isSelectedAll()}
                    onChange={onChangeSelectAll}
                  />
                </th>
              )}
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>email</th>
              <th>role</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {state.data.map((emp, index) => (
              <tr key={emp.id}>
                {selectable && (
                  <th>
                    <input
                      type="checkbox"
                      checked={isSelectedAll()}
                      onChange={() => onChangeSelect(emp[index])}
                    />
                  </th>
                )}
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
        <br />
        <Pagination className="px-4">
          <Pagination.First
            onClick={() => goPage(1)}
            disabled={state.activePage === 1}
          />
          <Pagination.Prev
            onClick={() => goPage(state.activePage - 1)}
            disabled={state.activePage === 1}
          />
          {pageInfo.pages.map((_, index) => {
            return (
              <Pagination.Item
                onClick={() => handlePageChange(index + 1)}
                key={index + 1}
                active={index + 1 === state.activePage}
                disabled={index + 1 === state.activePage}
              >
                {index + 1}
              </Pagination.Item>
            );
          })}
          <Pagination.Next
            onClick={() => goPage(state.activePage + 1)}
            disabled={state.activePage === state.totalPages}
          />
          <Pagination.Last
            onClick={() => goPage(state.totalPages)}
            disabled={state.activePage === state.totalPages}
          />
        </Pagination>
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
        </table> */}{" "}
      </div>
    </>
  );
};

export default ListComponent;
