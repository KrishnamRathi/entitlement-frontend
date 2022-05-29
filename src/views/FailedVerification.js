import React from 'react'

function FailedVerification() {
  return (
    <div style={{height: '100vh', width: '100vw', marginTop: '50px', textAlign: 'center'}} >
        <img src={require('../static/images/fail.png')} style={{height: '100px', width: '100px'}} alt="failed"/>
        <p>
            <b>Mobile verification has been failed.</b>
        </p>
    </div>
  )
}

export default FailedVerification