import './App.css';
import DataTable from 'react-data-table-component';
import {useEffect, useState} from "react";
import styled from "styled-components/macro";
import {fetchKittens} from "./helpers/api";
import {caseInsensitiveSort, resolveKittenResponse} from "./helpers/utility";
import Modal from "./component/modal";

const columns = [
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
    sortFunction: caseInsensitiveSort

  },
  {
    name: 'Age',
    selector: row => row.age,
  },
  {
    name: 'Ninja Level',
    selector: row => row.ninjaLevel,
    sortable: true,
  },
];


function App() {
  const [kittens, setKittens] = useState([]);
  const [clickedRow, setClickedRow] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRowClick = (row) => {
    setClickedRow(row)
  }

  useEffect(() => {
    setLoading(true)
    fetchKittens.then((data) => {
      setLoading(false)
      setKittens(resolveKittenResponse(data.results))
      fetch('http://localhost:8080/kittens', {method: 'POST', headers:{'Content-Type': 'application/json'}, body: JSON.stringify(resolveKittenResponse(data.results))})
    }).catch(()=>{
      setLoading(false)
    })
  }, [])

  // if(loading){
  //   return <TableStyling>
  //     <div className="loading">
  //       <h3>Please wait, fetching data...</h3>
  //     </div>
  //   </TableStyling>
  // }

  return (
    <TableStyling className="container">
      <Modal visible={clickedRow} closeModal={() => setClickedRow(null)}>
        {clickedRow &&
        <KittenModalStyling>
          <img src={clickedRow.image} alt={clickedRow.name}/>
          <p>Name: {clickedRow.name}</p>
          <p>Age: {clickedRow.age}</p>
          <p>Power: {clickedRow.ninjaLevel}</p>
        </KittenModalStyling>}
      </Modal>
      <div className="header">
        <h2>In House Frontend Challenge</h2>
        <p>solution</p>
      </div>
      <DataTable
        columns={columns}
        data={kittens}
        pagination
        onRowClicked={handleRowClick}
        progressPending={loading}
      />
    </TableStyling>
  );
}

const KittenModalStyling = styled.div`
  > img {
    width: 200px;
    height: 200px;
    object-fit: contain;
  }
`;

const TableStyling = styled.div`
  .header {
    margin-bottom: 40px;
  }

  .rdt {
    &_TableHeadRow {
      background-color: black;
    }
    &_TableCol, &_TableCol_Sortable {
      color: white;
      &:hover {
        color: grey;
      }
    }
    &_TableBody {
      > div:nth-child(even) {
        background: aliceblue;
      }
    }
    &_TableCell {
      > div {
        cursor: pointer;
      }
    }
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`


export default App;
