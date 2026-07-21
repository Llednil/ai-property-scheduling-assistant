import { useEffect, useState } from "react";
import { getWorksheets } from "../services/api";
import "./Dashboard.css";

type ContactFilter = "all" | "contacted" | "not_contacted";

function getStatusClass(contacted: string): string {
  if (!contacted) return "";

  const normalized = contacted.trim().toLowerCase();
  if (normalized === "no") return " status-no";
  if (normalized === "unresponsive") return " status-unresponsive";
  return " contacted";
}

async function copyAddress(address: string) {
  try {
    await navigator.clipboard.writeText(address);
  } catch (error) {
    console.error("Failed to copy address:", error);
  }
}

function Dashboard() {
  const [selectedWorksheet, setSelectedWorksheet] = useState<any>(null);
  const [worksheets, setWorksheets] = useState([]);
  const [contactFilter, setContactFilter] = useState<ContactFilter>("all");

  useEffect(() => {
    async function loadWorksheets() {
      try {
        const data = await getWorksheets();
        setWorksheets(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadWorksheets();
  }, []);

  const filteredTenants = selectedWorksheet
    ? selectedWorksheet.tenants.filter((tenant: any) => {
        if (contactFilter === "contacted") return !!tenant.contacted;
        if (contactFilter === "not_contacted") return !tenant.contacted;
        return true;
      })
    : [];

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Scheduling Assistant</h1>
          <p>Property call queue</p>
        </div>

        <h2>Worksheets</h2>
        <ul className="worksheet-list">
          {worksheets.map((sheet: any) => (
            <li
              key={sheet.sheetName}
              className={`worksheet-item${
                selectedWorksheet?.sheetName === sheet.sheetName
                  ? " active"
                  : ""
              }`}
              onClick={() => setSelectedWorksheet(sheet)}
            >
              {sheet.sheetName}
            </li>
          ))}
        </ul>
      </aside>

      <main className="main">
        {!selectedWorksheet ? (
          <div className="main-empty">Select a worksheet to view tenants</div>
        ) : (
          <>
            <div className="main-header">
              <h2>{selectedWorksheet.sheetName}</h2>
              <p className="call-count">
                Showing <strong>{filteredTenants.length}</strong>{" "}
                {filteredTenants.length === 1 ? "tenant" : "tenants"}
              </p>

              <div className="filter-group">
                <span className="filter-label">Filter by status</span>
                <div className="filter-buttons">
                  <button
                    type="button"
                    className={`filter-btn${contactFilter === "all" ? " active" : ""}`}
                    onClick={() => setContactFilter("all")}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    className={`filter-btn${contactFilter === "not_contacted" ? " active" : ""}`}
                    onClick={() => setContactFilter("not_contacted")}
                  >
                    Not contacted
                  </button>
                  <button
                    type="button"
                    className={`filter-btn${contactFilter === "contacted" ? " active" : ""}`}
                    onClick={() => setContactFilter("contacted")}
                  >
                    Contacted
                  </button>
                </div>
              </div>
            </div>

            {filteredTenants.length === 0 ? (
              <div className="empty-state">
                <p>No tenants match this filter.</p>
              </div>
            ) : (
              <ul className="tenant-list">
                {filteredTenants.map((tenant: any) => (
                  <li key={tenant.id} className="tenant-card">
                    <div className="tenant-address-row">
                      <p className="tenant-address">{tenant.address}</p>
                      <button
                        type="button"
                        className="copy-btn"
                        onClick={() => copyAddress(tenant.address)}
                      >
                        Copy address
                      </button>
                    </div>
                    <div className="tenant-dates">
                      <span className="date-badge">
                        <span>Option 1</span> {tenant.option1}
                      </span>
                      <span className="date-badge">
                        <span>Option 2</span> {tenant.option2}
                      </span>
                    </div>
                    {tenant.notes && (
                      <p className="tenant-notes">
                        <span className="tenant-notes-label">Notes</span>
                        {tenant.notes}
                      </p>
                    )}
                    <span
                      className={`tenant-status${getStatusClass(tenant.contacted)}`}
                    >
                      {tenant.contacted || "Not contacted"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
