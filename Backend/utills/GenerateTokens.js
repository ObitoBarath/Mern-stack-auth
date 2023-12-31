import jwt from 'jsonwebtoken'


const generateTokens = (res, userId) => {
    let token = jwt.sign({userId}, process.env.JWT_SECURE, {
        expiresIn: '1h'
    });


    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
    })

}

export default generateTokens