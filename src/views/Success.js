import React from 'react'

function Success() {
  return (
    <div style={{height: '100vh', width: '100vw', marginTop: '50px', textAlign: 'center'}} >
        <img src={require('../static/images/success.png')} style={{height: '100px', width: '100px'}} alt="success"/>
        <p>
            <b>Mobile verification has been completed successfully.</b>
        </p>
    </div>
  )
}

export default Success