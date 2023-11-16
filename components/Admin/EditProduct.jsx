import axios from "axios"
import { useEffect, useState } from "react"
import ProductEdit from "./ProductEdit"
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"



function EditProduct() {
  const [response, setResponse] = useState()
  const [data, setData] = useState({
    category: '',
    description: '',
    images: [],
    maintenance: '',
    warranty: '',
    price: 0,
    specification: [],
    subCategory: '',
    title: '',
    variation: {
      color: [],
      size: []
    },
    sku: ""
  })

  const fetchProduct = async () => {
    try {
      const product = await axios.get('/api/get-products')
      setResponse(product.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <main>
      <Table className="max-w-4xl mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="w-40">Title</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Update/Edit</TableHead>
          </TableRow>
        </TableHeader>
        {
          response && response.map((e, i) => (<ProductEdit values={e} key={i} />))
        }
      </Table>

    </main>
  )
}

export default EditProduct