import React from "react";
import "./Modal.css";

export default function Modal({ handleOpenModal, locations, chooseLocation }) {
  const handleModalState = (e) => {
    if (e.target.id === "modal-container") {
      handleOpenModal(false);
    }
  };

  return (
    <div
      id="modal-container"
      className="modal-container"
      onClick={(e) => handleModalState(e)}
    >
      <div className="modal-body">
        <div className="exit-btn" onClick={() => handleOpenModal(false)}>
          <p>&#x2715;</p>
        </div>
        <div className="modal-header">
          <h2>Multiple Locations Found</h2>
          <h3>Please select a location</h3>
        </div>
        {/* locations returned from api do not have a unique id, using idx */}
        <div className="modal-locations">
          {locations.map((location, idx) => (
            <React.Fragment key={idx}>
              <hr />
              <div
                className="modal-location"
                onClick={() => chooseLocation(location)}
              >
                <div>
                  <p>{location.name}</p>
                  {location.state !== undefined && <p>, {location.state} </p>}
                  <p>, {location.country}</p>
                </div>
                <p>
                  {location.lat} {location.lon}
                </p>
              </div>
              <hr />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
