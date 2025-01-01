// actions.js
export default {
  addRequest(payload) {
    const newRequest = {
      id: new Date().toISOString(),
      message: payload.message,
      coachId: payload.coachId,
      userEmail: payload.email,
    };

    // Directly access requests from the store
    this.requests.push(newRequest); // `this` refers to the store context
  },
};
