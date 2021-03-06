const getIndex = (arr, id) => arr.findIndex(friend => friend.id === +id);

const filterName = (fullName, chunk) =>
  fullName.toLowerCase().includes(chunk.toLowerCase());

const getFilters = (friends, toFind) =>
  friends.filter(
    friend =>
      filterName(friend.first_name, toFind) ||
      filterName(friend.last_name, toFind)
  );

export { getIndex, getFilters };
