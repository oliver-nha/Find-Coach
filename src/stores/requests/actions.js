// actions.js
import { useCoachesStore } from '@/stores/coaches/index.js'

export default {
  async addRequest(payload) {
    const newRequest = {
      message: payload.message,
      userEmail: payload.email,
    };
    const response = await fetch(`https://find-coach-c386c-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${payload.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest),
    })

    const responseData = await response.json();
    if(!response.ok) {
      // error...
      const error = new Error(responseData.message || 'Failed to send');
      throw error;
    }
     newRequest.id = responseData.name;
     newRequest.coachId = payload.coachId;
     this.requests.push(newRequest);
  },
  async loadRequests() {
    const coachId = useCoachesStore().userId;
    const response = await fetch(`https://find-coach-c386c-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${coachId}.json`);
    const responseData = await response.json();
    if(!response.ok) {
      // error...
      const error = new Error(responseData.message || 'Failed to fetch');
      throw error;
    }
    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        message: responseData[key].message,
        userEmail: responseData[key].userEmail,
      };
      requests.push(request);
    }
    this.requests = requests;
  }
};
