//this component displays an image of a weather icon
//the image is determined by the weather code and the time of day
//the time of day is determined by the isDay property of the weather data
//the weather code is a WMO code
//the weather icons can be found in the assets/icons folder
//the icons can be STATIC or ANIMATED

import React from "react";
import { Image } from "react-native";
import PropTypes from "prop-types";
import { static_icons, animated_icons } from "../assets/icons";

const WeatherIcon = ({ weatherCode, isDay, animated }) => {
  const icon = animated
    ? animated_icons[weatherCode][isDay ? "day" : "night"]
    : static_icons[weatherCode][isDay ? "day" : "night"];
  return <Image source={icon} style={{ width: 100, height: 100 }} />;
};

