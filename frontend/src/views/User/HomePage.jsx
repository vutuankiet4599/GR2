import { useEffect, useState } from "react";
import Banner from "../../components/users/Banner";
import Slider from "../../components/users/Slider";
import ProductService from "../../services/ProductService";

const HomePage = () => {
    const [data, setData] = useState({
        newestProducts: [],
        topOrderedProducts: [],
    });

    useEffect(() => {
        ProductService.home()
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const images = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"];

    return (
        <div className="-my-4 flex min-h-screen flex-col items-center justify-start gap-16 bg-slate-100">
            <Banner images={images} />
            <div className="flex w-full flex-col items-start justify-start gap-16 px-14 py-8">
                <div className="flex w-full flex-col gap-5 rounded bg-white px-3 py-4 shadow-sm">
                    <p className="fond-bold w-fit border-b-2 border-orange-300 text-2xl uppercase text-orange-500">
                        Newest products
                    </p>
                    <Slider items={data.newestProducts} />
                </div>
                <div className="flex w-full flex-col gap-5 rounded bg-white px-3 py-4 shadow-sm">
                    <p className="fond-bold w-fit border-b-2 border-orange-300 text-2xl uppercase text-orange-500">
                        Top popular products
                    </p>
                    <Slider items={data.topOrderedProducts} />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
