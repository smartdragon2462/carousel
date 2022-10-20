import Carousel, { CarouselItem } from './components/carousel';
import productData from './data/product.json';
import './App.css';

function App() {
  const { products } = productData ?? null;

  return (
    <div className="App">
      <Carousel cardWidth={200} visibleCount={4} gap={12} >
        {
          products &&
          products?.map((product, index) => (
            <CarouselItem product={product} key={index} />
          ))
        }
      </Carousel>
    </div>
  );
}

export default App;
