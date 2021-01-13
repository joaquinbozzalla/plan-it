import { emojisAvailable } from '../constants';

export const getEmoji = (icon) => {
    const emoji = emojisAvailable.filter(emoji => emoji['name'] === icon)[0];
    return emoji ? emoji['emoji'] : '';
}