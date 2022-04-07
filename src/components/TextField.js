import React from 'react'
import common from '../static/styles/common'

function TextField({width, placeholder, value, setValue, style}) {

  /*
    @params
    width -> width of container, string
    placeholder -> text 
    value -> string, int, boolean etc.
    setValue -> function
    style -> object

  */

  return (
    <input 
        type='text' 
        placeholder={placeholder ? placeholder : ''}
        style={{
            ...style, 
            width: width ? width : 100, 
            borderRadius: 5,
            padding: 5,
            fontSize: common.fontSize.medium,
            backgroundColor: common.colors.blueLight
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
    />
  )
}

export default TextField