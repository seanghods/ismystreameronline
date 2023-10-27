export default function Header() {
  return (
    <>
      <div className="flex h-12 w-full p-5 pr-12 justify-end mb-10">
        <div className="login-links flex gap-10">
          <input
            type="text"
            className="rounded-lg p-5"
            placeholder="Search here"
            // onChange={handleChange}
            // value={searchInput}
          />
          <button className="font-logo">Log In</button>
          <button className="font-logo">Sign Up</button>
        </div>
      </div>
    </>
  );
}

// <>
//   <div className="flex top-0 left-0 h-5p w-screen p-12 justify-between">
//     <button className="font-logo">Is My Streamer Online</button>
//     <div className="login-links flex gap-10">
//       <button className="font-logo">Log In</button>
//       <button className="font-logo">Sign Up</button>
//     </div>
//   </div>
// </>;
