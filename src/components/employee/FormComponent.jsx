import React, { useEffect, useState, useRef } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
  createEmployee,
  retrieveEmployeeById,
  updateEmployee,
} from "../../service/EmployeeService";
import PageTitle from "../PageTitle";
const FormComponent = () => {
  const { id } = useParams();
  const navigator = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  // 초기값 세팅 1
  // const [firstName, setFirstName] = useState("sangbin");
  // const [lastName, setLastName] = useState("lee");
  // const [email, setEmail] = useState("sangbinlee9@gmail.com");
  // const [role, setRole] = useState("3");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors }; // 이게 뭐야?
    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "firstName is required";
      valid = false;
    }
    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "lastName is required";
      valid = false;
    }
    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "email is required";
      valid = false;
    }
    if (role.trim()) {
      errorsCopy.role = "";
    } else {
      errorsCopy.role = "role is required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  // 초기값 세팅 2
  function testData() {
    setFirstName("sangbin222");
    setLastName("lee222");
    setEmail("sangbinlee9@gmail.com222");
    setRole("");

    const employee = { firstName, lastName, email, role };
    console.log("1 save employee --->", employee); // 화면에 값은 들어가는데 employee 값은 왜 빈값이 아니지???????  시간차????????????
  }

  // function handleFirstName(e) {
  //   setFirstName(e.target.value);
  // }
  // const handleFirstName=(e)=> {
  //   setFirstName(e.target.value);
  // }
  // const handleFirstName=(e)=>  setFirstName(e.target.value);

  // function handleLastName(e) {
  //   setLastName(e.target.value);
  // }
  // const handleLastName=(e)=> {
  //   setLastName(e.target.value);
  // }
  // const handleLastName=(e)=>  setLastName(e.target.value)

  // function handleEmail(e) {
  //   setEmail(e.target.value);
  // }
  // const handleEmail=(e)=> {
  //   setEmail(e.target.value);
  // }
  // const handleEmail=(e)=>  setEmail(e.target.value);

  // function handleRoles(e) {
  //   setRole(e.target.value);
  // }
  // const handleRoles = (e) => {
  //   setRole(e.target.value);
  // };
  // const handleRoles = (e) => setRole(e.target.value);

  function save(e) {
    e.preventDefault();

    // testData(); // TODO DELETE AFTER TEST

    const employee = { firstName, lastName, email, role };
    console.log("2 save employee --->", employee);
    console.log("2 save id --->", id);

    if (validateForm()) {
      if (id) {
        employee.id = id
        console.log("employee", employee);
        updateEmployee(employee)
          .then((response) => {
            console.log(
              "[save::updateEmployee] then 성공 response=",
              response.data
            );

            list();
          })
          .catch((error) => {
            console.error("[save::updateEmployee] catch error=", error);
          })
          .finally(() => {
            console.log("[save::updateEmployee] finally");
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log(
              "[save::createEmployee] then 성공 response=",
              response.data
            );

            list();
          })
          .catch((error) => {
            console.error("[save::createEmployee] catch error=", error);
          })
          .finally(() => {
            console.log("[save::createEmployee] finally");
          });
      }
    }
  }

  function list() {
    console.log("list --->");
    navigator("/list");
  }

  function pageTitle() {
    let title = "등록";
    if (id) {
      title = `수정 ${id}`;
    }
    return title;
  }

  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      console.log("useEffect ended");
      if (id) {
        getOne();
      }
    }
  }, [id]);

  function getOne() {
    retrieveEmployeeById(id)
      .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setRole(response.data.role);
      })
      .catch((error) => {
        console.error("error", error);
      }).finally(()=>{
        
      });
  }



  return (
    <>
      <PageTitle title="form" />
      <div className="container">
        <h2>사용자 {pageTitle()}</h2>

        <button type="button" className="btn btn-primary" onClick={list}>
          사용자 목록
        </button>

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
          {/* <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div> */}

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

          {/* <div className="mb-3">
          <label htmlFor="role" className="form-label">
            role
          </label>
          <select
            className="form-select"
            multiple
            aria-label="multiple select example"
            id="role"
          >
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div> */}

          {/* <div className="mb-3 form-check">
          <input
            name="pushs"
            type="checkbox"
            className="form-check-input"
            id="pushs"
            checked
          />
          <label className="form-check-label" htmlFor="pushs">
            pushs
          </label>
        </div> */}

          {/* <div className="mb-3 form-check form-switch">
          <input
            name="push"
            className="form-check-input"
            type="checkbox"
            id="push"
            checked
          />
          <label className="form-check-label" htmlFor="push">
            push
          </label>
        </div> */}

          <button type="submit" className="btn btn-primary" onClick={save}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default FormComponent;
