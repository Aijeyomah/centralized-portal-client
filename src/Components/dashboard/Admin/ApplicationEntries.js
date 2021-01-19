import React, { useState, useEffect } from "react";
import "./ApplicationEntries.css";
import axios from "axios";

const initialState = {
  currentSort: "default",
};
const ApplicationEntries = () => {
  const [state, setState] = useState(initialState);
  const [sortedField, setSortedField] = useState(null);
  const [batch, setBatch] = useState(1);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    let config = {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };
    axios
      .get(`/api/v1/getApplicationEntriesByBatch/${batch}`, config)
      .then((res) => {
        const data = res.data.data;
        setTableData([...data]);
        console.log(tableData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [batch]);

  // const tableData = [
  //     {
  //         name: 'Ify Chinke',
  //         email: 'ify@enyata.com',
  //         dob: '12/09/17',
  //         age: 20,
  //         address: '3 Sabo Ave, Yaba, Lagos',
  //         university: 'University of Nigeria',
  //         cgpa: 1.5,
  //         batch: 1,
  //     },
  //     {
  //         name: 'Ify Chinke',
  //         email: 'ify@enyata.com',
  //         dob: '12/09/17',
  //         age: 27,
  //         address: '3 Sabo Ave, Yaba, Lagos',
  //         university: 'University of Nigeria',
  //         cgpa: 4.0,
  //         batch: 1,
  //     },
  //     {
  //         name: 'Ify Chinke',
  //         email: 'ify@enyata.com',
  //         dob: '12/09/17',
  //         age: 29,
  //         address: '3 Sabo Ave, Yaba, Lagos',
  //         university: 'University of Nigeria',
  //         cgpa: 3.5,
  //         batch: 2,
  //     },
  //     {
  //         name: 'Ify Chinke',
  //         email: 'ify@enyata.com',
  //         dob: '12/09/17',
  //         age: 18,
  //         address: '3 Sabo Ave, Yaba, Lagos',
  //         university: 'University of Nigeria',
  //         cgpa: 2.5,
  //         batch: 3,
  //     }
  // ];

  const handleChange = (e) => {
    let text = e.target.value;
    let batchId = parseInt(text.slice(5));
    setBatch(batchId);
  };

  const sortTypes = {
    up: {
      class: "sort-up",
      fn: (a, b) => a[sortedField] - b[sortedField],
    },
    down: {
      class: "sort-down",
      fn: (a, b) => b[sortedField] - a[sortedField],
    },
    default: {
      class: "sort",
      fn: (a, b) => a,
    },
  };

  // method called every time the sort button is clicked
  // it will change the currentSort value to the next one
  const onSortChange = () => {
    const { currentSort } = state;
    let nextSort;

    if (currentSort === "down") nextSort = "up";
    else if (currentSort === "up") nextSort = "default";
    else if (currentSort === "default") nextSort = "down";

    setState({
      currentSort: nextSort,
    });
  };

  const { currentSort } = state;

  return (
    <div className="entries_wrapper">
      <div>
        <h2>
          Entries -
          <select
            className="entry_box"
            value={batch.selectValue}
            onChange={handleChange}
          >
            <option value="batch1">Batch 1</option>
            <option value="batch2">Batch 2</option>
            <option value="batch3">Batch 3</option>
          </select>
        </h2>
        <p>Comprises of all that applied for batch {batch}</p>
      </div>

      <table className="entries_table">
        <thead>
          <tr className="table_head">
            <th>Name</th>
            <th>Email</th>
            <th>
              DOB-Age
              <button
                onClick={() => {
                  setSortedField("age");
                  onSortChange();
                }}
              >
                <i className={`fas fa-${sortTypes[currentSort].class}`} />
              </button>
            </th>
            <th>Address</th>
            <th>University</th>
            <th>
              CGPA
              <button
                onClick={() => {
                  setSortedField("cgpa");
                  onSortChange();
                }}
              >
                <i className={`fas fa-${sortTypes[currentSort].class}`} />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {[...tableData]
            .sort(sortTypes[currentSort].fn)
            .filter((e) => {
              return e.batch == batch;
            })
            .map((el, id) => (
              <tr key={id} className="entries_tr">
                <td className="entries_batch">
                  {el.first_name + " " + el.last_name}{" "}
                </td>
                <td>{el.email_address}</td>
                <td>
                  {el.date_of_birth} - {el.age}
                </td>
                <td>{el.address}</td>
                <td>{el.university}</td>
                <td>{el.cgpa}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationEntries;
