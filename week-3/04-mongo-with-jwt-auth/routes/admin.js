const { Router } = require("express");
const { Admin, User, Course } = require("../db");
const adminMiddleware = require("../middleware/admin");
const {JWT_SECRET} = require("../config")
const router = Router();
const jwt = require("jsonwebtoken")

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username,
        password
    }).then(function(){
        res.json({
            message: "Admin created successfully"
        })
    }).catch(function(){
        res.json({
            message: "Admin not created successfully"
        })
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic

    const username = req.body.username;
    const password = req.body.password;
    
    const user = await User.find({
        username,
        password
    })

    if(user){
        const token = jwt.sign({
            username
        }, JWT_SECRET)
    
        res.json({
            token
        })
    }else{
        res.status(411).json({
            message: "Wrong Username Or Password"
        })
    }

    
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    //use zod in real life

    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    console.log(newCourse);
    res.json({
        message:"Course Created Successfully", courseId: newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({})
       
            res.json({
                courses: response
            })
        })
  

module.exports = router;