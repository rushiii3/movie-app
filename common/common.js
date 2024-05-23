import {Dimensions} from 'react-native'
const {height,width} = Dimensions.get("window");
export const wp = (percentage) => {
    return (percentage*width)/100;
}
export const hp = (percentage) => {
    return (percentage*height)/100;
}