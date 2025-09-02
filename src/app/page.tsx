


"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setUploadName, setProName, setProOffer, setProPrice, setProRating } from "@/slice/loginslice";
import { useDispatch } from "react-redux";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Spinner, type SpinnerProps } from '@/components/ui/shadcn-io/spinner';
const variants: SpinnerProps['variant'][] = [
  'bars',
 
];
const Page = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [start, setStart] = useState<number>(0);
  const limit = 4;
  const [regLoading,setRegLoading]=useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [filter, setFilter] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [reLoading,setReLoading] = useState<boolean>(true)
const [loadingId,setLoadingId]=useState<number | null>()
  const dispatch = useDispatch();
  const router = useRouter()
 let ImageId;
  const fetchProducts = async (startIndex: number) => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:3001/products?_start=${startIndex}&_limit=${limit}`);
      const data = await res.json();

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...data]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(start);
  }, [start]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setStart((prev) => prev + limit);
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [loading, hasMore]);
  const filteredProducts = useMemo(() => {
    let result = [...products];


    if (searchQuery) {
      result = result.filter((product) =>
        product.Name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filter === "low-high") {
      result.sort((a, b) =>
         a.Amount - b.Amount);
    } else if (filter === "high-low") {
      result.sort((a, b) => 
        b.Amount - a.Amount);
    }

    return result;
  }, [products, searchQuery, filter]);


  const handleExplore = (e:any)=>{
    
          setReLoading(false)
          setTimeout(()=>{
            router.push('productCard')
            setReLoading(true)
          },4000)
  }
  return (
    <div className="p-6">
      <div className="flex flex-wrap gap-4 justify-between items-center mb-6 mt-30">
        <Input
          placeholder="Search Products..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Select onValueChange={(val) => setFilter(val)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low-high">Low → High</SelectItem>
            <SelectItem value="high-low">High → Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filteredProducts.map((product, index,id) => (
          <Card className="shadow-sm flex flex-column flex-start mt-4" key={product.Name + index}>
            <CardHeader className="pt-4 pb-2 px-5 font-semibold">
              <h1>ProductName: {product.Name}</h1>
            </CardHeader>

            <CardContent className="text-[15px] text-muted-foreground px-5">
              <p>Description: {product.Description}</p>
              <div className="mt-3 w-full h-60 aspect-video bg-muted rounded-xl overflow-hidden">
                <img src={product.image} alt={product.Name} className="w-full h-full object-cover" />
              </div>
              <label className="flex mt-2 gap-3 font-semibold">
                Amount: <p className="font-semibold">${product.Amount}</p>
              </label>

              <div className="flex flex-col items-center gap-3">
                <label htmlFor="rating" className="flex mt-2 gap-3 font-semibold">
                  Rating
                  <Rating defaultValue={product.Rating}>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <RatingButton className="text-yellow-500" key={idx} value={idx + 1} />
                    ))}
                  </Rating>
                </label>
              </div>
              <p>Offer: {product.Offer}%</p>
            </CardContent>

            <CardFooter>
               


                    <CardFooter>
  {loadingId === product.id ? (
    <div className="flex flex-col items-center justify-center gap-3 text-center">
      {variants.map((variant) => (
        <div
          className="flex flex-col items-center justify-center gap-2"
          key={variant}
        >
          <Spinner variant={variant} />
          <span>please wait...</span>
        </div>
      ))}
    </div>
  ) : (
    <Button
      className="cursor-pointer"
      onClick={(e) => {
        dispatch(setUploadName(product.image));
        dispatch(setProName(product.Name));
        dispatch(setProOffer(product.Offer));
        dispatch(setProPrice(product.Amount));
        dispatch(setProRating(product.Rating));
        localStorage.setItem("proImage", product.image);

        setLoadingId(product.id); 
        setTimeout(() => {
          setLoadingId(null);
          router.push("/productCard");
        }, 2000);
      }}
    >
      Explore <ArrowRight className="ml-2" />
    </Button>
  )}
</CardFooter>

                
            </CardFooter>
          </Card> 
        ))}

        <div ref={observerRef} className="h-10 col-span-full"></div>

        {loading && <p className="col-span-full text-center">Loading...</p>}
        {!hasMore && <p className="col-span-full text-center text-gray-500">No more products</p>}
      </div>
    </div>
  );
};

export default Page;






