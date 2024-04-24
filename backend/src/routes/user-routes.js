const express=require("express")
const User=require("../models/user")
const auth=require("../middlewares/auth")
const router=new express.Router();

//register
// register
router.post("/users/create", async (req, res) => {
    const user = new User(req.body);

    try {
        // Password length validation
        if (user.password.length < 8) {
            return res.status(400).send({
                message: "Password needs to be 8 characters or above"
            });
        }

        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token, message: "New Account Created!" });
    } catch (e) {
        console.error(e);
        if (e.code === 11000) { // MongoDB duplicate key error
            res.status(500).send({ message: "Username already taken" });
        } else {
            res.status(500).send({ message: "Something went wrong" });
        }
    }
});


//login
router.post("/user/login",async (req,res)=>{
    try{
        const user=await User.findByCredentials(
            req.body.username,
            req.body.password
        );
        const token=await user.generateAuthToken()

        res.status(200).send({user,token});

    }catch(e){
        res.status(500).send({message:"Unable to login"});
    }
});

//logout

router.post("/user/logout", auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token !== req.token;
        })
        await req.user.save();
        res.send({message:"Logged out"})
    }catch (e){
        res.status(500).send(e);
    }
})

//get user details
router.get("/users/me",auth,async(req,res)=>{
    res.send(req.user)
})

router.delete("/users/delete",auth,async(req,res)=>{
  try{
    req.user.remove()
    res.send({
        message:"Your account is deleted successfully"
    })
  }catch(e){
    res.status(500).send(e);
  }
})

module.exports= router;

