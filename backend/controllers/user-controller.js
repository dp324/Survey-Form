import User from '../models/user.js'

export const loginUser = async (req, res) => {
    const {name, email } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }
    if(existingUser){
        return res.status(400).json({message : "Login with different email"})
    }

    const user = new User({name, email});

    try {
        await user.save();
    } catch (error) {
        return console.log(error)
    }
    return res.status(201).json({user});
};

