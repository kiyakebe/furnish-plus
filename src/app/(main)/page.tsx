import ProductList from "@/components/product/ProductList";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  router.push("/");

  return <ProductList />;
}
