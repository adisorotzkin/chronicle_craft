require ("dotenv").config();

exports.config = 
{
    userDb : process.env.USER_DB,
    passDb : process.env.PASS_DB,
    tokenSecret : process.env.TOKEN_SECRET,
    port : process.env.PORT,
    email: process.env.EMAIL,
    emailPass : process.env.EMAIL_PASS
}