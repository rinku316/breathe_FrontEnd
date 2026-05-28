import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [file, setFile] = useState(null);
  const [records, setRecords] = useState([]);

  const API_URL = "https://breathe-esg-assignment-4zgi.onrender.com";

  const fetchRecords = async () => {

    const response = await axios.get(
      `${API_URL}/upload/records`
    );

    setRecords(response.data);
  };

  useEffect(() => {
    const loadRecords = async () => {
      await fetchRecords();
    };

    loadRecords();
  }, []);

  const uploadFile = async () => {

    const formData = new FormData();

    formData.append("file", file);

    await axios.post(
      `${API_URL}/upload/sap`,
      formData
    );

    alert("File Uploaded");

    fetchRecords();
  };


  // Approved Record
  const approveRecord = async (id) => {
    await axios.put(
      `${API_URL}/upload/approve/${id}`
    );

    fetchRecords();

  };

  // Reject Record
  const rejectRecord = async (id) => {
    await axios.put(
      `${API_URL}/upload/reject/${id}`
    );

    fetchRecords();
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1>Breathe ESG Dashboard</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={uploadFile}>
        Upload CSV
      </button>

      <hr />

      <table border="1" cellPadding="10">

        <thead>
          <tr>
            <th>ID</th>
            <th>Source</th>
            <th>Activity</th>
            <th>Amount</th>
            <th>Unit</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {records.map((record) => (

            <tr key={record.id}>

              <td>{record.id}</td>

              <td>{record.sourceType}</td>

              <td>{record.activityType}</td>

              <td>{record.amount}</td>

              <td>{record.unit}</td>

              <td
                style ={{
                  color:
                    record.status === "APPROVED" ? "green"
                    : record.status === "REJECTED" ? "red"
                    : record.status === "SUSPICIOUS" ? "orange"
                    : "yellow"
                }}
              >

                {record.status}
              
              </td>

              <td> 
                <button onClick = {() => approveRecord(record.id)}>
                  Approve
                </button>

                <button onClick = {() => rejectRecord(record.id)}>
                  Reject
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default App;