export default {
  addRequest(payload){
    const newRequest = {
      id: new Date().toISOString(),
      message: payload.message,
      coachId: payload.coachId,
      userEmail: payload.email,
    }

    this.requests.push(newRequest);
  }
}
