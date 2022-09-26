import axios from "axios"
import * as cities from '../Assets/States_Cities.json'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import data from "../Assets/States.json";

function RegisterCustomer(){

    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [emailMsg, setEmailMsg] = useState("");
    const [confPasswordMsg, setConfPasswordMsg] = useState("");
    const [passwordMsg, setPasswordMsg] = useState("");
    const [nameMsg, setNameMsg] = useState("");
    const [address1Msg,setAddress1Msg] = useState("");
    const [pincodeMsg,setPincodeMsg] = useState("");
    const [contactNoMsg,setContactNoMsg] = useState("");
    const [validateBool, setValidateBool] = useState(true);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        setStateList(data["states"])
    }, [])


    function handleSubmit(e){
        e.preventDefault();
        const customer = {
            email : e.target.email.value,
            password : e.target.password.value,
            name : e.target.name.value,
            contactNo : e.target.contactNo.value,
            address : e.target.addressLine1.value + " " + e.target.addressLine2.value,
            city : e.target.city.value,
            state : e.target.state.value,
            pincode : e.target.pincode.value
        }

        axios.post("http://localhost:8080/reg/customer", customer).then(function (response) {
            if(response.status === 201)
                navigate("/login/customer")
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    function handleChange(e){
        e.preventDefault();
        setCityList(cities[e.target.value]) 
    }


    return(
        <div className="container-fluid">
            <h2>Register Page Customer</h2>
            <form onSubmit={handleSubmit} method="post" className="form-control">
                <div className="row g-3 mb-3">
                    <label htmlFor="Email" className="col-1">Email</label>

                    <input type="email" name="email" id="email" className="col-auto" onBlur={(e)=> {e.preventDefault();
                        if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)){
                            setValidateBool(validateBool&&true);
                            setEmailMsg("")
                        }
                            
                        else{
                            setValidateBool(validateBool&&false);
                            setEmailMsg("Email is invalid");

                        }
                            
                    } }/>
                    <span className="text-danger col-1">{emailMsg}</span>

                </div>
                <div className="row g-3 mb-3">
                    <label htmlFor="Password" className="col-1">Password</label>
                    <input type="password" name="password" id="password" className="col-auto" onBlur={(e) => {
                        // /((?=.\d)(?=.[a-z])(?=.[#@$]).{5,20})/.test(e.target.value)
                        if(true){
                            setValidateBool(validateBool&&true);
                            setPassword(e.target.value);
                            setPasswordMsg("")
                        }
                        else{
                            setValidateBool(validateBool&&false);
                            setPasswordMsg("Password is Invalid")
                        }
                        }}/>
                        <span className="text-danger col-1">{passwordMsg}</span>
                </div>
                <div className="row g-3 mb-3">
                    <label htmlFor="confirmPassword" className="col-1">Confirm Password</label>
                    <input type="password" id="confirmPassword" className="col-auto" onBlur={(e) => {
                        if(e.target.value === password){
                            setValidateBool(validateBool&&true);
                            setConfPasswordMsg("")
                        }
                        else{
                            setValidateBool(validateBool&&false);
                            setConfPasswordMsg("Password Does not Match")
                        }
                    }}/>
                    <span className="col-1 text-danger">{confPasswordMsg}</span>
                </div>
                <div className="row g-3 mb-3">
                    <label htmlFor="Name" className="col-1">Name</label>
                    <input type="text" name="name" id="name" className="col-auto" onBlur={(e)=> {
                        if(e.target.value) {
                            setValidateBool(validateBool&&true);
                            setNameMsg("")
                        }
                        else{
                            setValidateBool(validateBool&&false);
                            setNameMsg("Name Cannot be Blank")
                        }
                        }
                        }/>
                        <span className="text-danger col-1">{nameMsg}</span>
                </div>
                <div className="row g-3 mb-3">
                    <label htmlFor="Address Line 1" className="col-1">Address Line 1</label>
                    <input type="text" name="addressLine1" id="addressLine1" className="col-auto" onBlur={(e)=> {
                        if(e.target.value) {
                            setValidateBool(validateBool&&true);
                            setAddress1Msg("")
                        }
                        else{
                            setValidateBool(validateBool&&false);
                            setAddress1Msg("Address Cannot be Blank")
                        }
                        }
                        }/>
                        <span className="text-danger col-1">{address1Msg}</span>
                </div>
                <div className="row g-3 mb-3">
                    <label htmlFor="Address Line 2" className="col-1">Address Line 2</label>
                    <input type="text" name="addressLine2" id="addressLine2" className="col-auto" />
                </div>
                <div className="row g-3 mb-3">
                    <label htmlFor="State" className="col-1">State</label>
                    <select name="state" id="state" className="col-1" onChange={handleChange}>
                        {stateList.map(elem => 
                            <option key={elem.state_name} value={elem.state_name}>{elem.state_name}</option>
                            )}
                    </select>
                </div>
                <div className="row g-3 mb-3">
                    <label htmlFor="City" className="col-1">City</label>
                    <select name="city" id="city" className="col-1">
                        {cityList.map(elem => 
                            <option key={elem.id} value={elem.city}>{elem.city}</option>
                            )}
                    </select>
                </div>
                <div className="row g-3 mb-3">
                    <label htmlFor="Pincode" className="col-1">Pincode</label>
                    <input type="number" name="pincode" id="pincode" className="col-auto" onBlur={(e)=>{
                        if(e.target.value.length === 6){
                            setValidateBool(validateBool&&true);
                            setPincodeMsg("");
                        }
                        else if(e.target.value.length < 6 || e.target.value.length < 6){
                            setValidateBool(validateBool&&false);
                            setPincodeMsg("Pincode should be 6 digits")
                        }
                    }}/>
                    <span className="text-danger col-1">{pincodeMsg}</span>
                </div>
                <div className="row g-3 mb-3">
                    <label htmlFor="ContactNo" className="col-1">Contact No</label>
                    <input type="number" name="contactNo" id="contactNo" className="col-auto" onBlur={(e)=>{
                        if(e.target.value.length === 10){
                            setValidateBool(validateBool&&true);
                            setContactNoMsg("");
                        }
                        else if(e.target.value.length < 10 || e.target.value.length < 10){
                            setValidateBool(validateBool&&false);
                            setContactNoMsg("ContactNo should be 10 digits")
                        }
                    }}/>
                    <span className="text-danger col-1">{contactNoMsg}</span>
                </div>
                <div className="row g-3 mb-3">
                    <input type="submit" value="Register" className="btn-primary col-1" />
                </div>

            </form>
        </div>
    )
}

export default RegisterCustomer;