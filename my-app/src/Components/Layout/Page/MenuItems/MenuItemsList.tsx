import React from 'react'
import { useState, useEffect } from 'react'
import { useGetMenuItemsQuery } from '../../../../apis/menuItemApi';
import { menuItemModel } from '../../../../Interfaces';
import MenuItemCard from './MenuItemCard';
import { useDispatch, useSelector } from "react-redux"
import { setMenuItem } from '../../../../Storage/Redux/menuItemSlice';
import { MainLoader } from '../Common';
import { RootState } from '../../../../Storage/Redux/store';
import { SD_SortTypes } from '../../../../Utility/SD';


const MenuItemsList = () =>
{

  const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryList, setCategoryList] = useState([""]);
  const [sortName, setSortName] = useState(SD_SortTypes.NAME_A_Z)
  const dispatch = useDispatch();
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const sortOptions: Array<SD_SortTypes> = [
    SD_SortTypes.PRICE_LOW_HIGH,
    SD_SortTypes.PRICE_HIGH_LOW,
    SD_SortTypes.NAME_A_Z,
    SD_SortTypes.NAME_Z_A,
  ];

  const searchValue = useSelector(
    (state: RootState) => state.menuItemStore.search
  )

  useEffect(() =>
  {
    if (data && data.Result)
    {
      const tempMenuArray = handleFilters(sortName, selectedCategory, searchValue);
      setMenuItems(tempMenuArray);

      
    }

  }, [searchValue]);


  useEffect(() =>
  {
    if (!isLoading)
    {
      
      dispatch(setMenuItem(data.result));
      setMenuItems(data.result)

      const tempCategoryList = ["All"]
      data.result.forEach((item: menuItemModel) =>
      {
        if (tempCategoryList.indexOf(item.category) === -1)
        {
          tempCategoryList.push(item.category);
        }
      })

      setCategoryList(tempCategoryList);
    }

  }, [isLoading]);

  const handleFilters = (sortType: SD_SortTypes, category: string, search: string) => {
    let tempArray = category === "All"? [...data.result] : data.result.filter((item:menuItemModel) =>
    item.category.toUpperCase() === category.toUpperCase());

    if(search){
      const tempArray2 = [...tempArray]
      tempArray = tempArray2.filter((item:menuItemModel) => 
        item.name.toUpperCase().includes(search.toUpperCase())
      );
    }

    //sort
    if(sortType === SD_SortTypes.PRICE_LOW_HIGH){
      tempArray.sort((a:menuItemModel, b: menuItemModel) => a.price - b.price)
    }
    if (sortType === SD_SortTypes.PRICE_HIGH_LOW)
    {
      tempArray.sort((a: menuItemModel, b: menuItemModel) => b.price - a.price)
    }

    if (sortType === SD_SortTypes.NAME_A_Z)
    {
      tempArray.sort((a: menuItemModel, b: menuItemModel) => a.name.toUpperCase().charCodeAt(0) - b.name.toUpperCase().charCodeAt(0))
    }
    if (sortType === SD_SortTypes.NAME_Z_A)
    {
      tempArray.sort((a: menuItemModel, b: menuItemModel) => b.name.toUpperCase().charCodeAt(0) - a.name.toUpperCase().charCodeAt(0))
    }

    return tempArray;
  }


  if (isLoading)
  {
    return <MainLoader />
  }

  const handleSortClick = (i: number) => {
    setSortName(sortOptions[i])
    const tempArray = handleFilters(
      sortOptions[i],
      selectedCategory,
      searchValue
    );
    setMenuItems(tempArray);
  }

  const handleCategoryClick = (i: number) => {
    const buttons = document.querySelectorAll(".custom-buttons");
    let localCategory;
    buttons.forEach((button, index) =>{
      if(index===i){
        button.classList.add("active")

        if (index === 0)
        {
          localCategory = "All"
        }
        else
        {
          localCategory = categoryList[index];
        }
        setSelectedCategory(localCategory)
        const tempArray = handleFilters(sortName, localCategory, searchValue)
        setMenuItems(tempArray)
      }
      else{
        button.classList.remove("active")
      }
      
    })
  }


  return (
    <div className="container row">
      <div className="my-3">
        <ul className='nav w-100 d-flex justify-content-center'>
          {categoryList.map((categoryName, index) => (
            <li className='nav-item' key={index}>
              <button
              className={`nav-link p-0 pb-2 custom-buttons fs-5 text-warning ${
                index === 0 && "active"
                
              }`}
                onClick={() => handleCategoryClick(index)}
              >
                {categoryName}
              </button>
            </li>
          ))}
          <li className="nav-item dropdown" style={{ marginLeft: "auto" }}>
            <div
              className="nav-link dropdown-toggle text-warning fs-6" style={{ border: "5px solid #FFBF00" }}
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {sortName}
            </div>
            <ul className="dropdown-menu">
              {sortOptions.map((sortType, index) => (
                <li
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleSortClick(index)}
                >
                  {sortType}
                </li>
              ))}
            </ul>
            </li>
        </ul>
      </div>
      {menuItems.length > 0 && menuItems.map((menuItem: menuItemModel, index: number) => (
        <MenuItemCard menuItem={menuItem} key={index} />
      ))}
    </div>
  )
}

export default MenuItemsList