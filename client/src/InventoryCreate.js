import React, {useState} from "react";
import axios from 'axios'

const InventoryCreate = ({onInventoryAdded}) =>{
    const [title, setTitle] = useState('')
    const [manufacturer, setManufacturer] = useState('')
    const [quantity, setQuantity] = useState('')

    const onSubmit = async (event) =>{
        event.preventDefault();
        try{
            const response = await axios.post('http://localhost:4000/parts', {
                title, manufacturer, quantity
            });
            console.log(title, 'is added')
            onInventoryAdded(response.data)
            setTitle('')
            setManufacturer('')
            setQuantity('')
        }catch (error){
            console.log('Error adding inventory item', error)
        }
        
    }
    return (<div>
        <form onSubmit={onSubmit}>
            <div className="row">
                <div className="col-4 align-self-center">
            <div className="form-group">
                <label>Inventory Item</label>
                <input value={title} onChange={e => setTitle(e.target.value)} className="form-control"></input>
                <label>Manufacturer</label>
                <input value={manufacturer} onChange={e => setManufacturer(e.target.value)} className="form-control"></input>
                <label>Quantity</label>
                <input value={quantity} onChange={e => setQuantity(e.target.value)} className="form-control"></input>
            </div>
            <button className="btn btn-primary">Submit</button>
            </div>
            </div>
        </form>
        </div>
    )}

export default InventoryCreate;