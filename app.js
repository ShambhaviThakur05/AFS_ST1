// npm i nodemailer
// npm i dotenv
const express=require('express');
const nodemailer=require('nodemailer');
const app=express();
require('dotenv').config();

app.set('view engine','hbs');
app.use(express.json());
app.use(express.urlencoded()); 


let otp;
function generateOtp(){
    let otpVal = Math.floor(1000 + Math.random() * 9000);
    return otpVal;
}

app.get('/', (req, res)=> {
    res.render('html');
});

app.post('/send',async(req,res)=>{
    // app pass  two factor authen ko bypass krta hai, of otp sent ..sirf user pass se dekr hm 1way authen kr rhe h ..2way krne ke liye app pass is used
    //transporter just ek object h jiske pass sendmail naam ka fncn hota h 
    
    // hmne user me mail bhej di h aready to hmne dubara from vale section isliye bheji bcz
    // i) ki ye format hota h poora ki " to from subject text" 
    // ii) google pr hr mail ka apna apna hota h ki usko verify krne ke liye ki jo user login h vhi from vale section me h ya nhi  
    otp=generateOtp();
    const receiverEmail=req.body.email;
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: "shambhavithakur05@gmail.com",
            // environment var. are used so that we don't have to write and show our pass here ..and then agr new file me bana kr daal de pass but agr usse github pr daale to vo file bhi daalni pdegi so we created app pass bcz here app is trying to login not the user
            pass:process.env.PASS, 
        }
    })

    const mail={
        to: receiverEmail,
        from: "shambhavithakur05@gmail.com",
        subject:"Hi Your OTP is ",
        text: `${otp}`,  
        // jsx mai js variable use krne ka treka hai
    }

    try{
        await transporter.sendMail(mail);
        res.send("Otp Sent Successfully");
    }
    catch(err){
        res.send("ERROR! Otp Not Sent");
    }
});

app.post('/verify',(req, res)=> {
   
    if (req.body.otp == otp) {
        res.send("You entered correct otp! :)");
    }
    else {
        res.send('otp is incorrect');
    }
});

app.listen(8000,()=>{
    console.log("http://localhost:8000");
})






































// CLASS WORk

/*const nodemailer=require('nodemailer');
require('dotenv').config();

const transporter=nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "shambhavithakur05@gmail.com",        //here it uses your email and password to login and send email on your behalf
        pass:process.env.PASS  ,                    //here we use env variables to hide senstive content using commands npm i dotenv , saved in .env file
    }                                               //process.env env file mai jitne variables hai unko process.env object mai dal deta hai
})

const mail={
    to:"shagan1298.be21@chitkara.edu.in",
    from: "shambhavithakur05@gmail.com",  // from idhr likh firse rhe hai kyunki email bhejne ka yhi format yhi hota hai
    subject: "Hi Shagan",
    text:"Hi hi hi hi"
}
transporter.sendMail(mail);
//first time error (Username and Password not accepted)diya due to two factor authentication
// APP PASSWORD - we can make an app pwd to tell gmail that if an app knows that pwd that app should be allowed to access our account
// We use app password to overpass the two factor authentication
// in this we tell google ki jis app ke pass yeh app password hoga wo app mera gmail ko access kr skta hai
// app pwd-dkvt pfxv jruz btyr 
// we created app password by going to google account then -> security -> 2 step auth -> app pwd -> app name (in this case shambhavi) ->creates app pwd then copy it and use it the env file instead of your own password
*/









