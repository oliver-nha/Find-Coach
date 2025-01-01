import { useCoachesStore} from '@/stores/coaches/index.js'

export default {
  getRequests: (state) => {
    return state.requests.filter((req) => req.coachId === useCoachesStore().userId);
  },
  hasRequests: (state) => {
    return state.getRequests && state.getRequests.length > 0
  }
};
