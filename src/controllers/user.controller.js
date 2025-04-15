import { User } from "../models/user.model.js";


const registerUser = async (req, res) => {
    let { username, email, password } = req.body;

    if ([username, email, password].some((field)=> !field?.trim())) {
       return res.status(400).json({ error: "Everyfield is required" });
       ;
    };

    let existedUser = await User.findOne({
        $or:[{username, email}]
    });
    User.up

    if(existedUser) return res.status(400).json({ error: "Username or email already registered" });
    ;

    let user = await User.create({
        username,
        email,
        password,
    });

    let createdUser = await User.findById(user._id).select("-password");

    if(!createdUser) return res.status(404).json({error: "Something went wrong while registering the user"});

    return res.send(createdUser) 
};

export {
    registerUser,
}