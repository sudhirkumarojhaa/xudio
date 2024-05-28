import React, { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    projectName: "",
    hoursEstimated: "",
    tentativeTimeline: "",
  });
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    // Load form data from local storage when component mounts
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }

    // Load project list from local storage when component mounts
    const storedProjectList = localStorage.getItem("projectList");
    if (storedProjectList) {
      setProjectList(JSON.parse(storedProjectList));
    }
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Store form data in local storage
    localStorage.setItem("formData", JSON.stringify(formData));
    // Here you can handle your form data submission
    console.log(formData);

    // Add project to project list
    const newProjectList = [...projectList, formData];
    setProjectList(newProjectList);
    localStorage.setItem("projectList", JSON.stringify(newProjectList));
  };

  return (
    <div className="container p-4">
      <div className="row mb-3">
        <div className="col">
          <h6>Project Management Status</h6>
        </div>
      </div>
      <hr />

      <div className="row">
        <div className="col">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label className="form-label">Project Name:</label>
              <input
                type="text"
                className="form-control"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Hours Estimated:</label>
              <input
                type="text"
                className="form-control"
                name="hoursEstimated"
                value={formData.hoursEstimated}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3 d-flex flex-column">
              <label className="form-label">Tentative Timeline:</label>
              <ReactDatePicker
                className="form-control"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select a date"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col">
          <h5>Saved Projects</h5>
          {projectList.length > 0 ? (
            <ul className="list-group">
              {projectList.map((project, index) => (
                <li key={index} className="list-group-item">
                  <strong>Project Name:</strong> {project.projectName}
                  <br />
                  <strong>Hours Estimated:</strong> {project.hoursEstimated}
                  <br />
                  <strong>Tentative Timeline:</strong>{" "}
                  {project.tentativeTimeline}
                </li>
              ))}
            </ul>
          ) : (
            <p>No projects saved yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
