const sum = (a) => {
  if (Array.isArray(a)) {
    return a.reduce((total, arg) => total + arg, 0);
  }

  return a;
};

export { sum };
