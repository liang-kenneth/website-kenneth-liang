function generateKey(arrIndex) {
  return `${arrIndex}-${new Date().getTime()}`;
}

export default generateKey;
