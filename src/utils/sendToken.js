export const sendToken=(user,res)=>{
    const token=user.getJwtToken();
    const options={
        expiresIn:new Date(Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000),
        httpOnly:true,
        secure: true,
        sameSite: "None",
    };
    res.cookie("token",token,options)

}