import React, {useState, useEffect} from "react";
import axios from 'axios'
import QualityCreate from "./QualityCreate"
import InventoryCreate from "./InventoryCreate";
// import QualityList from "./QualityList"

const InventoryList = () =>{
    const [inventories, setInventories] = useState([]);
    
    const fetchResults = async () => {
      try{
        const res = await axios.get('http://localhost:4002/parts')
        // console.log(res.data)
        const inventoryArray = Array.isArray(res.data) ? res.data : Object.values(res.data);
        setInventories(inventoryArray)
      }catch (error){
        console.error('Error fetching inventory:', error);
        setInventories([])
      } 
    };
    useEffect(() => {
        fetchResults();
    }, []);

    const handleInventoryAdded = (newItem) =>{
      setInventories(prevInventories => [...prevInventories, newItem]);
    }

    console.log(inventories)

    const renderedPosts = Array.isArray(inventories) ? inventories.map((part) => (
          <div
            className="card"
            style={{ width: "30%", marginBottom: "20px" }}
            key={part.id}
          >
            <div className="card-body">
              <h3 className="card-subtitle mb-2 text-body-secondary">Inventory Item:</h3> 
              <h5 className="card-text">{part.title}</h5>
              <h3 className="card-subtitle mb-2 text-body-secondary">Manufacturer:</h3> 
              <h5 className="card-text">{part.manufacturer}</h5>
              <h3 className="card-subtitle mb-2 text-body-secondary">Quantity:</h3> 
              <h5 className="card-text">{part.quantity}</h5>
            </div>
            <div className="card-body mb-2" >
              <h3>Enter The Quality Report Here</h3>
              {/* <QualityList comments={inventory.comments} /> */}
              <QualityCreate partId={part.id} />
            </div>
          </div>
      )) : null;

      return (
        <div>
          <h2>Create an inventory record</h2>
          <InventoryCreate onInventoryAdded = {handleInventoryAdded}/>
          <hr/>
          <h2>All Inventory Records</h2>
        <div className="d-flex flex-row flex-wrap justify-content-between">
          {renderedPosts}
        </div>
        </div>
      );
    };

export default InventoryList;