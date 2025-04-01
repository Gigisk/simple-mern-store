import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products", products);

  return (
    <Container maxW={"container.xl"} p={12}>
      <VStack spacing={8}>
        <Text
          fontSize={30}
          bgGradient={"linear(to-l, #7928CA,rgb(5, 184, 184))"}
          fontWeight={"bold"}
          textAlign={"center"}
          bgClip={"text"}
        >
          Current Products 📦
        </Text>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={10}
          width={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && ( // IF NO PRODUCTS
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
