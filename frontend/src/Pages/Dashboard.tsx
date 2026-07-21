import { useEffect, useState } from "react";
import { getWorksheets } from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const [selectedWorksheet, setSelectedWorksheet] = useState<any>(null);
  const [worksheets, setWorksheets] = useState([]);

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

  const pending = selectedWorksheet
    ? selectedWorksheet.tenants.filter((tenant: any) => !tenant.contacted)
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
          <div className="main-empty">
            Select a worksheet to view pending calls
          </div>
        ) : (
          <>
            <div className="main-header">
              <h2>{selectedWorksheet.sheetName}</h2>
              <p className="call-count">
                <strong>{pending.length}</strong>{" "}
                {pending.length === 1 ? "call" : "calls"} remaining
              </p>
            </div>

            {pending.length === 0 ? (
              <div className="empty-state">
                <p>All caught up — no pending calls in this worksheet.</p>
              </div>
            ) : (
              <ul className="tenant-list">
                {pending.map((tenant: any) => (
                  <li key={tenant.id} className="tenant-card">
                    <p className="tenant-address">{tenant.address}</p>
                    <div className="tenant-dates">
                      <span className="date-badge">
                        <span>Option 1</span> {tenant.option1}
                      </span>
                      <span className="date-badge">
                        <span>Option 2</span> {tenant.option2}
                      </span>
                    </div>
                    <span className="tenant-status">Pending</span>
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
