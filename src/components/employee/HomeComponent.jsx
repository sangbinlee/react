import React, { useState } from "react";
// import ShowRenderedHTML from "../ShowRenderedHTML.js";
import { useNavigate } from "react-router-dom";
import PageTitle from "../PageTitle";
const HomeComponent = () => {
  const navigator = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState("");

  function handleFirstName(e) {
    setFirstName(e.target.value);
  }

  function handleLastName(e) {
    setLastName(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleRoles(e) {
    setRoles(e.target.value);
  }

  function save(e) {
    e.preventDefault();
    console.log("save ...>");
  }

  function list() {
    console.log("list --->");
    navigator("/list");
  }

  return (
    <>
      <PageTitle title="Home" />
      <div className="container">
        <h2>사용자관리(employee)</h2>
        <button type="button" className="btn btn-primary" onClick={list}>
          사용자 목록
        </button>
      </div>
    </>
  );
};

export default HomeComponent;
