function UserProfile() {
  return (
    <div className="hover:shadow-xl user-profile bg-gray-100 sm:p-4 md:p-8 sm:max-w-xs md:max-w-sm rounded-lg shadow-lg mx-auto, my-20">
      <img className="hover:scale-110 transition-transform duration-300 ease-in-out rounded-full sm:w-24 sm:h-24 md:w-36 md:h-36 mx-auto " src="https://via.placeholder.com/150" alt="User" />
      <h1 className="sm:text-lg md:text-xl hover:text-blue-500 text-blue-800 my-4">John Doe</h1>
      <p className="text-gray-600 sm:text-sm md:text-base">Developer at Example Co. Loves to write code and explore new technologies.</p>
    </div>
  );
}

export default UserProfile;