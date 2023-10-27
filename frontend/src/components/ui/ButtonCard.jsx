export function ButtonCard({ onClick, children }) {
  return (
    <button
      className="bg-red-700 px-6 py-2 rounded-md my-2 disabled:bg-blue-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
