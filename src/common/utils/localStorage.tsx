const getFromLocalStorage = (key: string) => {
  const savedItem = localStorage.getItem(key);
  if (savedItem) {
    const parsedItem = JSON.parse(savedItem);
    if (typeof parsedItem !== 'undefined') return parsedItem;
  }

  return null;
};

export { getFromLocalStorage };
