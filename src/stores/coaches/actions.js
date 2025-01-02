export default {
  async registerCoach(data) {
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };
    await fetch(`https://find-coach-c386c-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${this.userId}.json`, {
      method: 'PUT',
      body: JSON.stringify(coachData),
    });

    this.coaches.push({
      id: this.userId,
      ...coachData
    });
  },
  async loadCoaches(forceRefresh = false) {
    if(!forceRefresh && !this.shouldUpdate) {
      return;
    }
    const response = await fetch(`https://find-coach-c386c-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`);
    const responseData = await response.json();
    if(!response.ok) {
      // error...
      const error = new Error(responseData.message || 'Failed to fetch');
      throw error;
    }
    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      coaches.push(coach);
    }
    this.coaches = coaches;

    this.setFetchTimestamp();
  },
  setFetchTimestamp() {
    this.lastFetch = new Date().getTime();
  },
};
