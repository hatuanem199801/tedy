import fetcher from "../../libs/fetcher";
import { serverHost } from "../../configs";
import Product from "../../components/Product";
import { Divider, Heading } from "@chakra-ui/react";
import Metadata from "../../components/Metadata";
import Image from "next/image";

export default function Category({ data, category }) {
  return (
    <>
      <Metadata
        title={category && category.title}
        description={category.description}
        index={true}
      />
      {category.image && (
        <Image
          src={category.image}
          layout="responsive"
          height={180}
          width={680}
        />
      )}

      <div className="container bg-white p-0 p-sm-4 my-2 my-sm-4">
        <Heading
          as="h1"
          className="font-weight-light px-2"
          title={category && category.title}
        >
          {category && category.title}
        </Heading>
        <hr />
        <div className="row mx-0 px-2">
          {data &&
            data.map((product) => {
              product = {
                ...product,
                image: product.images[0],
              };
              return (
                <div
                  key={product._id}
                  className="col-6 col-md-2 col-sm-3 col-md-4 col-lg-2 px-0 mb-2"
                >
                  <Product {...product} />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { seourl } = query;
  const result = await fetcher(`${serverHost}/api/category/seourl/${seourl}`);
  return {
    props: {
      data: result.data.products || [],
      category: result.data.category,
    },
  };
}
