function addZero(number) {
  return parseFloat(number) < 10 ? `0${number}` : number;
}

const helpers = {
  formatDate(input) {
    if (!input) return null;
    const date = new Date(input);
    const days = date.getDate();
    const months = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${addZero(days)}/${addZero(months)}/${year}`;
  },
  formatDateWithTime(input) {
    if (!input) return null;
    const date = new Date(input);
    const days = date.getDate();
    const months = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${addZero(days)}/${addZero(months)}/${year} ${addZero(hours)}:${addZero(minutes)}`;
  },

};

export default helpers;
