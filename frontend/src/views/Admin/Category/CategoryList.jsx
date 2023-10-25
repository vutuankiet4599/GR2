import { useEffect, useState } from "react";
import Loader from "../../../components/common/Loader";
import CategoryService from "../../../services/CategoryService";
import { toast } from "react-toastify";
import Pagination from "../../../components/common/Pagination";
import Table from "../../../components/common/Table";
import Button from "../../../components/common/Button";
import Modal from "../../../components/common/Modal";
import Input from "../../../components/common/Input";
import ToastValidateError from "../../../services/ToastValidateError";

const handleGetCategoriesAndSetState = (page, setCategories, setPagination, setIsLoading) => {
    CategoryService.getAll(page)
        .then((response) => {
            setIsLoading(false);
            setCategories(response.data.data);
            setPagination(response.data.meta);
        })
        .catch((error) => {
            setIsLoading(false);
            toast.error(error.message);
        });
};

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [pagination, setPagination] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(-1);
    const [isShowModal, setIsShowModal] = useState({
        create: false,
        update: false,
        delete: false,
    });
    const [category, setCategory] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        handleGetCategoriesAndSetState(currentPage, setCategories, setPagination, setIsLoading);
    }, [currentPage]);

    const handlePageChange = (e) => {
        setCurrentPage(e.selected);
    };

    const handleChangeStateInput = (e) => {
        setCategory(e.target.value);
    };

    const handleToggleUpdateModal = (index) => {
        setCategory(categories[index]?.name);
        setIsShowModal({ ...isShowModal, update: !isShowModal.update });
        setSelectedCategory(selectedCategory < 0 ? index : -1);
    };

    const handleToggleDeleteModal = (index) => {
        setIsShowModal({ ...isShowModal, delete: !isShowModal.delete });
        setSelectedCategory(selectedCategory < 0 ? index : -1);
    };

    const handleToggleCreateModal = () => {
        setCategory("");
        setIsShowModal({ ...isShowModal, create: !isShowModal.create });
    };

    const handleCreateCategory = () => {
        setIsLoading(true);
        CategoryService.insert({ name: category })
            .then((response) => {
                setCategories([]);
                setPagination({});
                toast.success(response.message);
                handleGetCategoriesAndSetState(
                    currentPage,
                    setCategories,
                    setPagination,
                    setIsLoading,
                );
            })
            .catch((error) => {
                ToastValidateError.toastAll(error);
            });
        handleToggleCreateModal(selectedCategory);
    };

    const handleUpdateCategory = () => {
        setIsLoading(true);
        CategoryService.update(categories[selectedCategory].id, {
            name: category,
        })
            .then((response) => {
                setCategories([]);
                setPagination({});
                toast.success(response.message);
                handleGetCategoriesAndSetState(
                    currentPage,
                    setCategories,
                    setPagination,
                    setIsLoading,
                );
            })
            .catch((error) => {
                ToastValidateError.toastAll(error);
            });
        handleToggleUpdateModal(selectedCategory);
    };

    const handleDeleteCategory = () => {
        setIsLoading(true);
        CategoryService.delete(categories[selectedCategory].id)
            .then((response) => {
                setCategories([]);
                setPagination({});
                toast.success(response.message);
                handleGetCategoriesAndSetState(
                    currentPage,
                    setCategories,
                    setPagination,
                    setIsLoading,
                );
            })
            .catch((error) => {
                toast.error(error.message);
            });
        handleToggleDeleteModal(selectedCategory);
    };

    return (
        <div className="relative flex flex-col gap-3">
            <div className="flex items-center bg-slate-50 px-6 py-4 shadow">
                <p className="text-xl font-bold text-gray-900">Category Management</p>
            </div>
            <div className="h-fit w-48">
                <Button
                    title="Create"
                    variant="success"
                    onclick={handleToggleCreateModal}
                    style="w-full"
                />
            </div>

            <Table
                headers={["ID", "Name", "Action"]}
                data={categories.map((category, index) => {
                    return {
                        id: category.id,
                        name: category.name,
                        action: (
                            <div className="flex items-center justify-start gap-2">
                                <Button
                                    title="Update"
                                    variant="info"
                                    onclick={() => handleToggleUpdateModal(index)}
                                />
                                <Button
                                    title="Delete"
                                    variant="error"
                                    onclick={() => handleToggleDeleteModal(index)}
                                />
                            </div>
                        ),
                    };
                })}
            />
            {Object.keys(pagination).length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    handleChangePage={handlePageChange}
                    pageCount={pagination.last_page}
                    perPage={pagination.per_page}
                    total={pagination.total}
                    to={pagination.to}
                />
            )}
            <Modal
                isShow={isShowModal.create}
                title="Create new category"
                close={handleToggleCreateModal}
            >
                <div className="flex w-full flex-col items-start justify-center gap-5 px-8 py-6">
                    <Input
                        value={category}
                        onChange={handleChangeStateInput}
                        required
                        label="Name of category"
                    />
                    <Button title="Create" variant="success" onclick={handleCreateCategory} />
                </div>
            </Modal>
            <Modal
                isShow={isShowModal.update}
                title="Update category"
                close={() => handleToggleUpdateModal(selectedCategory)}
            >
                <div className="flex w-full flex-col items-start justify-center gap-5 px-8 py-6">
                    <Input
                        value={category}
                        onChange={handleChangeStateInput}
                        required
                        label="Name of category"
                    />
                    <Button title="Update" variant="info" onclick={handleUpdateCategory} />
                </div>
            </Modal>
            <Modal
                isShow={isShowModal.delete}
                title="Delete category"
                close={() => handleToggleDeleteModal(selectedCategory)}
            >
                <div className="flex flex-col items-center justify-center gap-3 py-6">
                    <p className="text-xl font-bold">
                        Are you sure to delete {categories[selectedCategory]?.name} category
                    </p>
                    <div className="flex w-1/4 items-center justify-between">
                        <Button title="Yes" variant="error" onclick={handleDeleteCategory} />
                        <Button
                            title="No"
                            variant="secondary"
                            onclick={() => handleToggleDeleteModal(selectedCategory)}
                        />
                    </div>
                </div>
            </Modal>
            <Loader isShow={isLoading} />
        </div>
    );
};

export default CategoryList;
