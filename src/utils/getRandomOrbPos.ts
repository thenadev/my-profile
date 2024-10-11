export const getRandomOrbPosition = (scrolled: boolean, orb: any) => {
  let top, left;

  const orbLeft = parseInt(orb.left);
  const orbTop = parseInt(orb.top);

  if (scrolled) {
    if (
      (orbLeft < 20 || orbLeft > 80) && orb.id % 2 === 0
        ? orbLeft > 80
        : orbLeft < 20
    ) {
      left = orbLeft + Math.floor(Math.random() * 11) - 5;
    } else {
      left = orb.id % 2 === 0 ? orbLeft + 40 : orbLeft - 40;
    }

    top = orbTop + Math.floor(Math.random() * 21) - 10;
  } else {
    // Full range for initial positions
    top = Math.max(10, Math.min(80, Math.random() * 100));
    left = Math.max(10, Math.min(90, Math.random() * 100));
  }

  return {
    top: `${Math.max(10, Math.min(90, top))}%`,
    left: `${Math.max(5, Math.min(95, left))}%`,
  };
};
