import React from 'react'
import './Signup.css'
import '../App.css'
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/; //Checking the validation of the username 
const MAIL_REGEX=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const PHONE_REGEX=/^[0-9]{8}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; //Checking the validation of the password
const REGISTER_URL = '/signup';




function Signup(){ 
    const userRef = useRef();
    const errRef = useRef();
    // The user state 
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
   // The mail state 
    const [mail, setMail] = useState('');
    const [validMail, setValidMail] = useState(false);
    const [mailFocus, setMailFocus] = useState(false);
    // The phone number state 
    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);
    // The password state 
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    // The matching password state 
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
    // The error message state 
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidMail(MAIL_REGEX.test(mail));
    }, [mail])

    useEffect(() => {   
        setValidPhone(PHONE_REGEX.test(phone));
    }, [phone])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    //handleSubmit : a function to verify the form signup   
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = MAIL_REGEX.test(mail);
        const v4 = MAIL_REGEX.test(phone);
        if (!v1 || !v2 || !v3 || !v4) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,  // THE BACKEND PART 
                JSON.stringify({ user, pwd , mail }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setMail('');
            setPhone('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }



    return (
        <>
        {success ? (  //if this is true ( success )
            <section>
                <h1>Success!</h1>
                <p>
                    <a href="#">Sign up</a>
                </p>
            </section>
        ) : ( //if this is false ( failure )
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Signup</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">
                        Username:
                        <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                    <label htmlFor="emailAddress">
                        Email
                        <FontAwesomeIcon icon={faCheck} className={validMail ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validMail || !mail ? "hide" : "invalid"} />
                        </label><br/>

                        <input
                        type="email"
                        id="email"
                        autoComplete="off"
                        placeholder='user@example.gov'
                        onChange={(e) => setMail(e.target.value)}
                        value={mail}
                        required
                        aria-invalid={validMail ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setMailFocus(true)}
                        onBlur={() => setMailFocus(false)}
                    />
                     <p id="uidnote" className={mailFocus && mail && !validMail ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                       max length : 256 characters<br />
                        Must respect : user@example.gov.<br />
                        Letters, numbers, underscores allowed.
                    </p>
                    <label htmlFor="phone">
                    Phone number:
                    <FontAwesomeIcon icon={faCheck} className={validPhone ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validPhone || !phone ? "hide" : "invalid"} />
                    </label> <br/>
                        <input
                        type="tel"
                        id="tel"
                        autoComplete="off"
                        required
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        aria-invalid={validPhone ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setPhoneFocus(true)}
                        onBlur={() => setPhoneFocus(false)}
                    />
                     <p id="uidnote" className={phoneFocus && phone && !validPhone ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                       max length : 8 digits<br />
                    </p>
                    <label htmlFor="city">Choose your city:</label>
                        <select id="city" name="city" >
                        <option >Ariana</option>
                        <option >Beja</option>
                        <option >Ben Arous</option>
                        <option >Bizerte</option>
                        <option >Gabes</option>
                        <option >Gafsa</option>
                        <option >Jendouba</option>
                        <option >Kairouan</option>
                        <option >Kasserine</option>
                        <option >kébili</option>
                        <option >Kef</option>
                        <option >Mahdia</option>
                        <option >Manouba</option>
                        <option >Médenine</option>
                        <option >Monastir</option>
                        <option >Nabeul</option>
                        <option >Sfax</option>
                        <option >Sidi Bouzid</option>
                        <option >Siliana</option>
                        <option >Sousse</option>
                        <option >Tataouine</option>
                        <option >Touzeur</option>
                        <option >Tunis</option>
                        <option >Zaghouane</option>
                        </select>
                    <label htmlFor="password">
                        Password:
                        <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>



                    <label htmlFor="confirm_pwd">
                        Confirm Password:
                        <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>
                    

                    <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                </form>
                <p>
                    Already registered?<br />
                    <span className="line">
                        {/*put router link here*/}
                        <a href="/login">Sign in</a>
                    </span>
                </p>
            </section>
        )}
    </>
)
        }
export {Signup}; 