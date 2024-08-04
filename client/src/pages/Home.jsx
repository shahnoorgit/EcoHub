import { category } from "../../constants";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className=" bg-white min-w-full">
      <section className=" min-w-full h-[30%] flex justify-center items-center">
        <div className="  w-1/2 flex justify-center p-3 max-sm:w-full h-[500px] items-center">
          <div className=" flex flex-col gap-3">
            <h1 className=" font-serif font-bold text-4xl text-gray-800">
              Eco-Friendly Products , <br />
              Healthy Earth.
            </h1>
            <p className=" font-semibold text-xl text-gray-700">
              Buy range of Eco-friendly products with ease,
              <br />
              Reduce your carbon footprint and support a sustainable future.
            </p>
            <center>
              <Link
                to={"/products/all"}
                className=" rounded-full mt-5 w-48 cursor-pointer flex justify-center items-center p-3 bg-[#658C4A] h-10"
              >
                <span className="font-semibold text-white">
                  Browse Products
                </span>
              </Link>
            </center>
          </div>
        </div>
        <div className="  w-1/2 flex max-sm:hidden justify-center p-5 h-[500px] items-center">
          <img
            src="/images/hero.png"
            alt="Eco-friendly Products"
            className="object-cover w-full h-full"
          />
        </div>
      </section>
      <section className="flex items-center flex-col sm:flex-row sm:justify-between gap-1 mt-10 mb-10">
        <div className="p-10 max-sm:w-full w-[200px] h-[150px]">
          <h1 className="flex font-bold font-serif text-[#658C4A] text-4xl">
            <span>
              Category <br /> for <br /> you
            </span>
          </h1>
        </div>
        <div className="flex flex-wrap justify-center gap-5 sm:gap-1 w-full">
          {category.map((cat) => (
            <div
              key={cat.image}
              className="flex flex-col items-center border-green-500 rounded-lg border-2 max-sm:w-full hover:scale-105 transition-all ease-in cursor-pointer"
            >
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center">
                  <img
                    src={cat.image}
                    className="object-contain rounded-lg"
                    height={200}
                    width={200}
                    alt="category"
                  />
                </div>
                <div className="-mt-8 flex items-center justify-center">
                  <span className="font-thin rounded-full border-white border text-xs p-2 bg-gray-800 text-white">
                    {cat.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
