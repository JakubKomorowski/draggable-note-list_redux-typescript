const alertReducer = (state: boolean = false, action: any) => {
  switch (action.type) {
    case "ALERT_OPEN":
      return (state = true);

    default:
      return state;
  }
};

export default alertReducer;
