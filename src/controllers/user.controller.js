import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
    let { username, email, password } = req.body;

    if ([username, email, password].some((field) => !field?.trim())) {
        return res.status(400).json({ error: "Everyfield is required" });
        ;
    };

    let existedUser = await User.findOne({
        $or: [{ username, email }]
    });
    User.up

    if (existedUser) return res.status(400).json({ error: "Username or email already registered" });
    ;

    let user = await User.create({
        username,
        email,
        password,
    });

    let createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) return res.status(404).json({ error: "Something went wrong while registering the user" });

    return res.send(createdUser)
};

const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;

        if ([email, password].some((field) => field.trim() === '')) {
            return res.status(400).json({ error: "Every field is required" });
        };

        let user = await User.findOne({ email });

        if (!user) return res.status(404).json({ error: 'Invalid email or password' });

        let isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) return res.status(401).json({error: "Password is incorrect"});

        let token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_SECRET
        );

        return res
        .status(200)
        .cookie("accessToken", token)
        .json({
            message: "User logges in successfuly",
            user: user
        });

    } catch (error) {
        console.log('something went wrong while login || Error : ', error)
    }
}


// rgister user 
// login 
// logout
// jwt - middleware 

export {
    registerUser,
    loginUser
}