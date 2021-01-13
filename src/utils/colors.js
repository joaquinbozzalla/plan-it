import { colorsAvailable } from '../constants';

export const getColor = (colorName) => {
    const found = colorsAvailable.filter(color => color['name'] === colorName)[0];
    const defaultColor = {
        name: 'default',
        background: colorName,
        primaryColor: '#fff',
        secondaryColor: '#fff'
    };
    return found ? found : defaultColor;
}