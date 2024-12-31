import Hero from "../../components/hero/Hero";
import HomeBook from "../../components/homebook/HomeBook";

const Home = () => {
  document.title = "Books Shop";
  return (
    <div className="containerm">
      <Hero />
      <HomeBook />
    </div>
  );
};

export default Home;
