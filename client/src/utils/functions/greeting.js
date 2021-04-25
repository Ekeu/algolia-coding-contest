export const greeting = (name) => {
  const date = new Date();
  const hours = date.getHours();

  let greet;
  if (hours < 12) {
    greet = 'Good Morning';
  } else if (hours >= 12 && hours <= 17) {
    greet = 'Good Afternoon';
  } else if (hours >= 17 && hours <= 24) {
    greet = 'Good Evening';
  }

  return `${greet}, ${name}`;
};
