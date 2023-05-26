export const navigateTo = (route) => {
    return {
      type: 'NAVIGATE_TO',
      payload: route
    };
  };