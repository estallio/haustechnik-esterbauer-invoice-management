// helper to create the respective actions
export const action = (type, payload = {}) => ({ type, ...payload });
