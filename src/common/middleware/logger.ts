export function logger(req, res, next) {
  const {url, method} = req;
  console.log('logger start -------------------------');
  console.log(new Date().toLocaleString());
  console.log(`${method}, path:${url}`);
  console.log('logger end ---------------------------');
  next();
}