export default {
  getRequests: (state) => state.requests,
  hasRequests: (state) => state.requests && state.requests.length > 0,
};
