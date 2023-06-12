export default function shipFactory(length) {
  let _hit = 0;
  const hit = () => {
    return ++_hit;
  };

  return {
    hit,
  };
}
