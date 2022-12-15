const saveAdminSettings = () => {
  localStorage.setItem("smAdminSet", JSON.stringify(sMSet));
};

const getAdminSettings = () => {
  const adminData = localStorage.getItem("smAdminSet");
  return adminData;
};

export { saveAdminSettings, getAdminSettings };
