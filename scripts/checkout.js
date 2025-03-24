import {cart,removefromcart,calculatecartquantity,savetostorage} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatecurrency } from './utility/money.js';



let cartSummaryHTML="";
cart.forEach((cartitem)=>{

    const productId=cartitem.productId;

    let matchingproduct;

    products.forEach((product)=>{
        if(productId===product.id){
            matchingproduct=product;
        }
    });

    cartSummaryHTML+=
    `<div class="cart-item-container js-cart-item-container-${matchingproduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingproduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingproduct.name}
        </div>
        <div class="product-price">
          $${formatecurrency(matchingproduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-cart-quantity-${matchingproduct.id}">${cartitem.quantity}</span>
          </span>
          <span class="update-quantity-link-${matchingproduct.id} link-primary js-update-link" data-product-id="${matchingproduct.id}">
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingproduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingproduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingproduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingproduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
});

document.querySelector('.order-summary').innerHTML=cartSummaryHTML;

//delete button 
document.querySelectorAll('.js-delete-link')
.forEach((link)=>{
    link.addEventListener('click',()=>{
     const productId=link.dataset.productId;
       removefromcart(productId);
       const container=document.querySelector(`.js-cart-item-container-${productId}`)
       container.remove()
      updatecheckquantity();
    });
});

function updatecheckquantity(){
   const cartquantity=calculatecartquantity();
   document.querySelector(".check-quantity").innerHTML=`${cartquantity} item`;
}
updatecheckquantity();

//update button
document.querySelectorAll('.js-update-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId=link.dataset.productId;

    document.querySelector(`.update-quantity-link-${productId}`).innerHTML=
    `<button class="quantity-sub-btn-${productId}">-</button>
    <button class="quantity-add-btn-${productId}">+</button>`

    //add button
    document.querySelector(`.quantity-add-btn-${productId}`).addEventListener('click',()=>{
      cart.forEach((item)=>{
        if(item.productId===productId){
          item.quantity+=1;
          document.querySelector(`.js-cart-quantity-${productId}`).innerHTML=item.quantity;
          updatecheckquantity()
          savetostorage()
        }
      })
    })
    //sub button
    document.querySelector(`.quantity-sub-btn-${productId}`).addEventListener('click',()=>{
      cart.forEach((item)=>{
        if(item.productId===productId){
          if(item.quantity>1){
            item.quantity-=1
          }
          document.querySelector(`.js-cart-quantity-${productId}`).innerHTML=item.quantity;
          updatecheckquantity()
          savetostorage()
        }
      })
    })


      
    
  })
})
