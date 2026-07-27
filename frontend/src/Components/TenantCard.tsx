import { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./TenantCard.css";

function TenantCard({ tenant }) {
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<number | null>(null);

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

  async function handleCopyAddress() {
    try {
      await navigator.clipboard.writeText(tenant.address);

      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }

      setCopied(true);
      copyTimeoutRef.current = window.setTimeout(() => {
        setCopied(false);
        copyTimeoutRef.current = null;
      }, 2000);
    } catch (error) {
      console.error("Failed to copy address:", error);
    }
  }

  return (
    <>
      <div className="tenant-address-row">
        <h1 className="tenant-address">{tenant.address}</h1>
        <button type="button" className="copy-btn" onClick={handleCopyAddress}>
          Copy address
        </button>
        {copied && <span className="copy-toast">Address Copied!</span>}
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
