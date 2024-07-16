const addHotel = require("../models/Hotel");
const NewOrder = require("../models/NewOrder");
const ActvieOrder=require("../models/ActiveOrder")
const { cloudinary } = require("../utils/cloudniary");
const ActiveOrder = require("../models/ActiveOrder");

exports.getHotel = async (req, res, next) => {
  try {
    const { HotelData, name, price, description } = req.body;
    
    const image = await cloudinary.uploader.upload(HotelData.Image, {
      upload_preset: "Mealify_Hotel_Images",
    });

    const hotel = new addHotel({
      Name: HotelData.HotelName,
      City: HotelData.City,
      Coordinates: {
        Longitude: HotelData.Coordinates.lng,
        Latitude: HotelData.Coordinates.lat,
      },
      Description: description,
      Image: image.url,
      Category: ["Pizzas", "North Indian"],
    });

    await hotel.save();
    res.status(201).json({ status: "success", message: "Hotel added" });
  } catch (err) {
    console.error("Error adding hotel:", err);
    res.status(500).json({ message: "Error adding hotel" });
  }
};

exports.postHotel = async (req, res, next) => {
  try {
    const products = await addHotel.find({ Id: "64cbbe0657131325e53d5766" });

    res.json({
      status: "200",
      content: products,
      message: "Content delivered successfully",
    });
  } catch (err) {
    console.error("Error fetching hotel data:", err);
    res.status(500).json({ message: "Error in fetching the data" });
  }
};

exports.getNewOrders = async (req, res, next) => {
  try {
    const hotelid = req.params.hotelid;
    const orders = await NewOrder.find({ HotelId: hotelid }).exec();

    res.json({ status: "200", Orders: orders });
  } catch (err) {
    console.error("Error fetching new orders:", err);
    res.status(500).json({ status: "201", message: "Error fetching new orders" });
  }
};
exports.getActiveOrders=async(req,res,next)=>{
  try{
    const hotelid=req.params.hotelid;
    const orders=await  ActiveOrder.find({HotelId:hotelid}).exec();
    res.status(200).json({Orders:orders});
  }
  catch (err) {
    console.error("Error fetching new orders:", err);
    res.status(500).json({ status: "201", message: "Error fetching new orders" });
  }
}
