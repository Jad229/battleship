export default function shipFactory(length) {
  let _hitCount = 0;
  const hit = () => {
    return ++_hitCount;
  };
  const isSunk = () => {
    if (_hitCount == length) return true;
    else return false;
  };
  const getHitCount = () => {
    return _hitCount;
  };
  return {
    hit,
    isSunk,
    getHitCount,
  };
}
