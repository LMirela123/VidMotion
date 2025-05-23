let timeoutHandler = null;

export const debounce = (fn, delay = 300) => {
  return (...args) => {
    /*
      We clear the timeouts generated by previous calls
      to our debounced function.
    */
    if (timeoutHandler) {
      clearTimeout(timeoutHandler);
      timeoutHandler = null;
    }

    /* 
      Here we use a setTimeout() to "debounce" (delay) the
      execution of the code that searches in the contacts
      list by a couple of hundred milliseconds. Since this
      "input" event handler fires very often, each time the
      user presses a key, we only want to search the list of
      contacts breifly after the user stops typing.
    */
    timeoutHandler = setTimeout(() => fn(...args), delay);
  };
};