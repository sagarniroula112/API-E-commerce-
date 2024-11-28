
const authService = require ('./auth.service');
class AuthController {

    register =async (req,res,next)=>
        {
        
        try {

            let data = await authService.transformUserCreateData (req);

            //store user data in database

           const user =  await authService.createUser(data);

            //email send 
            await authService.sendOtpViaEmail(user);

            res.status(201).json({
                data:{data},
                message: 'User registered successfully',
                status: 'success'
            });
        }catch(exception){
            console.log("AuthController || user registration", exception);
            next(exception);
        }
    }
}

const authCtrl = new AuthController();

module.exports = authCtrl;