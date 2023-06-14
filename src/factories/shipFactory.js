export default function shipFactory(name, length) {
  const _length = length;
  const _name = name;
  let _hitCount = 0;
  const hit = () => {
    return ++_hitCount;
  };
  const isSunk = () => {
    if (_hitCount === _length) return true;
    else return false;
  };
  const getHitCount = () => {
    return _hitCount;
  };
  const getName = () => {
    return _name;
  };
  const getLength = () => {
    return _length;
  };
  return {
    hit,
    isSunk,
    getHitCount,
    getName,
    getLength,
  };
}
