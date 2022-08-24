import React from 'react'
import '../App.css'
import './Transition.css'
function Transition(){ 
    return (
      <div className='container'>
          <form id='form'>
          <fieldset id='fieldset'>
          <legend id='legend'>Join as a client or freelancer</legend>
          <br/>
                <input type="radio" id="client" name="job" value="client" />
                <label for="client" className='client'>I am a client</label>
                <br/>
                
                <input type="radio" id="freelancer" name="job" value="freelancer"/>
                <label for="freelancer" className='freelancer'>I am a freelancer</label>
        
                <br/>
               
              <button type="submit" className='tran-btn'>Continue</button>
              
              
          </fieldset>
                <p id='p'>
                    Already registered?<br />
                    <span className="line">
                        <a id ="a" href="/login">Sign in</a>
                    </span>
                </p>
          
          </form>
               
        </div>
        







    )
}
export  {Transition} ; 