import React from 'react';
import Fire from "../Fire";
import $ from 'jquery';
import "../App.css";
import Navbar from "./Navbar";
import Button from '@material-ui/core/Button';


function Store() {

    const [products, updateProducts] = React.useState([]);
    const [submitted, changeSubmitted] = React.useState("");
    const [modal, changeModal] = React.useState(true);



    const containerStyles = (id, stock) => {
        // console.log(id);
        if (modal) {
            $('#' + id + '').css({
                position: "fixed",
                top: "200px",
                bottom: "500px",
                right: "200px",
                left: "0px",
                width: "100%",
                height: "600px",
                zIndex: "5px",
                alignItems: "center"
            });
            if (stock !== 0) {
                $('.storeButton').css({
                    display: "block"
                })
            }
        } else {
            $('#' + id + '').css({
                position: "relative",
                zIndex: "0px",
                top: "0px",
                bottom: "0px",
                right: "0px",
                left: "0px",
                height:"600px",
                width: "600px"
            });
            $('.storeButton').css({
                display: "none"
            })
        }
        changeModal(!modal);
    };

    const addToCart = (product) => {
        db.collection("cart").add(product).then(function(){
            alert("Item added to cart");
            changeSubmitted(!submitted);
        });
    };

    let db = Fire.firestore();

    React.useEffect(() => {
        let newProducts = [];

        function handleChange(status) {
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

                handleChange(newProducts);
            });
        return () => unsubscribe;
    }, [submitted]);

    let productList = products.map((product, idx) => {
        let background;
        let textColor;
        if (product.stock > 100) {
            background = "red";
            textColor = "white";
        } else if (product.stock < 10) {
            background = "blue";
            textColor = "white";
        }

        let storeImage;
        if (product.img !== "" && product.img.match(/\//)) {
            storeImage = <img className="image" src={product.img} alt=""/>;
        } else {
            storeImage =
                <div className="noimage">No image available</div>;
        }

        return (
            <div className="product" id={product.id} key={idx}
                 onClick={() => containerStyles(product.id, product.stock)}
                 style={{backgroundColor: background, color: textColor}}>
                <div className="storeImg">
                    {storeImage}
                </div>
                <h2>{product.name}</h2>
                <p>${product.price}</p>
                <p>{product.stock} in stock</p>
                <div color="secondary"  className=" button storeButton"
                     onClick={() => addToCart(product)}>Add to Cart
                </div>
            </div>
        )
    });

    return (
        <div>
            <Navbar/>
            <div className="store">
                {productList}
            </div>
        </div>
    )
}

export default Store;