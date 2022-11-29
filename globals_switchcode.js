// GLOBAL VARIABLES
let postId = 0;
let postElement;

// FUNCTION TO GET ITEMS OUT OF POST TEXT
const getItem = (postContent, marker) => {
  start = postContent.indexOf(marker);
  end = postContent.lastIndexOf(marker);
  item = postContent.slice(start + marker.length, end);
  return item;
};
