export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-2">
      <h1 className="text-2xl">Home</h1>
      <div className="flex flex-col gap-2">
        <h1>Buttons</h1>
        <div className="flex flex-row gap-2">
          <button>Button</button>
          <button className="primary">Button Primary</button>
        </div>
      </div>
    </div>
  );
}
