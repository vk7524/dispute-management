const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/seed-users", async (req,res)=>{

 await User.deleteMany({});

 await User.insertMany([
   {
      name:"Anita Sharma",
      email:"anita@test.com",
      team:"Finance"
   },
   {
      name:"Rajesh Gupta",
      email:"rajesh@test.com",
      team:"Finance"
   },
   {
      name:"Priya Menon",
      email:"priya@test.com",
      team:"Sales"
   },
   {
      name:"Vikram Joshi",
      email:"vikram@test.com",
      team:"Support"
   },
   {
      name:"Rakesh Kumar",
      email:"rakesh@test.com",
      team:"Delivery"
   },
   {
      name:"Vivek Dubey",
      email:"vivek.dubey@uneecops.in",
      team:"Finance"
   }
 ]);

 res.json({
    success:true,
    message:"Users Added"
 });

});
router.get("/team/:teamName", async (req, res) => {
  try {
    const users = await User.find({
      team: req.params.teamName,
    });

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;