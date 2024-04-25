import { addToCart } from "@/redux/proSlice"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { ProductType } from "../../type"

type Props = {
  item: ProductType; // Define props for the item
}

const AddCart = ({ item }: Props) => { // Receive item as prop
  const dispatch = useDispatch()
  
  const handleAddToCart = () => { // Remove item parameter from handleAddToCart
    dispatch(addToCart(item))
    toast.success(`${item.title} is added to Cart!`)
  }

  return (
    <button
      onClick={handleAddToCart} // Call handleAddToCart without passing item
      className="bg-zinc-950 text-zinc-200 w-36 py-3 mt-2 rounded-md uppercase text-xs font-semibold hover:bg-designColor hover:text-white duration-200">
      Add to cart
    </button>
  )
}

export default AddCart