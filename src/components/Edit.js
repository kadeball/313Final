import React from "react";
import Fire from "../Fire";
import TextField from "@material-ui/core/TextField";
import Navbar from "./Navbar";
import {Redirect} from 'react-router-dom';
import "../App.css";

function Edit(props) {

    const [values, setValues] = React.useState({
        name: "",
        stock: 0,
        price: 0,
        img: ""
    });
    const [submitted, changeSubmitted] = React.useState("");
    const [togglePage, changeTogglePage] = React.useState(true);


    let db = Fire.firestore();

    React.useEffect(() => {
        function handleStatusChange(status) {
            setValues(status);
        }

        //need to name it exactly what's in firestore

    const unsubscribe = db.collection("products").get().then(function (snapshot) {
        snapshot.forEach(function (doc) {
            let item = {
                name: doc.data().name,
                stock: doc.data().stock,
                price: doc.data().price,
                img: doc.data().img,
                id: doc.id
            };
            handleStatusChange(item);

        });

    });

    return () => unsubscribe;


}, [submitted]);

    const submitChange = () => {
        db.collection("products").doc(values.id).set({
            name: values.name,
            stock: values.stock,
            price: values.price,
            img: values.img,
        }).then(function () {
            alert("Product updated");
            changeTogglePage(!togglePage);
        })
    };



    let nameAlert;
    let condition;
    let imgAlert;
    let priceAlert;
    let stockAlert;
    let editButton;


    if (values.name.length === 0) {
        condition = true;
        nameAlert = <p>"Please enter a product name."</p>;
    } else if (values.stock === 0) {
        condition = true;
        stockAlert = <p>"Please enter a stock value."</p>;
    } else if (values.price === 0) {
        condition = true;
        priceAlert = <p>"Please enter a price value."</p>;
    } else if (values.img.length === 0) {
        condition = true;
        imgAlert = <p>"Please enter an image path."</p>;
    }

    if (values.name.length > 0 && values.stock > 0 && values.price > 0 && values.img.length > 0) {
        editButton =
            <div className="button2" onClick={() => submitChange()}>Update</div>
    }

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleNumberChange = prop => event => {
        setValues({...values, [prop]: Number(event.target.value)});
    };

    const back = () => {
        changeTogglePage(!togglePage);
    };

    if(togglePage) {
        return (
            <div>
                <Navbar/>
                <div className="admin padding">
                    <h2>Edit Item</h2>

                    <TextField
                        id="standard-basic"
                        placeholder="Item Name"
                        margin="normal"
                        fullWidth
                        color="secondary"
                        onChange={handleChange('name')}
                        error={condition}
                        value={values.name}
                        variant="outlined"
                    />
                    {nameAlert}


                    <TextField id="standard-basic"
                               margin="normal"
                               type="number"
                               placeholder="Item Stock"
                               fullWidth
                               variant="outlined"
                               onChange={handleNumberChange('stock')}
                               error={condition}
                               value={values.stock}
                    />
                    {stockAlert}


                    <TextField id="standard-basic"
                               margin="normal"
                               type="number"
                               placeholder="Item Price"
                               variant="outlined"
                               fullWidth
                               onChange={handleNumberChange('price')}
                               error={condition}
                               value={values.price}
                    />
                    {priceAlert}


                    <TextField id="standard-basic"
                               margin="normal"
                               type="text"
                               fullWidth
                               placeholder="Item Image"
                               variant="outlined"
                               onChange={handleChange('img')}
                               error={condition}
                               value={values.img}
                    />
                    {imgAlert}
                    {editButton}

                    <div className="button2"
                         onClick={() => back()}>Back to Admin Page
                    </div>
                </div>
            </div>
        )
    } else {
        return (<Redirect to="/admin"/>)
    }
}
export default Edit;