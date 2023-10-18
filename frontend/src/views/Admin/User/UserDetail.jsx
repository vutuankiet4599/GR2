import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserService from "../../../services/UserService";
import { toast } from "react-toastify";
import Loader from "../../../components/common/Loader";
import Image from "../../../components/common/Image";
import Button from "../../../components/common/Button";
import Table from "../../../components/common/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        UserService.getOneById(id)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message);
            });
    }, [id]);

    return (
        <div className="relative flex flex-col gap-5">
            <div className="px-6 py-4 flex items-center shadow bg-slate-50">
                <p className="text-gray-900 font-bold text-xl">
                    User detail of {`${user.email} - ${user.name}`}
                </p>
            </div>
            <div className="flex flex-col gap-5 items-start justify-center w-full h-fit border shadow px-12 py-6">
                <div className="flex gap-12 items-start justify-start w-full">
                    <div className="m-0 p-0 flex flex-col h-full justify-between">
                        <Image
                            src={user.avatar ? user.avatar : "/user.png"}
                            alt={user.email}
                            style={"w-56 h-72 border p-3"}
                        />
                        <Link to={"/admin/users"}>
                            <Button
                                variant={"secondary"}
                                title="Back"
                                style={"w-full text-xl"}
                            />
                        </Link>
                    </div>
                    <table cellPadding={"20px"} className="w-full">
                        <tbody>
                            <tr className="border">
                                <td className="text-lg font-light border-r">
                                    Name
                                </td>
                                <td className="">{user.name}</td>
                            </tr>
                            <tr className="border">
                                <td className="text-lg font-light border-r">
                                    Email
                                </td>
                                <td className="">{user.email}</td>
                            </tr>
                            <tr className="border">
                                <td className="text-lg font-light border-r">
                                    Phone
                                </td>
                                <td className="">{user.phone}</td>
                            </tr>
                            <tr className="border">
                                <td className="text-lg font-light border-r">
                                    Role
                                </td>
                                <td className="">{user.role?.name}</td>
                            </tr>
                            <tr className="border">
                                <td className="text-lg font-light border-r">
                                    Status
                                </td>
                                <td className="">
                                    {user.isActive ? (
                                        <Button
                                            variant={"success"}
                                            title="Active"
                                        />
                                    ) : (
                                        <Button
                                            variant={"error"}
                                            title="Blocked"
                                        />
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between w-full">
                    <div className="border shadow m-0 p-0">
                        <Table
                            headers={["ID", "Product name"]}
                            data={user.products?.map((product) => {
                                return {
                                    Id: product.id,
                                    Name: (
                                        <div className="break-words max-w-sm">
                                            {product.name}
                                        </div>
                                    ),
                                };
                            })}
                        />
                    </div>
                    <div className="border shadow m-0 p-0">
                        <Table
                            headers={["Review", "Ratings"]}
                            data={user.reviews?.map((review) => {
                                return {
                                    review: (
                                        <div className="break-words max-w-sm">
                                            {review.review}
                                        </div>
                                    ),
                                    ratings: (
                                        <div className="flex items-baseline h-fit w-fit gap-2">
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
            <Loader isShow={Object.keys(user).length == 0} />
        </div>
    );
};

export default UserDetail;
