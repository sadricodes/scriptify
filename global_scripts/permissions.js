const checkPerms = (moduleSettings) => {
  const groupCan = moduleSettings.groupsCanUse.includes(
    sMSet.systemData.currentUserGroup
  );
  const groupCanNot = moduleSettings.groupsCanNotUse.includes(
    sMSet.systemData.currentUserGroup
  );
  const memberCan = moduleSettings.memberCanUse.includes(
    sMSet.systemData.currentUser
  );
  const memberCanNot = moduleSettings.memberCanNotUse.includes(
    sMSet.systemData.currentUser
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
