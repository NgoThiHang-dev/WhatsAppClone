import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import colors from '../constants/colors'
import { HeaderButton } from 'react-navigation-header-buttons'

const CustomHeaderButton = props => {
  return (
    <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={props.color ?? colors.blue}/>
  )
}

export default CustomHeaderButton
