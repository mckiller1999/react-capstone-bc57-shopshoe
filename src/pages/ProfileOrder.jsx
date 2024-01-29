import React, { useEffect, useState } from "react";

import axios from "axios";

const ProfileOrder = ({ item, userProfile, index }) => {
  const [prodDetail, setProdDetail] = useState({});
  //console.log(userProfile[index]);
  //console.log(index);

  let idItem = item.productId;
  let quantity = item.quantity;

  const getProdId = async () => {
    const res = await axios({
      url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${idItem}`,
      method: "GET",
    });
    return setProdDetail(res.data.content);
  };
  useEffect(() => {
    getProdId();
  }, [idItem]);
  // Khai báo biến để lưu trữ giá trị formattedDate
  let formattedDate = null;

  // Kiểm tra nếu userProfile[index] tồn tại và có thuộc tính date
  if (userProfile[index] && userProfile[index].date) {
    // Chuyển đổi chuỗi ngày giờ thành đối tượng Date
    const dateObject = new Date(userProfile[index].date);

    // Hiển thị ngày và giờ dưới định dạng mong muốn, ví dụ: "30 January 2024, 02:54 AM"
    formattedDate = dateObject.toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
  }

  return (
    <tr>
      <td>{formattedDate}</td>

      <td className="col-md-4">
        <img src={prodDetail.image} alt="" width={70} height={70} />
      </td>

      <td>{prodDetail.name}</td>
      <td>{quantity}</td>
      <td>{prodDetail.price * quantity}$</td>
    </tr>
  );
};

export default ProfileOrder;
