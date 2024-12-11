

const AccountPrice = ({orderss}) => {
    console.log(orderss);
    const {foodPrice} = orderss || {}
    
  
 const totalPrice = Number(foodPrice+foodPrice)
    
  
    
    return (
        <div>
            {totalPrice}
        </div>
    );
};

export default AccountPrice;