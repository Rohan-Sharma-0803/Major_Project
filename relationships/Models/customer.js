const { number } = require('joi');
const mongoose = require('mongoose');

const {Schema} = mongoose;

main().then(()=> console.log("connection successful"))
.catch((err) => console.log(err));

async function main(params) {

    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
    
}

const orderSchema = new Schema ({
    item: String,
    price : Number
});

const custSchema = new Schema ({
    name: String,
    orders : [
        {
            type : Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
});

// custSchema.pre("findOneAndDelete", async()=>{
//     console.log("pre middleware")
// })

custSchema.post("findOneAndDelete", async(customer)=>{
    if(customer.orders.length){
  let res = await  Order.deleteMany({_id : {$in :customer.orders}})
  console.log(res);
}
})

const Order = mongoose.model("Order" , orderSchema);
const Cust = mongoose.model("Cust" , custSchema);



// const findCust = async ()=> {


//     let res = await Cust.find({}).populate("orders");
//     console.log(res[0]);

// }
const addCust = async ()=> {
    let newCust = new Cust ({
        name : 'karan arjun',

    })

    let newOrder = new Order ({
        item:'burger',price : 50
    })

    newCust.orders.push(newOrder);
    await newOrder.save();
    await newCust.save();
    console.log("added new customer")
}
//  addCust();

const delCust = async() =>{
   let data =  await Cust.findByIdAndDelete('67442d36ac37abe81a316177');
console.log(data);
    
}
delCust();


// const addOrders  = async() => {

//     let res = await Order.insertMany([
//         {item : 'Samosa',price : 15},
//         {item: 'chips', price : 10},
//         {item : 'chocolate', price : 40}
    
//     ])
//     console.log(res);
    
// }
// addOrders();


