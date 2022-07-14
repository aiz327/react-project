// export const curry = (func: Function) => {
//   return _curry(func)
// }

export const curry = (func: Function, ...args: any[]) => {
  const len = func.length;
  if (args.length < len) {
    return (...restArgs: any[]) => {
      return curry(func, ...args, ...restArgs)
    }
  } else {
    return func(...args)
  }
}

