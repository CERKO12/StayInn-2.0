import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const {data, reFecth} = useFetch("http://localhost:8800/api/hotels/countByCity?cities=Berlin,Beijing,London")

  return (
    <div className="featured">
      {<><div className="featuredItem">
        <img
          src="https://www.bain.com/contentassets/2ef1050396df402f80c83c3d12c46686/local-office-images-berlin-1440x810.jpg"
          alt="featured photo"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Berlin</h1>
          <h2>{data[0]} properties</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src="https://franks-travelbox.com/wp-content/uploads/2017/11/china-peking-der-kaiserliche-sommerpalast-in-peking-gilt-als-hocc88hepunkt-der-chinesischen-architektur-und-landschaftsgestaltung-er-steht-fucc88r-erholung-harmonie-und-schocc88nheit-china-1200x800.jpg"
          alt="featured photo"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Beijing</h1>
          <h2>{data[1]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://cdn.britannica.com/01/94501-050-7C939333/Big-Ben-London.jpg"
          alt="featured photo"
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>London</h1>
          <h2>{data[2]} properties</h2>
        </div>
      </div></>}
    </div>
  );
};

export default Featured;
