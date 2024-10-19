import { ProductType } from "@/types/product";
import { Badge } from "../ui/badge";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* <img src={product.image} alt={product.name} className="w-full h-48 object-cover" /> */}
      <img
        src="/placeholder.png"
        alt={product.name}
        className="w-full h-48 object-fit"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
        <Badge variant="secondary" className="mb-4">
          {product.category}
        </Badge>
        <div className="flex justify-between">
          <Button variant="default" className="flex-1 mr-2">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Button variant="outline" size="icon">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
