import React from "react";
import
    {
        useDeleteMenuItemMutation,
        useGetMenuItemsQuery,
    } from "../../../../apis/menuItemApi";
import { toast } from "react-toastify";
import { MainLoader } from "../../Page/Common";
import { menuItemModel } from "../../../../Interfaces";
import { useNavigate } from "react-router";
function MenuItemList()
{
    const [deleteMenuItem] = useDeleteMenuItemMutation();
    const { data, isLoading } = useGetMenuItemsQuery(null);
    const navigate = useNavigate();

    const handleMenuItemDelete = async (id: number) =>
    {
        toast.promise(
            deleteMenuItem(id),
            {
                pending: "Processing your request...",
                success: "Menu Item Deleted Successfully 👌",
                error: "Error encoutnered 🤯",
            },
            {
                theme: "dark",
            }
        );
    };

    return (
        <>
            {isLoading && <MainLoader />}
            {!isLoading && (
                <div className="table px-5">
                    <div className="d-flex align-items-center justify-content-between">
                        <h1 style={{ color: "#FFBF00"}}>MenuItem List</h1>

                        <button
                            className="btn btn-success"
                            onClick={() => navigate("/menuitem/menuitemupsert")}
                        >
                            Add New Menu Item
                        </button>
                    </div>
                   
                    <div className="px-2" style={{ background: "#FFBF00", border: "10px solid #FF4433", borderRadius: "10px" }}>
                        <div className="row" style={{ background:"#FF4433", marginBottom:"10px"}} >
                            <div className="col-1">Image</div>
                            <div className="col-1">ID</div>
                            <div className="col-2">Name</div>
                            <div className="col-2">Category</div>
                            <div className="col-1">Price</div>
                            <div className="col-2">Special Tag</div>
                            <div className="col-1">Action</div>
                        </div>

                        {data.result.map((menuItem: menuItemModel) =>
                        {
                            return (
                                <div className="row " key={menuItem.id}>
                                    <div className="col-1">
                                        <img
                                            src={menuItem.image}
                                            alt="no content"
                                            style={{ width: "100%", maxWidth: "120px" }}
                                        />
                                    </div>
                                    <div className="col-1">{menuItem.id}</div>
                                    <div className="col-2">{menuItem.name}</div>
                                    <div className="col-2">{menuItem.category}</div>
                                    <div className="col-1">${menuItem.price}</div>
                                    <div className="col-2">{menuItem.specialTag}</div>
                                    <div className="col-1">
                                        <button className="btn btn-success">
                                            <i
                                                className="bi bi-pencil-fill"
                                                onClick={() =>
                                                    navigate("/menuitem/menuitemupsert/" + menuItem.id)
                                                }
                                            ></i>
                                        </button>
                                        <button
                                            className="btn btn-danger mx-1"
                                            onClick={() => handleMenuItemDelete(menuItem.id)}
                                        >
                                            <i className="bi bi-trash-fill"></i>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}

export default MenuItemList;