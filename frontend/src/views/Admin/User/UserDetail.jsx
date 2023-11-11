import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "../../../services/UserService";
import { toast } from "react-toastify";
import Loader from "../../../components/common/Loader";
import Image from "../../../components/common/Image";
import Button from "../../../components/common/Button";
import Table from "../../../components/common/Table";
import Link from "../../../components/common/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        UserService.getOneById(id)
            .then((response) => {
                setUser(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                toast.error(error.message);
                setIsLoading(false);
            });
    }, [id]);

    return (
        <div className="relative flex flex-col gap-5">
            <div className="flex items-center bg-slate-50 px-6 py-4 shadow">
                <p className="text-xl font-bold text-gray-900">
                    User detail of {`${user.email} - ${user.name}`}
                </p>
            </div>
            <div className="flex h-fit w-full flex-col items-start justify-center gap-5 border px-12 py-6 shadow">
                <div className="flex w-full items-start justify-start gap-12">
                    <div className="m-0 flex h-full flex-col justify-between p-0">
                        <Image
                            src={user.avatar ? user.avatar : "/user.png"}
                            alt={user.email}
                            style={"w-56 h-72 border p-3"}
                        />
                        <div className="flex items-center justify-between gap-3">
                            <Link link={"/admin/users"}>
                                <Button variant={"secondary"} title="Back" style={"w-24 text-xl"} />
                            </Link>
                            <Link link={`/admin/users/edit/${user.id}`}>
                                <Button variant={"info"} title="Edit" style={"w-24 text-xl"} />
                            </Link>
                        </div>
                    </div>
                    <table cellPadding={"20px"} className="w-full">
                        <tbody>
                            <tr className="border">
                                <td className="border-r text-lg font-light">Name</td>
                                <td className="">{user.name}</td>
                            </tr>
                            <tr className="border">
                                <td className="border-r text-lg font-light">Email</td>
                                <td className="">{user.email}</td>
                            </tr>
                            <tr className="border">
                                <td className="border-r text-lg font-light">Phone</td>
                                <td className="">{user.phone}</td>
                            </tr>
                            <tr className="border">
                                <td className="border-r text-lg font-light">Role</td>
                                <td className="">{user.role?.name}</td>
                            </tr>
                            <tr className="border">
                                <td className="border-r text-lg font-light">Status</td>
                                <td className="">
                                    {user.isActive ? (
                                        <Button variant={"success"} title="Active" />
                                    ) : (
                                        <Button variant={"error"} title="Blocked" />
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex w-full items-center justify-between">
                    <div className="m-0 border p-0 shadow">
                        <Table
                            headers={["ID", "Product name"]}
                            data={user.products?.map((product) => {
                                return {
                                    Id: product.id,
                                    Name: (
                                        <div className="max-w-sm break-words">{product.name}</div>
                                    ),
                                };
                            })}
                        />
                    </div>
                    <div className="m-0 border p-0 shadow">
                        <Table
                            headers={["Review", "Ratings"]}
                            data={user.reviews?.map((review) => {
                                return {
                                    review: (
                                        <div className="max-w-sm break-words">{review.review}</div>
                                    ),
                                    ratings: (
                                        <div className="flex h-fit w-fit items-baseline gap-2">
                                            <p>{review.ratings}</p>
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className="text-yellow-300"
                                            />
                                        </div>
                                    ),
                                };
                            })}
                        />
                    </div>
                </div>
            </div>
            <Loader isShow={isLoading} />
        </div>
    );
};

export default UserDetail;
