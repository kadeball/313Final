import React from 'react';
import Fire from "../Fire";
import TextField from "@material-ui/core/TextField";
import {Link} from "react-router-dom";
import Navbar from "./Navbar";
import { makeStyles } from '@material-ui/core/styles';
import "../App.css";


function Admin() {

    const [values, setValues] = React.useState({
        name: "",
        stock: 0,
        price: 0,
        img: ""
    });
    const [submitted, changeSubmitted] = React.useState(true);

    const [products, updateProducts] = React.useState([]);

    let db = Fire.firestore();

    React.useEffect(() => {
        let newProducts = [];

        function handleStatusChange(status) {
            updateProducts(status);
        }

        const unsubscribe = db.collection("products").get().then(
            function (snapshot) {
                snapshot.forEach(
                    function (doc) {
                        let item = {
                            name: doc.data().name,
                            stock: doc.data().stock,
                            price: doc.data().price,
                            img: doc.data().img,
                            id: doc.id
                        };
                        newProducts.push(item);
                    });

                handleStatusChange(newProducts);
            });
        return () => unsubscribe;
    }, [submitted]);

    let productList = products.map((product, idx) => {
        let storeImage;
        if (product.img !== "" && product.img.match()) {
            storeImage = <img className="storeImg" src={product.img} alt=""/>;
        } else {
            storeImage =
                <div className="noImage">No image available</div>;
        }
        return (
            <Link to={"/" + product.id} className="product" key={idx}>
                <div className="storeImg">
                    {storeImage}
                </div>
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <p>{product.stock} available</p>
            </Link>
        )
    });

    const submit = () => {
        db.collection("products").add(values).then(function(){
            alert("Item added");
            setValues({name: '', stock: 0, price: 0, img: ''});
            changeSubmitted(!submitted);
        });
    };

    let nameAlert;
    let priceAlert;
    let submitItem;
    let condition;
    let imgAlert;
    let stockAlert;


    if (values.name.length > 0 && values.stock > 0 && values.price > 0 && values.img.length > 0) {
        submitItem =
            <div className="button2" onClick={() => submit()}>Submit</div>
    }

    if (values.name.length === 0) {
        condition = true;
        nameAlert = <p>"Product name missing"</p>;
    } else if (values.stock === 0) {
        condition = true;
        priceAlert = <p>"Price of product missing"</p>;
    } else if (values.price === 0) {
        condition = true;
        stockAlert = <p>"Stock of product missing"</p>;
    } else if (values.img.length === 0) {
        condition = true;
        imgAlert = <p>"Image of product missing"</p>;
    }



    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleNumberChange = prop => event => {
        setValues({...values, [prop]: Number(event.target.value)});
    };

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            margin: "50px"
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
    }));

    const classes = useStyles();

    return (
        <div>
            <Navbar/>
            <div className={classes.root}>
                <h3>Add a Item</h3>

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

            </div>
            <div>
                {submitItem}
            </div>
            <div className="store padding">
                {productList}
            </div>
        </div>
    )
}

export default Admin;