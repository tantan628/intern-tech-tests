import '../AdditionalFiles/App.css';
import * as React from "react";
import { useState, useEffect } from "react";

//This is the API url to fetch from
const API_URL = 'https://matchesfashion.com/api/products';
const TAX_RATE = 0.08;

function YourSolution() {
  const [pageData, setPageData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currPage, setCurrPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  const calculateProfit = ({ quantitySold, costToBusiness, soldPrice }) => {
    let tax = 0;
    const profitPerItem = soldPrice - costToBusiness;
    if(quantitySold > 10) {
      tax = (quantitySold - 10) * profitPerItem * TAX_RATE;
    } 
    const output = (quantitySold * profitPerItem) - tax;
    return `£${output.toFixed(2)}`
  }

  useEffect(() => {
    fetch(API_URL + `?page=${currPage}`)
      .then((data) => {
        return data.json()
      })
      .then((res) => {
        console.log(res.products)
        setPageData(res.products);
        setTotal(res.count);
        setLastPage(Math.ceil(res.count / 10) - 1);
      })
  }, [currPage, total]);

  return (
    <div className="App">
      <table id="products">
        <thead>
        <tr>
          <th>Id</th>
          <th>Brand</th>
          <th>Name</th>
          <th>Quantity Sold</th>
          <th>Sold Price</th>
          <th>Cost To Business</th>
          <th>Profit After Tax</th>
        </tr>
        </thead>
          <tbody>
            {pageData.map((product) => {
              return (
                <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.brand}</td>
                <td>{product.name}</td>
                <td>{product.quantitySold}</td>
                <td>{`£${product.soldPrice.toFixed(2)}`}</td>
                <td>{`£${product.costToBusiness.toFixed(2)}`}</td>
                <td>{calculateProfit(product)}</td>
                </tr>
              )
            })}
          </tbody>
      </table>
      <button onClick={() => setCurrPage(0)} disabled={currPage === 0}>
        First Page
      </button>
      <button onClick={() => setCurrPage((currentPage) => {return currentPage - 1})} disabled={currPage === 0}>
        Previous Page
      </button>
      <button onClick={() => setCurrPage((currentPage) => {return currentPage + 1})} disabled={currPage === lastPage}>
        Next Page
      </button>
      <button onClick={() => setCurrPage(() => {return lastPage})} disabled={currPage === lastPage}>
        Last Page
      </button>
    </div>
  );
}

export default YourSolution;
