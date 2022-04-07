import React from 'react'
import common from '../static/styles/common'

function Button({title, width, onClick, theme, style, id, disabled}) {

    /*
        @params 
        title - string, 
        width - string,
        onClick - function,
        theme - {dark, light}
        style - {{ textAlign: 'center' }}
        disabled - boolean
    */

  return (
    <button 
        id={id}
        type="button" 
        style={{
            ...style,
            width: width ? width : 100, 
            borderRadius: 1000, 
            padding: 8, 
            color: theme === 'dark' ? common.colors.light : common.colors.blueDark, 
            backgroundColor: disabled ? 'lightgray' : theme === 'dark' ? common.colors.blueDark : common.colors.light,
        }}
        onClick={onClick}
        disabled={disabled}
    >
        {title || "No Title"}
    </button>
  )
}

export default Button