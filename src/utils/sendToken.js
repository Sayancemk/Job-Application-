export const sendToken=(user,res)=>{
    const token=user.getJwtToken();
    const options={
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000),
        httpOnly:true,
    };
    res.cookie("token",token,options);

}