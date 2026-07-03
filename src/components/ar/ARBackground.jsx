// Isolated on purpose: this renders only the mock environment photo.
// Swapping it for a live rear-facing feed later is a one-line change
// (replace this component with one built on ../hooks/useCamera) —
// nothing else in the AR overlay needs to know the difference.
export function ARBackground({ imageSrc }) {
  return (
    <img
      src={imageSrc}
      alt=""
      draggable={false}
      className="absolute max-w-none object-cover"
      style={{ left: '-5.97%', top: '-17.68%', width: '178.86%', height: '135.57%' }}
    />
  )
}
