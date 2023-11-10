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
                        <Link to={"/admin/users"}>
                            <Button variant={"secondary"} title="Back" style={"w-full text-xl"} />
                        </Link>
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
            <Loader isShow={Object.keys(user).length == 0} />
        </div>
    );
};

export default UserDetail;
