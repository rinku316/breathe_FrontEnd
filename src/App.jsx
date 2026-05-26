import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [file, setFile] = useState(null);
  const [records, setRecords] = useState([]);

  const fetchRecords = async () => {

    const response = await axios.get(
      "http://localhost:9090/upload/records"
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
      "http://localhost:9090/upload/sap",
      formData
    );

    alert("File Uploaded");

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

              <td>{record.status}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default App;