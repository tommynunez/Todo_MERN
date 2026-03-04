export default function Footer() {
  return (
    <footer className="w-full py-4 bg-white border-t">
      <div className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
}
