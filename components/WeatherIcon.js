import { createIconSet } from '@expo/vector-icons';
import icoMoonConfig from './selection.json';
const Icon = createIconSet(icoMoonConfig, 'icomoon', 'icomoon.ttf');

export default Icon;

export const Button = Icon.Button;
export const TabBarItem = Icon.TabBarItem;
export const TabBarItemIOS = Icon.TabBarItemIOS;
export const ToolbarAndroid = Icon.ToolbarAndroid;
export const getImageSource = Icon.getImageSource;

