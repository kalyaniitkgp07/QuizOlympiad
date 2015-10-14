function sortByKey(key, elem1, elem2) {
	if(elem1[key] < elem2[key]) {
    return -1;
	} else if(elem1[key] > elem2[key]) {
    return 1;
  } else {
  	return 0;
  }
}

module.exports = {
	sortByKey,
};