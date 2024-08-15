import GalleryGrid from "../components/GalleryGrid/GalleryGrid";
import TopicButton from "../components/TopicButton/TopicButton";
const Home = () => {
  return (
    <>
      <div className="container flex items-center flex-col w-full">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl text-gray-700 font-bold text-center">
          Welcome to the TechSavvy
          </h1>
          <p className="text-gray-600 text-center">Explore some topics</p>
        </div>
        <br />

        <TopicButton />
      </div>
      <GalleryGrid />
    </>
  );
};

export default Home;