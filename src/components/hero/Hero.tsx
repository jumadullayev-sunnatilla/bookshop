import bg from "../../assets/bgbook.png";

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
      }}
      className="containerM w-full h-[713px] flex flex-col items-center pt-[80px] gap-5"
    >
      <h1 className="font-serif font-bold text-5xl text-[#CC9600]">
        The Book Lover's Dreamland Awaits!
      </h1>
      <p className="text-[20px] text-center text-white w-[888px] leading-normal">
        Welcome to the ultimate book lover's paradise! Join our community and
        contribute to the ever-evolving library of stories, where every book has
        a chance to inspire someone new.
      </p>
      <div className="p-2 rounded-xl border-[2px] border-[#cc9600]">
        <input
          className="w-[300px] bg-transparent outline-none text-white font-medium pl-5"
          type="text"
          placeholder="Search a book"
        />
        <button className="bg-[#4B330B] text-white font-semibold px-10 py-2 rounded-xl">
          Search
        </button>
      </div>
    </div>
  );
};

export default Hero;
