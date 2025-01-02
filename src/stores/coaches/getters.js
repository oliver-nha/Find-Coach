export default {
  getCoaches: (state) => {
    return state.coaches;
  },
  hasCoaches: (state) => {
    return state.coaches && state.coaches.length > 0;
  },
  shouldUpdate: (state) => {
    const lastFetch = state.lastFetch;
    console.log(lastFetch);
    if (!lastFetch) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();
    const timeDifference = (currentTimeStamp - lastFetch) / 1000;
    console.log('Time since last fetch:', timeDifference, 'seconds');
    return timeDifference > 5// Update if more than 60 seconds have passed
  }
};
