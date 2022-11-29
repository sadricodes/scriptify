// GET ALL POST ITEMS
const getPosts = () => {
  console.log("got to here");
  const postElements = document.querySelectorAll('[switch-data-item = "post"]');
  return postElements;
};

export { getPosts };
