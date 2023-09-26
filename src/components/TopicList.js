import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { skillList } from "../assets/dataSource";
import "../App.css";
import {
  Button,
  Modal,
  FormControl,
  FormGroup,
  Button as ModalButton,
} from "react-bootstrap";

function TopicList() {
  const [topics, setTopics] = useState(skillList);

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState("");
  const [markAsComplete, setMarkAsComplete] = useState(false);

  useEffect(() => {
    // Save topics to local storage when they change
    localStorage.setItem("topics", JSON.stringify(topics));
  }, [topics]);

  const openModal = (topic) => {
    setSelectedTopic(topic);
    setNotes(topic.notes || ""); // Load existing notes for the selected topic
    setShowModal(true);
    setMarkAsComplete(topic.isComplete || false); // Load the completion status
  };

  const closeModal = () => {
    setSelectedTopic(null);
    setShowModal(false);
  };

  const saveNotes = () => {
    // Save notes and completion status to the selected topic in local storage
    if (selectedTopic) {
      const updatedTopics = topics.map((topic) =>
        topic.id === selectedTopic.id
          ? { ...topic, notes: notes, isComplete: markAsComplete }
          : topic
      );
      setTopics(updatedTopics);
      localStorage.setItem("topics", JSON.stringify(updatedTopics));
    }

    // Close the modal
    closeModal();
  };

  const clearAllNotes = () => {
    // Clear all notes and completion status by removing these properties from all topics
    const updatedTopics = topics.map((topic) => ({
      ...topic,
      notes: "",
      isComplete: false,
    }));
    setTopics(updatedTopics);
    localStorage.setItem("topics", JSON.stringify(updatedTopics));
  };

  return (
    <div className="topic-list-container">
      <div className="topic-list d-flex flex-wrap">
        {topics.map((topic) => (
          <div key={topic.id} className="topic-item">
            <Button
              className={`${
                topic.isComplete
                  ? "bg-warning"
                  : topic.notes
                  ? "bg-info"
                  : "bg-light"
              }`}
              onClick={() => openModal(topic)}
            >
              <h6 className={`m-0 p-2 text-dark`}>{topic.name}</h6>
            </Button>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h6 className="text-dark">
              {" "}
              {selectedTopic && selectedTopic.name}
            </h6>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <FormControl
              as="textarea"
              rows={5}
              placeholder="Add your notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-end m-3">
            <Button
              className="btn btn-danger"
              variant={markAsComplete ? "success" : "light"}
              onClick={() => setMarkAsComplete(!markAsComplete)}
            >
              Mark as Complete
            </Button>
          </div>
          <Button variant="secondary" onClick={closeModal}>
            Close Modal
          </Button>
          <ModalButton variant="primary" onClick={saveNotes}>
            Save Notes
          </ModalButton>
        </Modal.Footer>
      </Modal>

      <Button
        variant="danger"
        className="clear-all-button mt-2"
        onClick={clearAllNotes}
      >
        Clear All
      </Button>
    </div>
  );
}

export default TopicList;
