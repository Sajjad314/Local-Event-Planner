const TopnavBar = () => {
  return (
    <nav className={`p-4 py-8 w-full fixed bg-[#232323] top-0 z-10 `}>
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex-shrink-0">
            <div className=" flex gap-2">
              <a className="text-white font-bold lg:text-3xl text-xl md:text-2xl ">
                Event Planner
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopnavBar;
