const checkPerms = (moduleSettings) => {
  const groupCan = moduleSettings.groupsCanUse.includes(
    moduleSettings.currentUserGroup
  );
  const groupCanNot = moduleSettings.groupsCanNotUse.includes(
    switchSettings.currentUserGroup
  );
  const memberCan = moduleSettings.memberCanUse.includes(
    moduleSettings.currentUser
  );
  const memberCanNot = moduleSettings.memberCanNotUse.includes(
    moduleSettings.currentUser
  );

  if (memberCanNot) {
    return false;
  } else if (memberCan) {
    return true;
  } else if (groupCan) {
    return true;
  } else if (groupCanNot) {
    return false;
  }
};

export { checkPerms };
