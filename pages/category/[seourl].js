import fetcher from "../../libs/fetcher";
import { serverHost } from "../../configs";
import Product from "../../components/Product";

export default function Category({ data }) {
  return (
    <div className="container">
      <div className="row">
        {data &&
          data.map((product) => {
            product = {
              ...product,
              image: product.images[0],
            };
            return (
              <div className="col-6 col-md-2 col-sm-3 col-md-4 col-lg-2 px-0 mb-2">
                <Product key={product._id} {...product} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { seourl } = query;
  const products = await fetcher(`${serverHost}/api/category/seourl/${seourl}`);
  return {
    props: {
      data: products.data || [],
    },
  };
}
