const debug = (...args: any[]) => {
  args.map((arg) => {
    switch (typeof arg) {
      case 'string':
      case 'number':
        return arg;
      default:
        return JSON.stringify(arg)
    }
  });
  printErr(args.join(' '));
}

export default debug;
