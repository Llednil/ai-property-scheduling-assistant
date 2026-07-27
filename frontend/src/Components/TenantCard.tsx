import PropTypes from "prop-types";
import "../Pages/Dashboard.css";

function TenantCard({ tenant }) {
  let statusLabel;
  let statusClass = "";

  const normalized = (tenant.contacted || "").trim().toLowerCase();

  if (!normalized) {
    statusLabel = "Not contacted";
  } else if (normalized === "no") {
    statusLabel = "No";
    statusClass = " status-no";
  } else if (normalized === "unresponsive") {
    statusLabel = "Unresponsive";
    statusClass = " status-unresponsive";
  } else if (
    normalized === "contacted" ||
    normalized === "confirmed" ||
    normalized === "yes"
  ) {
    statusLabel = "Contacted";
    statusClass = " contacted";
  } else {
    statusLabel = tenant.contacted;
  }

  return (
    <>
      <div className="tenant-address-row">
        <h1 className="tenant-address">{tenant.address}</h1>
        <button type="button" className="copy-btn">
          Copy address
        </button>
      </div>
      <div className="tenant-dates">
        <span className="date-badge"> {tenant.option1}</span>
        <span className="date-badge"> {tenant.option2}</span>
      </div>
      <div className="tenant-notes">
        <span className="tenant-notes-label">Notes</span>
        <p>{tenant.notes}</p>
      </div>
      <span className={`tenant-status${statusClass}`}>{statusLabel}</span>
    </>
  );
}

TenantCard.propTypes = {
  address: PropTypes.string.isRequired,
  option1: PropTypes.string.isRequired,
  option2: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default TenantCard;
