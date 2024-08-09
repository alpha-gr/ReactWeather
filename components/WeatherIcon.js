//this component displays an image of a weather icon
//the image is determined by the weather code and the time of day
//the time of day is determined by the isDay property of the weather data
//the weather code is a WMO code
//the weather icons can be found in the assets/icons folder
//the icons can be STATIC or ANIMATED

import React from "react";
import { Image } from "react-native";
import PropTypes from "prop-types";
import { animated_icons } from "./WMOanimated_icons";
import { static_icons } from "./WMOstatic_icons";
import Icon from '../assets/icons/animated_icons/day.svg'

export default function WeatherIcon(props){
  const code = props.code;
  const isDay = props.isDay;
  const size = props.size;
  const style = props.style;
  const iconSize = size === "large" ? 100 : 70;
  const icons = style === "static" ? static_icons : animated_icons;
  const icon = isDay ? icons.find(icon => icon.code === code).day : icons.find(icon => icon.code === code).night;

  //return <Image source={icon} style={{ width: iconSize, height: iconSize }} />;
  return <Icon width={iconSize} height={iconSize} />;
}
